import type { projects } from "@/content";
import Viz from "./Viz";

type P = { p: (typeof projects)[number]; i: number };

export default function Project({ p, i }: P) {
  const flip = i % 2 === 1;
  return (
    <article id={`p${i + 1}`} className="grid scroll-mt-12 items-center gap-8 border-t border-zinc-800 py-14 lg:grid-cols-2 lg:gap-14">
      <div className={flip ? "lg:order-2" : ""}>
        <Viz k={p.viz} stats={p.stats} />
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-4">
          <p data-build="pop" className="t-num-sm text-accent">
            {String(i + 1).padStart(2, "0")}
          </p>
          <p data-build="pop" className="font-mono text-xs text-zinc-400 tabular-nums">
            {p.when}
          </p>
        </div>
        <h3 data-build="type" className="t-h3 mt-4">
          {p.name}
        </h3>
        <p data-build="type" className="t-body mt-1 text-zinc-400">
          {p.sub}
        </p>
        <ul className="mt-6 max-w-[62ch] space-y-3">
          {p.pts.map((t) => (
            <li key={t} className="t-body flex gap-3 text-zinc-300">
              <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-zinc-500" />
              <span data-build="type">{t}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-7 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li key={s} data-build="pop" className="chip">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
