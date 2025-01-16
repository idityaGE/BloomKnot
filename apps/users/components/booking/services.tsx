"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

const preWeddingServices = [
  {
    id: "photography",
    title: "Pre-Wedding Photography",
    description: "Professional photoshoot at scenic locations",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80",
    price: "From $800"
  },
  {
    id: "videography",
    title: "Pre-Wedding Video",
    description: "Cinematic video shoot telling your love story",
    image: "https://images.unsplash.com/photo-1517273666229-35e76c06b18d?auto=format&fit=crop&q=80",
    price: "From $1,200"
  },
  {
    id: "bachelor-party",
    title: "Bachelor/Bachelorette Party",
    description: "Memorable celebration with friends",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
    price: "From $1,500"
  }
]

const postWeddingServices = [
  {
    id: "farewell-brunch",
    title: "Farewell Brunch",
    description: "Elegant brunch to bid farewell to guests",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
    price: "From $500"
  },
  {
    id: "honeymoon",
    title: "Honeymoon Package",
    description: "Curated romantic getaway packages",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80",
    price: "From $2,500"
  },
  {
    id: "thank-you",
    title: "Thank You Cards",
    description: "Custom designed thank you cards",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?auto=format&fit=crop&q=80",
    price: "From $200"
  }
]

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
            {preWeddingServices.map((service) => (
              <Card
                key={service.id}
                className={`relative overflow-hidden transition-all ${preWeddingSelected.includes(service.id) ? "ring-2 ring-primary" : ""
                  }`}
              >
                <img
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
            {postWeddingServices.map((service) => (
              <Card
                key={service.id}
                className={`relative overflow-hidden transition-all ${postWeddingSelected.includes(service.id) ? "ring-2 ring-primary" : ""
                  }`}
              >
                <img
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