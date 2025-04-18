import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a booking" },
        { status: 401 }
      )
    }

    const body = await req.json()

    if (!body.formData || !body.userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (body.userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json(
        { error: "You can only create bookings for your own account" },
        { status: 403 }
      )
    }

    const existingBooking = await prisma.booking.findUnique({
      where: {
        userId: body.userId
      }
    });

    let booking;

    if (existingBooking) {
      booking = await prisma.booking.update({
        where: {
          userId: body.userId
        },
        data: {
          formData: body.formData,
          status: body.status || "pending",
          totalAmount: body.totalAmount || "0"
        },
      });
      console.log("Updated existing booking:", booking.id);
    } else {
      booking = await prisma.booking.create({
        data: {
          userId: body.userId,
          formData: body.formData,
          status: body.status || "pending",
          totalAmount: body.totalAmount || "0"
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
      headers: await headers()
    })

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to view bookings" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")


    const isAdmin = session.user.role === "admin"


    if (userId && !isAdmin) {
      return NextResponse.json(
        { error: "You can only view your own bookings" },
        { status: 403 }
      )
    }


    let whereClause = {}

    if (userId && isAdmin) {

      whereClause = { userId }
    } else {

      whereClause = { userId: session.user.id }
    }

    const booking = await prisma.booking.findFirst({
      where: whereClause,
    })

    if (!booking) {
      return NextResponse.json(
        { error: "No booking found" },
        { status: 404 }
      )
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    )
  }
}
