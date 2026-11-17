"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Bot, Clapperboard, Pause, Play, Square } from "lucide-react";
import { dock } from "@/content";
import { toggleAgents, togglePause, toggleTour } from "@/lib/engine";
import { get, getServer, sub } from "@/lib/store";
import DockBtn from "./DockBtn";

export default function Dock() {
  const s = useSyncExternalStore(sub, get, getServer);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const k = e.key.toLowerCase();
      if (k === "t") toggleTour();
      else if (k === "a") toggleAgents();
      else if (k === "p") togglePause();
    };
    addEventListener("keydown", on);
    return () => removeEventListener("keydown", on);
  }, []);

  const noPause = !s.on || (s.built && !s.touring);

  return (
    <div
      role="toolbar"
      aria-label={dock.label}
      className={`fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-zinc-800 bg-zinc-950 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-300 ${s.touring ? "pointer-events-none translate-y-24 opacity-0" : ""}`}
    >
      <DockBtn
        icon={s.paused ? Play : Pause}
        label={s.paused ? dock.resume : dock.pause}
        kbd="P"
        onClick={togglePause}
        disabled={noPause}
        pressed={s.paused}
      />
      <DockBtn icon={Bot} label={s.on ? dock.on : dock.off} kbd="A" onClick={toggleAgents} pressed={s.on} />
      <DockBtn icon={s.touring ? Square : Clapperboard} label={s.touring ? dock.stop : dock.tour} kbd="T" onClick={toggleTour} />
    </div>
  );
}
