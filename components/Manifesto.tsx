"use client";

import { Fragment, useEffect, useRef } from "react";
import { manifesto } from "@/content";

const words = manifesto.flatMap((s) => s.t.split(" ").map((w) => ({ w, hl: !!s.hl })));

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-w]"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => s.classList.add("on"));
      return;
    }
    let raf = 0;
    let last = -1;
    const run = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const n = Math.round(p * spans.length);
      if (n === last) return;
      last = n;
      spans.forEach((s, i) => s.classList.toggle("on", i < n));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, []);

  return (
    <p ref={ref} className="manifesto t-statement max-w-[30ch] sm:max-w-[36ch] lg:max-w-[40ch]">
      {words.map((x, i) => (
        <Fragment key={i}>
          <span data-w className={x.hl ? "hl" : undefined}>
            {x.w}
          </span>{" "}
        </Fragment>
      ))}
    </p>
  );
}
