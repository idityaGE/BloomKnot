"use client"

import { motion } from "framer-motion"
import { Heart, Users, Sparkles, Award } from "lucide-react"

const features = [
  {
    name: "Tailored Wedding Planning",
    description: "Every love story is unique. We create personalized experiences that reflect your style and vision.",
    icon: Heart,
  },
  {
    name: "Experienced Team",
    description: "Our seasoned professionals bring years of expertise to make your special day perfect.",
    icon: Users,
  },
  {
    name: "End-to-End Services",
    description: "From venue selection to the last dance, we handle every detail with precision and care.",
    icon: Sparkles,
  },
  {
    name: "Trusted Vendors",
    description: "Access our network of premium vendors, carefully selected to deliver excellence.",
    icon: Award,
  },
]

export function WhyChooseUs() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            We bring your wedding dreams to life with expertise, creativity, and dedication.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <dt className="text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-primary mx-auto">
                    <feature.icon className="h-8 w-8 text-primary-foreground" aria-hidden="true" />
                  </div>
                  <span className="text-xl font-semibold leading-7">{feature.name}</span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-center">
                  <p className="flex-auto text-muted-foreground">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}