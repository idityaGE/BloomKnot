"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cream to-white">
      {/* Content */}
      <div className="relative min-h-screen flex items-center py-24 md:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1 mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-block mb-4"
              >
                <span className="text-xs sm:text-sm uppercase tracking-widest border-b border-gold text-gold px-3 sm:px-4 py-1">
                  Wedding Planning & Design
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight !leading-tight"
              >
                Your Dream Wedding,{" "}
                <span className="bg-gradient-to-r from-gold to-amber-500 bg-clip-text text-transparent">
                  Our Expertise
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-gray-700 max-w-lg mx-auto lg:mx-0"
              >
                Let us create the perfect celebration of your love story.
                From intimate gatherings to grand celebrations, we craft
                unforgettable moments that reflect your unique journey.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-x-6"
              >
                <Link href="/dashboard">
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-gradient-to-r from-gold to-amber-500 text-white hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] w-full sm:w-auto"
                  >
                    <span className="mr-2">Book Your Consultation</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                {/* <Link href="/portfolio" className="text-gray-700 hover:text-gold transition-colors relative group">
                  <span>View Our Portfolio</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
                </Link> */}
              </motion.div>
            </div>

            {/* Image Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Elegant wedding ceremony setup"
                  fill
                  className="object-cover rounded-lg sm:rounded-xl shadow-xl"
                  priority
                  style={{ objectPosition: "center 30%" }}
                />
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 bg-white p-3 sm:p-4 rounded-lg shadow-lg z-10 max-w-[180px] sm:max-w-none"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-gold/10 p-2 sm:p-3 rounded-full">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold sm:w-6 sm:h-6">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">Trusted by</p>
                    <p className="text-xl sm:text-2xl font-bold">500+ Couples</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
