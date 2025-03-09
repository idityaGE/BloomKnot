"use client"

import { format } from "date-fns"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Check,
  Edit2,
  MapPin,
  Music,
  Gift,
  Sparkles,
  Camera,
  Utensils
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface WeddingDetailsCardProps {
  booking: any
  formData: any
}

const WeddingDetailsCard = ({ booking, formData }: WeddingDetailsCardProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardHeader className="bg-white border-b border-gray-100 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold" /> Wedding Details
            </CardTitle>
            <CardDescription>
              Created on {format(new Date(booking.createdAt), "MMMM d, yyyy")}
            </CardDescription>
          </div>
          <Link href="/book">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 border-gold/30 hover:border-gold"
            >
              <Edit2 className="h-3.5 w-3.5" /> Edit
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Wedding Type & Location */}
        <div className="p-6 bg-gray-50/70">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-2">Wedding Type</h3>
              <p className="capitalize text-lg font-medium">{formData.weddingType}</p>
              {formData.customDetails && (
                <p className="text-sm text-muted-foreground mt-1">&quot;{formData.customDetails}&quot;</p>
              )}
            </div>

            <div>
              <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-2">Location & Venue</h3>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gold/80 mr-2 mt-0.5" />
                <div>
                  <p className="capitalize text-lg font-medium">{formData.location}</p>
                  <p className="text-sm text-muted-foreground capitalize">{formData.venue?.replace(/\d+$/, '')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Cuisine */}
        <div className="p-6">
          <div className="flex items-start">
            <Utensils className="h-5 w-5 text-gold/80 mr-3 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-2">Cuisine</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {Array.isArray(formData.cuisine) ? formData.cuisine.map((item: any) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="capitalize text-sm py-1 px-3"
                  >
                    {item}
                  </Badge>
                )) : (
                  <Badge
                    variant="secondary"
                    className="capitalize text-sm py-1 px-3"
                  >
                    {formData.cuisine}
                  </Badge>
                )}
              </div>

              {formData.cuisineVariants && formData.cuisineVariants.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Cuisine Variants:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.cuisineVariants.map((variant: any) => (
                      <span
                        key={variant}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold/90 border border-gold/20"
                      >
                        {variant}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {formData.dietaryRequirements && (
                <div className="mt-3 bg-amber-50/50 border border-amber-100 rounded-lg p-3 text-sm">
                  <p className="font-medium text-amber-800">Special Requirements:</p>
                  <p className="text-amber-700">&quot;{formData.dietaryRequirements}&quot;</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Theme */}
        <div className="p-6 bg-gray-50/70">
          <div className="flex items-start">
            <Sparkles className="h-5 w-5 text-gold/80 mr-3 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-2">Theme</h3>
              <p className="capitalize text-lg font-medium">{formData.theme}</p>

              {formData.customThemeName && (
                <div className="mt-3 p-3 border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium">{formData.customThemeName}</p>
                  {formData.customThemeDescription && (
                    <p className="text-sm text-muted-foreground mt-1">&quot;{formData.customThemeDescription}&quot;</p>
                  )}
                  {formData.customThemeColors && (
                    <p className="text-sm mt-1">
                      <span className="text-gray-500">Colors:</span> {formData.customThemeColors}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Entertainment & Add-ons */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <Music className="h-5 w-5 text-gold/80 mr-3 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-3">Entertainment</h3>
                {formData.entertainment?.length > 0 ? (
                  <div className="space-y-2">
                    {Array.isArray(formData.entertainment) && formData.entertainment.map((item: any) => (
                      <div key={item} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-100">
                        <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center">
                          <Check className="h-4 w-4 text-gold" />
                        </div>
                        <span className="capitalize">{item.replace(/-/g, " ")}</span>
                      </div>
                    ))}

                    {formData.entertainmentRequests && (
                      <div className="mt-2 text-sm bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <span className="font-medium text-blue-700">Special Request:</span>
                        <p className="text-blue-600">&quot;{formData.entertainmentRequests}&quot;</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">No entertainment selected</p>
                )}
              </div>
            </div>

            <div className="flex items-start">
              <Gift className="h-5 w-5 text-gold/80 mr-3 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-3">Add-ons</h3>
                {formData.addons?.length > 0 ? (
                  <div className="space-y-2">
                    {formData.addons.map((item: any) => (
                      <div key={item} className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center">
                            <Check className="h-4 w-4 text-gold" />
                          </div>
                          <span className="capitalize">{item.replace(/-/g, " ")}</span>
                        </div>
                        {formData.addonQuantities?.[item] && formData.addonQuantities[item] > 1 && (
                          <Badge variant="outline" className="bg-gray-100">
                            {formData.addonQuantities[item]} units
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">No add-ons selected</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Services */}
        <div className="p-6 bg-gray-50/70">
          <div className="flex items-start">
            <Camera className="h-5 w-5 text-gold/80 mr-3 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider mb-3">Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <span className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center mr-2">
                      <span className="text-xs text-gold">01</span>
                    </span>
                    Pre-Wedding Services
                  </h4>
                  {formData.services?.preWedding?.length > 0 ? (
                    <div className="space-y-1.5">
                      {formData.services.preWedding.map((item: any) => (
                        <div key={item} className="flex items-center gap-2 pl-8">
                          <Check className="h-4 w-4 text-gold" />
                          <span className="capitalize">{item.replace(/-/g, " ")}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic pl-8">None selected</p>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <span className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center mr-2">
                      <span className="text-xs text-gold">02</span>
                    </span>
                    Post-Wedding Services
                  </h4>
                  {formData.services?.postWedding?.length > 0 ? (
                    <div className="space-y-1.5">
                      {formData.services.postWedding.map((item: any) => (
                        <div key={item} className="flex items-center gap-2 pl-8">
                          <Check className="h-4 w-4 text-gold" />
                          <span className="capitalize">{item.replace(/-/g, " ")}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic pl-8">None selected</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeddingDetailsCard
