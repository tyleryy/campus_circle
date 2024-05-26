import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function LandingAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is CampusCircle?</AccordionTrigger>
        <AccordionContent>
          <b className="text-blue-400">CampusCircle</b> is a tailor-made for UCI
          students, providing an all-encompassing solution to discover and
          engage in campus activities and events. It seamlessly blends into the
          student lifestyle by syncing events with the student's Google
          Calendar, ensuring they never miss out on activities that interest
          them. From community gatherings to specialized club events, the
          platform offers easy navigation through its Current and Future Events
          pages, catering to immediate and future plans. Additionally, it
          features an integrated Google Map pinpointing event locations across
          the UCI campus, making it simpler to find events. A news section keeps
          students informed with the latest announcements and updates on campus
          activities. One of the platform's highlights is its ability for users
          and clubs to generate and share AI-powered advertisement flyers,
          promoting events efficiently and increasing their visibility among the
          UCI student community. With dedicated roles for both participants and
          clubs, the platform allows clubs to create official groups and
          students to join any number of these, ensuring a smooth and efficient
          way to explore and participate in campus life. This solution is
          designed with UCI students in mind, ensuring that they stay updated
          and connected with campus events, fostering a vibrant and active
          community.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
