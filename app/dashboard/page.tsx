"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Check,
  Clock,
  Edit2,
  Loader2,
  RefreshCw,
  Utensils,
  MapPin,
  Music,
  Gift,
  Sparkles,
  Camera,
  Heart,
  CalendarClock,
  HeartHandshake
} from "lucide-react"
import { authClient } from "@/auth-client"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Image from "next/image"

export default function BookingDashboard() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const { toast } = useToast()
  const [booking, setBooking] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRescheduling, setIsRescheduling] = useState(false)

  useEffect(() => {
    if (isPending) return

    if (!session?.user) {
      router.push("/sign-in?callbackUrl=/dashboard")
      return
    }

    fetchBookingData()
  }, [session, isPending, router])

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

  const handleReschedule = () => {
    setIsRescheduling(true)
    router.push("/schedule")
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
              <Button
                onClick={() => router.push("/book")}
                size="lg"
                className="bg-gold hover:bg-gold/90 text-white px-8"
              >
                Create Your Wedding Booking
              </Button>
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
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-white border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-gold" /> Wedding Details
                  </CardTitle>
                  <CardDescription>
                    Created on {format(new Date(booking.createdAt), "MMMM d, yyyy")}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/book")}
                  className="flex items-center gap-1 border-gold/30 hover:border-gold"
                >
                  <Edit2 className="h-3.5 w-3.5" /> Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Wedding Type & Location */}
              <div className="p-6 bg-gray-50/70">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-2">Wedding Type</h3>
                    <p className="capitalize text-lg font-medium">{formData.weddingType}</p>
                    {formData.customDetails && (
                      <p className="text-sm text-muted-foreground mt-1">&quot;{formData.customDetails}&quot;</p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-2">Location & Venue</h3>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gold/80 mr-2 mt-0.5" />
                      <div>
                        <p className="capitalize text-lg font-medium">{formData.location}</p>
                        <p className="text-sm text-muted-foreground capitalize">{formData.venue?.replace(/\d+$/, '')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Cuisine */}
              <div className="p-6">
                <div className="flex items-start">
                  <Utensils className="h-5 w-5 text-gold/80 mr-3 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-2">Cuisine</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {Array.isArray(formData.cuisine) ? formData.cuisine.map((item: string) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="capitalize text-sm py-1 px-3"
                        >
                          {item}
                        </Badge>
                      )) : (
                        <Badge
                          variant="secondary"
                          className="capitalize text-sm py-1 px-3"
                        >
                          {formData.cuisine}
                        </Badge>
                      )}
                    </div>

                    {formData.cuisineVariants && formData.cuisineVariants.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-2">Cuisine Variants:</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.cuisineVariants.map((variant: string) => (
                            <span
                              key={variant}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold/90 border border-gold/20"
                            >
                              {variant}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.dietaryRequirements && (
                      <div className="mt-3 bg-amber-50/50 border border-amber-100 rounded-lg p-3 text-sm">
                        <p className="font-medium text-amber-800">Special Requirements:</p>
                        <p className="text-amber-700">&quot;{formData.dietaryRequirements}&quot;</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Theme */}
              <div className="p-6 bg-gray-50/70">
                <div className="flex items-start">
                  <Sparkles className="h-5 w-5 text-gold/80 mr-3 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-2">Theme</h3>
                    <p className="capitalize text-lg font-medium">{formData.theme}</p>

                    {formData.customThemeName && (
                      <div className="mt-3 p-3 border border-gray-200 rounded-lg">
                        <p className="text-sm font-medium">{formData.customThemeName}</p>
                        {formData.customThemeDescription && (
                          <p className="text-sm text-muted-foreground mt-1">&quot;{formData.customThemeDescription}&quot;</p>
                        )}
                        {formData.customThemeColors && (
                          <p className="text-sm mt-1">
                            <span className="text-gray-500">Colors:</span> {formData.customThemeColors}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Entertainment & Add-ons */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start">
                    <Music className="h-5 w-5 text-gold/80 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-3">Entertainment</h3>
                      {formData.entertainment?.length > 0 ? (
                        <div className="space-y-2">
                          {Array.isArray(formData.entertainment) && formData.entertainment.map((item: string) => (
                            <div key={item} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-100">
                              <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center">
                                <Check className="h-4 w-4 text-gold" />
                              </div>
                              <span className="capitalize">{item.replace(/-/g, " ")}</span>
                            </div>
                          ))}

                          {formData.entertainmentRequests && (
                            <div className="mt-2 text-sm bg-blue-50 border border-blue-100 rounded-lg p-3">
                              <span className="font-medium text-blue-700">Special Request:</span>
                              <p className="text-blue-600">&quot;{formData.entertainmentRequests}&quot;</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-muted-foreground italic">No entertainment selected</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Gift className="h-5 w-5 text-gold/80 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-3">Add-ons</h3>
                      {formData.addons?.length > 0 ? (
                        <div className="space-y-2">
                          {formData.addons.map((item: string) => (
                            <div key={item} className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-gray-100">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center">
                                  <Check className="h-4 w-4 text-gold" />
                                </div>
                                <span className="capitalize">{item.replace(/-/g, " ")}</span>
                              </div>
                              {formData.addonQuantities?.[item] && formData.addonQuantities[item] > 1 && (
                                <Badge variant="outline" className="bg-gray-100">
                                  {formData.addonQuantities[item]} units
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground italic">No add-ons selected</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Services */}
              <div className="p-6 bg-gray-50/70">
                <div className="flex items-start">
                  <Camera className="h-5 w-5 text-gold/80 mr-3 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-3">Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <span className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center mr-2">
                            <span className="text-xs text-gold">01</span>
                          </span>
                          Pre-Wedding Services
                        </h4>
                        {formData.services?.preWedding?.length > 0 ? (
                          <div className="space-y-1.5">
                            {formData.services.preWedding.map((item: string) => (
                              <div key={item} className="flex items-center gap-2 pl-8">
                                <Check className="h-4 w-4 text-gold" />
                                <span className="capitalize">{item.replace(/-/g, " ")}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground italic pl-8">None selected</p>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <span className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center mr-2">
                            <span className="text-xs text-gold">02</span>
                          </span>
                          Post-Wedding Services
                        </h4>
                        {formData.services?.postWedding?.length > 0 ? (
                          <div className="space-y-1.5">
                            {formData.services.postWedding.map((item: string) => (
                              <div key={item} className="flex items-center gap-2 pl-8">
                                <Check className="h-4 w-4 text-gold" />
                                <span className="capitalize">{item.replace(/-/g, " ")}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground italic pl-8">None selected</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Additional Info & Actions */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Consultation Card */}
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gold/10 border-b border-gold/20 pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gold" /> Consultation
              </CardTitle>
              <CardDescription>
                Wedding planning session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-500">Status</h3>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(booking.status)} capitalize py-1.5 px-4`}
                >
                  {getStatusEmoji(booking.status)} {booking.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-500">Appointment</h3>
                {booking.consultDate ? (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <p className="font-medium">{format(new Date(booking.consultDate), "EEEE, MMMM d")}</p>
                        <p className="text-sm text-muted-foreground">{format(new Date(booking.consultDate), "yyyy")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <p className="font-medium">{format(new Date(booking.consultDate), "h:mm a")}</p>
                        <p className="text-sm text-muted-foreground">1 hour consultation</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                    <p className="text-muted-foreground mb-1">No consultation scheduled</p>
                    <p className="text-xs text-gray-500">Schedule a consultation with our wedding specialists</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-500">Investment</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-3xl font-bold mb-1 text-gold">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(parseFloat(formData.totalAmount || "0"))}
                  </p>
                  <p className="text-xs text-muted-foreground">Total wedding package</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-6">
              <Button
                className="w-full bg-gold hover:bg-gold/90 text-white"
                onClick={handleReschedule}
                disabled={isRescheduling}
              >
                {isRescheduling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirecting
                  </>
                ) : booking.consultDate ? "Reschedule Consultation" : "Schedule Consultation"}
              </Button>
            </CardFooter>
          </Card>

          {/* Help Card */}
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" /> Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <p className="text-sm text-gray-600 mb-2">
                Have questions about your wedding booking? Our specialists are here to assist you with any inquiries.
              </p>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <HeartHandshake className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Wedding Support Team</p>
                    <p className="text-xs text-muted-foreground">Available Mon-Fri, 9AM-6PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-1 pb-6">
              <Button
                variant="outline"
                className="w-full border-gray-300"
                onClick={() => router.push("/contact")}
              >
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
