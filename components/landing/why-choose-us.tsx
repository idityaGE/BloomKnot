"use client"

import { motion } from "framer-motion"
import { Heart, Users, Sparkles, Award } from "lucide-react"

const features = [
  {
    name: "Tailored Wedding Planning",
    description: "Every love story is unique. We create personalized experiences that reflect your style and vision.",
    icon: Heart,
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    name: "Experienced Team",
    description: "Our seasoned professionals bring years of expertise to make your special day perfect.",
    icon: Users,
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    name: "End-to-End Services",
    description: "From venue selection to the last dance, we handle every detail with precision and care.",
    icon: Sparkles,
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    name: "Trusted Vendors",
    description: "Access our network of premium vendors, carefully selected to deliver excellence.",
    icon: Award,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block mb-4 text-sm uppercase tracking-widest border-b border-gold text-gold px-4 py-1"
          >
            Our Advantages
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            Why Choose Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-2 text-lg leading-8 text-gray-600"
          >
            We bring your wedding dreams to life with expertise, creativity, and dedication.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto mt-4 h-0.5 w-20 bg-gradient-to-r from-transparent via-gold to-transparent"
          />
        </div>

        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative bg-cream rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              >
                <div className={`absolute -top-5 left-6 rounded-full ${feature.color} p-3 border shadow-sm`}>
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>

                <div className="pt-8">
                  <h3 className="text-xl font-semibold leading-tight mb-3 group-hover:text-gold transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
