"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { WeddingType } from "@/components/booking/wedding-type"
import { Location } from "@/components/booking/location"
import { Venue } from "@/components/booking/venue"
import { Cuisine } from "@/components/booking/cuisine"
import { Theme } from "@/components/booking/theme"
import { Entertainment } from "@/components/booking/entertainment"
import { Services } from "@/components/booking/services"
import { Addons } from "@/components/booking/addons"
import { Summary } from "@/components/booking/summary"
import { Stepper } from "@/components/booking/stepper"


const steps = [
  { id: 1, title: "Wedding Type", component: WeddingType },
  { id: 2, title: "Location", component: Location },
  { id: 3, title: "Venue", component: Venue },
  { id: 4, title: "Cuisine", component: Cuisine },
  { id: 5, title: "Theme", component: Theme },
  { id: 6, title: "Entertainment", component: Entertainment },
  { id: 7, title: "Services", component: Services },
  { id: 8, title: "Add-ons", component: Addons },
  { id: 9, title: "Summary", component: Summary },
]

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    weddingType: "",
    location: "",
    venue: "",
    cuisine: "",
    theme: "",
    entertainment: [],
    services: {
      preWedding: [],
      postWedding: [],
    },
    addons: [],
  })

  const CurrentStepComponent = steps[currentStep - 1].component

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleStepClick = (step: number) => {
    setCurrentStep(step)
    window.scrollTo(0, 0)
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-3xl font-bold text-center mb-12">
              {steps[currentStep - 1].title}
            </h1>
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent
                formData={formData}
                updateFormData={updateFormData}
                onEdit={handleStepClick}
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            {!(currentStep === steps.length) && <Button
              onClick={handleNext}
            >
              Next
            </Button>}
          </div>
        </div>
      </main>
    </div>
  )
}