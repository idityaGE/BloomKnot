"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Check, Edit2 } from "lucide-react"

interface SummaryProps {
  formData: any
  updateFormData: (field: string, value: any) => void
  onEdit: (step: number) => void
}

export function Summary({ formData, onEdit }: SummaryProps) {
  // const formatPrice = (price: string) => {
  //   return price.replace("From ", "")
  // }

  const calculateTotal = () => {
    let total = 0
    // Add base price based on wedding type
    total += formData.weddingType === "luxury" ? 25000 : 15000

    // Add entertainment costs
    if (formData.entertainment) {
      formData.entertainment.forEach((item: string) => {
        switch (item) {
          case "live-band": total += 1500; break;
          case "dj": total += 800; break;
          case "dancers": total += 1000; break;
          case "fireworks": total += 2000; break;
          case "photo-booth": total += 500; break;
        }
      })
    }

    // Add service costs
    if (formData.services?.preWedding) {
      formData.services.preWedding.forEach((item: string) => {
        switch (item) {
          case "photography": total += 800; break;
          case "videography": total += 1200; break;
          case "bachelor-party": total += 1500; break;
        }
      })
    }

    if (formData.services?.postWedding) {
      formData.services.postWedding.forEach((item: string) => {
        switch (item) {
          case "farewell-brunch": total += 500; break;
          case "honeymoon": total += 2500; break;
          case "thank-you": total += 200; break;
        }
      })
    }

    // Add addon costs
    if (formData.addons) {
      formData.addons.forEach((item: string) => {
        const quantity = formData.addonQuantities?.[item] || 1
        switch (item) {
          case "cake": total += 500 * quantity; break;
          case "painter": total += 800; break;
          case "gifts": total += 10 * quantity; break;
          case "invitations": total += 5 * quantity; break;
          case "makeup": total += 300 * quantity; break;
          case "drone": total += 600; break;
        }
      })
    }

    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  }

  return (
    <div className="space-y-8">
      <p className="text-lg text-center text-muted-foreground">
        Review your wedding selections
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <SummarySection
              title="Wedding Type"
              onEdit={() => onEdit(1)}
              content={
                <div className="space-y-2">
                  <p className="font-medium capitalize">{formData.weddingType}</p>
                  {formData.customDetails && (
                    <p className="text-sm text-muted-foreground">{formData.customDetails}</p>
                  )}
                </div>
              }
            />

            <SummarySection
              title="Location & Venue"
              onEdit={() => onEdit(2)}
              content={
                <div className="space-y-2">
                  <p className="font-medium capitalize">{formData.location}</p>
                  <p className="text-sm text-muted-foreground capitalize">{formData.venue}</p>
                </div>
              }
            />

            <SummarySection
              title="Cuisine"
              onEdit={() => onEdit(4)}
              content={
                <div className="space-y-2">
                  <p className="font-medium capitalize">{formData.cuisine}</p>
                  {formData.cuisineVariants && (
                    <div className="flex flex-wrap gap-2">
                      {formData.cuisineVariants.map((variant: string) => (
                        <span
                          key={variant}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                        >
                          {variant}
                        </span>
                      ))}
                    </div>
                  )}
                  {formData.dietaryRequirements && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {formData.dietaryRequirements}
                    </p>
                  )}
                </div>
              }
            />

            <SummarySection
              title="Theme"
              onEdit={() => onEdit(5)}
              content={
                <div className="space-y-2">
                  <p className="font-medium capitalize">{formData.theme}</p>
                  {formData.customThemeName && (
                    <>
                      <p className="text-sm">{formData.customThemeName}</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.customThemeDescription}
                      </p>
                      <p className="text-sm">Colors: {formData.customThemeColors}</p>
                    </>
                  )}
                </div>
              }
            />

            <SummarySection
              title="Entertainment"
              onEdit={() => onEdit(6)}
              content={
                <div className="space-y-2">
                  {formData.entertainment?.map((item: string) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="capitalize">{item.replace(/-/g, " ")}</span>
                    </div>
                  ))}
                  {formData.entertainmentRequests && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {formData.entertainmentRequests}
                    </p>
                  )}
                </div>
              }
            />

            <SummarySection
              title="Services"
              onEdit={() => onEdit(7)}
              content={
                <div className="space-y-4">
                  {formData.services?.preWedding?.length > 0 && (
                    <div>
                      <p className="font-medium mb-2">Pre-Wedding Services</p>
                      {formData.services.preWedding.map((item: string) => (
                        <div key={item} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="capitalize">{item.replace(/-/g, " ")}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {formData.services?.postWedding?.length > 0 && (
                    <div>
                      <p className="font-medium mb-2">Post-Wedding Services</p>
                      {formData.services.postWedding.map((item: string) => (
                        <div key={item} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="capitalize">{item.replace(/-/g, " ")}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              }
            />

            <SummarySection
              title="Add-ons"
              onEdit={() => onEdit(8)}
              content={
                <div className="space-y-2">
                  {formData.addons?.map((item: string) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="capitalize">
                        {item.replace(/-/g, " ")}
                        {formData.addonQuantities?.[item] > 1 &&
                          ` (${formData.addonQuantities[item]} units)`
                        }
                      </span>
                    </div>
                  ))}
                </div>
              }
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Total Investment</CardTitle>
              <CardDescription>
                Estimated cost for your dream wedding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{calculateTotal()}</div>
              <p className="text-sm text-muted-foreground mt-2">
                * Final price may vary based on specific requirements and customizations
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full">Proceed to Book</Button>
              <Button variant="outline" className="w-full">
                Schedule Consultation
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function SummarySection({
  title,
  content,
  onEdit
}: {
  title: string
  content: React.ReactNode
  onEdit: () => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-8 px-2 text-muted-foreground hover:text-foreground"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>
      {content}
      <Separator className="mt-4" />
    </div>
  )
}