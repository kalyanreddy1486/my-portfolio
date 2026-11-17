"use client";

import { useEffect, useRef } from "react";
import { agents } from "@/content";
import { init } from "@/lib/engine";
import Bot from "./Bot";

export default function Agents() {
  const lay = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!lay.current) return;
    return init(lay.current, refs.current.filter((r): r is HTMLDivElement => !!r));
  }, []);

  return (
    <div ref={lay} aria-hidden className="layer pointer-events-none absolute inset-0 z-40 overflow-hidden">
      {agents.names.map((n, i) => (
        <Bot
          key={n}
          name={n}
          tone={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}
