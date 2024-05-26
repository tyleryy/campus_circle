"use client";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface DataContextProps {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  pos: {};
  setPos: Dispatch<SetStateAction<{}>>;
  createLocation: () => void;
  eventId: string;
  setEventId: Dispatch<SetStateAction<string>>;
}

const DataContext = createContext<DataContextProps>({
  isEdit: false,
  setIsEdit: () => {},
  pos: {},
  setPos: () => {},
  createLocation: () => {},
  eventId: "",
  setEventId: () => {},
});

// Create a provider component
export const DataProvider = ({ children }) => {
  return (
    <DataContext.Provider
      value={{
        isEdit: false,
        setIsEdit: () => {},
        pos: {},
        setPos: () => {},
        createLocation: () => {},
        eventId: "",
        setEventId: () => {},
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useDataContext = () => {
  return useContext(DataContext);
};

export default DataContext;
