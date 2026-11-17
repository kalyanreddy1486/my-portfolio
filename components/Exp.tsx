import { exp } from "@/content";

export default function Exp() {
  return (
    <div className="mb-16">
      <p data-build="pop" className="label mb-5">
        {exp.label}
      </p>
      <article data-build="wipe" className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="t-h3">
            <span data-build="type">{exp.role}</span>
            <span className="text-zinc-600"> · </span>
            <span data-build="type" className="text-zinc-300">
              {exp.org}
            </span>
          </h3>
          <p data-build="pop" className="font-mono text-xs text-zinc-400 tabular-nums">
            {exp.when}
          </p>
        </div>
        <ul className="mt-6 max-w-[68ch] space-y-3">
          {exp.pts.map((p) => (
            <li key={p} className="t-body flex gap-3 text-zinc-300">
              <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
              <span data-build="type">{p}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
