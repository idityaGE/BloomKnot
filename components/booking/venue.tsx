"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { VENUES } from "@/config/booking-details/venue"
import { DetailsDialog } from "@/components/details-dialog"


interface VenueProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function Venue({ formData, updateFormData }: VenueProps) {
  const [filters, setFilters] = useState({
    capacity: [0, 1000],
    style: "all",
  })

  const filteredVenues = VENUES.filter((venue) => {
    const capacityMatch = venue.capacity >= filters.capacity[0] &&
      venue.capacity <= filters.capacity[1]
    const styleMatch = filters.style === "all" || venue.style === filters.style
    return capacityMatch && styleMatch
  })

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Capacity Range</Label>
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={50}
            onValueChange={(value) => {
              setFilters(f => ({ ...f, capacity: value }))
            }}
            className="mt-2"
          />
          <div className="flex justify-between mt-1 text-sm text-muted-foreground">
            <span>{filters.capacity[0]} guests</span>
            <span>{filters.capacity[1]} guests</span>
          </div>
        </div>

        <div>
          <Label>Style</Label>
          <Select
            value={filters.style}
            onValueChange={(value) => setFilters(f => ({ ...f, style: value }))}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Styles</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="garden">Garden</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Search</Label>
          <Input
            type="search"
            placeholder="Search venues..."
            className="mt-2"
          />
        </div>
      </div>

      <RadioGroup
        value={formData.venue}
        onValueChange={(value) => updateFormData("venue", value)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {filteredVenues.map((venue) => (
          <Label
            key={venue.id}
            className="cursor-pointer"
            htmlFor={venue.id}
          >
            <Card className={`relative overflow-hidden transition-all ${formData.venue === venue.id ? "ring-2 ring-primary" : ""
              }`}>
              <Image width={400} height={250}
                src={venue.image}
                alt={venue.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={venue.id} id={venue.id} />
                  <span className="font-semibold">{venue.title}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {venue.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span>Capacity: {venue.capacity}</span>
                    <span className="capitalize">Style: {venue.style}</span>
                  </div>

                  <DetailsDialog details={venue} />
                </div>
              </div>
            </Card>
          </Label>
        ))}
      </RadioGroup>
    </div>
  )
}
