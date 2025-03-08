"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loading-button";
import { ArrowLeft, MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/auth-client";
import { useToast } from "@/hooks/use-toast";
import { forgotPasswordSchema } from "@/lib/schema";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    setIsPending(true);
    const { error } = await authClient.forgetPassword({
      email: data.email,
      redirectTo: "/reset-password",
    });

    if (error) {
      toast({
        title: "Request failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setIsSubmitted(true);
      toast({
        title: "Reset link sent",
        description:
          "If an account exists with this email, you'll receive a password reset link.",
      });
    }
    setIsPending(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-none md:border bg-white/80 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="space-y-1 md:pt-6">
          <div className="hidden md:block">
            <h2 className="text-2xl font-bold text-center">Reset your password</h2>
            <p className="text-center text-gray-500 text-sm mt-1">
              Enter your email and we'll send you a reset link
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
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
                      <FormDescription className="text-xs text-gray-500">
                        We'll send a secure link to reset your password
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <LoadingButton
                  pending={isPending}
                  className="w-full bg-gold hover:bg-gold/90 text-white mt-6"
                >
                  Send Reset Link
                </LoadingButton>
              </form>
            </Form>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <MailIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Check your inbox</h3>
              <p className="text-gray-600 text-sm mb-6">
                We've sent a password reset link to <strong>{form.getValues().email}</strong>.
                The link will expire in 24 hours.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-left">
                <p className="font-medium mb-2">Can't find the email?</p>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                  <li>Check your spam or junk folder</li>
                  <li>Allow a few minutes for delivery</li>
                  <li>Make sure you entered the correct email</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-100 pt-6">
          <Link
            href="/sign-in"
            className="text-sm text-gray-600 hover:text-gold inline-flex items-center"
          >
            <ArrowLeft className="w-3 h-3 mr-1" />
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
