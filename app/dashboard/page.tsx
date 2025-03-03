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
import { Calendar, Check, Clock, Edit2, Loader2, RefreshCw, X } from "lucide-react"
import { authClient } from "@/auth-client"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

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
      const response = await fetch("/api/bookings/user")

      if (!response.ok) {
        if (response.status === 404) {
          // No booking found
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
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "confirmed": return "bg-green-100 text-green-800"
      case "completed": return "bg-blue-100 text-blue-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="container max-w-6xl mx-auto py-10 px-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>No Booking Found</CardTitle>
            <CardDescription>You haven't made a wedding booking yet</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-10">
            <p className="text-muted-foreground mb-6">
              Start planning your dream wedding by creating a booking
            </p>
            <Button onClick={() => router.push("/book")}>
              Create Your Wedding Booking
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Parse the formData string to object if it's not already
  const formData = typeof booking.formData === 'string'
    ? JSON.parse(booking.formData)
    : booking.formData

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Wedding Booking</h1>
          <p className="text-muted-foreground">
            View and manage your wedding booking details
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchBookingData}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>
                Created on {format(new Date(booking.createdAt), "MMMM d, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Wedding Type</h3>
                  <p className="capitalize">{formData.weddingType}</p>
                  {formData.customDetails && (
                    <p className="text-sm text-muted-foreground mt-1">{formData.customDetails}</p>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-2">Location & Venue</h3>
                  <p className="capitalize">{formData.location}</p>
                  <p className="text-sm text-muted-foreground capitalize">{formData.venue}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Cuisine</h3>
                <p className="capitalize">{formData.cuisine}</p>
                {formData.cuisineVariants && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.cuisineVariants.map((variant: string) => (
                      <span
                        key={variant}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {variant}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Theme</h3>
                <p className="capitalize">{formData.theme}</p>
                {formData.customThemeName && (
                  <div className="mt-2">
                    <p className="text-sm">{formData.customThemeName}</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.customThemeDescription}
                    </p>
                    <p className="text-sm">Colors: {formData.customThemeColors}</p>
                  </div>
                )}
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Entertainment</h3>
                  {formData.entertainment?.length > 0 ? (
                    <div className="space-y-1">
                      {formData.entertainment.map((item: string) => (
                        <div key={item} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="capitalize">{item.replace(/-/g, " ")}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No entertainment selected</p>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-2">Add-ons</h3>
                  {formData.addons?.length > 0 ? (
                    <div className="space-y-1">
                      {formData.addons.map((item: string) => (
                        <div key={item} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="capitalize">
                            {item.replace(/-/g, " ")}
                            {formData.addonQuantities?.[item] > 1 &&
                              ` (${formData.addonQuantities[item]} units)`
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No add-ons selected</p>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Pre-Wedding Services</h4>
                    {formData.services?.preWedding?.length > 0 ? (
                      <div className="space-y-1">
                        {formData.services.preWedding.map((item: string) => (
                          <div key={item} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="capitalize">{item.replace(/-/g, " ")}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">None selected</p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Post-Wedding Services</h4>
                    {formData.services?.postWedding?.length > 0 ? (
                      <div className="space-y-1">
                        {formData.services.postWedding.map((item: string) => (
                          <div key={item} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="capitalize">{item.replace(/-/g, " ")}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">None selected</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => router.push("/book")}
                className="flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" /> Edit Booking
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Details</CardTitle>
              <CardDescription>
                Status and meeting information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Booking Status</h3>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(booking.status)} capitalize`}
                >
                  {booking.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Consultation</h3>
                {booking.consultDate ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{format(new Date(booking.consultDate), "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{format(new Date(booking.consultDate), "h:mm a")}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No consultation scheduled yet</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Total Investment</h3>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(parseFloat(booking.formData.totalAmount || "0"))}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
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

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Have questions about your booking or consultation? Our wedding specialists are here to help.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/contact")}
              >
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}