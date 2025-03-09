"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, User, Mail, Calendar, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import WeddingDetailsCard from "@/components/dashboard/wedingdetails"
import ConsultationCard from "@/components/dashboard/consultationCard"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const UserDetailsPage = () => {
  const params = useParams()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [booking, setBooking] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const userId = params.userId as string

  useEffect(() => {
    const fetchUserAndBookingData = async () => {
      if (!userId) return

      setIsLoading(true)
      try {
        // Fetch user details
        const userResponse = await fetch(`/api/users/${userId}`)
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user details')
        }
        const userData = await userResponse.json()
        setUser(userData)

        // Fetch booking details for the user
        const bookingResponse = await fetch(`/api/bookings?userId=${userId}`)
        if (bookingResponse.ok) {
          const bookingData = await bookingResponse.json()
          setBooking(bookingData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast({
          title: "Error fetching data",
          description: "Could not retrieve user or booking information",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserAndBookingData()
  }, [userId, toast])

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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-gold" />
        <p className="text-muted-foreground">Loading user details...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container max-w-6xl mx-auto py-10 px-4 pt-28">
        <Link href="/admin">
          <Button variant="outline" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Admin
          </Button>
        </Link>

        <Card className="text-center py-12">
          <CardContent>
            <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">User Not Found</h2>
            <p className="text-muted-foreground mb-6">The requested user does not exist or you don&apos;t have permission to view it.</p>
            <Link href="/admin">
              <Button>Return to Admin Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Parse the formData string to object if it exists
  const formData = booking && (
    typeof booking.formData === 'string'
      ? JSON.parse(booking.formData)
      : booking.formData
  )

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4 pt-28 pb-20">
      {/* Back Button */}
      <Link href="/admin">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Admin
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Details */}
        <div className="space-y-6">
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-white border-b border-gray-100 pb-4">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-gold" /> User Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gold/10 text-gold text-xl">
                    {user.name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-xl">{user.name}</h2>
                  <p className="text-muted-foreground text-sm">
                    Member since {format(new Date(user.createdAt), "MMMM yyyy")}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-gold" />
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium flex-1 truncate">{user.email}</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-gold" />
                  <span className="text-muted-foreground">Joined:</span>
                  <span className="font-medium">
                    {format(new Date(user.createdAt), "MMM d, yyyy")}
                  </span>
                </div>

                {user.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-gold" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{user.phone}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Consultation Card */}
          {booking && (
            <ConsultationCard
              booking={booking}
              formData={formData}
              getStatusColor={getStatusColor}
              getStatusEmoji={getStatusEmoji}
            />
          )}
        </div>

        {/* Main Content - Booking Details */}
        <div className="lg:col-span-2 space-y-6">
          {booking && formData ? (
            <WeddingDetailsCard booking={booking} formData={formData} />
          ) : (
            <Card className="overflow-hidden border-none shadow-md p-10 text-center">
              <CardContent>
                <h3 className="text-xl font-medium mb-4">No Booking Found</h3>
                <p className="text-muted-foreground mb-2">
                  This user hasn&apos;t made a wedding booking yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDetailsPage
