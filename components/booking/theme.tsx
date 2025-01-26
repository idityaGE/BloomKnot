"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import Image from "next/image"

const themes = [
  {
    id: "classic",
    title: "Classic",
    description: "Timeless elegance with traditional elements",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
    colors: ["#FFFFFF", "#D4AF37", "#000000"]
  },
  {
    id: "rustic",
    title: "Rustic",
    description: "Natural and organic with a countryside charm",
    image: "https://images.unsplash.com/photo-1464699908537-0954e50791ee?auto=format&fit=crop&q=80",
    colors: ["#8B4513", "#DEB887", "#556B2F"]
  },
  {
    id: "modern",
    title: "Modern Chic",
    description: "Contemporary sophistication with clean lines",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
    colors: ["#808080", "#FFFFFF", "#000000"]
  },
  {
    id: "romantic",
    title: "Romantic",
    description: "Soft, dreamy, and filled with romance",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
    colors: ["#FFB6C1", "#FFC0CB", "#FF69B4"]
  },
  {
    id: "custom",
    title: "Custom Theme",
    description: "Create your own unique wedding theme",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
    colors: []
  }
]

interface ThemeProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function Theme({ formData, updateFormData }: ThemeProps) {
  const [showCustomInput, setShowCustomInput] = useState(formData.theme === "custom")

  const handleThemeChange = (value: string) => {
    updateFormData("theme", value)
    setShowCustomInput(value === "custom")
  }

  return (
    <div className="space-y-8">
      <p className="text-lg text-center text-muted-foreground">
        Choose your perfect wedding theme
      </p>

      <RadioGroup
        value={formData.theme}
        onValueChange={handleThemeChange}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {themes.map((theme) => (
          <Label
            key={theme.id}
            className="cursor-pointer"
            htmlFor={theme.id}
          >
            <Card className={`relative overflow-hidden transition-all ${
              formData.theme === theme.id ? "ring-2 ring-primary" : ""
            }`}>
              <Image
                src={theme.image}
                alt={theme.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={theme.id} id={theme.id} />
                  <span className="font-semibold">{theme.title}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {theme.description}
                </p>
                {theme.colors.length > 0 && (
                  <div className="mt-2 flex gap-2">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </Label>
        ))}
      </RadioGroup>

      {showCustomInput && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="theme-name">Theme Name</Label>
            <Input
              id="theme-name"
              placeholder="Enter your theme name"
              value={formData.customThemeName || ""}
              onChange={(e) => updateFormData("customThemeName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="theme-description">Theme Description</Label>
            <Textarea
              id="theme-description"
              placeholder="Describe your theme vision..."
              value={formData.customThemeDescription || ""}
              onChange={(e) => updateFormData("customThemeDescription", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="color-palette">Color Palette</Label>
            <Input
              id="color-palette"
              placeholder="e.g., Dusty Rose, Navy Blue, Gold"
              value={formData.customThemeColors || ""}
              onChange={(e) => updateFormData("customThemeColors", e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}