"use client"

import { motion } from "framer-motion"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NotFound() {
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
          <Search className="h-16 w-16 mx-auto text-muted-foreground" />
        </motion.div>

        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 mx-auto"
        >
          <Home className="h-4 w-4" />
          Return Home
        </Button>
      </motion.div>
    </div>
  )
}