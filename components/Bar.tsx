"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content";

export default function Bar() {
  const [show, setShow] = useState(false);
  const [act, setAct] = useState("");
  const prog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const top = document.getElementById("top");
    let h = 1;
    let fold = 0;
    let raf = 0;
    const measure = () => {
      h = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      fold = top ? top.offsetTop + top.offsetHeight - 60 : 0;
    };
    const paint = () => {
      raf = 0;
      if (prog.current) prog.current.style.transform = `scaleX(${Math.min(1, scrollY / h)})`;
      setShow(scrollY > fold);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const size = () => {
      measure();
      on();
    };
    const ro = new ResizeObserver(size);
    ro.observe(document.body);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setAct(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    size();
    addEventListener("scroll", on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      removeEventListener("scroll", on);
    };
  }, []);

  return (
    <header
      inert={!show}
      className={`fixed inset-x-0 top-0 z-[45] border-b border-zinc-800 bg-ink/95 transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
        <a href="#top" className="hidden font-mono text-xs tracking-widest text-zinc-300 uppercase transition-colors hover:text-white sm:block">
          {site.short}
        </a>
        <nav className="flex w-full justify-between gap-1 sm:w-auto sm:gap-6">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={act === n.id ? "location" : undefined}
              className="flex items-center gap-1.5 py-2 font-mono text-xs tracking-[0.14em] text-zinc-400 uppercase transition-colors hover:text-white aria-[current]:text-white"
            >
              <span className={`h-1 w-1 rounded-full bg-accent transition-opacity ${act === n.id ? "opacity-100" : "opacity-0"}`} />
              {n.label}
            </a>
          ))}
        </nav>
      </div>
      <div ref={prog} className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent" />
    </header>
  );
}
