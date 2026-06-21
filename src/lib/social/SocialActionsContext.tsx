"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { LicensedTrack, MusicUsage } from "./musicLibrary";

export type SocialSheet =
  | "live"
  | "story"
  | "page"
  | "thought"
  | "music"
  | null;

type SocialActionsContextValue = {
  activeSheet: SocialSheet;
  musicUsage: MusicUsage;
  selectedTrack: LicensedTrack | null;
  thoughtDraft: string;
  openSheet: (sheet: Exclude<SocialSheet, null>, musicUsage?: MusicUsage) => void;
  closeSheet: () => void;
  setThoughtDraft: (value: string) => void;
  selectTrack: (track: LicensedTrack | null) => void;
  confirmMusicSelection: () => void;
};

const SocialActionsContext = createContext<SocialActionsContextValue | null>(null);

export function SocialActionsProvider({ children }: { children: ReactNode }) {
  const [activeSheet, setActiveSheet] = useState<SocialSheet>(null);
  const [musicUsage, setMusicUsage] = useState<MusicUsage>("thought");
  const [selectedTrack, setSelectedTrack] = useState<LicensedTrack | null>(null);
  const [thoughtDraft, setThoughtDraft] = useState("");

  const openSheet = useCallback((sheet: Exclude<SocialSheet, null>, usage: MusicUsage = "thought") => {
    setMusicUsage(usage);
    setActiveSheet(sheet);
  }, []);

  const closeSheet = useCallback(() => setActiveSheet(null), []);

  const confirmMusicSelection = useCallback(() => {
    if (musicUsage === "story" || musicUsage === "thought" || musicUsage === "page") {
      setActiveSheet(musicUsage);
      return;
    }
    setActiveSheet(null);
  }, [musicUsage]);

  const value = useMemo(
    () => ({
      activeSheet,
      musicUsage,
      selectedTrack,
      thoughtDraft,
      openSheet,
      closeSheet,
      setThoughtDraft,
      selectTrack: setSelectedTrack,
      confirmMusicSelection,
    }),
    [activeSheet, closeSheet, confirmMusicSelection, musicUsage, openSheet, selectedTrack, thoughtDraft]
  );

  return <SocialActionsContext.Provider value={value}>{children}</SocialActionsContext.Provider>;
}

export function useSocialActions() {
  const ctx = useContext(SocialActionsContext);
  if (!ctx) throw new Error("useSocialActions must be used within SocialActionsProvider");
  return ctx;
}

export function useSocialActionsOptional() {
  return useContext(SocialActionsContext);
}
