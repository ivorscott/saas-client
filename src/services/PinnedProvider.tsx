import React, { PropsWithChildren, useState } from "react";
import { PinnedProject } from "../helpers";

interface PinnedCtx {
  pinned: PinnedProject[];
  setPinned: (pinned: PinnedProject[]) => void;
}

const PinnedContext = React.createContext<PinnedCtx | undefined>(undefined);

export function PinnedProvider({ children }: PropsWithChildren) {
  let settings = localStorage.getItem("settings.pinned") || "[]";
  const totalPinned = JSON.parse(settings) as PinnedProject[];

  const [pinned, setPinned] = useState<PinnedProject[]>(totalPinned);

  return (
    <PinnedContext.Provider value={{ pinned, setPinned }}>
      {children}
    </PinnedContext.Provider>
  );
}

export function usePinned() {
  const context = React.useContext(PinnedContext);
  if (context === undefined) {
    throw new Error("usePinned must be used within a PinnedProvider");
  }
  return context;
}
