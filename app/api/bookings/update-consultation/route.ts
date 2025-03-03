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

    const booking = await prisma.booking.findUnique({
      where: { userId: user.id },
    })

    if (!booking) {
      return NextResponse.json(
        { error: "No booking found" },
        { status: 404 }
      )
    }

    // Update booking with consultation date
    const updatedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        consultDate: new Date(consultDate),
        status: booking.status === 'pending' ? 'pending' : booking.status
      },
    })

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error("Error updating consultation date:", error)
    return NextResponse.json(
      { error: "Failed to update consultation date" },
      { status: 500 }
    )
  }
}