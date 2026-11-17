import { viz } from "@/content";

const due = new Set([4, 9]);

export default function Rooms() {
  const tiles = Array.from({ length: 12 }, (_, i) => ({ x: 150 + (i % 4) * 56, y: 76 + Math.floor(i / 4) * 52, i }));
  return (
    <svg viewBox="0 0 400 260" className="draw h-full w-full" aria-hidden>
      <rect x="20" y="20" width="360" height="220" rx="8" className="ln" pathLength={1} />
      <line x1="20" y1="52" x2="380" y2="52" className="ln" pathLength={1} style={{ animationDelay: "0.2s" }} />
      <line x1="128" y1="52" x2="128" y2="240" className="ln" pathLength={1} style={{ animationDelay: "0.3s" }} />
      <circle cx="36" cy="36" r="4" className="pt hot" />
      <text x="48" y="40" className="lbl">{viz.rooms.tag}</text>
      {viz.rooms.side.map((s, i) => (
        <text key={s} x="36" y={80 + i * 30} className={i === 1 ? "lbl on" : "lbl"} style={{ animationDelay: `${0.5 + i * 0.08}s` }}>
          {s}
        </text>
      ))}
      {tiles.map((t) => (
        <rect
          key={t.i}
          x={t.x}
          y={t.y}
          width="46"
          height="40"
          rx="4"
          pathLength={1}
          className={due.has(t.i) ? "ln hotln" : "ln"}
          style={{ animationDelay: `${0.5 + t.i * 0.06}s` }}
        />
      ))}
      <text x="150" y="68" className="lbl">{viz.rooms.side[1]}</text>
      <text x="312" y="68" className="lbl hotlbl">● {viz.rooms.due}</text>
    </svg>
  );
}
