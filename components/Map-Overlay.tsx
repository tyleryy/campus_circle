"use client";

import * as React from "react";
import { useState, useRef, useMemo, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
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
import Image from "next/image";
import { DrawerDemo } from "@/app/protected/drawer";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

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

function ClubCards({ image, text, description }) {
  return (
    <div className="flex bg-slate-800 rounded-lg shadow-md p-4 items-center mb-2">
      <div className="h-16 w-16 bg-neutral-100 rounded-lg items-center flex p-1">
        {image && (
          <Image
            width={100}
            height={100}
            src={image.src}
            alt="Card"
            className="rounded-lg p-1 w-20 bg-neutral-100"
          />
        )}
      </div>
      <div className="ml-5 text-neutral-100 flex-col">
        <h3 className="text-lg font-semibold">
          {text.length > 25 ? `${text.slice(0, 25)}...` : text}
        </h3>
        <p className="text-sm text-gray-600">
          {description.length > 25
            ? `${description.slice(0, 25)}...`
            : description}
        </p>
      </div>
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
    <ScrollArea className="w-full rounded-md h-5/6 pb-36">
      {allClubs}
    </ScrollArea>
  );
}

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

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4 text-white bg-slate-800 rounded-md">
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
        <div className="rounded-md border px-4 py-3 font-mono text-sm text-white bg-slate-800">
          INSERT HERE
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm text-white bg-slate-800">
          INSERT HERE
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
      <div className="flex items-center justify-between space-x-4 px-4 text-white bg-slate-800 rounded-md">
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

export function TabsClubsEvents() {
  return (
    <Tabs defaultValue="account" className="w-[350px] bg-slate-800 rounded-lg">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account" className="font-semibold">
          Clubs
        </TabsTrigger>
        <TabsTrigger value="events" className="font-semibold">
          Events
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="h-full">
        <Card className="h-screen">
          <CardHeader>
            <InputWithButton />
            <CheckBox />
          </CardHeader>
          <CardContent className="h-screen">
            <ScrollAreaCards />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="events">
        <Card>
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>List of Events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <DrawerDemo />
          </CardContent>
          {/* <CardFooter>
            <Button>Save password</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
