"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import Image from "next/image"
import { CUSISINES } from "@/config/booking-details/cuisine"

interface CuisineProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function Cuisine({ formData, updateFormData }: CuisineProps) {
  const [selected, setSelected] = useState<string[]>(formData.cuisine || [])
  const [selectedVariants, setSelectedVariants] = useState<string[]>(formData.cuisineVariants || [])

  const handleToggle = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value]

    // Filter out variants that belong to cuisines that are no longer selected
    const newVariants = selectedVariants.filter(variant => {
      const parentCuisine = CUSISINES.find(c =>
        c.variants.includes(variant) && newSelected.includes(c.id)
      )
      return !!parentCuisine
    })

    setSelected(newSelected)
    setSelectedVariants(newVariants)
    updateFormData("cuisine", newSelected)
    updateFormData("cuisineVariants", newVariants)
  }

  const handleVariantChange = (variant: string) => {
    const newVariants = selectedVariants.includes(variant)
      ? selectedVariants.filter(v => v !== variant)
      : [...selectedVariants, variant]

    setSelectedVariants(newVariants)
    updateFormData("cuisineVariants", newVariants)
  }

  // Get all variants for the selected cuisines
  const availableVariants = CUSISINES
    .filter(c => selected.includes(c.id))
    .flatMap(c => c.variants)

  return (
    <div className="space-y-8">
      <p className="text-lg text-center text-muted-foreground">
        Select your preferred cuisine styles
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CUSISINES.map((cuisine) => (
          <Card
            key={cuisine.id}
            className={`relative overflow-hidden transition-all ${selected.includes(cuisine.id) ? "ring-2 ring-primary" : ""}`}
          >
            <Image width={400} height={250}
              src={cuisine.image}
              alt={cuisine.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={cuisine.id}
                  checked={selected.includes(cuisine.id)}
                  onCheckedChange={() => handleToggle(cuisine.id)}
                />
                <Label htmlFor={cuisine.id} className="font-semibold">
                  {cuisine.title}
                </Label>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {cuisine.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {availableVariants.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Select Specific Varieties</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {availableVariants.map((variant) => (
              <div key={variant} className="flex items-center space-x-2">
                <Checkbox
                  id={variant}
                  checked={selectedVariants.includes(variant)}
                  onCheckedChange={() => handleVariantChange(variant)}
                />
                <Label htmlFor={variant}>{variant}</Label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Label htmlFor="dietary-requirements">Dietary Requirements & Preferences</Label>
        <Textarea
          id="dietary-requirements"
          placeholder="Please list any dietary requirements or preferences..."
          className="mt-2"
          value={formData.dietaryRequirements || ""}
          onChange={(e) => updateFormData("dietaryRequirements", e.target.value)}
        />
      </div>
    </div>
  )
}
