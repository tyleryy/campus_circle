import React from "react";
import { LandingAccordion } from "./Accordion";
import { InfiniteMovingCards } from "@/components/infinite-cards";
import { GlobeDemo } from "./Globe";
import { CardHoverEffectDemo } from "./InfoCards";
import { AuroraBackgroundDemo } from "./Aurora";
import Footer from "@/components/Footer";

const cardConfig = [
  {
    quote: "“The only way to do great work is to love what you do.”",
    name: "Steve Jobs",
    title: "Co-founder of Apple Inc.",
  },
  {
    quote: "“The only way to do great work is to love what you do.”",
    name: "Steve Jobs",
    title: "Co-founder of Apple Inc.",
  },
  {
    quote: "“The only way to do great work is to love what you do.”",
    name: "Steve Jobs",
    title: "Co-founder of Apple Inc.",
  },
  {
    quote: "“The only way to do great work is to love what you do.”",
    name: "Steve Jobs",
    title: "Co-founder of Apple Inc.",
  },
  {
    quote: "“The only way to do great work is to love what you do.”",
    name: "Steve Jobs",
    title: "Co-founder of Apple Inc.",
  },
];
const LandingPage: React.FC = () => {
  return (
    <main className="h-full flex items-center flex-col gap-10">
      <div className="w-full h-full">
        <AuroraBackgroundDemo />
      </div>
      <h1 className='md:text-4xl dark:text-neutral-200'>Landing Page</h1>
      <div>
        <InfiniteMovingCards
          items={cardConfig}
          speed="slow"
          pauseOnHover
          direction="right"
        />
        <InfiniteMovingCards
          items={cardConfig}
          speed="slow"
          pauseOnHover
          direction="left"
        />
      </div>
      <div>
        <CardHoverEffectDemo />
      </div>
      <div className="w-3/5">
        <LandingAccordion />
      </div>
      <div className="w-full">
        <GlobeDemo />
      </div>
      <Footer />
    </main>
  );
};

export default LandingPage;
