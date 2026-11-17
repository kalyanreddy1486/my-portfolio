import { viz } from "@/content";

const pts: [number, number][] = [
  [200, 232], [166, 214], [142, 196], [124, 179], [110, 163],
  [172, 150], [166, 115], [162, 92], [159, 72],
  [198, 143], [197, 104], [196, 80], [195, 58],
  [224, 148], [228, 113], [230, 91], [232, 73],
  [247, 160], [256, 134], [261, 117], [265, 101],
];

const bones: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

export default function Hand() {
  return (
    <svg viewBox="0 0 400 260" className="draw h-full w-full" aria-hidden>
      <rect x="92" y="44" width="192" height="202" rx="6" className="ln box" />
      <text x="92" y="36" className="lbl">{viz.hand.box}</text>
      {bones.map(([a, b], i) => (
        <line
          key={i}
          x1={pts[a][0]}
          y1={pts[a][1]}
          x2={pts[b][0]}
          y2={pts[b][1]}
          pathLength={1}
          className="ln"
          style={{ animationDelay: `${0.25 + i * 0.05}s` }}
        />
      ))}
      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 4 === 0 ? 4.5 : 3.5}
          className={i % 4 === 0 && i > 0 ? "pt hot" : "pt"}
          style={{ animationDelay: `${0.9 + i * 0.04}s` }}
        />
      ))}
      <text x="300" y="236" className="lbl">{viz.hand.tag}</text>
    </svg>
  );
}
