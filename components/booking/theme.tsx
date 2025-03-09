"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import Image from "next/image"
import { ThemeDetailsDialog } from "@/components/booking/theme-details-dialog"

const themes = [
  {
    id: "classic",
    title: "Classic Elegance",
    description: "Timeless elegance with traditional elements",
    detailedDescription: `A **Classic Elegance wedding** embodies timeless sophistication and refined taste. This theme celebrates traditional wedding elements with a touch of luxury.

**Key Elements:**
🔹 **Venue:**
* Grand ballrooms, historic hotels, or stately homes.
* Venues with architectural details like columns, chandeliers, and grand staircases.

🔹 **Color Palette:**
* Ivory, white, and champagne as base colors
* Accented with silver, gold, or black for contrast
* Subtle blush or sage green as secondary colors

🔹 **Décor:**
* Crystal chandeliers and candelabras
* White floral arrangements featuring roses, peonies, and hydrangeas
* Luxurious fabrics like silk, satin, and velvet
* Ornate gold or silver frames for table numbers and signage

This theme offers **sophisticated glamour** while remaining **eternally stylish**. Perfect for couples who appreciate tradition with a touch of luxury. ✨👰🤵`,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&q=80"
    ],
    colors: ["#FFFFFF", "#D4AF37", "#000000"]
  },
  {
    id: "rustic",
    title: "Rustic Charm",
    description: "Natural and organic with a countryside charm",
    detailedDescription: `A **Rustic Charm wedding** embraces the beauty of nature and countryside aesthetics. This theme creates a warm, inviting atmosphere with organic elements and handcrafted touches.

**Key Elements:**
🔹 **Venue:**
* Barns, vineyards, ranches, or outdoor garden settings
* Locations with natural wood features and open spaces

🔹 **Color Palette:**
* Earth tones: browns, greens, and warm neutrals
* Accents of dusty blue, sage, or terracotta
* Wood tones as a neutral base

🔹 **Décor:**
* Mason jars, wooden crates, and barrels
* Wildflower arrangements with greenery and seasonal blooms
* Burlap, lace, and twine textures
* Edison bulb lighting or fairy lights
* Wooden signage with handwritten or calligraphy text

This theme creates a **cozy, nostalgic atmosphere** that feels authentic and personal. Ideal for couples who value natural beauty and relaxed elegance. 🌿🌾`,
    image: "https://images.unsplash.com/photo-1464699908537-0954e50791ee?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1464699908537-0954e50791ee?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505944357431-27579db47222?auto=format&fit=crop&q=80"
    ],
    colors: ["#8B4513", "#DEB887", "#556B2F"]
  },
  {
    id: "modern",
    title: "Modern Chic",
    description: "Contemporary sophistication with clean lines",
    detailedDescription: `A **Modern Chic wedding** embraces contemporary design with sophisticated minimalism. This theme features clean lines, geometric elements, and a curated aesthetic.

**Key Elements:**
🔹 **Venue:**
* Urban lofts, modern art galleries, or boutique hotels
* Venues with industrial elements or sleek architecture
* Rooftop spaces with city views

🔹 **Color Palette:**
* Monochromatic schemes: white, black, gray
* Accents of metallic silver, copper, or matte black
* Single bold color as a statement (emerald, navy, or burgundy)

🔹 **Décor:**
* Geometric shapes in centerpieces and backdrops
* Lucite or acrylic elements for chairs, signage, or decor
* Sleek, architectural floral arrangements
* Minimalist tableware and glassware
* LED lighting or neon signs as art elements
* Black and white photography as decor

This theme creates a **bold, sophisticated atmosphere** that feels current and fashion-forward. Perfect for style-conscious couples who appreciate contemporary design. ⬜⬛🔷`,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548685916-46ff34868249?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580824456689-d0a82c8c7398?auto=format&fit=crop&q=80"
    ],
    colors: ["#808080", "#FFFFFF", "#000000"]
  },
  {
    id: "romantic",
    title: "Romantic Garden",
    description: "Soft, dreamy, and filled with romance",
    detailedDescription: `A **Romantic Garden wedding** creates a dreamy, poetic atmosphere filled with lush florals and soft textures. This theme celebrates the natural beauty of gardens with an enchanted twist.

**Key Elements:**
🔹 **Venue:**
* Botanical gardens, outdoor estates, or flower-filled courtyards
* Venues with pergolas, gazebos, or garden structures
* Indoor spaces that can be transformed with abundant greenery

🔹 **Color Palette:**
* Soft pastels: blush pink, lavender, powder blue
* Ivory and champagne as base colors
* Accents of dusty rose or sage green
* Gold or rose gold metallics for warmth

🔹 **Décor:**
* Abundant florals: garden roses, peonies, ranunculus, sweet peas
* Flowing fabrics and drapery
* Vintage-inspired furniture pieces
* Hanging installations of flowers or greenery
* Delicate string lights or chandeliers
* Antique or weathered elements with character

This theme creates a **soft, enchanting atmosphere** that feels like a fairytale garden. Perfect for romantic couples who love florals and dreamy settings. 🌹🌿✨`,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80"
    ],
    colors: ["#FFB6C1", "#FFC0CB", "#FF69B4"]
  },
  {
    id: "indian-regency",
    title: "Indian Regency",
    description: "Blend of 19th-century British elegance with Indian grandeur",
    detailedDescription: `A **Regency-inspired Indian wedding** blends the elegance of 19th-century British aristocracy with the grandeur of traditional Indian celebrations. This theme creates a **royal, vintage aesthetic** while maintaining the vibrancy of Indian customs.

**Key Elements:**
🔹 **Venue:**
* Heritage palaces, forts, grand ballrooms, or lush garden settings.
* Venues like Udaipur's City Palace, Jaipur's Rambagh Palace, or Goa's colonial-era mansions can reflect the regency grandeur.

🔹 **Color Palette:**
* Soft pastels like **ivory, blush pink, peach, and powder blue**, paired with **gold or antique bronze accents** for a regal touch.

This fusion theme offers the **romantic elegance of Regency-era England** while embracing the **rich traditions of an Indian wedding**, making it a **truly royal affair**. 👑✨`,
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517264584205-97702c77a6a1?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598897516650-e4dc73d8e417?auto=format&fit=crop&q=80"
    ],
    colors: ["#F5F5DC", "#FFB6C1", "#D4AF37"]
  },
  {
    id: "custom",
    title: "Custom Theme",
    description: "Create your own unique wedding theme",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80"
    ],
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
            <Card className={`relative overflow-hidden transition-all ${formData.theme === theme.id ? "ring-2 ring-primary" : ""
              }`}>
              <Image width={400} height={250}
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
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex gap-2">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {theme.id !== "custom" && <ThemeDetailsDialog theme={theme} />}
                </div>
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
