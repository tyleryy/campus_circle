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
import { Send } from 'lucide-react';
import ctc from "../app/ctc_logo.png";
import hack from "../app/hack-at-uci-logo_black.png";
import humanities from "../app/humanities.jpg"
import Image from 'next/image';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";
import {CheckBox, ScrollAreaClubs, ScrollAreaEvents, InputWithButton, CollapsibleEvents} from "./Map-Overlay"


export async function TabsClubsEvents() {

    const supabase = createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    return (
      user.user_metadata.role === "student" ?
        <Tabs defaultValue="account" className="w-[350px] bg-slate-800 rounded-lg">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account" className='font-semibold'>Clubs</TabsTrigger>
            <TabsTrigger value="password" className='font-semibold'>Events</TabsTrigger>
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
      :
        <Tabs defaultValue="account" className="w-[350px] bg-slate-800 rounded-lg">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account" className='font-semibold'>Clubs</TabsTrigger>
          <TabsTrigger value="password" className='font-semibold'>Events</TabsTrigger>
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
    );
  }