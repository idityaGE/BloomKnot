import { VenueCard } from "@/components/VenueCard"

const venues = [
  {
    name: "Oceanview Grand Resort",
    description:
      "Relax by the beach with breathtaking ocean views. Lounge in comfort with premium facilities.",
    price: "$249.99",
    src: "https://tools-api.webcrumbs.org/image-placeholder/300/200/beach/1",
    capacity: "200 Guests",
  },
  {
    name: "Mountain Peak Lodge",
    description:
      "Enjoy tranquility and luxury in the mountains. Unwind amidst majestic scenic beauty.",
    price: "$179.99",
    src: "https://tools-api.webcrumbs.org/image-placeholder/300/200/mountain/1",
    capacity: "300 Guests",
  },
  {
    name: "City Lights Hotel",
    description:
      "Stay in style at the heart of downtown. Experience vibrant nightlife and fine dining.",
    price: "$299.99",
    src: "https://tools-api.webcrumbs.org/image-placeholder/300/200/city/1",
    capacity: "400 Guests",
  },
  {
    name: "Garden Paradise Inn",
    description:
      "Immerse yourself in lush greenery and serenity. Relax in natural surroundings for peace.",
    price: "$199.99",
    src: "https://tools-api.webcrumbs.org/image-placeholder/300/200/garden/1",
    capacity: "150 Guests",
  },
  {
    name: "Desert Sun Retreat",
    description:
      "Indulge in the beauty of the desert landscapes. Experience luxurious lodging and calm.",
    price: "$229.99",
    src: "https://tools-api.webcrumbs.org/image-placeholder/300/200/desert/1",
    capacity: "250 Guests",
  },
  {
    name: "Lakeview Serenity Resort",
    description:
      "Rejuvenate with stunning lakeside views. Embrace tranquility with modern accommodations.",
    price: "$189.99",
    src: "https://tools-api.webcrumbs.org/image-placeholder/300/200/lake/1",
    capacity: "100 Guests",
  },
]

export default function VenueListPage() {
  return (
    <div className="bg-neutral-100 min-h-screen px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {venues.map((venue, index) => (
          <VenueCard
            key={index}
            name={venue.name}
            description={venue.description}
            price={venue.price}
            src={venue.src}
            capacity={venue.capacity}
          />
        ))}
      </div>
    </div>
  )
}

