"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ctc from "../app/ctc_logo.png";
import hack from "../app/hack-at-uci-logo_black.png";
import Image from 'next/image';


import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
 
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
]
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

 
export function CheckBox() {
  return (
    <div className="flex items-center pt-2 space-x-2">
      <Checkbox id="terms"/>
      <label
        htmlFor="terms"
        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        My Clubs Only
      </label>
    </div>
  )
}

function ClubCards({ image, text, description }) {
    return (
      <div className="flex bg-slate-800 rounded-lg shadow-md p-4 items-center">
        <div className='h-16 w-16 bg-neutral-100 rounded-lg items-center flex'>
            {image && <Image width={100} height={100} src={image} alt="Card" className="rounded-lg p-1 w-20 bg-neutral-100" />}
        </div>
        <div className='ml-5 text-neutral-100 flex-col'>
          <h3 className="text-lg font-semibold">{text}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    );
  }
 
export function TextArea() {
    return <Textarea placeholder="Type a command or search..." />
}

export function CollapsibleInsights() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4 text-white bg-slate-800 rounded-md">
        <h4 className="text-sm font-semibold ">
          Insights
        </h4>
        <CollapsibleTrigger asChild className='m-1 bg-blue-400 hover:bg-blue-400'>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
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
  )
}

export function CollapsibleEvents() {
    const [isOpen, setIsOpen] = React.useState(false)
  
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4 text-white bg-slate-800 rounded-md">
          <h4 className="text-sm font-semibold">
            Upcoming Events
          </h4>
          <CollapsibleTrigger asChild className='m-1 bg-blue-400 hover:bg-blue-400'>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
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
    )
  }


  export function TabsClubsEvents() {
    return (
      <Tabs defaultValue="account" className="w-[350px] bg-slate-800 rounded-lg">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account" className='font-semibold'>Clubs</TabsTrigger>
          <TabsTrigger value="password" className='font-semibold'>Events</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <TextArea />
              <CheckBox />
            </CardHeader>
            <CardContent className="space-y-2">
                <ClubCards
                    image={ctc.src}
                    text="Commit the Change"
                    description="Building tech with purpose."
                />
                <ClubCards
                    image={hack.src}
                    text="Hack at UCI"
                    description="Promoting hacker culture."
                />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    )
  }
