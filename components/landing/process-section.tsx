"use client"

import { motion } from "framer-motion"
import { Calendar, FileSearch, HeartHandshake, Sparkles, PartyPopper } from "lucide-react"

const processes = [
  {
    step: "1",
    title: "Consultation",
    description: "We begin with a personal consultation to understand your vision, preferences, and budget for the perfect wedding day.",
    icon: Calendar,
    color: "bg-pink-50 text-pink-600",
  },
  {
    step: "2",
    title: "Planning & Design",
    description: "Our team crafts a tailored wedding plan with curated vendor recommendations, timeline, and design concepts.",
    icon: FileSearch,
    color: "bg-blue-50 text-blue-600",
  },
  {
    step: "3",
    title: "Vendor Coordination",
    description: "We handle all communication and coordination with vendors to ensure every detail aligns with your vision.",
    icon: HeartHandshake,
    color: "bg-purple-50 text-purple-600",
  },
  {
    step: "4",
    title: "Final Details",
    description: "One month before your wedding, we finalize all details, confirm vendors, and create a comprehensive timeline.",
    icon: Sparkles,
    color: "bg-amber-50 text-amber-600",
  },
  {
    step: "5",
    title: "Wedding Day",
    description: "Relax and enjoy your special day while our team manages every aspect of your celebration from start to finish.",
    icon: PartyPopper,
    color: "bg-emerald-50 text-emerald-600",
  },
]

export function ProcessSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Planning Process</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            From the first consultation to your wedding day, our streamlined process ensures a stress-free experience.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-5xl">
          {processes.map((process, index) => (
            <motion.div
              key={process.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative flex gap-8 mb-12 last:mb-0"
            >
              {/* Line connector */}
              {index < processes.length - 1 && (
                <div className="absolute top-16 left-9 w-0.5 h-full bg-gray-200"></div>
              )}

              {/* Step circle */}
              <div className={`relative shrink-0 w-18 h-18 rounded-full ${process.color} p-4 flex items-center justify-center z-10`}>
                <process.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <div className="pt-2 pb-8">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <span className="text-sm px-2 py-0.5 rounded-full bg-gray-100 mr-2">Step {process.step}</span>
                  {process.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{process.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
