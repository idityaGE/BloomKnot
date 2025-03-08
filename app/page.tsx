'use client'

import { Hero } from "@/components/landing/hero"
import { WhyChooseUs } from "@/components/landing/why-choose-us"
import { ProcessSection } from "@/components/landing/process-section"
import { FAQSection } from "@/components/landing/faq-section"
import { Footer } from "@/components/landing/footer/footer"
import Preloader from "@/components/landing/preloader"
import { useEffect, useState } from 'react'

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisitedHome')
    if (hasVisited) {
      setShowPreloader(false)
    } else {
      // Mark that user has visited home
      sessionStorage.setItem('hasVisitedHome', 'true')
    }
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {showPreloader && <Preloader />}
      <Hero />
      <WhyChooseUs />
      <ProcessSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
