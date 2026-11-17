import { nav, site } from "@/content";
import Clock from "./Clock";

export default function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-4 py-5 sm:px-8">
      <a
        href="#top"
        data-build="type"
        className="font-mono text-xs tracking-widest text-zinc-300 uppercase transition-colors hover:text-white"
      >
        {site.short}
      </a>
      <span data-build="pop" className="text-zinc-500 max-sm:ml-auto sm:hidden xl:absolute xl:left-1/2 xl:block xl:-translate-x-1/2">
        <Clock />
      </span>
      <nav className="hidden gap-6 sm:flex">
        {nav.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            data-build="pop"
            className="font-mono text-xs tracking-widest text-zinc-400 uppercase transition-colors hover:text-accent"
          >
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
