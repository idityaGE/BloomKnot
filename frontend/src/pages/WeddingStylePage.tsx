import { WeddingStyleCard } from "@/components/WeddingStyleCard"

const weddingStyles = [
  {
    title: "Luxury Weddings",
    text: "Opulent settings, extravagant designs, and every detail crafted to indulge your senses. Step into a world of luxury.",
    img1: "https://tools-api.webcrumbs.org/image-placeholder/220/320/Wedding/4",
    img2: "https://tools-api.webcrumbs.org/image-placeholder/220/320/Luxury/6",
  },
  {
    title: "Minimal Weddings",
    text: "Simplicity at its finest—understated elegance with just the right touches to make your day truly unique.",
    img1: "https://tools-api.webcrumbs.org/image-placeholder/220/320/Wedding/1",
    img2: "https://tools-api.webcrumbs.org/image-placeholder/220/320/Minimal/7",
  },
  {
    title: "Traditional Weddings",
    text: "Celebrate your love story with cultural richness, rituals, and traditions that stand the test of time.",
    img1: "https://tools-api.webcrumbs.org/image-placeholder/220/320/Wedding/3",
    img2: "https://tools-api.webcrumbs.org/image-placeholder/220/320/Traditional/8",
  },
  {
    title: "Grand Weddings",
    text: "Breathtaking venues, luxurious themes, and grand gestures for the wedding of your dreams.",
    img1: "https://tools-api.webcrumbs.org/image-placeholder/220/320/Wedding/2",
    img2: "https://tools-api.webcrumbs.org/image-placeholder/220/320/Grand/9",
  },
]

export default function WeddingStylePage() {
  return (
    <div className="min-h-screen bg-[#fffbea] py-12">
      <div className="max-w-[1000px] mx-auto bg-[#fffbea] rounded-lg shadow-lg p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 rounded-lg">
          <img
            src="https://cdn.webcrumbs.org/assets/images/ask-ai/gradients/g12.png"
            className="object-cover w-full h-full rounded-lg"
            alt="Gradient background"
          />
        </div>
        <div className="relative z-10">
          <h1
            className="text-5xl font-bold text-center text-[#91672c] mb-12 w-full"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Select your wedding style
          </h1>
          <div className="grid gap-8">
            {weddingStyles.map((style, index) => (
              <WeddingStyleCard
                key={index}
                title={style.title}
                text={style.text}
                img1={style.img1}
                img2={style.img2}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

