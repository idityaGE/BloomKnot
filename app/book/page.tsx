"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
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
import { ArrowLeft, ArrowRight } from "lucide-react"

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
    cuisine: [],
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
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleStepClick = (step: number) => {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <main className="container mx-auto px-4 pt-24 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 space-y-6"
          >
            <h1 className="text-4xl font-bold text-center tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                {steps[currentStep - 1].title}
              </span>
            </h1>
            <p className="text-center text-muted-foreground max-w-lg mx-auto">
              Step {currentStep} of {steps.length}
            </p>
            <div className="px-4 md:px-12 pt-6">
              <Stepper
                steps={steps}
                currentStep={currentStep}
                onStepClick={handleStepClick}
              />
            </div>
          </motion.div>

          <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="min-h-[300px]"
              >
                <CurrentStepComponent
                  formData={formData}
                  updateFormData={updateFormData}
                  onEdit={handleStepClick}
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-10 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2 transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              {!(currentStep === steps.length) && (
                <Button
                  onClick={handleNext}
                  className="flex items-center gap-2 transition-all"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              {currentStep === steps.length && (
                <Button
                  className="bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 transition-all flex items-center gap-2"
                >
                  Complete Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
