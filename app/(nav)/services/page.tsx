import Image from "next/image"
import Link from "next/link"
import { Sparkles, Heart, Calendar, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-20 pt-28 pb-28">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our Wedding <span className="text-gold">Planning</span> Services
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          From intimate gatherings to grand celebrations, we offer customized planning services to bring your wedding vision to life.
        </p>
        <div className="relative w-full h-[40vh] rounded-xl overflow-hidden my-8">
          <Image
            src="https://images.unsplash.com/photo-1738225734899-30852be7e396?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="BloomKnot Wedding Services"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Additional Services */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Venue Selection",
              icon: <Calendar className="h-6 w-6 text-gold" />,
              description: "Personalized venue recommendations based on your vision, budget, and guest count."
            },
            {
              title: "Design & Styling",
              icon: <Sparkles className="h-6 w-6 text-gold" />,
              description: "Creation of a cohesive design concept including colors, florals, lighting, and décor."
            },
            {
              title: "Vendor Management",
              icon: <Clock className="h-6 w-6 text-gold" />,
              description: "Coordination with your chosen vendors to ensure seamless execution."
            },
            {
              title: "Guest Experience",
              icon: <Heart className="h-6 w-6 text-gold" />,
              description: "Creative elements to enhance your guests' experience, from welcome bags to farewell brunches."
            },
            {
              title: "Destination Weddings",
              icon: <Star className="h-6 w-6 text-gold" />,
              description: "Specialized planning for weddings outside your home location, including travel logistics."
            },
            {
              title: "Wedding Weekend",
              icon: <Calendar className="h-6 w-6 text-gold" />,
              description: "Planning of additional events such as welcome parties, rehearsal dinners, and post-wedding brunches."
            }
          ].map((service, index) => (
            <Card key={index} className="border-gray-100">
              <CardHeader className="pb-2">
                <div className="bg-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Couples Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote: "BloomKnot transformed our vision into a reality beyond our wildest dreams. Every detail was perfect.",
              couple: "Sarah & James",
              image: "https://images.unsplash.com/photo-1541089404510-5c9a779841fc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
              quote: "Hiring BloomKnot was the best decision we made. They made our planning process stress-free and enjoyable.",
              couple: "Michael & David",
              image: "https://images.unsplash.com/photo-1621829845053-c8114fc01eb3?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          ].map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="relative h-full min-h-[200px]">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.couple}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-2 p-6 flex flex-col justify-center">
                  <div className="text-gold mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 inline-block fill-gold" />
                    ))}
                  </div>
                  <p className="italic mb-4">&quot;{testimonial.quote}&quot;</p>
                  <p className="text-sm font-medium">— {testimonial.couple}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gold/10 rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Wedding Journey?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Schedule a complimentary consultation to discuss your wedding vision and how we can help bring it to life.
        </p>
        <Link href="/contact">
          <Button size="lg" className="bg-gold hover:bg-gold/90 text-white">
            Book Your Free Consultation
          </Button>
        </Link>
      </div>
    </div>
  )
}
