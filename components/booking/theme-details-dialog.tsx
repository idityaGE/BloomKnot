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
import Markdown from "react-markdown"
import { motion } from "framer-motion"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

// Define an interface for the theme data
interface ThemeData {
  id: string
  title: string
  description: string
  detailedDescription?: string
  images: string[]
}

interface ThemeDetailsDialogProps {
  theme: ThemeData
}

export function ThemeDetailsDialog({ theme }: ThemeDetailsDialogProps) {
  const [open, setOpen] = React.useState(false)

  // Define Markdown component renderers with improved typing
  const MarkdownComponents: Record<string, React.ComponentType<any>> = {
    // Custom heading renderer with primary color
    h1: ({ node, ...props }) => (
      <h1 className="text-2xl font-bold text-foreground mt-6 mb-4" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-xl font-bold text-foreground mt-5 mb-3" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-lg font-semibold text-primary mt-4 mb-2" {...props} />
    ),

    // Custom paragraph with proper spacing
    p: ({ node, ...props }) => (
      <p className="text-muted-foreground mb-4 leading-relaxed" {...props} />
    ),

    // Enhance strong text
    strong: ({ node, ...props }) => (
      <strong className="font-semibold text-foreground" {...props} />
    ),

    // Better list styling with custom bullets
    ul: ({ node, ...props }) => (
      <ul className="space-y-2 mb-4 ml-1" {...props} />
    ),
    li: ({ node, children, ...props }) => (
      <li className="flex items-start gap-2 text-muted-foreground">
        <span className="text-primary mt-1">•</span>
        <span>{children}</span>
      </li>
    ),

    // Handle emoji sections specially
    em: ({ node, children }) => {
      // Check if the content is likely an emoji section header
      if (typeof children === 'string' && children.includes('🔹')) {
        return <div className="text-primary font-medium mt-4 mb-2">{children}</div>;
      }
      return <em className="italic text-muted-foreground">{children}</em>;
    },
  };

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
                  {theme.title}
                </DialogTitle>
                <DialogDescription className="text-sm mt-1">{theme.description}</DialogDescription>
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
              {theme.images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-md"
                >
                  <ImageGallery images={theme.images} title={theme.title} />
                </motion.div>
              )}

              {/* Details section */}
              {theme.detailedDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="prose prose-sm md:prose-base max-w-none">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={MarkdownComponents}
                    >
                      {theme.detailedDescription}
                    </Markdown>
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
