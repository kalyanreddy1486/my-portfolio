import Hand from "./viz/Hand";
import Metro from "./viz/Metro";
import Rooms from "./viz/Rooms";

const map = { hand: Hand, metro: Metro, rooms: Rooms };

type P = { k: string; stats: { v: string; l: string }[] };

export default function Viz({ k, stats }: P) {
  const V = map[k as keyof typeof map];
  return (
    <div data-build="wipe" className="blueprint relative overflow-hidden rounded-2xl border border-zinc-800">
      <div className="aspect-[400/260] w-full">{V && <V />}</div>
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
