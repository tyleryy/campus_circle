import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Check, SquareArrowOutUpRight } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Description } from "@radix-ui/react-dialog";
import DataContext from "@/app/context/DataContext";

export default function EventCard({
  image,
  day,
  month,
  title,
  location,
  weekday,
  start,
  end,
  description,
  lat,
  long,
  email,
  role,
  people,
}) {
  const [rsvpClicked, setRsvpClicked] = useState(false);

  const { setFocusLocation } = useContext(DataContext);

  const handleRsvpClick = () => {
    setRsvpClicked(true);
    onSubmit();
  };
  console.log(email, title);

  const allPeople = people.map((person) => {
    return (
      <>
        <div>
          <h3>{person}</h3>
        </div>
      </>
    );
  });

  const onSubmit = async () => {
    const rsvp = {
      email: email,
      event_name: title,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rsvp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rsvp),
    });
    const data = await response.json();
    console.log(data);
    // setIsOpen(false);
  };

  useEffect(() => {
    const d = people.includes(email);
    setRsvpClicked(d);
  }, [email, people]);

  console.log(people, email, rsvpClicked);

  return (
    <Card
      className="w-full mb-3 border-gray-600"
      onClick={() => {
        setFocusLocation({ lat, lng: long });
      }}
    >
      <img src={image} alt="event image" className="rounded-t-lg" />
      <div className="flex flex-row items-center bg-slate-800 rounded-b-lg">
        <div className="ml-5 h-20 w-16 bg-slate-900 rounded-lg items-center flex flex-col justify-center">
          <h2 className="text-lg font-semibold">{day}</h2>
          <p text-white>{month}</p>
        </div>
        <CardHeader>
          <Popover>
            <PopoverTrigger>
              <CardTitle className="text-left flex flex-row">
                {title} <SquareArrowOutUpRight />{" "}
              </CardTitle>
            </PopoverTrigger>
            <PopoverContent className="rounded-2xl w-96 absolute -bottom-[200px] border-gray-600 border translate-x-[145px]">
              <Card className="border-transparent border bg-slate-800">
                <img src={image} alt="event image" className="rounded-t-lg" />
                <div className="py-2 px-2 h-auto w-full rounded-lg flex flex-col justify-center gap-1">
                  <h2 className="text-cyan-400 text-3xl font-bold">{title}</h2>
                  <div className="flex gap-1">
                    <MapPin className="text-gray-600" />
                    <CardDescription className="text-sm">
                      {location}
                    </CardDescription>
                  </div>
                  <h2 className="text-sm font-light">
                    {month} {day} @ {start} - {end}
                  </h2>
                  <h2 className="my-2">{description}</h2>
                </div>
                {role === "student" ? (
                  <Button
                    onClick={handleRsvpClick}
                    className={`w-full items-center duration-300 ${
                      rsvpClicked
                        ? "bg-green-500"
                        : "bg-white hover:bg-cyan-400"
                    }`}
                  >
                    {rsvpClicked ? (
                      <>
                        <Check /> RSVP'd
                      </>
                    ) : (
                      "RSVP"
                    )}
                  </Button>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <h2 className="text-lg">People Attending</h2>
                    {allPeople}
                  </div>
                )}
              </Card>
            </PopoverContent>
          </Popover>
          <div className="items-center flex gap-2">
            <MapPin />
            <CardDescription className="text-sm">{location}</CardDescription>
          </div>
          <h2 className="text-sm">
            {weekday} {start} - {end}
          </h2>
        </CardHeader>
      </div>
    </Card>
  );
}
