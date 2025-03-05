"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, MailCheck, RefreshCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { authClient } from "@/auth-client"

export default function MailVerificationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const { toast } = useToast()
  const [isResendingEmail, setIsResendingEmail] = useState(false)

  const openMailClient = () => {
    // Common email providers
    const emailProviders = {
      gmail: "https://mail.google.com/",
      yahoo: "https://mail.yahoo.com/",
      outlook: "https://outlook.live.com/",
      protonmail: "https://mail.proton.me/",
      aol: "https://mail.aol.com/",
      icloud: "https://www.icloud.com/mail/"
    }

    let mailUrl = "mailto:"

    if (email) {
      // Try to determine the email provider
      const domain = email.split('@')[1]?.toLowerCase()

      if (domain?.includes('gmail')) {
        mailUrl = emailProviders.gmail
      } else if (domain?.includes('yahoo')) {
        mailUrl = emailProviders.yahoo
      } else if (domain?.includes('outlook') || domain?.includes('hotmail') || domain?.includes('live')) {
        mailUrl = emailProviders.outlook
      } else if (domain?.includes('proton') || domain?.includes('protonmail')) {
        mailUrl = emailProviders.protonmail
      } else if (domain?.includes('aol')) {
        mailUrl = emailProviders.aol
      } else if (domain?.includes('icloud') || domain?.includes('me.com')) {
        mailUrl = emailProviders.icloud
      }
    }

    window.open(mailUrl, '_blank')
  }

  const handleResendEmail = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email address not found. Please try signing in again.",
        variant: "destructive"
      })
      return
    }

    try {
      setIsResendingEmail(true)

      await authClient.sendVerificationEmail({ email })

      toast({
        title: "Email sent!",
        description: "A new verification email has been sent to your inbox.",
      })
    } catch (error) {
      console.error("Error resending email:", error)
      toast({
        title: "Something went wrong",
        description: "We couldn't resend the verification email. Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsResendingEmail(false)
    }
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-6">
          <div className="mx-auto rounded-full bg-primary/10 p-3 w-16 h-16 flex items-center justify-center">
            <MailCheck className="h-8 w-8 text-primary" />
          </div>

          <div>
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription className="mt-2">
              We&apos;ve sent a verification link to
              {email && (
                <span className="font-medium text-foreground"> {email}</span>
              )}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Please check your email and click on the verification link to activate your account.
            The link will expire in 24 hours.
          </p>

          <div className="border border-dashed rounded-lg p-4 bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">
              Can&apos;t find the email?
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Check your spam or junk folder</li>
              <li>Make sure your email address is correct</li>
              <li>Allow a few minutes for the email to arrive</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={openMailClient}
            className="w-full"
          >
            <Mail className="mr-2 h-4 w-4" /> Open Email App
          </Button>

          <Button
            variant="outline"
            onClick={handleResendEmail}
            disabled={isResendingEmail}
            className="w-full"
          >
            {isResendingEmail ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <RefreshCcw className="mr-2 h-4 w-4" /> Resend Email
              </>
            )}
          </Button>

          <Button
            variant="link"
            onClick={() => router.push("/sign-in")}
            className="w-full"
          >
            Back to Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}