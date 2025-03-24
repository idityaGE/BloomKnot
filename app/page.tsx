
import { Hero } from "@/components/landing/hero"
import { WhyChooseUs } from "@/components/landing/why-choose-us"
import { ProcessSection } from "@/components/landing/process-section"
import { FAQSection } from "@/components/landing/faq-section"
import { Footer } from "@/components/landing/footer/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <WhyChooseUs />
      <ProcessSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
