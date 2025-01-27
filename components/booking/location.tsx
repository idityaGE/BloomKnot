"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

const locations = [
  {
    id: "beach",
    title: "Beach",
    description: "A romantic seaside ceremony with ocean views",
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80",
  },
  {
    id: "mountain",
    title: "Mountain/Hill",
    description: "A majestic celebration surrounded by natural beauty",
    image: "https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&q=80",
  },
  {
    id: "palace",
    title: "Palace",
    description: "An elegant affair in a historic setting",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
  },
  {
    id: "urban",
    title: "Urban",
    description: "A sophisticated city celebration",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
  },
]

interface LocationProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function Location({ formData, updateFormData }: LocationProps) {
  return (
    <div className="space-y-8">
      <p className="text-lg text-center text-muted-foreground">
        Select your perfect wedding location
      </p>

      <RadioGroup
        value={formData.location}
        onValueChange={(value) => updateFormData("location", value)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {locations.map((location) => (
          <Label
            key={location.id}
            className="cursor-pointer"
            htmlFor={location.id}
          >
            <Card className={`relative overflow-hidden transition-all ${formData.location === location.id ? "ring-2 ring-primary" : ""
              }`}>
              <Image width={400} height={250}
                src={location.image}
                alt={location.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={location.id} id={location.id} />
                  <span className="font-semibold">{location.title}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {location.description}
                </p>
              </div>
            </Card>
          </Label>
        ))}
      </RadioGroup>
    </div>
  )
}