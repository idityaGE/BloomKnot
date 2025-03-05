"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
// import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative min-h-screen">
      {/* Video Background */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/hero-bg.png"
          layout="fill"
          alt=""
          className="w-full h-full object-cover"
        >
        </Image>
        <div className="absolute inset-0 bg-black/30" />
      </div> */}

      {/* Content */}
      <div className="relative pt-32 sm:pt-48 lg:pt-64">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold tracking-tight sm:text-6xl"
            >
              Your Dream Wedding,
              <br />
              Our Expertise
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg leading-8"
            >
              Let us create the perfect celebration of your love story.
              From intimate gatherings to grand celebrations, we make your dream wedding a reality.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link href="/book">
                <Button variant="default" size="lg" className="text-lg">
                  Book Your Dream Wedding
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}