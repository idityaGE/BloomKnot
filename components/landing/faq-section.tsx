"use client"

import { motion } from "framer-motion"
import { HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How far in advance should I book your wedding planning services?",
    answer: "We recommend booking our services 9-12 months before your wedding date for full planning. However, we also offer partial planning and month-of coordination that can be booked 4-6 months in advance, subject to availability."
  },
  {
    question: "What types of wedding planning packages do you offer?",
    answer: "We offer three main packages: Full Planning & Design, Partial Planning, and Month-of Coordination. Each can be customized to meet your specific needs and budget. We also provide à la carte services for couples who need assistance with specific aspects of their wedding."
  },
  {
    question: "Do you work with a specific style or type of wedding?",
    answer: "We pride ourselves on versatility and have experience with various wedding styles from intimate garden ceremonies to grand ballroom receptions. Our approach is to bring your unique vision to life regardless of style, theme, or size."
  },
  {
    question: "How are your fees structured?",
    answer: "Our full-service planning packages start at a base fee, with the final cost depending on your wedding's complexity, guest count, and specific requirements. We provide a detailed proposal after our initial consultation. We also offer payment plans to help manage your wedding budget."
  },
  {
    question: "Can you work with our budget?",
    answer: "Yes! We work with various budgets and help you prioritize elements that matter most to you. Our experience allows us to suggest creative solutions to maximize your budget while creating a beautiful celebration."
  },
  {
    question: "Will you be present on our wedding day?",
    answer: "Absolutely! Your dedicated planner and assistant(s) will be on-site throughout your wedding day, from vendor arrivals through the end of the reception, ensuring every detail is executed perfectly."
  }
]

export function FAQSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-cream">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Decorative elements */}
        <div className="absolute -z-10 opacity-5">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <svg width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true" className="text-gold">
              <defs>
                <pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
            </svg>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="text-sm uppercase tracking-widest border-b border-gold text-gold px-4 py-1">
              Get Informed
            </span>
          </motion.div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Frequently Asked Questions</h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Everything you need to know about our wedding planning services
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto mt-4 mb-16 h-0.5 w-20 bg-gradient-to-r from-transparent via-gold to-transparent"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-xl border bg-white p-8 shadow-md relative overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-gold/5 rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gold/5 rounded-full" />

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100">
                <AccordionTrigger className="text-left text-lg font-medium py-5 hover:text-gold transition-colors group flex gap-3">
                  <span className="text-xs font-normal text-gold border border-gold rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                    Q
                  </span>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pl-8">
                  <div className="bg-cream/50 rounded-lg p-4 my-2 border-l-2 border-gold">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Additional help callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-4 p-6 bg-white rounded-xl border shadow-sm"
        >
          <div className="bg-gold/10 p-3 rounded-full">
            <HelpCircle className="h-6 w-6 text-gold" />
          </div>
          <div>
            <h3 className="font-medium text-lg">Still have questions?</h3>
            <p className="text-gray-600 text-sm mt-1">We're here to help you plan your perfect day.</p>
          </div>
          <a
            href="/contact"
            className="mt-4 sm:mt-0 sm:ml-auto px-5 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors text-sm font-medium"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
