"use client"

import { motion } from "framer-motion"
import { HeartHandshake } from "lucide-react"
import { useEffect, useState } from "react"

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return Math.min(prev + Math.random() * 10, 100)
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center mb-8"
        >
          <HeartHandshake className="h-16 w-16" />
          <span className="text-3xl font-semibold ml-4">Bloomknot</span>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-1 bg-primary rounded-full w-48 mx-auto"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-8 left-8 text-sm font-medium"
      >
        Loading... {Math.round(progress)}%
      </motion.div>
    </div>
  )
}