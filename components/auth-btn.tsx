"use client";

import { authClient } from "@/auth-client";
import Link from "next/link";
import SignoutButton from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthButtonsProps {
  isMobile?: boolean;
}

export default function AuthButtons({ isMobile = false }: AuthButtonsProps) {
  const { data, isPending } = authClient.useSession();

  if (isPending) return (
    <div className={cn(
      "flex gap-2",
      isMobile ? "w-full" : "justify-center"
    )}>
      <Button
        variant="outline"
        size={isMobile ? "lg" : "default"}
        className={cn(
          "animate-pulse",
          isMobile && "w-full justify-center"
        )}
        disabled
      >
        Loading...
      </Button>
    </div>
  );

  const session = data;

  if (!session) {
    return (
      <div className={cn(
        "flex gap-2",
        isMobile ? "flex-col w-full" : "justify-center"
      )}>
        <Link href="/sign-in" className={isMobile ? "w-full" : ""}>
          <Button
            variant="outline"
            className={cn(
              "border-gold hover:bg-gold/5 text-foreground",
              isMobile && "w-full justify-center"
            )}
            size={isMobile ? "lg" : "default"}
          >
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up" className={isMobile ? "w-full" : ""}>
          <Button
            className={cn(
              "bg-gold hover:bg-gold/90",
              isMobile && "w-full justify-center"
            )}
            size={isMobile ? "lg" : "default"}
          >
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center gap-2",
      isMobile && "w-full"
    )}>
      <div className="mr-2 flex items-center gap-2">
        <div className="bg-gold/10 p-1.5 rounded-full">
          <UserRound size={18} className="text-gold" />
        </div>
        <span className="text-sm hidden sm:inline-block">{session.user?.email}</span>
      </div>
      <SignoutButton isMobile={isMobile} />
    </div>
  );
}
