import { Hero } from "@/components/hero"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Footer } from "@/components/footer/footer"
import Preloader from "@/components/preloader"

export default function Home() {

  return (
    <main className="min-h-screen bg-background">
      //TODO: Need to work on it
      {/* <Preloader /> */}

      <Hero />
      <WhyChooseUs />
      <Footer />
    </main>
  )
}