import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WeddingStyleCardProps {
  title: string;
  text: string;
  img1: string;
  img2: string;
}

export const WeddingStyleCard: React.FC<WeddingStyleCardProps> = ({ title, text, img1, img2 }) => {
  return (
    <div className="w-full bg-[#fffbea] rounded-lg shadow-lg p-12 relative group perspective">
      <div className="absolute inset-0 opacity-20 rounded-lg">
        <img
          src="https://cdn.webcrumbs.org/assets/images/ask-ai/gradients/g12.png"
          className="object-cover w-full h-full rounded-lg"
          alt="Gradient bg"
        />
      </div>
      <div className="relative z-10">
        <div className="flex space-x-8 p-4 items-center transition-transform duration-700 transform group-hover:rotate-y-180">
          <div className="flex-1">
            <h2 className="font-title text-2xl font-bold text-[#91672c]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {title}
            </h2>
            <p className="mt-4 text-neutral-800">{text}</p>
            <Button className="mt-6 bg-[#d4af37] text-white rounded-full px-5 py-3 flex items-center space-x-2">
              <span>Choose</span>
              <ArrowRight size={16} />        
            </Button>
          </div>
          <div className="flex-none relative -top-8">
            <img
              src={img1}
              className="w-[220px] h-[320px] rounded-md object-cover"
              alt={`${title} Image 1`}
            />
          </div>
          <div className="flex-none relative top-6">
            <img
              src={img2}
              className="w-[220px] h-[320px] rounded-md object-cover"
              alt={`${title} Image 2`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

