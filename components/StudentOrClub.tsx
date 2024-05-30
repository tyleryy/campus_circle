import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/client";
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
  ScrollAreaCards,
  ScrollAreaEvents,
  ScrollAreaStudents,
  InputWithButton,
  CollapsibleEvents,
} from "./Map-Overlay";
import profile from "@/app/profile.jpg";
import { DrawerDemo } from "@/app/protected/drawer";
import { useEffect, useState } from "react";

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

export function TabsClubsEvents() {
  const supabase = createClient();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return session?.user_metadata?.role ||
    session?.user.user_metadata?.role === "student" ? (
    // Students
    <Tabs defaultValue="clubs" className="w-[350px] bg-slate-800 rounded-lg">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="clubs" className="font-semibold">
          Clubs
        </TabsTrigger>
        <TabsTrigger value="events" className="font-semibold">
          Events
        </TabsTrigger>
      </TabsList>
      {/* 2 tabs */}
      <TabsContent value="clubs" className="">
        <Card className="">
          <CardHeader>
            <InputWithButton />
            <CheckBox />
          </CardHeader>
          <CardContent className="">
            <ScrollAreaCards />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="events" className="">
        <Card className="">
          <CardHeader>
            <InputWithButton />
            <CheckBox />
          </CardHeader>
          <CardContent className="">
            <ScrollAreaEvents height={675} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ) : (
    // Clubs
    // 3 tabs
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
      <TabsContent value="events" className="h-full">
        <Card className="h-[800px]">
          <CardHeader>
            <InputWithButton />
            <DrawerDemo />
          </CardHeader>
          <CardContent className="">
            <ScrollAreaEvents height={600} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="clubs" className="h-full">
        <Card className="h-[800px]">
          <CardHeader>
            <InputWithButton />
          </CardHeader>
          <CardContent>
            <ScrollAreaEvents height={690} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="students" className="h-full">
        <Card className="">
          <CardHeader>
            <InputWithButton />
          </CardHeader>
          <CardContent className="mb-3">
            <ScrollAreaStudents />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
