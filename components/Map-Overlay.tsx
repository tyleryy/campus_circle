"use client";

import * as React from "react";
import { useState, useRef, useMemo, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronsUpDown, Plus, Trophy, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import ctc from "../app/ctc_logo.png";
import hack from "../app/hack-at-uci-logo_black.png";
import humanities from "../app/humanities.jpg";
import Image from "next/image";
import { DrawerDemo } from "@/app/protected/drawer";
import { Switch } from "@/components/ui/switch";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export function CheckBox() {
  return (
    <div className="flex items-center pt-2 space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        My Clubs Only
      </label>
    </div>
  );
}

// return (
//   <div className="flex bg-slate-800 rounded-lg shadow-md p-4 items-center mb-3 text-gray-600">
//     <div className='h-16 w-16 bg-neutral-100 rounded-lg items-center flex p-1'>
//         {image && <Image width={100} height={100} src={image} alt="Card" className="rounded-lg p-1 w-20 bg-neutral-100" />}
//     </div>
//     <div className='ml-5 text-neutral-100 flex-col'>
//       <h3 className="text-lg font-semibold">{text}</h3>
//       <p className="text-sm text-gray-600">{description}</p>
//     </div>

const InClub = ({ className, ...props }) => {
  return (
    <div className={` ${className}`} {...props}>
      <Switch id="JoinClub" className="border border-neutral-200" />
    </div>
  );
};

function ClubCards({ image, text, description }) {
  return (
    <div className="flex bg-slate-800 rounded-lg shadow-md p-4 items-center mb-3 text-gray-600">
      <div className="h-16 w-16 bg-neutral-100 rounded-lg items-center flex p-1">
        {image && (
          <img
            width={100}
            height={100}
            src={image}
            alt="Card"
            className="rounded-lg p-1 w-20 bg-neutral-100"
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="ml-5 text-neutral-200 flex-col flex">
          <h3 className="text-lg font-semibold">
            {text?.length > 25 ? `${text.slice(0, 25)}...` : text}
          </h3>
          <p className="text-sm text-gray-600">
            {description?.length > 25
              ? `${description.slice(0, 25)}...`
              : description}
          </p>
        </div>
      </div>
      <InClub className="ml-auto" />
    </div>
  );
}

export function ScrollAreaCards() {
  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/clubs`);
      const data = await response.json();
      const flattenedEvents = data.events.flat();
      setClubs(flattenedEvents);
    };
    fetchData();
  }, []);

  console.log(clubs);
  const allClubs: JSX.Element[] = clubs.map((club) => (
    <ClubCards
      image={club.image_url}
      text={club.name}
      description={club.club_description}
    />
  ));

  return (
    <ScrollArea className="w-full rounded-md overflow-y-auto h-[675px]">
      {allClubs}
    </ScrollArea>
  );
}

function StudentCards({ image, text }) {
  return (
    <div className="flex bg-slate-800 rounded-lg shadow-md p-4 items-center mb-3 text-gray-600">
      <div className="h-16 w-16 bg-neutral-100 rounded-lg items-center flex p-1">
        {image && (
          <img
            src={image}
            alt="Card"
            className="rounded-lg w-20 bg-neutral-100"
          />
        )}
      </div>
      <div className="ml-5 text-neutral-100 flex-col">
        <h3 className="text-lg font-semibold">{text}</h3>
      </div>
    </div>
  );
}

export function ScrollAreaStudents() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/students`
      );
      const data = await response.json();
      const flattenedStudents = data.events.flat();
      setStudents(flattenedStudents);
    };
    fetchData();
  }, []);

  return (
    <ScrollArea className="w-full rounded-md overflow-y-auto h-[675px]">
      {students?.map((student: any) => (
        <StudentCards image={student.image_url} text={student.email} />
      ))}
    </ScrollArea>
  );
}

import PropTypes from "prop-types";

export function ScrollAreaEvents({ height }) {
  const [events, setEvents] = useState([]);

  // Map month numbers to month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`);
      const data = await response.json();
      const flattenedEvents = data.events.flat();
      setEvents(flattenedEvents);
    };
    fetchData();
  }, []);

  return (
    <ScrollArea
      className="w-full rounded-md overflow-y-auto"
      style={{ height: `${height}px` }}
    >
      {events.map((event) => {
        // Convert month string to an integer and map it to the corresponding month name
        const [month, day, year] = event.date.split("-");
        const date = new Date(`${year}-${month}-${day}`);
        const monthName = monthNames[date.getMonth()];
        const weekdayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const weekdayName = weekdayNames[date.getDay()];
        return (
          <EventCard
            key={event.id}
            image={event.image}
            day={day}
            month={monthName}
            title={event.name}
            location={event.location}
            weekday={weekdayName}
            start={event.start_time}
            end={event.end_time}
          />
        );
      })}
    </ScrollArea>
  );
}

