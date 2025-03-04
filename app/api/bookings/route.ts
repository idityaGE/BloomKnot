// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { prisma } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
    })

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a booking" },
        { status: 401 }
      )
    }

    const body = await req.json()

    // Validate required fields
    if (!body.formData || !body.userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Ensure the user can only create bookings for themselves
    if (body.userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json(
        { error: "You can only create bookings for your own account" },
        { status: 403 }
      )
    }

    // Check if booking already exists for this user
    const existingBooking = await prisma.booking.findUnique({
      where: {
        userId: body.userId
      }
    });

    let booking;

    if (existingBooking) {
      // Update existing booking
      booking = await prisma.booking.update({
        where: {
          userId: body.userId
        },
        data: {
          formData: body.formData, // This will be stored as a JSON field
          status: body.status || "pending",
        },
      });
      console.log("Updated existing booking:", booking.id);
    } else {
      // Create new booking
      booking = await prisma.booking.create({
        data: {
          userId: body.userId,
          formData: body.formData, // This will be stored as a JSON field
          status: body.status || "pending",
        },
      });
      console.log("Created new booking:", booking.id);
    }

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("Error creating/updating booking:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
    })

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to view bookings" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    // Ensure users can only view their own bookings (unless admin)
    if (userId && userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json(
        { error: "You can only view your own bookings" },
        { status: 403 }
      )
    }

    const whereClause = userId ? { userId } : session.user.role === "admin" ? {} : { userId: session.user.id }

    const booking = await prisma.booking.findFirst({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    })

    if (!booking) {
      return NextResponse.json(
        { error: "No booking found" },
        { status: 404 }
      )
    }

    // Return the booking directly, not wrapped in a bookings object
    return NextResponse.json(booking)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    )
  }
}