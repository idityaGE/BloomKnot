"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"

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
    image: "https://assets.vogue.in/photos/669e3910f9d5efc57dd02edf/3:4/w_2560%2Cc_limit/Noor%25204.jpeg",
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
    image: "https://cdn.dribbble.com/userupload/14032486/file/original-67da3783d61880383a5e080c342e6ce6.png?resize=752x&vertical=center",
    price: "From $5/piece",
    customizable: true
  },
  {
    id: "makeup",
    title: "Makeup Services",
    description: "Professional makeup for the wedding party",
    image: "https://www.mbmmakeupstudio.com/wp-content/uploads/2020/11/makeup-artist-for-engagement-in-Pitampura.jpg",
    price: "From $300/person",
    customizable: true
  },
  {
    id: "drone",
    title: "Drone Coverage",
    description: "Aerial photography and videography",
    image: "https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/11/30/Photos/Processed/wedding_photographs_drone-kLMC--621x414@LiveMint.jpg",
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
            className={`relative overflow-hidden transition-all ${selected.includes(addon.id) ? "ring-2 ring-primary" : ""
              }`}
          >
            <Image width={400} height={250}
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
