"use client"

import { motion } from "framer-motion"
import { AlertCircle, Home, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
        </motion.div>

        <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-muted-foreground mb-8">
          We apologize for the inconvenience. Please try again or return to the homepage.
        </p>

        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
          <Button
            onClick={() => reset()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-8 p-4 bg-muted rounded-lg text-left">
            <p className="text-sm font-mono">{error.message}</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}