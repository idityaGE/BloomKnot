"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import Image from "next/image"
import { PREWEDDINGSERVICES, POSTWEDDINGSERVIES } from "@/config/booking-details/services"


interface ServicesProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function Services({ formData, updateFormData }: ServicesProps) {
  const [preWeddingSelected, setPreWeddingSelected] = useState<string[]>(
    formData.services?.preWedding || []
  )
  const [postWeddingSelected, setPostWeddingSelected] = useState<string[]>(
    formData.services?.postWedding || []
  )

  const handlePreWeddingToggle = (value: string) => {
    const newSelected = preWeddingSelected.includes(value)
      ? preWeddingSelected.filter(item => item !== value)
      : [...preWeddingSelected, value]

    setPreWeddingSelected(newSelected)
    updateFormData("services", {
      ...formData.services,
      preWedding: newSelected
    })
  }

  const handlePostWeddingToggle = (value: string) => {
    const newSelected = postWeddingSelected.includes(value)
      ? postWeddingSelected.filter(item => item !== value)
      : [...postWeddingSelected, value]

    setPostWeddingSelected(newSelected)
    updateFormData("services", {
      ...formData.services,
      postWedding: newSelected
    })
  }

  return (
    <div className="space-y-8">
      <p className="text-lg text-center text-muted-foreground">
        Select additional services to enhance your wedding experience
      </p>

      <Tabs defaultValue="pre-wedding" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pre-wedding">Pre-Wedding</TabsTrigger>
          <TabsTrigger value="post-wedding">Post-Wedding</TabsTrigger>
        </TabsList>

        <TabsContent value="pre-wedding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {PREWEDDINGSERVICES.map((service) => (
              <Card
                key={service.id}
                className={`relative overflow-hidden transition-all ${preWeddingSelected.includes(service.id) ? "ring-2 ring-primary" : ""
                  }`}
              >
                <Image width={400} height={250}
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`pre-${service.id}`}
                      checked={preWeddingSelected.includes(service.id)}
                      onCheckedChange={() => handlePreWeddingToggle(service.id)}
                    />
                    <Label htmlFor={`pre-${service.id}`} className="font-semibold">
                      {service.title}
                    </Label>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {service.price}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="post-wedding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {POSTWEDDINGSERVIES.map((service) => (
              <Card
                key={service.id}
                className={`relative overflow-hidden transition-all ${postWeddingSelected.includes(service.id) ? "ring-2 ring-primary" : ""
                  }`}
              >
                <Image width={400} height={250}
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`post-${service.id}`}
                      checked={postWeddingSelected.includes(service.id)}
                      onCheckedChange={() => handlePostWeddingToggle(service.id)}
                    />
                    <Label htmlFor={`post-${service.id}`} className="font-semibold">
                      {service.title}
                    </Label>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {service.price}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
