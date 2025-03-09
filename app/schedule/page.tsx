"use client"

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import {
  Loader2,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronRight,
  CalendarClock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Link from "next/link";

export default function SchedulePage() {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [consultationDate, setConsultationDate] = useState<Date | null>(null);
  const [calInitialized, setCalInitialized] = useState(false);

  useEffect(() => {

    setIsLoading(false);

    // Initialize Cal.com
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#d4af37",
            "cal-text": "#333333",
            "cal-border-emphasis": "#d4af37",
            "cal-border-default": "#e5e7eb",
            "cal-brand-emphasis": "#c09f32"
          },
          dark: {
            "cal-brand": "#d4af37",
            "cal-brand-emphasis": "#c09f32"
          }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });

      setCalInitialized(true);

      // Handle booking successful event
      cal("on", {
        action: "bookingSuccessful",
        callback: (e: any) => {
          const { data } = e.detail;
          const startTime = data.date;
          if (startTime) {
            handleConsultationScheduled(startTime);
          } else {
            console.error("No startTime received from Cal.com. Full data:", JSON.stringify(e?.detail?.data?.date));
            toast({
              title: "Something went wrong",
              description: "We couldn't process your booking details. Please try again or contact support.",
              variant: "destructive",
            });
          }
        },
      });
    })();
  }, []);

  // Updated handleConsultationScheduled function
  const handleConsultationScheduled = async (consultDate: string) => {
    try {
      setIsUpdating(true);

      // Log the consultDate to ensure we're getting valid data
      console.log("Scheduling consultation for:", consultDate);

      // Check if consultDate is a valid date
      if (!consultDate || isNaN(new Date(consultDate).getTime())) {
        console.error("Invalid consultation date:", consultDate);
        throw new Error("Invalid consultation date received from calendar");
      }

      const dateObj = new Date(consultDate);
      setConsultationDate(dateObj);

      const response = await fetch("/api/bookings/update-consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ consultDate }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error response:", data);
        throw new Error(data.error || "Failed to update booking with consultation date");
      }

      console.log("Successfully updated booking with consultation date:", data);

      // Instead of redirecting, show success state
      setIsSuccess(true);

      toast({
        title: "Consultation Scheduled",
        description: "Your wedding consultation has been scheduled successfully",
      });

    } catch (error) {
      console.error("Error updating consultation date:", error);
      toast({
        title: "Something went wrong",
        description: "We've scheduled your consultation, but failed to update your booking details.",
        variant: "destructive",
      });

      // Still show success UI, as the Cal booking was created
      setIsSuccess(true);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50/50 to-white">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-gold mx-auto mb-4" />
          <p className="text-muted-foreground">Loading scheduler...</p>
        </div>
      </div>
    );
  }

  // Success view after scheduling
  if (isSuccess && consultationDate) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50/50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="bg-gold/10 py-8 px-6 text-center">
              <div className="bg-white rounded-full h-16 w-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                <CheckCircle2 className="h-10 w-10 text-gold" />
              </div>
              <h1 className="text-2xl font-bold">Consultation Scheduled!</h1>
              <p className="text-muted-foreground mt-2">
                Your wedding consultation has been confirmed
              </p>
            </div>

            <CardContent className="pt-6">
              <div className="rounded-lg border border-gold/20 bg-gold/5 p-4 mb-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-sm">
                    <Calendar className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{format(consultationDate, "EEEE, MMMM d, yyyy")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-sm">
                    <Clock className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{format(consultationDate, "h:mm a")}</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">
                  We&apos;ve sent the details to your email
                </p>
                <p className="text-xs text-gray-500">
                  A wedding specialist will contact you at the scheduled time
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center pt-2 pb-6">
              <Link href="/dashboard">
                <Button
                  className="bg-gold hover:bg-gold/90 text-white px-6"
                >
                  Go to Dashboard <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => setIsSuccess(false)}
              className="text-gray-500 hover:text-gold"
            >
              Need to reschedule?
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50/50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-10"
        >
          <div className="inline-flex items-center justify-center p-2 bg-gold/10 rounded-full mb-4">
            <CalendarClock className="h-6 w-6 text-gold" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule Your Consultation</h1>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Select a date and time that works for you. Our wedding specialists will guide you through the planning process.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <Card className="border shadow-md overflow-hidden">
            <CardHeader className="pb-0 pt-4 px-4 md:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-gray-700">Consultation Calendar</CardTitle>

                <div className="flex items-center gap-1 px-3 py-1 bg-gold/10 rounded-full">
                  <div className="h-2 w-2 rounded-full bg-gold animate-pulse"></div>
                  <span className="text-xs font-medium text-gold">30 min session</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 mt-4">
              <div className="bg-white rounded-lg h-[1350px] md:h-[550px]">
                {calInitialized ? (
                  <Cal
                    namespace="30min"
                    calLink="idityage/30min"
                    style={{ width: "100%", height: "100%", overflow: "scroll" }}
                    config={{
                      layout: "month_view",
                      theme: "light",
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-gold" />
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="py-4 px-4 md:px-6 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500 flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                All times are shown in your local timezone
              </p>
            </CardFooter>
          </Card>

          {/* Overlay for updating state */}
          {isUpdating && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white shadow-lg">
                <Loader2 className="h-10 w-10 animate-spin text-gold" />
                <p className="text-lg font-medium">Confirming your consultation...</p>
                <p className="text-sm text-gray-500">Please don&apos;t close this page</p>
              </div>
            </div>
          )}
        </motion.div>

        <div className="mt-8 text-center">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="text-gray-700 border-gray-300"
            >
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
