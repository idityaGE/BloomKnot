"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import Image from "next/image"

const entertainmentOptions = [
  {
    id: "live-band",
    title: "Live Band",
    description: "Professional musicians performing live music",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
    price: "From $1,500"
  },
  {
    id: "dj",
    title: "Professional DJ",
    description: "Experienced DJ with premium sound system",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
    price: "From $800"
  },
  {
    id: "dancers",
    title: "Dance Performers",
    description: "Professional dancers for special performances",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
    price: "From $1,000"
  },
  {
    id: "fireworks",
    title: "Fireworks Show",
    description: "Spectacular fireworks display",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
    price: "From $2,000"
  },
  {
    id: "photo-booth",
    title: "Photo Booth",
    description: "Fun photo booth with props and instant prints",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
    price: "From $500"
  }
]

interface EntertainmentProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function Entertainment({ formData, updateFormData }: EntertainmentProps) {
  const [selected, setSelected] = useState<string[]>(formData.entertainment || [])

  const handleToggle = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value]

    setSelected(newSelected)
    updateFormData("entertainment", newSelected)
  }

  return (
    <div className="space-y-8">
      <p className="text-lg text-center text-muted-foreground">
        Select entertainment options for your special day
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entertainmentOptions.map((option) => (
          <Card
            key={option.id}
            className={`relative overflow-hidden transition-all ${selected.includes(option.id) ? "ring-2 ring-primary" : ""
              }`}
          >
            <Image width={400} height={250}
              src={option.image}
              alt={option.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selected.includes(option.id)}
                  onCheckedChange={() => handleToggle(option.id)}
                />
                <Label htmlFor={option.id} className="font-semibold">
                  {option.title}
                </Label>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {option.description}
              </p>
              <p className="mt-1 text-sm font-medium">
                {option.price}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div>
        <Label htmlFor="entertainment-requests">Special Requests</Label>
        <Textarea
          id="entertainment-requests"
          placeholder="Any specific songs, performances, or special requests..."
          value={formData.entertainmentRequests || ""}
          onChange={(e) => updateFormData("entertainmentRequests", e.target.value)}
        />
      </div>
    </div>
  )
}