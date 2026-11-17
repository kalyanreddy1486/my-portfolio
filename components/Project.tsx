import { ArrowUpRight, Github } from "lucide-react";
import { story, type projects } from "@/content";
import Viz from "./Viz";

type P = { p: (typeof projects)[number]; i: number };

const rows = ["problem", "built", "result"] as const;

export default function Project({ p, i }: P) {
  const flip = i % 2 === 1;
  return (
    <article id={`p${i + 1}`} className="grid scroll-mt-12 items-center gap-8 border-t border-zinc-800 py-14 lg:grid-cols-2 lg:gap-14">
      <div className={flip ? "lg:order-2" : ""}>
        <Viz k={p.viz} stats={p.stats} shot={p.shot} alt={p.shotAlt} url={p.links.live} />
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
        <h3 data-build="type" className="t-h3 mt-4 text-balance">
          {p.name}
        </h3>
        <p data-build="type" className="t-body mt-1 text-zinc-400">
          {p.sub}
        </p>
        <dl className="mt-6 max-w-[62ch] space-y-4">
          {rows.map((k) => (
            <div key={k} className="grid gap-1 sm:grid-cols-[5.5rem_1fr] sm:gap-4">
              <dt data-build="pop" className={`label pt-1 ${k === "result" ? "text-accent" : ""}`}>
                {story[k]}
              </dt>
              <dd data-build="type" className={`t-body text-pretty ${k === "result" ? "text-white" : "text-zinc-300"}`}>
                {p.story[k]}
              </dd>
            </div>
          ))}
        </dl>
        <ul className="mt-7 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li key={s} data-build="pop" className="chip">
              {s}
            </li>
          ))}
        </ul>
        {(p.links.live || p.links.code) && (
          <div data-build="pop" className="mt-7 flex flex-wrap gap-3">
            {p.links.live && (
              <a href={p.links.live} target="_blank" rel="noreferrer" className="btn btn-red" aria-label={`${story.live}: ${p.name}`}>
                {story.live}
                <ArrowUpRight size={14} />
              </a>
            )}
            {p.links.code && (
              <a href={p.links.code} target="_blank" rel="noreferrer" className="btn" aria-label={`${story.code}: ${p.name}`}>
                <Github size={14} />
                {story.code}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
