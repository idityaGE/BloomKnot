import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <WhyChooseUs />
      <Footer />
    </main>
  )
}