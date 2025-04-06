"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import Image from "next/image"
import { WEDDINGTYPE } from "@/config/booking-details/wedding"


interface WeddingTypeProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function WeddingType({ formData, updateFormData }: WeddingTypeProps) {
  const [showCustomInput, setShowCustomInput] = useState(formData.weddingType === "customized")

  const handleTypeChange = (value: string) => {
    updateFormData("weddingType", value)
    setShowCustomInput(value === "customized")
  }

  return (
    <div className="space-y-8">
      <p className="text-lg text-center text-muted-foreground">
        Choose the type of wedding that best reflects your vision
      </p>

      <RadioGroup
        value={formData.weddingType}
        onValueChange={handleTypeChange}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {WEDDINGTYPE.map((type) => (
          <Label
            key={type.id}
            className="cursor-pointer"
            htmlFor={type.id}
          >
            <Card className={`relative overflow-hidden transition-all ${formData.weddingType === type.id ? "ring-2 ring-primary" : ""
              }`}>
              <Image width={400} height={250}
                src={type.image}
                alt={type.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={type.id} id={type.id} />
                  <span className="font-semibold">{type.title}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {type.description}
                </p>
              </div>
            </Card>
          </Label>
        ))}
      </RadioGroup>

      {showCustomInput && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Label htmlFor="custom-details">Tell us about your vision</Label>
          <Textarea
            id="custom-details"
            placeholder="Describe your dream wedding..."
            className="mt-2"
            value={formData.customDetails || ""}
            onChange={(e) => updateFormData("customDetails", e.target.value)}
          />
        </motion.div>
      )}
    </div>
  )
}