ScrollAreaEvents.propTypes = {
  height: PropTypes.number.isRequired,
};

export function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Type a command or search..." />
      <Button type="submit" className="bg-cyan-400 hover:bg-cyan-400">
        <Send />
      </Button>
    </div>
  );
}

export function CollapsibleInsights() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [topThreeStudents, setTopThreeStudents] = useState([]);
  const [topThreeClubs, setTopThreeClubs] = useState([]);

  const supabase = createClient();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log("session: ", session);
      console.log("session.user role: ", session.user.user_metadata.role);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/topStudents`
      );
      const data = await response.json();
      const topThreeStudentsData = data.events.flat().slice(0, 3);
      // console.log(topThreeStudentsData);
      setTopThreeStudents(topThreeStudentsData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/topClubs`
      );
      const data = await response.json();
      const topThreeClubsData = data.events.flat().slice(0, 3);
      // console.log(topThreeClubsData);
      setTopThreeClubs(topThreeClubsData);
    };
    fetchData();
  }, []);

  return session?.user.user_metadata?.role === "student" ? (
    // Students
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4 text-white bg-slate-900 rounded-md">
        <h4 className="text-sm font-semibold">Insights</h4>
        <CollapsibleTrigger
          asChild
          className="m-1 bg-cyan-400 hover:bg-cyan-400"
        >
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4 text-black" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border-cyan-400 border-4 px-4 py-3 text-sm text-white bg-slate-800 flex flex-row align-middle">
          <div className="rounded-lg p-1 w-10 text-black bg-cyan-400 flex justify-center">
            1
          </div>
          <div className="ml-3 gap-[140px] flex flex-row items-center justify-between w-full">
            {topThreeStudents[0]}
            <Trophy className="stroke-cyan-400" />
          </div>
        </div>
        <div className="rounded-md border px-4 py-3 text-sm text-white bg-slate-800 flex flex-row align-middle">
          <div className="rounded-lg p-1 w-10 text-black bg-neutral-100 flex justify-center">
            2
          </div>
          <div className="ml-3 gap-[140px] flex flex-row items-center">
            {topThreeStudents[1]}
          </div>
        </div>
        <div className="rounded-md border px-4 py-3 text-sm text-white bg-slate-800 flex flex-row align-middle">
          <div className="rounded-lg p-1 w-10 text-black bg-neutral-100 flex justify-center">
            3
          </div>
          <div className="ml-3 gap-[140px] flex flex-row items-center">
            {topThreeStudents[2]}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ) : (
    // Clubs
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4 text-white bg-slate-900 rounded-md">
        <h4 className="text-sm font-semibold">Insights</h4>
        <CollapsibleTrigger
          asChild
          className="m-1 bg-cyan-400 hover:bg-cyan-400"
        >
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4 text-black" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border-cyan-400 border-4 px-4 py-3 text-sm text-white bg-slate-800 flex flex-row align-middle">
          <div className="rounded-lg p-1 w-10 text-black bg-cyan-400 flex justify-center">
            1
          </div>
          <div className="ml-3 gap-[140px] flex flex-row items-center justify-between w-full">
            {topThreeClubs[0]}
            <Trophy className="stroke-cyan-400" />
          </div>
        </div>
        <div className="rounded-md border px-4 py-3 text-sm text-white bg-slate-800 flex flex-row align-middle">
          <div className="rounded-lg p-1 w-10 text-black bg-neutral-100 flex justify-center">
            2
          </div>
          <div className="ml-3 gap-[140px] flex flex-row items-center">
            {topThreeClubs[1]}
          </div>
        </div>
        <div className="rounded-md border px-4 py-3 text-sm text-white bg-slate-800 flex flex-row align-middle">
          <div className="rounded-lg p-1 w-10 text-black bg-neutral-100 flex justify-center">
            3
          </div>
          <div className="ml-3 gap-[140px] flex flex-row items-center">
            {topThreeClubs[2]}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function CollapsibleEvents() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`);
      const data = await response.json();
      const flattenedEvents = data.events.flat();
      // console.log(flattenedEvents);
      const filteredEvents = flattenedEvents
        .flat()
        .filter((event) => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 2);
      setEvents(filteredEvents);
    };
    fetchData();
  }, []);

  console.log("2: ", events);
  const allEvents: JSX.Element[] = events.map((club) => (
    <ClubCards
      image={club.image}
      text={club.name}
      description={club.description}
    />
  ));

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4 text-white bg-slate-900 rounded-md">
        <h4 className="text-sm font-semibold">Upcoming Events</h4>
        <CollapsibleTrigger
          asChild
          className="m-1 bg-cyan-400 hover:bg-cyan-400"
        >
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4 text-black" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm text-white bg-slate-800">
          {allEvents[0]}
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm text-white bg-slate-800">
          {allEvents[1]}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
