"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cal, { getCalApi } from "@calcom/embed-react";
import { authClient } from "@/auth-client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SchedulePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.push("/sign-in?callbackUrl=/schedule");
      return;
    }

    setIsLoading(false);

    // Initialize Cal.com
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#000000" },
          dark: { "cal-brand": "#ffffff" }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });

      // Handle booking successful event
      cal("on", {
        action: "bookingSuccessful",
        callback: (e: any) => {
          // Get the booking details from the event
          const startTime = e?.detail?.data?.startTime;
          if (startTime) {
            handleConsultationScheduled(startTime);
          } else {
            // Redirect even if we don't have the date
            toast({
              title: "Consultation Scheduled",
              description: "Your consultation has been scheduled successfully",
            });
            router.push("/dashboard");
          }
        },
      });
    })();
  }, [session, isPending, router]);

  const handleConsultationScheduled = async (consultDate: string) => {
    try {
      setIsUpdating(true);
      

      const response = await fetch("/api/bookings/update-consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ consultDate }),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking with consultation date");
      }

      toast({
        title: "Consultation Scheduled",
        description: "Your consultation has been scheduled successfully",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating consultation date:", error);
      toast({
        title: "Something went wrong",
        description: "We've scheduled your consultation, but failed to update your booking details.",
        variant: "destructive",
      });

      // Still redirect to dashboard
      router.push("/dashboard");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-full pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Schedule Your Consultation</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Select a date and time for your wedding consultation
          </p>
        </div>

        <div className="bg-white dark:bg-black rounded-lg shadow-sm border p-1 h-[600px]">
          <Cal
            namespace="30min"
            calLink="idityage/30min"
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
            config={{ layout: "month_view", theme: "light" }}
          />
        </div>

        {isUpdating && (
          <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Updating your booking...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}