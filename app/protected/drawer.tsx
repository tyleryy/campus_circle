"use client";
import * as React from "react";
import { useEffect, useState, useContext } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import DataContext from "../../app/context/DataContext";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createClient } from "@/utils/supabase/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ScrollArea } from "@/components/ui/scroll-area";

const supabase = createClient();

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string(),
  longitude: z.string(),
  latitude: z.string(),
  eventType: z.string(),
  image: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
});

async function uploadFile(file) {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`${file.name}`, file, { upsert: true });
  if (error) {
    console.log(error);
  } else {
    // console.log(data);
  }
}

export function DrawerDemo() {
  const [pic, setPic] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const { isEdit, setIsEdit, setEventId, setPos } = useContext(DataContext);
  // const {
  //   data: { user },
  // } = supabase.auth.getUser();
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserData(user);
    };
    fetchData();
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      location: "",
      longitude: "",
      latitude: "",
      eventType: "",
      image: "",
    },
  });

  const fileRef = form.register("image");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert date to a string in the required format
    const formattedDate = formatDate(values.date);
    let publicUrl = "";

    if (values.image && values.image[0]) {
      const uploadData = await uploadFile(values.image[0]);
      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(values.image[0].name);
      publicUrl = data.publicUrl;
    }

    const eventData = {
      name: values.name,
      description: values.description,
      date: formattedDate,
      start_time: values.startTime,
      end_time: values.endTime,
      location: values.location,
      long: values.longitude,
      lat: values.latitude,
      type: values.eventType,
      image: publicUrl,
      email: userData?.user_metadata.email,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/createEvents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      const result = await response.json();
      console.log("result", result);
      setEventId(result.event[0]);
      setIsEdit(true);
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  // console.log(isEdit);

  function formatDate(date: any) {
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let year = date.getFullYear();

    return `${month}-${day}-${year}`;
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div className="flex flex-row">
          <div className="border-gray-600 border bg-slate-800 mt-4 px-5 py-3 rounded-sm gap-5 flex items-center w-full">
            <Button
              variant="outline"
              className="hover:text-black duration-300 hover:bg-cyan-400"
            >
              <Plus />
            </Button>
            <Label className="text-lg">Create an Event</Label>
          </div>
        </div>
      </DrawerTrigger>

      {/* Drawer content */}
      <DrawerContent>
        <ScrollArea className="h-[500px]">
          <div className="mx-auto w-full max-w-sm z-50">
            <DrawerHeader>
              <DrawerTitle>Create an Event</DrawerTitle>
              <DrawerDescription>
                Post an event on CampusCircle
              </DrawerDescription>
            </DrawerHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Event Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Venus Hacks" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Event Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="UCI's Largest Women-Centric Hackathon"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image */}
                <FormField
                  control={form.control}
                  name="image.file"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>File</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            placeholder="shadcn"
                            {...fileRef}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Student Center Pacific Ballroom D"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* StartTime */}
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input placeholder="11PM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* EndTime */}
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input placeholder="11PM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Event Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <= new Date() ||
                              date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Event Type Dropdown */}
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Event Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Social">Social 🗣️</SelectItem>
                          <SelectItem value="Meeting">Meeting 💼 </SelectItem>
                          <SelectItem value="Workshop">Workshop 🛠️</SelectItem>
                          <SelectItem value="Performance">
                            Performance 💃
                          </SelectItem>
                          <SelectItem value="Sports & Fitness">
                            Sports & Fitness 🏀
                          </SelectItem>
                          <SelectItem value="Misc.">Misc. ❓ </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DrawerFooter>
                  <Button type="submit" className="bg-cyan-400">
                    Create Event
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
