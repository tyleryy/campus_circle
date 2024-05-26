import { HoverEffect } from "@/components/HoverCards";
import planAheadImage from "@/app/plan_ahead_feature_image.png";
import mapImage from "@/app/map_image.png";
import clubCardImage from "@/app/club_cards_image.png";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={features} />
    </div>
  );
}
export const features = [
  {
    title: "Plan Ahead",
    image: planAheadImage,
  },
  {
    title: "View Club Events",
    image: mapImage,
  },
  {
    title: "RSVP to Events",
    image: clubCardImage,
  },
  {
    title: "Boost Spirit",
    image: planAheadImage,
  },
  {
    title: "Create Event Graphics",
    image: planAheadImage,
  },
  {
    title: "Grow your Network",
    image: planAheadImage,
  },

];
