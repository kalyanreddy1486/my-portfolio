const tones = [
  { bg: "#ff3b2f", fg: "#ffffff" },
  { bg: "#3b82f6", fg: "#ffffff" },
  { bg: "#f4f4f5", fg: "#09090b" },
];

type P = { name: string; tone: number; ref: (el: HTMLDivElement | null) => void };

export default function Bot({ name, tone, ref }: P) {
  const c = tones[tone % tones.length];
  return (
    <div ref={ref} className="bot" data-name={name}>
      <div className="origin-top-left scale-[0.68]">
      <svg width="18" height="20" viewBox="0 0 18 20" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
        <path d="M1 1 L1 16 L5 12.5 L8 19 L10.5 18 L7.6 11.6 L13 11.6 Z" fill={c.bg} stroke="#09090b" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
      <div
        className="absolute top-[17px] left-[12px] flex items-center gap-1 rounded-full py-px pr-1.5 pl-0.5 font-mono text-[7.5px] leading-3 font-medium whitespace-nowrap shadow-[0_1px_4px_rgba(0,0,0,0.45)]"
        style={{ background: c.bg, color: c.fg }}
      >
        <svg width="10" height="10" viewBox="0 0 14 14">
          <line x1="7" y1="1.5" x2="7" y2="4" stroke={c.fg} strokeWidth="1.2" />
          <circle className="ant" cx="7" cy="1.5" r="1.3" fill={c.fg} />
          <rect x="2" y="4" width="10" height="8.5" rx="2.4" fill={c.fg} />
          <rect className="eye" x="4.2" y="7" width="1.8" height="2.2" rx="0.6" fill={c.bg} />
          <rect className="eye" x="8" y="7" width="1.8" height="2.2" rx="0.6" fill={c.bg} />
        </svg>
        {name}
      </div>
      <span className="bot-st absolute top-[33px] left-[14px] font-mono text-[7.5px] leading-3 whitespace-nowrap text-zinc-400 opacity-60" />
      </div>
    </div>
  );
}
