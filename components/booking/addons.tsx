"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import { ADDON } from "@/config/booking-details/add-on"

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
        {ADDON.map((addon) => (
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
