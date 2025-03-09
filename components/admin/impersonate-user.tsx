"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/auth-client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserCog } from "lucide-react";

interface ImpersonateUserProps {
  userId: string;
  dropdown?: boolean;
}

export default function ImpersonateUser({ userId, dropdown = false }: ImpersonateUserProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleImpersonateUser = async () => {
    try {
      setIsLoading(true);

      await authClient.admin.impersonateUser({
        userId: userId,
      });

      toast({
        title: "Impersonating User",
        description: "You are now viewing the site as this user. Return to admin to stop impersonation.",
        duration: 5000,
      });

      // Save admin return info in session storage
      sessionStorage.setItem('adminImpersonating', 'true');

      // Navigate to home page as impersonated user
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to impersonate user:", error);
      toast({
        variant: "destructive",
        title: "Impersonation Failed",
        description: "Could not impersonate this user. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (dropdown) {
    return (
      <div
        className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        onClick={handleImpersonateUser}
      >
        <UserCog className="h-4 w-4 mr-2" />
        {isLoading ? "Switching..." : "Impersonate User"}
        {isLoading && <Loader2 className="ml-2 h-3 w-3 animate-spin" />}
      </div>
    );
  }

  return (
    <Button
      onClick={handleImpersonateUser}
      variant="outline"
      size="sm"
      disabled={isLoading}
      className="w-full sm:w-auto flex items-center gap-1"
    >
      {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <UserCog className="h-3 w-3" />}
      <span>{isLoading ? "Switching..." : "Impersonate"}</span>
    </Button>
  );
}
