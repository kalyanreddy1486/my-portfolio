"use client";

import { useEffect, useState } from "react";
import { clock } from "@/content";

const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: clock.zone, hour: "2-digit", minute: "2-digit", hour12: false });

export default function Clock({ className = "" }: { className?: string }) {
  const [t, setT] = useState("--:--");

  useEffect(() => {
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {clock.city} <span className="text-zinc-200 tabular-nums">{t}</span> {clock.tz}
    </span>
  );
}
