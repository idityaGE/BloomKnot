
import { Hero } from "@/components/landing/hero"
import { WhyChooseUs } from "@/components/landing/why-choose-us"
import { ProcessSection } from "@/components/landing/process-section"
import { FAQSection } from "@/components/landing/faq-section"
import { Footer } from "@/components/landing/footer/footer"
// import Preloader from "@/components/landing/preloader"
// import { useEffect, useState } from 'react'

export default function Home() {
  // const [showPreloader, setShowPreloader] = useState(true)
  // const [mounted, setMounted] = useState(false)

  // useEffect(() => {
  //   setMounted(true)

  //   // Check if this is the first visit
  //   const hasVisited = sessionStorage.getItem('hasVisitedHome')
  //   if (hasVisited) {
  //     setShowPreloader(false)
  //   } else {
  //     // Mark that user has visited home
  //     sessionStorage.setItem('hasVisitedHome', 'true')
  //   }

  //   return () => setMounted(false)
  // }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Render preloader with createPortal to bypass stacking contexts */}
      {/* {mounted && showPreloader && Preloader && typeof document !== 'undefined' &&
        createPortal(<Preloader />, document.body)
      } */}

      <Hero />
      <WhyChooseUs />
      <ProcessSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
