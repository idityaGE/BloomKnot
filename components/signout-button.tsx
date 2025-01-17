'use client'

import { useRouter } from "next/navigation";
import { authClient } from "@/auth-client";
import LoadingButton from "@/components/loading-button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ErrorContext } from "@better-fetch/fetch";

export default function SignoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      setPending(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
            router.refresh();
          },
          onError: (ctx: ErrorContext) => {
            toast({
              title: "Error signing out",
              description: ctx.error.message || "An error occurred while signing out",
              variant: "destructive",
            });
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
    <LoadingButton pending={pending} onClick={handleSignOut}>
      Sign Out
    </LoadingButton>
  );
}