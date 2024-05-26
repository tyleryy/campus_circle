"use client";
import { createContext, Dispatch, SetStateAction } from "react";

const DataContext = createContext({
  isEdit: false,
  setIsEdit: (() => {}) as Dispatch<SetStateAction<boolean>>,
  pos: {},
  setPos: (() => {}) as Dispatch<SetStateAction<{ lat: number; lng: number }>>,
  createLocation: (() => {}) as () => void,
  eventId: "",
  setEventId: (() => {}) as Dispatch<SetStateAction<string>>,
});

export default DataContext;
