"use client";
import DeployButton from "@/components/DeployButton";
import { useState } from "react";
import LazyMap from "@/components/Map/LazyMap";
import NavBar from "@/components/NavBar";
import {
  CollapsibleEvents,
  CollapsibleInsights,
  TabsClubsEvents,
} from "@/components/Map-Overlay";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { DataProvider } from "@/app/context/DataContext";

export default function ClientHome({ user }: { user: any }) {
  const [isEdit, setIsEdit] = useState(false);
  const [pos, setPos] = useState({ lat: 33.6461, lng: -117.8427 });
  const [eventId, setEventId] = useState("");
  const createLocation = () => {};

  return (
    <DataProvider
      value={{
        isEdit,
        setIsEdit,
        pos,
        setPos,
        createLocation,
        eventId,
        setEventId,
      }}
    >
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
                <div className="flex flex-col gap-5 absolute top-5 left-5 z-50 text-black">
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
    </DataProvider>
  );
}
