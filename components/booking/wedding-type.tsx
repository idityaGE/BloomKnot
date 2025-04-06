"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import Image from "next/image"

const weddingTypes = [
  {
    id: "simple",
    title: "Simple",
    description: "An intimate celebration focusing on what matters most",
    image: "https://assets.minted.com/image/upload/q_auto/Minted_Onsite_Assets/2023/LP/Wedding/AffordableWeddingVenues_230221_Image11.jpg",
  },
  {
    id: "religious",
    title: "Religious",
    description: "A traditional ceremony honoring your faith and customs",
    image: "https://assets.brideandblossom.com/wp-content/uploads/2019/03/26110048/Rashna-Sean-Wedding-Ceremony-Bronx-Zoo-Dideo-Films-Photography-33.jpg",
  },
  {
    id: "luxury",
    title: "Luxury",
    description: "An extravagant celebration with all the finest details",
    image: "https://media-api.xogrp.com/images/c4f195eb-5003-4bb7-9a70-c382dc44e17b~rs_768.h-cr_0.0.1500.1125",
  },
  {
    id: "customized",
    title: "Customized",
    description: "Your unique vision brought to life, exactly as you imagine",
    image: "https://imgs.search.brave.com/dK4wtBatqDimr-1Z6DTpi-G5iYErZ0-mbgTopmPfAr0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d2VkZGluZ3Npbmhv/dXN0b24uY29tL3Vw/bG9hZHMvY2FtcGFp/Z24vR3JhbmQtQmFs/bHJvb20tLS1XZWRk/aW5nLVNldC1VcC0y/LmpwZw",
  },
]

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
        {weddingTypes.map((type) => (
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
