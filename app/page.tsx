'use client'

import { Hero } from "@/components/hero"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Footer } from "@/components/footer/footer"
import Preloader from "@/components/preloader"
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
      <Footer />
    </main>
  )
}