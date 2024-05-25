import DeployButton from "@/components/DeployButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LazyMap from "@/components/Map/LazyMap";
import NavBar from "@/components/NavBar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { DrawerDemo } from "./drawer";

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
        <ResizablePanelGroup direction="horizontal" className="border">
          <ResizablePanel defaultSize={5}>
            <div className="flex h-full items-center justify-center">
              <span className="font-semibold"></span>
              <NavBar />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center relative">
              <div className="-z-30">
                <LazyMap />
              </div>
              <div className="absolute right-0 bottom-0 z-50">
                <DrawerDemo />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
