"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loading-button";
import { signInSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/auth-client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ErrorContext } from "@better-fetch/fetch";
import { GithubIcon, MailOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const [pendingCredentials, setPendingCredentials] = useState(false);
  const [pendingGoogle, setPendingGoogle] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleCredentialsSignIn = async (
    values: z.infer<typeof signInSchema>
  ) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setPendingCredentials(true);
        },
        onSuccess: async () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          console.log(ctx);
          toast({
            title: "Authentication failed",
            description: ctx.error.message ?? "Please check your credentials and try again.",
            variant: "destructive",
          });
        },
      }
    );
    setPendingCredentials(false);
  };

  const handleSignInWithGithub = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onRequest: () => {
          setPendingGoogle(true);
        },
        onSuccess: async () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          toast({
            title: "Authentication failed",
            description: ctx.error.message ?? "Unable to sign in with Google. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
    setPendingGoogle(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-none md:border shadow-none md:shadow-md">
        <CardHeader className="space-y-1 md:pt-6">
          <div className="hidden md:block">
            <h2 className="text-2xl font-bold text-center">Welcome back</h2>
            <p className="text-center text-gray-500 text-sm mt-1">
              Enter your credentials to access your account
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {/* Social login button */}
          <div className="mb-4">
            <LoadingButton
              className="w-full border-gray-300 hover:bg-gray-50"
              pending={pendingGoogle}
              onClick={handleSignInWithGithub}
            >
              <GithubIcon className="w-4 h-4 mr-2" />
              Continue with Google
            </LoadingButton>
          </div>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">
                or continue with email
              </span>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCredentialsSignIn)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        {...field}
                        autoComplete="email"
                        className="rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-gold hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        autoComplete="current-password"
                        className="rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton
                className="w-full bg-gold hover:bg-gold/90 text-white"
                pending={pendingCredentials}
              >
                Sign in
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2 text-center text-sm border-t border-gray-100 pt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/sign-up" className="font-medium text-gold hover:underline">
              Create account
            </Link>
          </p>

          <Link
            href="/mail-verification"
            className="inline-flex items-center text-xs text-gray-500 hover:text-gold"
          >
            <MailOpen className="w-3 h-3 mr-1" />
            Need to verify your email?
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
