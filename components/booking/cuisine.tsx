"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import Image from "next/image"

const cuisineTypes = [
  {
    id: "indian",
    title: "Indian",
    description: "A rich blend of traditional Indian flavors and spices",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
    variants: ["North Indian", "South Indian", "Indo-Chinese"]
  },
  {
    id: "continental",
    title: "Continental",
    description: "Elegant European and American fine dining experience",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
    variants: ["French", "Italian", "Mediterranean"]
  },
  {
    id: "asian",
    title: "Asian",
    description: "Diverse flavors from across Asia",
    image: "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?auto=format&fit=crop&q=80",
    variants: ["Chinese", "Japanese", "Thai"]
  },
  {
    id: "fusion",
    title: "Fusion",
    description: "Creative blend of multiple cuisines",
    image: "https://images.unsplash.com/photo-1539755530862-00f623c00f52?auto=format&fit=crop&q=80",
    variants: ["Modern Fusion", "Contemporary Mix"]
  }
]

interface CuisineProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function Cuisine({ formData, updateFormData }: CuisineProps) {
  const [selectedVariants, setSelectedVariants] = useState<string[]>(formData.cuisineVariants || [])

  const handleCuisineChange = (value: string) => {
    updateFormData("cuisine", value)
    setSelectedVariants([])
    updateFormData("cuisineVariants", [])
  }

  const handleVariantChange = (variant: string) => {
    const newVariants = selectedVariants.includes(variant)
      ? selectedVariants.filter(v => v !== variant)
      : [...selectedVariants, variant]

    setSelectedVariants(newVariants)
    updateFormData("cuisineVariants", newVariants)
  }

  const selectedCuisine = cuisineTypes.find(c => c.id === formData.cuisine)

  return (
    <div className="space-y-8">
      <p className="text-lg text-center text-muted-foreground">
        Select your preferred cuisine style
      </p>

      <RadioGroup
        value={formData.cuisine}
        onValueChange={handleCuisineChange}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {cuisineTypes.map((cuisine) => (
          <Label
            key={cuisine.id}
            className="cursor-pointer"
            htmlFor={cuisine.id}
          >
            <Card className={`relative overflow-hidden transition-all ${formData.cuisine === cuisine.id ? "ring-2 ring-primary" : ""
              }`}>
              <Image width={400} height={250}
                src={cuisine.image}
                alt={cuisine.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={cuisine.id} id={cuisine.id} />
                  <span className="font-semibold">{cuisine.title}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {cuisine.description}
                </p>
              </div>
            </Card>
          </Label>
        ))}
      </RadioGroup>

      {selectedCuisine && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Select Specific Varieties</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedCuisine.variants.map((variant) => (
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