"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const addons = [
  {
    id: "cake",
    title: "Wedding Cake",
    description: "Custom designed multi-tier wedding cake",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80",
    price: "From $500",
    customizable: true
  },
  {
    id: "painter",
    title: "Live Painter",
    description: "Artist capturing your special moments on canvas",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80",
    price: "From $800",
    customizable: false
  },
  {
    id: "gifts",
    title: "Return Gifts",
    description: "Curated selection of memorable gifts for guests",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80",
    price: "From $10/guest",
    customizable: true
  },
  {
    id: "invitations",
    title: "Custom Invitations",
    description: "Beautifully designed and printed invitations",
    image: "https://images.unsplash.com/photo-1544125945-59e2f786d2f3?auto=format&fit=crop&q=80",
    price: "From $5/piece",
    customizable: true
  },
  {
    id: "makeup",
    title: "Makeup Services",
    description: "Professional makeup for the wedding party",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80",
    price: "From $300/person",
    customizable: true
  },
  {
    id: "drone",
    title: "Drone Coverage",
    description: "Aerial photography and videography",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80",
    price: "From $600",
    customizable: false
  }
]

interface AddonsProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function Addons({ formData, updateFormData }: AddonsProps) {
  const [selected, setSelected] = useState<string[]>(formData.addons || [])
  const [quantities, setQuantities] = useState<Record<string, number>>(
    formData.addonQuantities || {}
  )

  const handleToggle = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value]
    
    setSelected(newSelected)
    updateFormData("addons", newSelected)

    if (!newSelected.includes(value)) {
      const newQuantities = { ...quantities }
      delete newQuantities[value]
      setQuantities(newQuantities)
      updateFormData("addonQuantities", newQuantities)
    }
  }

  const handleQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value) || 0
    const newQuantities = { ...quantities, [id]: quantity }
    setQuantities(newQuantities)
    updateFormData("addonQuantities", newQuantities)
  }

  return (
    <div className="space-y-8">
      <p className="text-lg text-center text-muted-foreground">
        Enhance your wedding with these special add-ons
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addons.map((addon) => (
          <Card
            key={addon.id}
            className={`relative overflow-hidden transition-all ${
              selected.includes(addon.id) ? "ring-2 ring-primary" : ""
            }`}
          >
            <img
              src={addon.image}
              alt={addon.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={addon.id}
                  checked={selected.includes(addon.id)}
                  onCheckedChange={() => handleToggle(addon.id)}
                />
                <Label htmlFor={addon.id} className="font-semibold">
                  {addon.title}
                </Label>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {addon.description}
              </p>
              <p className="mt-1 text-sm font-medium">
                {addon.price}
              </p>
              {addon.customizable && selected.includes(addon.id) && (
                <div className="mt-4">
                  <Label htmlFor={`${addon.id}-quantity`} className="text-sm">
                    Quantity
                  </Label>
                  <Input
                    id={`${addon.id}-quantity`}
                    type="number"
                    min="1"
                    className="mt-1"
                    value={quantities[addon.id] || ""}
                    onChange={(e) => handleQuantityChange(addon.id, e.target.value)}
                  />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}