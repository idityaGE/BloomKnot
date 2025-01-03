import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    question: "How does your wedding planning platform work?",
    answer: "Our platform guides you through a step-by-step process to plan your wedding. You can select your wedding type, choose venues, pick cuisine options, arrange entertainment, and manage your guest list all in one place."
  },
  {
    question: "Can I customize my wedding package?",
    answer: "Our platform offers a wide range of customization options. You can mix and match services, add special features, and tailor every aspect of your wedding to your preferences."
  },
  {
    question: "How far in advance should I start planning my wedding?",
    answer: "We recommend starting your planning process at least 9-12 months before your desired wedding date. This gives you ample time to secure your preferred venue and vendors."
  },
  {
    question: "Do you offer wedding planning services for destination weddings?",
    answer: "Yes, we do! Our platform includes options for destination weddings, with a curated selection of international venues and services to make your dream wedding a reality, no matter where it is."
  },
  {
    question: "How can I get in touch with a wedding planner for personalized assistance?",
    answer: "You can schedule a video call with one of our expert wedding planners directly through our platform. Look for the 'Schedule a Call' option in your dashboard after signing up."
  }
];

const FAQ: React.FC = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqData.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className='text-xl'>{item.question}</AccordionTrigger>
          <AccordionContent className='text-xl'>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQ;
