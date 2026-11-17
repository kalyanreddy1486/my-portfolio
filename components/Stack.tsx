import { heads, skills } from "@/content";
import Head from "./Head";
import Section from "./Section";

export default function Stack() {
  return (
    <Section id="stack">
      <Head {...heads.stack} />
      <div className="border-b border-zinc-800">
        {skills.map((g) => (
          <div key={g.label} className="grid gap-3 border-t border-zinc-800 py-7 md:grid-cols-12 md:gap-8">
            <h3 data-build="type" className="label pt-1.5 md:col-span-3">
              {g.label}
            </h3>
            <ul className="flex flex-wrap items-baseline gap-x-2 gap-y-2 md:col-span-9">
              {g.items.map((s, i) => (
                <li key={s} data-build="pop" className="flex items-baseline gap-2">
                  <span className="t-list text-zinc-100 transition-colors hover:text-accent">
                    {s}
                  </span>
                  {i < g.items.length - 1 && (
                    <span aria-hidden className="t-list text-zinc-700">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
