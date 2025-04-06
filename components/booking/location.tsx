"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import { LOCATIONS } from "@/config/booking-details/location"
import { DetailsDialog } from "@/components/details-dialog"

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
        {LOCATIONS.map((location) => (
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
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground capitalize">
                    {location.id} setting
                  </span>
                  <DetailsDialog details={location} />
                </div>
              </div>
            </Card>
          </Label>
        ))}
      </RadioGroup>
    </div>
  )
}
