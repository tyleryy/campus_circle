import { Home } from "lucide-react";
import { Users } from "lucide-react";
import { MapPinned } from "lucide-react";
import { Calendar } from "lucide-react";
import { Settings } from "lucide-react";
import AuthButton from "@/components/AuthButtonServer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "./dark-mode-toggle";
import Image from "next/image";
import logo from "../app/campus_circle_logo.png";

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

export default function NavBar() {
  const { day, month } = getCurrentDayAndMonth();
  return (
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
      <Link
        href="https://calendar.google.com/"
        target="_blank"
        className="py-6"
      >
        <MapIcon />
      </Link>
      <Link href="#" className="py-6">
        <CalIcon />
      </Link>
      <Link href="#" className="py-6">
        <AuthButton />
      </Link>
      <div className="mt-auto flex flex-col items-center">
        <Link href="#" className="mb-6">
          <ModeToggle />
        </Link>
        <Link href="#" className="mb-8">
          <SettingsIcon />
        </Link>
      </div>
    </nav>
  );
}
