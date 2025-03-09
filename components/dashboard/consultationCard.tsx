"use client"

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
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
} from "lucide-react"
import Link from "next/link"

interface ConsultationCardProps {
  booking: any
  formData: any
  getStatusColor: (status: string) => string
  getStatusEmoji: (status: string) => string
}

const ConsultationCard = ({
  booking,
  formData,
  getStatusColor,
  getStatusEmoji,
}: ConsultationCardProps) => {
  return (
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
        <Link href="/schedule">
          <Button
            variant="outline"
            className="w-full bg-gold hover:bg-gold/90 text-white"
          >
            Reschedule Consultation
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ConsultationCard
