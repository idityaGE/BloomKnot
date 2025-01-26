"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

interface StepperProps {
  steps: { id: number; title: string }[]
  currentStep: number
  onStepClick: (step: number) => void
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id

          return (
            <li key={step.id} className="relative flex-1">
              {index !== 0 && (
                <div
                  className={cn(
                    "absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 transition-colors",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                  aria-hidden="true"
                />
              )}

              <div className="relative flex items-center justify-center group">
                <button
                  onClick={() => onStepClick(step.id)}
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full transition-all",
                    isCompleted ? "bg-primary" : isCurrent ? "bg-primary" : "bg-muted",
                    "hover:ring-2 hover:ring-offset-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 text-primary-foreground" />
                  ) : (
                    <span className={cn(
                      "text-sm font-semibold",
                      isCurrent ? "text-primary-foreground" : "text-muted-foreground"
                    )}>
                      {step.id}
                    </span>
                  )}
                </button>

                <span className="absolute -bottom-8 hidden md:block">
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "text-sm font-medium whitespace-nowrap",
                      isCurrent ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </motion.span>
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}