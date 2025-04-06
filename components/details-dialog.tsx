"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InfoIcon, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import MarkdownRender from "@/components/ui/markdown"

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

// Define an interface for the details data
interface Data {
  id: string
  title: string
  description: string
  detailedDescription?: string
  images: string[]
}

interface DetailsDialogProps {
  details: Data
}

export function DetailsDialog({ details }: DetailsDialogProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="ml-2 text-xs bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 rounded-full px-3 py-1 h-auto shadow-sm"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(true)
        }}
      >
        <span className="mr-1">Details</span>
        <InfoIcon className="h-3 w-3" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] md:h-[85vh] p-0 overflow-hidden flex flex-col rounded-xl">
          <DialogHeader className="p-4 md:p-6 bg-card/70 backdrop-blur-sm sticky top-0 z-10 border-b">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  {details.title}
                </DialogTitle>
                <DialogDescription className="text-sm mt-1">{details.description}</DialogDescription>
              </div>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-muted/80">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6 space-y-6">
              {/* Images section */}
              {details.images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-md"
                >
                  <ImageGallery images={details.images} title={details.title} />
                </motion.div>
              )}

              {/* Details section */}
              {details.detailedDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="prose prose-sm md:prose-base max-w-none">
                    <MarkdownRender content={details.detailedDescription} />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Separated ImageGallery component for cleaner code
function ImageGallery({ images, title }: { images: string[], title: string }) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      centeredSlides={true}
      loop={images.length > 1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      modules={[Pagination, Navigation, Autoplay]}
      className="w-full h-full"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="relative w-full h-full">
          {/* Subtle gradient overlay for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
          <Image
            src={image}
            alt={`${title} - Image ${index + 1}`}
            className="object-cover transition-transform duration-700 hover:scale-105"
            fill
            sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
            priority={index === 0}
            quality={90}
          />

          {/* Image counter badge */}
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md z-20">
            {index + 1} / {images.length}
          </div>
        </SwiperSlide>
      ))}

      {/* Custom navigation buttons for better styling */}
      {images.length > 1 && (
        <>
          <div className="swiper-button-prev !w-10 !h-10 !rounded-full !bg-background/60 !backdrop-blur-sm !text-foreground flex items-center justify-center !shadow-md after:!content-[''] hover:!bg-background/80">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <div className="swiper-button-next !w-10 !h-10 !rounded-full !bg-background/60 !backdrop-blur-sm !text-foreground flex items-center justify-center !shadow-md after:!content-[''] hover:!bg-background/80">
            <ChevronRight className="w-5 h-5" />
          </div>
        </>
      )}
    </Swiper>
  );
}
