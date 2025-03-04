// app/api/bookings/update-consultation/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
    })

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { user } = session

    const body = await request.json()
    const { consultDate } = body

    if (!consultDate) {
      return NextResponse.json(
        { error: "Consultation date is required" },
        { status: 400 }
      )
    }

    // Check if booking exists for this user
    const booking = await prisma.booking.findUnique({
      where: { userId: user.id },
    })

    if (!booking) {
      console.error("No booking found for user:", user.id);
      return NextResponse.json(
        { error: "No booking found" },
        { status: 404 }
      )
    }

    // Format the date properly to ensure it's valid
    const formattedDate = new Date(consultDate);

    if (isNaN(formattedDate.getTime())) {
      console.error("Invalid date format:", consultDate);
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      )
    }

    // Update booking with consultation date
    const updatedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        consultDate: formattedDate,
        // Only change status if it's pending
        status: booking.status === 'pending' ? 'confirmed' : booking.status
      },
    });

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error("Error updating consultation date:", error)
    return NextResponse.json(
      { error: "Failed to update consultation date", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}