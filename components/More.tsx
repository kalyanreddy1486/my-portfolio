import { ArrowUpRight } from "lucide-react";
import { more } from "@/content";

export default function More() {
  return (
    <div className="border-t border-zinc-800 pt-12">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
        <h3 data-build="type" className="label">
          {more.label}
        </h3>
        <a data-build="pop" href={more.all.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 transition-colors hover:text-accent">
          {more.all.label}
          <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
        {more.items.map((m) => (
          <li key={m.name} data-build="wipe" className="bg-ink">
            <a href={m.href} target="_blank" rel="noreferrer" className="group flex h-full flex-col gap-2 p-5 transition-colors hover:bg-zinc-950 focus-visible:bg-zinc-950">
              <span className="flex items-baseline justify-between gap-4">
                <span className="t-body font-semibold text-white transition-colors group-hover:text-accent">{m.name}</span>
                <span className="font-mono text-xs text-zinc-500 tabular-nums">{m.year}</span>
              </span>
              <span className="t-small text-pretty text-zinc-400">{m.what}</span>
              <span className="mt-auto flex items-center justify-between gap-4 pt-2">
                <span className="font-mono text-xs text-zinc-500">{m.stack}</span>
                <ArrowUpRight size={15} className="shrink-0 text-zinc-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
