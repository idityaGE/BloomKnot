"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Cake,
  Car,
  Flower2,
  Gift,
  GlassWater,
  PartyPopper,
} from "lucide-react"

const addons = [
  {
    id: "welcome-drinks",
    title: "Welcome Drinks",
    description: "Refreshing beverages for guests upon arrival",
    icon: GlassWater,
  },
  {
    id: "dessert-bar",
    title: "Dessert Bar",
    description: "Variety of sweets and treats",
    icon: Cake,
  },
  {
    id: "flower-wall",
    title: "Flower Wall",
    description: "Beautiful backdrop for photos",
    icon: Flower2,
  },
  {
    id: "luxury-transport",
    title: "Luxury Transport",
    description: "Premium vehicles for the wedding party",
    icon: Car,
  },
  {
    id: "favors",
    title: "Wedding Favors",
    description: "Special gifts for your guests",
    icon: Gift,
  },
  {
    id: "fireworks",
    title: "Fireworks Display",
    description: "Spectacular end to your celebration",
    icon: PartyPopper,
  },
]

interface AddonsProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function Addons({ formData, updateFormData }: AddonsProps) {
  const handleAddonToggle = (addonId: string) => {
    const currentAddons = formData.addons || []
    const updatedAddons = currentAddons.includes(addonId)
      ? currentAddons.filter((id: string) => id !== addonId)
      : [...currentAddons, addonId]

    updateFormData("addons", updatedAddons)
  }

  return (
    <div className="space-y-6">
      <p className="text-lg text-center text-muted-foreground">
        Enhance your celebration with these special additions
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addons.map((addon) => (
          <Label
            key={addon.id}
            className="cursor-pointer"
            htmlFor={addon.id}
          >
            <Card className={`p-4 transition-all ${formData.addons?.includes(addon.id) ? "ring-2 ring-primary" : ""
              }`}>
              <div className="flex items-start space-x-4">
                <addon.icon className="w-5 h-5 mt-1 text-primary" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={addon.id}
                      checked={formData.addons?.includes(addon.id)}
                      onCheckedChange={() => handleAddonToggle(addon.id)}
                    />
                    <span className="font-medium">{addon.title}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {addon.description}
                  </p>
                </div>
              </div>
            </Card>
          </Label>
        ))}
      </div>
    </div>
  )
}