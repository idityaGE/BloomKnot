"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"
import Image from "next/image"
import Markdown from "react-markdown"

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

interface ThemeDetailsDialogProps {
  theme: {
    id: string
    title: string
    description: string
    detailedDescription?: string
    images: string[]
  }
}

export function ThemeDetailsDialog({ theme }: ThemeDetailsDialogProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="ml-2 text-xs"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(true)
        }}
      >
        Details
        <InfoIcon className="h-3 w-3 ml-1" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl w-[90vw] h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl">{theme.title}</DialogTitle>
            <DialogDescription className="text-sm">{theme.description}</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            {theme.images.length > 0 && (
              <div className="relative w-full h-64 md:h-80">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="w-full h-full rounded-lg"
                >
                  {theme.images.map((image, index) => (
                    <SwiperSlide key={index} className="relative w-full h-full">
                      <Image
                        src={image}
                        alt={`${theme.title} - Image ${index + 1}`}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        priority={index === 0}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {theme.detailedDescription && (
              <div className="prose prose-sm max-w-none">
                <Markdown>{theme.detailedDescription}</Markdown>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}