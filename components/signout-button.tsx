"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { authClient } from "@/auth-client"

interface SignoutButtonProps {
  isMobile?: boolean;
}

export default function SignoutButton({ isMobile = false }: SignoutButtonProps) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setPending(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
            router.refresh();
          }
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size={isMobile ? "lg" : "sm"}
      className={cn(
        "text-gray-500 hover:text-red-600 hover:bg-red-50",
        isMobile && "w-full justify-center"
      )}
      onClick={handleSignOut}
      disabled={pending}
    >
      {pending ? "Signing Out..." : (
        <>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </>
      )}
    </Button>
  )
}
