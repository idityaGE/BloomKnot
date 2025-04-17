"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Loader2,
  RefreshCw,
  MapPin,
  CalendarClock,
  HeartHandshake
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Image from "next/image"
import WeddingDetailsCard from "@/components/dashboard/wedingdetails"
import ConsultationCard from "@/components/dashboard/consultationCard"
import HelpCard from "@/components/dashboard/helpCard"
import Link from "next/link"

export default function BookingDashboard() {
  const { toast } = useToast()
  const [booking, setBooking] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBookingData()
  }, [])

  const fetchBookingData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/bookings")

      if (!response.ok) {
        if (response.status === 404) {
          setBooking(null)
          return
        }
        throw new Error("Failed to fetch booking data")
      }

      const data = await response.json()
      console.log(JSON.parse(data.formData))
      setBooking(data)
    } catch (error) {
      console.error("Error fetching booking:", error)
      toast({
        title: "Error fetching booking details",
        description: "Please try refreshing the page",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-100 text-amber-800 border-amber-200"
      case "confirmed": return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "completed": return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case "pending": return "⏳"
      case "confirmed": return "✅"
      case "completed": return "🎉"
      case "cancelled": return "❌"
      default: return "📋"
    }
  }

  // Get the background image based on wedding location
  const getBackgroundImage = (location: string) => {
    switch (location?.toLowerCase()) {
      case "beach": return "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?auto=format&fit=crop&q=80&w=1740"
      case "garden": return "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1740"
      case "mountain": return "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1740"
      case "palace": return "https://images.unsplash.com/photo-1464288550599-43d5a73451b8?auto=format&fit=crop&q=80&w=1740"
      case "urban": return "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?auto=format&fit=crop&q=80&w=1740"
      default: return "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1740"
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-gold" />
        <p className="text-muted-foreground">Loading your wedding details...</p>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="container min-h-screen max-w-6xl mx-auto py-10 px-4 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full border-none shadow-lg">
            <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
              <Image
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1769"
                alt="Wedding planning"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <h2 className="text-xl font-semibold">Start Your Journey</h2>
                <p className="text-white/80">Create your dream wedding plan</p>
              </div>
            </div>
            <CardContent className="text-center py-12 px-6">
              <div className="mb-8 max-w-md mx-auto">
                <HeartHandshake className="h-16 w-16 text-gold/50 mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-3">No Wedding Booking Found</h3>
                <p className="text-muted-foreground">
                  Let&apos;s start planning your perfect day! Create a wedding booking to begin your journey with BloomKnot.
                </p>
              </div>
              <Link href="/book">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-white px-8"
                >
                  Create Your Wedding Booking
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Parse the formData string to object if it's not already
  const formData = typeof booking.formData === 'string'
    ? JSON.parse(booking.formData)
    : booking.formData

  // Get background image based on location
  const backgroundImage = getBackgroundImage(formData.location)

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4 pt-28 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Wedding Journey</h1>
          <p className="text-muted-foreground">
            {booking.status === "confirmed" ?
              "All set for your special day! Manage your booking details below." :
              "View and manage your wedding booking details"}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchBookingData}
          className="flex items-center gap-2 border-gold/30 hover:border-gold"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </motion.div>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative h-48 md:h-64 w-full mb-6 rounded-xl overflow-hidden shadow-lg"
      >
        <Image
          src={backgroundImage}
          alt={`${formData.location} wedding venue`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Badge className={`${getStatusColor(booking.status)} capitalize border px-3 py-1`}>
              {getStatusEmoji(booking.status)} {booking.status}
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1 capitalize">{formData.weddingType} Wedding</h2>
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="h-4 w-4" />
            <span className="capitalize">{formData.location} • {formData.venue?.replace(/\d+$/, '')}</span>
          </div>
        </div>
        {booking.consultDate && (
          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-gold" />
            <div>
              <p className="text-xs text-gray-500">Consultation</p>
              <p className="text-sm font-medium">{format(new Date(booking.consultDate), "MMMM d, h:mm a")}</p>
            </div>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Booking Details */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <WeddingDetailsCard booking={booking} formData={formData} />
        </motion.div>

        {/* Right Column - Additional Info & Actions */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Consultation Card */}
          <ConsultationCard booking={booking} formData={formData} getStatusColor={getStatusColor} getStatusEmoji={getStatusEmoji} />

          {/* Help Card */}
          <HelpCard />
        </motion.div>
      </div>
    </div>
  )
}
