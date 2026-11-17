import { about, heads } from "@/content";
import Head from "./Head";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about">
      <Head {...heads.about} />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          {about.paras.map((p, i) => (
            <p
              key={p}
              data-build="type"
              className={i === 0 ? "t-lead text-white" : "t-body max-w-[62ch] text-zinc-400"}
            >
              {p}
            </p>
          ))}
        </div>
        <div data-build="wipe" className="self-start rounded-2xl border border-zinc-800 bg-zinc-950 lg:col-span-5">
          <p className="label flex items-center gap-2 border-b border-zinc-800 px-5 py-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {about.now.label}
          </p>
          <dl className="divide-y divide-zinc-800">
            {about.now.rows.map((r) => (
              <div key={r.k} className="grid gap-1.5 px-5 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                <dt className="label pt-1">{r.k}</dt>
                <dd>
                  <span className="t-body block text-zinc-100">{r.v}</span>
                  {r.d && <span className="mt-1 block font-mono text-xs text-zinc-400">{r.d}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
