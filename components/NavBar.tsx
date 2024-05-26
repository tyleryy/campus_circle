"use client";
import { Home } from "lucide-react";
import { Users } from "lucide-react";
import { MapPinned } from "lucide-react";
import { Calendar } from "lucide-react";
import { Settings } from "lucide-react";
import { CircleUser } from "lucide-react";
import AuthButton from "@/components/AuthButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "./dark-mode-toggle";
import Image from "next/image";
import logo from "../app/campus_circle_logo.png";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function getCurrentDayAndMonth() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }).toUpperCase();
  return { day, month };
}

// Rest of the code remains the same

function ButtonIcon() {
  return (
    <Button variant="ghost" size="icon">
      <Home className="h-8 w-8 dark:hover:bg-blue-400 duration-300 rounded-sm" />
    </Button>
  );
}

function UserIcon() {
  return (
    <Button variant="ghost" size="icon">
      <Users className="h-8 w-8 dark:hover:bg-blue-400 duration-300 rounded-sm" />
    </Button>
  );
}

function MapIcon() {
  return (
    <Button variant="ghost" size="icon">
      <MapPinned className="h-8 w-8 dark:hover:bg-blue-400 duration-300 rounded-sm" />
    </Button>
  );
}

function CalIcon() {
  return (
    <Button variant="ghost" size="icon">
      <Calendar className="h-8 w-8 dark:hover:bg-blue-400 duration-300 rounded-sm" />
    </Button>
  );
}

function SettingsIcon() {
  return (
    <Button variant="ghost" size="icon">
      <Settings className="h-8 w-8 dark:hover:bg-blue-400 duration-300 rounded-sm" />
    </Button>
  );
}

function ProfileIcon() {
  return (
    <Button variant="ghost" size="icon">
      <CircleUser className="h-8 w-8 dark:hover:bg-blue-400 duration-300 rounded-sm" />
    </Button>
  );
}

export default function NavBar() {
  const { day, month } = getCurrentDayAndMonth();

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

  return session?.user.user_metadata?.role === "student" ? (
    <nav className="h-full w-full bg-slate-800 text-neutral-200 flex flex-col items-center">
      <Link href="#" className="pt-12 pb-6">
        <Image src={logo} alt="Logo" className="h-10 w-10" />
      </Link>
      <div className="py-6 text-lg flex flex-col items-center">
        <span className="text-3xl">{day}</span>
        <span>{month}</span>
      </div>
      <Link href="/" className="py-6">
        <ButtonIcon />
      </Link>
      <Link href="#" className="py-6">
        <UserIcon />
      </Link>
      <Link href="#" className="py-6">
        <MapIcon />
      </Link>
      <Link
        href="https://calendar.google.com/"
        target="_blank"
        className="py-6"
      >
        <CalIcon />
      </Link>
      <div className="mt-auto flex flex-col items-center">
        <Link href="#" className="mb-6">
          <ModeToggle />
        </Link>
        <Link href="#" className="mb-6">
          <SettingsIcon />
        </Link>
        <Link
          href="#"
          className="mb-8 flex dark:hover:bg-blue-400 duration-300 rounded-sm pr-2"
        >
          <ProfileIcon />
          <Popover>
            <PopoverTrigger className="text-sm font-bold">
              Student
            </PopoverTrigger>
            <PopoverContent>
              Hey, {session.user.email}! You are a{" "}
              {session.user.user_metadata.role}!
            </PopoverContent>
          </Popover>
        </Link>
      </div>
    </nav>
  ) : (
    <nav className="h-full w-full bg-slate-800 text-neutral-200 flex flex-col items-center">
      <Link href="#" className="pt-12 pb-6">
        <Image src={logo} alt="Logo" className="h-10 w-10" />
      </Link>
      <Separator className="border-[0.5px] border-neutral-200" />
      <div className="py-6 text-lg flex flex-col items-center">
        <span className="text-3xl">{day}</span>
        <span>{month}</span>
      </div>
      <Separator className="border-[0.5px] border-neutral-200" />
      <Link href="/" className="py-6">
        <ButtonIcon />
      </Link>
      <Separator className="border-[0.5px] border-neutral-200" />
      <Link href="#" className="py-6">
        <UserIcon />
      </Link>
      <Separator className="border-[0.5px] border-neutral-200" />

      <Link
        href="https://calendar.google.com/"
        target="_blank"
        className="py-6"
      >
        <MapIcon />
      </Link>
      <Separator className="border-[0.5px] border-neutral-200" />

      <Link href="#" className="py-6">
        <CalIcon />
      </Link>
      <Separator className="border-[0.5px] border-neutral-200" />

      <div className="mt-auto flex flex-col items-center">
        <Link href="#" className="mb-6">
          <ModeToggle />
        </Link>

        <Link href="#" className="mb-6">
          <SettingsIcon />
        </Link>

        <Link
          href="#"
          className="mb-8 flex dark:hover:bg-blue-400 duration-300 rounded-sm pr-2 py-1"
        >
          <ProfileIcon />
          <Popover>
            <PopoverTrigger className="text-sm font-bold">Club</PopoverTrigger>
            <PopoverContent>
              Hey, {session?.user.email}! You are a{" "}
              {session?.user.user_metadata?.role}!
            </PopoverContent>
          </Popover>
        </Link>
      </div>
    </nav>
  );
}
