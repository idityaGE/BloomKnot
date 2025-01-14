import React from "react"
import { Button } from "@/components/ui/button"

interface VenueCardProps {
  name: string
  description: string
  price: string
  src: string
  capacity: string
}

export const VenueCard: React.FC<VenueCardProps> = ({ name, description, price, src, capacity }) => {
  return (
    <div className="w-[300px] bg-neutral-50 rounded-lg shadow-2xl p-4 flex flex-col gap-4 transform transition duration-300 hover:shadow-xl hover:bg-[#f5efd6]">
      <img
        className="w-full h-[150px] object-cover rounded-md"
        src={src}
        alt={name}
      />
      <div className="flex flex-col">
        <h2 className="text-xl font-title font-semibold">{name}</h2>
        <p className="text-sm text-neutral-700 mt-1 line-clamp-2">
          {description}
        </p>
        <p className="text-lg font-semibold mt-2 text-red-800">
          {price}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-neutral-500 font-medium ">
            Max Capacity: {capacity}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Button variant="default" className="bg-[#d4af37] text-white rounded-full px-5 py-3 flex items-center space-x-2">
          Add to Cart
        </Button>
        <Button variant="link" className="text-primary-700 font-medium">
          More Info
        </Button>
      </div>
    </div>
  )
}
