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
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

const steps = [
  { id: 1, title: "Wedding Type", component: WeddingType, required: true },
  { id: 2, title: "Location", component: Location, required: true },
  { id: 3, title: "Venue", component: Venue, required: true },
  { id: 4, title: "Cuisine", component: Cuisine, required: true },
  { id: 5, title: "Theme", component: Theme, required: true },
  { id: 6, title: "Entertainment", component: Entertainment, required: false },
  { id: 7, title: "Services", component: Services, required: false },
  { id: 8, title: "Add-ons", component: Addons, required: false },
  { id: 9, title: "Summary", component: Summary, required: false },
]

export default function BookingPage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    weddingType: "",
    location: "",
    venue: "",
    cuisine: "",
    cuisineVariants: [],
    theme: "",
    entertainment: [],
    services: {
      preWedding: [],
      postWedding: [],
    },
    addons: [],
    addonQuantities: {},
  })

  const CurrentStepComponent = steps[currentStep - 1].component

  const validateCurrentStep = () => {
    const currentStepData = steps[currentStep - 1]

    if (!currentStepData.required) return true

    switch (currentStep) {
      case 1: // Wedding Type
        if (!formData.weddingType) {
          setValidationError("Please select a wedding type")
          return false
        }
        break
      case 2: // Location
        if (!formData.location) {
          setValidationError("Please select a location")
          return false
        }
        break
      case 3: // Venue
        if (!formData.venue) {
          setValidationError("Please select a venue")
          return false
        }
        break
      case 4: // Cuisine
        if (!formData.cuisine) {
          setValidationError("Please select a cuisine type")
          return false
        }
        break
      case 5: // Theme
        if (!formData.theme) {
          setValidationError("Please select a theme")
          return false
        }
        break
    }

    setValidationError(null)
    return true
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      if (validateCurrentStep()) {
        setCurrentStep(currentStep + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        toast({
          title: "Required Field",
          description: validationError,
          variant: "destructive",
        })
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setValidationError(null)
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleStepClick = (step: number) => {
    // Only allow going back to previous steps or forward if all previous steps are valid
    if (step < currentStep) {
      setValidationError(null)
      setCurrentStep(step)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (step > currentStep) {
      // Validate all steps before the target step
      let canProceed = true
      for (let i = currentStep; i < step; i++) {
        setCurrentStep(i)
        if (!validateCurrentStep()) {
          canProceed = false
          toast({
            title: `Complete ${steps[i - 1].title} First`,
            description: validationError,
            variant: "destructive",
          })
          break
        }
      }

      if (canProceed) {
        setCurrentStep(step)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear validation error when user updates the field that had an error
    if (validationError) setValidationError(null)
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
              {steps[currentStep - 1].required &&
                <span className="text-red-500 ml-1">*</span>
              }
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
            {validationError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {validationError}
                </AlertDescription>
              </Alert>
            )}

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

          {steps[currentStep - 1].required && (
            <p className="text-sm text-muted-foreground mt-4 text-center">
              <span className="text-red-500">*</span> This step is required to proceed
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
