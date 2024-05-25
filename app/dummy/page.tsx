import DeployButton from "@/components/DeployButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LazyMap from "@/components/Map/LazyMap";
import NavBar from "@/components/NavBar";
import EventCard from "@/components/EventCard";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="h-full w-full">
        <EventCard />
      </div>
    </main>
  );
}
