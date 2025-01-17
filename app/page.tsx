
import { Hero } from "@/components/hero"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Footer } from "@/components/footer"

export default function Home() {

  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <WhyChooseUs />
      <Footer />
    </main>
  )
}