"use client";

import { useEffect } from "react";

export default function Parallax() {
  useEffect(() => {
    const el = document.getElementById("top");
    const fine = matchMedia("(pointer: fine)").matches;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !fine || calm) return;
    const layers = [
      [el.querySelector<HTMLElement>(".px-word"), -16, -10],
      [el.querySelector<HTMLElement>(".px-photo"), 14, 6],
      [el.querySelector<HTMLElement>(".px-glow"), 36, 20],
    ] as const;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    const step = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      for (const [n, kx, ky] of layers) if (n) n.style.transform = `translate3d(${(x * kx).toFixed(2)}px, ${(y * ky).toFixed(2)}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(step) : 0;
    };
    const on = (e: PointerEvent) => {
      tx = (e.clientX / innerWidth) * 2 - 1;
      ty = (e.clientY / innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(step);
    };
    const off = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(step);
    };
    el.addEventListener("pointermove", on);
    el.addEventListener("pointerleave", off);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", on);
      el.removeEventListener("pointerleave", off);
    };
  }, []);

  return null;
}
