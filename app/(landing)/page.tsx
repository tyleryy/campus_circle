import React from "react";
import { InfiniteMovingCards } from "@/components/infinite-cards";
import { GlobeDemo } from "./Globe";
import { CardHoverEffectDemo } from "./InfoCards";
import { AuroraBackgroundDemo } from "./Aurora";
import Footer from "@/components/Footer";
import AnimatedText from "../AnimatedText";

const cardConfig = [
  {
    quote:
      "“Implementing this platform has been transformative for our club. The ability to easily create and share events, coupled with AI-generated flyers, has significantly increased our visibility. As a result, our membership has grown, and attendance at our events has never been higher. It's been an incredible tool for gaining attention and fostering growth within our community.”",
    name: "Emily Robinson",
    title: "CS Club President",
  },
  {
    quote:
      "“Ever since I started using the platform, I've attended more events in a month than I did all of last year! There's always something happening around campus.”",
    name: "Aaron Patel",
    title: "2nd year Computer Science",
  },
  {
    quote:
      "“Having different roles for participants and clubs helps keep everything organized. As a club officer, it's great to have tools tailored specifically to our needs.”",
    name: "Isabella Gomez",
    title: "Biology Club President",
  },
  {
    quote:
      "“I love how it syncs with my Google Calendar. It's so easy to keep track of the club meetings and activities I'm interested in.”",
    name: "Marcus Wu",
    title: "3rd year Mechanical Engineering",
  },
  {
    quote:
      "“The integrated Google Map makes finding event locations a breeze. Gone are the days of getting lost on campus trying to find where an event is taking place.”",
    name: "Heather Nguyen",
    title: "1st year Business",
  },
];

const cardConfig1 = [
  {
    quote:
      "“Adding a points system for attending events has gamified my involvement in club activities, making it not just rewarding but also incredibly fun. It's like each event is a new level to conquer, and seeing my points tally up adds an exciting layer of competition and achievement to my social and academic life at UCI.”",
    name: "Lucas Chen",
    title: "3rd year Psychology",
  },
  {
    quote:
      "“As a freshman, I was worried about finding my community at UCI. This platform has been a lifeline, connecting me with clubs and events that match my interests and helping me make lasting friendships.”",
    name: "Sophia Martin",
    title: "1st year Public Health",
  },
  {
    quote:
      "“The user-friendly interface and seamless integration with Google Calendar have made managing my club activities and social life a breeze. I can't imagine going back to the old way of doing things.”",
    name: "Julian Rivera",
    title: "Data Club President",
  },
  {
    quote:
      "“The immediate access to event locations and updates in real-time has been a game-changer for our club's logistics. Participation has skyrocketed because members can easily find where and when things are happening.”",
    name: "Nora Fitzgerald",
    title: "Business Club President",
  },
  {
    quote:
      "“Creating customized AI flyers for our events has not only saved us time but also allowed us to reach a wider audience with a professional touch. Our events have seen record turnouts thanks to the visibility we've gained through the platform.”",
    name: "Diego Santos",
    title: "Graphic Design President",
  },
];

const LandingPage: React.FC = () => {
  return (
    <main className="h-full flex items-center flex-col gap-10">
      <div className="w-full h-full">
        <AuroraBackgroundDemo />
      </div>
      <AnimatedText text="Our Satisfied Users..." />
      <div>
        <InfiniteMovingCards
          items={cardConfig}
          speed="slow"
          pauseOnHover={false}
          direction="right"
        />
        <InfiniteMovingCards
          items={cardConfig1}
          speed="slow"
          pauseOnHover={false}
          direction="left"
        />
      </div>
      <AnimatedText text="Key Features" />
      <div>
        <CardHoverEffectDemo />
      </div>
      <div className="w-full">
        <GlobeDemo />
      </div>
      <Footer />
    </main>
  );
};

export default LandingPage;
