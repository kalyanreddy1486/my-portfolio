import { viz } from "@/content";

const a = "M30 70 L110 70 L170 120 L260 120 L370 120";
const b = "M120 230 L170 180 L170 120 L210 60 L300 40";
const c = "M40 200 L120 200 L210 200 L260 160 L260 120 L320 80";
const stops: [number, number][] = [
  [30, 70], [110, 70], [170, 120], [260, 120], [370, 120], [120, 230], [170, 180], [210, 60], [300, 40],
  [40, 200], [120, 200], [210, 200], [260, 160], [320, 80],
];
const swap: [number, number][] = [[170, 120], [260, 120]];

export default function Metro() {
  const [w, m, au] = viz.metro.legs;
  return (
    <svg viewBox="0 0 400 260" className="draw h-full w-full" aria-hidden>
      <path d={a} className="ln" pathLength={1} />
      <path d={b} className="ln" pathLength={1} style={{ animationDelay: "0.2s" }} />
      <path d={c} className="ln" pathLength={1} style={{ animationDelay: "0.4s" }} />
      {stops.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className="pt" style={{ animationDelay: `${0.6 + i * 0.04}s` }} />
      ))}
      {swap.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8" className="ring" />
      ))}
      <path d="M150 240 L170 180" className="route walk" />
      <path d="M170 180 L170 120 L260 120" className="route flow" />
      <path d="M260 120 L320 80 L352 64" className="route auto" />
      <circle cx="150" cy="240" r="5" className="pt hot" />
      <circle cx="352" cy="64" r="5" className="pt hot" />
      <text x="110" y="250" className="lbl">{w}</text>
      <text x="180" y="150" className="lbl">{m}</text>
      <text x="300" y="56" className="lbl">{au}</text>
      <text x="16" y="24" className="lbl">{viz.metro.tag}</text>
    </svg>
  );
}
