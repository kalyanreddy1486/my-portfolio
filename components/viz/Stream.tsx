import { viz } from "@/content";

const pts = [62, 60, 64, 58, 61, 63, 59, 62, 60, 28, 61, 63, 60, 62, 59, 61, 64, 60, 62, 61];

export default function Stream() {
  const { nodes, spike, tag } = viz.stream;
  const step = 320 / (nodes.length - 1);
  const line = pts.map((y, i) => `${i ? "L" : "M"}${40 + i * 16.8} ${150 + y}`).join(" ");
  return (
    <svg viewBox="0 0 400 260" className="draw h-full w-full" aria-hidden>
      <text x="16" y="24" className="lbl">{tag}</text>
      <line x1="40" y1="70" x2="360" y2="70" className="ln" pathLength={1} />
      {nodes.map((n, i) => (
        <g key={n}>
          <rect
            x={40 + i * step - 22}
            y="56"
            width="44"
            height="28"
            rx="5"
            className={i === 3 ? "ln hotln" : "ln"}
            pathLength={1}
            style={{ animationDelay: `${0.2 + i * 0.12}s`, fill: "var(--color-ink)" }}
          />
          <text x={40 + i * step} y="100" textAnchor="middle" className={i === 3 ? "lbl hotlbl" : "lbl"} style={{ animationDelay: `${0.4 + i * 0.12}s` }}>
            {n}
          </text>
        </g>
      ))}
      <circle cx="40" cy="70" r="3" className="pt hot flowdot" />
      <path d={line} className="ln" pathLength={1} style={{ animationDelay: "0.9s" }} />
      <circle cx={40 + 9 * 16.8} cy={150 + 28} r="5" className="pt hot" style={{ animationDelay: "1.6s" }} />
      <text x={40 + 9 * 16.8 + 10} y={150 + 24} className="lbl hotlbl" style={{ animationDelay: "1.7s" }}>
        {spike}
      </text>
      <line x1="40" y1="238" x2="360" y2="238" className="ln" pathLength={1} style={{ animationDelay: "0.8s", opacity: 0.4 }} />
    </svg>
  );
}
