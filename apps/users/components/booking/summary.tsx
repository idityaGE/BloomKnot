"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  MapPin,
  Music,
  Palette,
  BellRing,
  Sparkles,
  Utensils,
} from "lucide-react"

interface SummaryProps {
  formData: any
}

const weddingTypeDetails: Record<string, { title: string; icon: any }> = {
  simple: { title: "Simple Wedding", icon: BellRing },
  religious: { title: "Religious Wedding", icon: Sparkles },
  luxury: { title: "Luxury Wedding", icon: Sparkles },
  customized: { title: "Custom Wedding", icon: Palette },
}

export function Summary({ formData }: SummaryProps) {
  const weddingType = weddingTypeDetails[formData.weddingType]

  const getSelectedItems = (array: string[] | undefined) => {
    return array?.length ? array.join(", ") : "None selected"
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {weddingType && <weddingType.icon className="w-5 h-5 text-primary" />}
              <h3 className="text-lg font-semibold">
                {weddingType?.title || "Wedding Type"}
              </h3>
            </div>
            {formData.customDetails && (
              <p className="text-muted-foreground">{formData.customDetails}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Location & Venue</h3>
            </div>
            <p className="text-muted-foreground">
              {formData.location || "Location not selected"} -{" "}
              {formData.venue || "Venue not selected"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Utensils className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Cuisine</h3>
            </div>
            <p className="text-muted-foreground">
              {formData.cuisine || "Cuisine not selected"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Palette className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Theme</h3>
            </div>
            <p className="text-muted-foreground">
              {formData.theme || "Theme not selected"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Music className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Entertainment</h3>
            </div>
            <p className="text-muted-foreground">
              {getSelectedItems(formData.entertainment)}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Services</h3>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Pre-Wedding:</span>{" "}
                {getSelectedItems(formData.services.preWedding)}
              </p>
              <p>
                <span className="font-medium">Post-Wedding:</span>{" "}
                {getSelectedItems(formData.services.postWedding)}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Add-ons</h3>
            </div>
            <p className="text-muted-foreground">
              {getSelectedItems(formData.addons)}
            </p>
          </div>

          <Button className="w-full mt-6">Submit Booking Request</Button>
        </Card>
      </motion.div>
    </div>
  )
}