import Image from "next/image"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-20 pt-28 pb-28">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Creating <span className="text-gold">Beautiful</span> Wedding Memories
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          At BloomKnot, we blend artistry with precision to create unforgettable wedding experiences tailored to your unique love story.
        </p>
        <div className="relative w-full h-[50vh] rounded-xl overflow-hidden my-8">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="BloomKnot Wedding Planning"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Our Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-gold" /> Our Story
          </h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2020, BloomKnot emerged from a passion for creating magical moments. Our journey began with a simple belief: every couple deserves a wedding day that perfectly reflects their unique love story.
          </p>
          <p className="text-muted-foreground mb-4">
            What started as a small team of dedicated planners has blossomed into a full-service wedding planning company, orchestrating breathtaking celebrations across the country.
          </p>
          <p className="text-muted-foreground">
            Our name &quot;BloomKnot&quot; represents the beautiful union of two lives coming together, like flowers blooming and intertwining in perfect harmony.
          </p>
        </div>
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
          <Image
            src="https://plus.unsplash.com/premium_photo-1677529496297-fd0174d65941?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="BloomKnot Team"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Our Approach Section */}
      <div className="text-center mb-24">
        <h2 className="text-3xl font-bold mb-8">Our Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/50 p-8 rounded-xl border border-gray-100 shadow-sm">
            <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-gold" />
            </div>
            <h3 className="text-xl font-medium mb-3">Personalized Planning</h3>
            <p className="text-muted-foreground">
              We believe no two weddings should be the same. We take time to understand your vision, preferences, and story to create a celebration that&apos;s uniquely yours.
            </p>
          </div>
          <div className="bg-white/50 p-8 rounded-xl border border-gray-100 shadow-sm">
            <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-gold" />
            </div>
            <h3 className="text-xl font-medium mb-3">Attention to Detail</h3>
            <p className="text-muted-foreground">
              From the grand design concepts to the tiniest embellishments, we ensure every element of your wedding is perfect and cohesive.
            </p>
          </div>
          <div className="bg-white/50 p-8 rounded-xl border border-gray-100 shadow-sm">
            <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-gold" />
            </div>
            <h3 className="text-xl font-medium mb-3">Stress-Free Experience</h3>
            <p className="text-muted-foreground">
              We handle the logistics, coordination, and problem-solving, allowing you to focus on enjoying the journey to your special day.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      {/* <div className="mb-24">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: "Emma Roberts", role: "Founder & Lead Planner", image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { name: "Michael Chen", role: "Design Director", image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { name: "Sarah Johnson", role: "Event Coordinator", image: "https://images.unsplash.com/photo-1672586658825-e653341241fc?q=80&w=2332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { name: "David Williams", role: "Vendor Relations", image: "https://images.unsplash.com/photo-1472645977521-95bbf4f0a748?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-medium mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* Call to Action */}
      <div className="text-center bg-gold/10 rounded-2xl p-12 mb-16">
        <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Dream Wedding?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Let&apos;s create a celebration that reflects your unique love story and exceeds your expectations.
        </p>
        <Link href="/dashboard">
          <Button className="bg-gold hover:bg-gold/90 text-white">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}
