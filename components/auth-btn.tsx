"use client";

import { authClient } from "@/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface AuthButtonsProps {
  isMobile?: boolean;
}

export default function AuthButtons({ isMobile = false }: AuthButtonsProps) {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

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
        <Link href="/sign-in">
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
        <Link href="/sign-up">
          <Button
            variant="outline"
            className={cn(
              "border-gold hover:bg-gold/5 text-foreground",
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

  const getUserInitial = () => {
    if (session.user?.name) {
      return session.user.name.charAt(0).toUpperCase();
    }
    if (session.user?.email) {
      return session.user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className={cn(
      "flex items-center gap-2 md:gap-4",
      isMobile && "w-full flex-col"
    )}>
      <Link href="/dashboard">
        <Button
          variant="outline"
          className={cn(
            "border-gold hover:bg-gold/5 text-foreground",
            isMobile && "w-full justify-center mb-2"
          )}
          size={isMobile ? "lg" : "default"}
        >
          Dashboard
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={cn("p-0 h-auto", isMobile && "w-full flex justify-center")} aria-label="User menu">
            <Avatar className="h-8 w-8">
              {session.user?.image ? (
                <AvatarImage src={session.user.image} alt={session.user.name || session.user.email || "User"} />
              ) : (
                <AvatarFallback className="bg-gold/10 text-gold">
                  {getUserInitial()}
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium leading-none">{session.user?.name || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
