import DeployButton from "@/components/DeployButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LazyMap from "@/components/Map/LazyMap";
import NavBar from "@/components/NavBar";
import { CollapsibleEvents, CollapsibleInsights, TabsClubsEvents } from "@/components/Map-Overlay";
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
        <ResizablePanelGroup direction="horizontal" className="border">
          <ResizablePanel defaultSize={5}>
            <div className="flex h-full items-center justify-center">
              <span className="font-semibold"></span>
              <NavBar />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="relative h-full">
              <div className="flex flex-col gap-5 absolute top-5 left-5 z-50 text-black text-xl">
                  <CollapsibleInsights />
                  <CollapsibleEvents />
                  <TabsClubsEvents />
              </div>
              <div className="absolute inset-0 z-0">
                <LazyMap />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
