import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/server";
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
import humanities from "../app/humanities.jpg";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";
import {
  CheckBox,
  ScrollAreaClubs,
  ScrollAreaEvents,
  InputWithButton,
  CollapsibleEvents,
} from "./Map-Overlay";
import profile from "@/app/profile.jpg";

function StudentCards({ image, text }) {
  return (
    <div className="flex bg-slate-800 rounded-lg shadow-md p-4 items-center mb-3 text-gray-600">
      <div className="h-16 w-16 bg-neutral-100 rounded-lg items-center flex p-1">
        {image && (
          <Image
            width={100}
            height={100}
            src={image}
            alt="Card"
            className="rounded-lg p-1 w-20 bg-neutral-100"
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
  return (
    <ScrollArea className="w-full rounded-md pb-36 h-[800px]">
      <StudentCards image={profile.src} text="Alex Ngo" />
      <StudentCards image={profile.src} text="Alex Ngo" />
      <StudentCards image={profile.src} text="Alex Ngo" />
      <StudentCards image={profile.src} text="Alex Ngo" />
      <StudentCards image={profile.src} text="Alex Ngo" />
      <StudentCards image={profile.src} text="Alex Ngo" />
      <StudentCards image={profile.src} text="Alex Ngo" />
      <StudentCards image={profile.src} text="Alex Ngo" />
    </ScrollArea>
  );
}

export async function TabsClubsEvents() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user.user_metadata.role === "student" ? (
    <Tabs defaultValue="account" className="w-[350px] bg-slate-800 rounded-lg">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account" className="font-semibold">
          Clubs
        </TabsTrigger>
        <TabsTrigger value="password" className="font-semibold">
          Events
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="">
        <Card className="h-[800px]">
          <CardHeader>
            <InputWithButton />
            <CheckBox />
          </CardHeader>
          <CardContent className="">
            <ScrollAreaClubs />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="password" className="h-full">
        <Card className="h-[800px]">
          <CardHeader>
            <InputWithButton />
            <CheckBox />
          </CardHeader>
          <CardContent className="h-screen">
            <ScrollAreaEvents />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ) : (
    <Tabs defaultValue="events" className="w-[350px] bg-slate-800 rounded-lg">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="events" className="font-semibold">
          My Events
        </TabsTrigger>
        <TabsTrigger value="clubs" className="font-semibold">
          Other Clubs
        </TabsTrigger>
        <TabsTrigger value="students" className="font-semibold">
          Students
        </TabsTrigger>
      </TabsList>
      <TabsContent value="events" className="">
        <Card className="h-[800px]">
          <CardHeader>
            <InputWithButton />
          </CardHeader>
          <CardContent className="">
            <ScrollAreaEvents />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="clubs" className="h-full">
        <Card className="h-[800px]">
          <CardHeader>
            <InputWithButton />
          </CardHeader>
          <CardContent className="h-screen">
            <ScrollAreaEvents />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="students" className="h-full">
        <Card className="h-[800px]">
          <CardHeader>
            <InputWithButton />
          </CardHeader>
          <CardContent className="h-screen">
            <ScrollAreaStudents />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
