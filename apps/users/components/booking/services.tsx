"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Camera, Music, Palette, Sparkles, Utensils } from "lucide-react"

const preWeddingServices = [
  {
    id: "engagement-shoot",
    title: "Engagement Photoshoot",
    description: "Professional photography session to capture your engagement",
    icon: Camera,
  },
  {
    id: "wedding-planning",
    title: "Wedding Planning",
    description: "Full-service planning and coordination",
    icon: Sparkles,
  },
  {
    id: "rehearsal-dinner",
    title: "Rehearsal Dinner",
    description: "Organized dinner for wedding party and close family",
    icon: Utensils,
  },
]

const postWeddingServices = [
  {
    id: "photo-album",
    title: "Photo Album Design",
    description: "Custom-designed wedding photo album",
    icon: Palette,
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description: "Professional editing of wedding footage",
    icon: Camera,
  },
  {
    id: "thank-you-cards",
    title: "Thank You Cards",
    description: "Personalized cards for your guests",
    icon: Music,
  },
]

interface ServicesProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function Services({ formData, updateFormData }: ServicesProps) {
  const handleServiceToggle = (category: "preWedding" | "postWedding", serviceId: string) => {
    const currentServices = formData.services[category] || []
    const updatedServices = currentServices.includes(serviceId)
      ? currentServices.filter((id: string) => id !== serviceId)
      : [...currentServices, serviceId]

    updateFormData("services", {
      ...formData.services,
      [category]: updatedServices,
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Pre-Wedding Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preWeddingServices.map((service) => (
            <Label
              key={service.id}
              className="cursor-pointer"
              htmlFor={service.id}
            >
              <Card className={`p-4 transition-all ${formData.services.preWedding?.includes(service.id)
                  ? "ring-2 ring-primary"
                  : ""
                }`}>
                <div className="flex items-start space-x-4">
                  <service.icon className="w-5 h-5 mt-1 text-primary" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={service.id}
                        checked={formData.services.preWedding?.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle("preWedding", service.id)}
                      />
                      <span className="font-medium">{service.title}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Post-Wedding Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {postWeddingServices.map((service) => (
            <Label
              key={service.id}
              className="cursor-pointer"
              htmlFor={service.id}
            >
              <Card className={`p-4 transition-all ${formData.services.postWedding?.includes(service.id)
                  ? "ring-2 ring-primary"
                  : ""
                }`}>
                <div className="flex items-start space-x-4">
                  <service.icon className="w-5 h-5 mt-1 text-primary" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={service.id}
                        checked={formData.services.postWedding?.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle("postWedding", service.id)}
                      />
                      <span className="font-medium">{service.title}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Label>
          ))}
        </div>
      </div>
    </div>
  )
}