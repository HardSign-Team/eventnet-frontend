import { EventStore } from "../stores/EventStore";
import { createContext, ReactNode, useContext } from "react";

let store: EventStore;

const StoreContext = createContext<EventStore | undefined>(undefined);

export function EventStoreProvider({ children }: { children?: ReactNode }) {
  const root = store ?? new EventStore();
  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
}

export const useEventStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }
  return context;
};
