import { edu } from "@/content";

export default function Edu() {
  return (
    <div>
      <p data-build="pop" className="label mb-6">
        {edu.label}
      </p>
      <ol className="relative space-y-9 border-l border-zinc-800 pl-6">
        {edu.items.map((e) => (
          <li key={e.school} className="relative">
            <span aria-hidden data-build="pop" className="absolute top-2 -left-[29px] h-2.5 w-2.5 rounded-full bg-accent" />
            <h3 data-build="type" className="t-h4">
              {e.school}
            </h3>
            {e.what && (
              <p data-build="type" className="t-body mt-1 text-zinc-400">
                {e.what}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span data-build="pop" className="chip border-accent/40 text-white">
                {e.score}
              </span>
              <span data-build="pop" className="font-mono text-xs text-zinc-400">
                {e.when} · {e.city}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
