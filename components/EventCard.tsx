"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EventCard({
  image,
  day,
  month,
  title,
  location,
  weekday,
  start,
  end,
}) {
  return (
    <Card className="w-full mb-3 border-gray-600">
      <Image src={image} alt="event image" className="rounded-t-lg"/>
      <div className="flex flex-row items-center bg-slate-800 rounded-b-lg">
        <div className="ml-5 h-20 w-16 bg-slate-900 rounded-lg items-center flex flex-col justify-center">
          <h2 className="text-lg font-semibold">{day}</h2>
          <p text-white>{month}</p>
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
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
