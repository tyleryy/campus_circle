"use client";
import DeployButton from "@/components/DeployButton";
import { useState } from "react";
import LazyMap from "@/components/Map/LazyMap";
import NavBar from "@/components/NavBar";
import {
  CollapsibleEvents,
  CollapsibleInsights,
} from "@/components/Map-Overlay";
import { TabsClubsEvents } from "@/components/StudentOrClub";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DataContext from "@/app/context/DataContext";

export default function ClientHome({ user }: { user: any }) {
  const [isEdit, setIsEdit] = useState(false);
  const [pos, setPos] = useState({ lat: 0, lng: 0 });
  const [eventId, setEventId] = useState("");
  const [focusLocation, setFocusLocation] = useState(null);
  const createLocation = () => {};

  return (
    <DataContext.Provider
      value={{
        isEdit,
        setIsEdit,
        pos,
        setPos,
        createLocation,
        eventId,
        setEventId,
        focusLocation,
        setFocusLocation,
      }}
    >
      <main className="flex flex-col justify-center items-center h-screen">
        <div className="h-full w-full">
          <ResizablePanelGroup direction="horizontal" className="border">
            <ResizablePanel defaultSize={5} minSize={10} maxSize={10}>
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
    </DataContext.Provider>
  );
}
