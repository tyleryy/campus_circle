import React from "react";
import { LandingAccordion } from "./Accordion";
import { InfiniteMovingCards } from "@/components/infinite-cards";
import { GlobeDemo } from "./Globe";
import { CardHoverEffectDemo } from "./InfoCards";
import { AuroraBackgroundDemo } from "./Aurora";

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
      <h1>Landing Page</h1>
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
        <InfiniteMovingCards
          items={cardConfig}
          speed="slow"
          pauseOnHover
          direction="right"
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
    </main>
  );
};

export default LandingPage;
