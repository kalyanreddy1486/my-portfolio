import Image from "next/image";
import Hand from "./viz/Hand";
import Metro from "./viz/Metro";
import Rooms from "./viz/Rooms";
import Stream from "./viz/Stream";

const map = { hand: Hand, metro: Metro, rooms: Rooms, stream: Stream };

type P = { k: string; stats: { v: string; l: string }[]; shot?: string; alt?: string; url?: string };

export default function Viz({ k, stats, shot, alt, url }: P) {
  const V = map[k as keyof typeof map];
  return (
    <div data-build="wipe" className="blueprint group relative overflow-hidden rounded-2xl border border-zinc-800">
      {shot ? (
        <div className="flex aspect-[400/260] w-full flex-col">
          <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-950 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            {url && <span className="ml-2 truncate font-mono text-xs text-zinc-400">{url.replace("https://", "")}</span>}
          </div>
          <div className="relative min-h-0 flex-1">
            <Image
              src={shot}
              alt={alt ?? ""}
              fill
              sizes="(min-width: 1024px) 560px, 92vw"
              className="object-cover object-left-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
            />
          </div>
        </div>
      ) : (
        <div className="aspect-[400/260] w-full">{V && <V />}</div>
      )}
      <dl className="flex border-t border-zinc-800">
        {stats.map((s) => (
          <div key={s.l} className="flex-1 border-r border-zinc-800 px-4 py-3 last:border-r-0">
            <dt className="sr-only">{s.l}</dt>
            <dd className="t-num-sm text-white">{s.v}</dd>
            <dd aria-hidden className="label mt-2">
              {s.l}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
