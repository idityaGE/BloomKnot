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

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        userId: body.userId,
        formData: body.formData, // This will be stored as a JSON field
        status: body.status || "pending",
      },
    })

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
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

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    )
  }
}