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
      <Card className="border-none md:border bg-white/80 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden">
        <CardContent className="pt-6 md:px-8">
          {/* Social login button */}
          <div className="mb-6">
            <LoadingButton
              className="w-full border rounded-lg py-6 bg-white text-black shadow-sm font-medium"
              pending={pendingGoogle}
              onClick={handleSignInWithGithub}
            >
              <GithubIcon className="w-5 h-5 mr-3" />
              Continue with Google
            </LoadingButton>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white/80 backdrop-blur-sm px-4 text-sm text-gray-500">
                or sign in with email
              </span>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCredentialsSignIn)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        {...field}
                        autoComplete="email"
                        className="rounded-lg py-6 bg-white"
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
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-gold hover:text-gold/80 font-medium transition-colors"
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
                        className="rounded-lg py-6 bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton
                className="w-full bg-gold hover:bg-gold/90 text-white rounded-lg py-6 font-medium mt-2"
                pending={pendingCredentials}
              >
                Sign in
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-3 text-center pt-6 pb-8 border-t border-gray-100 bg-gray-50/50">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link href="/sign-up" className="font-medium text-gold hover:underline">
              Create account
            </Link>
          </p>

          <Link
            href="/mail-verification"
            className="inline-flex items-center text-xs text-gray-500 hover:text-gold transition-colors"
          >
            <MailOpen className="w-3 h-3 mr-1.5" />
            Need to verify your email?
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
