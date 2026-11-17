import { ArrowDown } from "lucide-react";
import { hero, site } from "@/content";
import Nav from "./Nav";
import Parallax from "./Parallax";
import Portrait from "./Portrait";
import shot from "@/public/headshot.png";

export default function Hero() {
  return (
    <section id="top" data-sec className="grain relative isolate min-h-svh overflow-hidden">
      <Parallax />
      <Nav />
      <div
        data-build="wipe"
        aria-hidden
        className="px-word metal fadein pointer-events-none absolute inset-x-0 top-[17svh] z-0 text-center font-display text-[23vw] leading-[0.8] tracking-tight select-none sm:top-[12svh]"
      >
        {site.word}
      </div>
      <div aria-hidden className="px-glow fadein absolute [animation-delay:300ms] bottom-[-10%] left-1/2 z-0 w-[130vw] max-w-[1100px] -translate-x-1/2 sm:w-[80vw]">
        <div className="breathe aspect-square w-full rounded-full bg-[radial-gradient(circle,rgba(255,59,47,0.5)_0%,rgba(255,59,47,0.14)_35%,transparent_68%)]" />
      </div>
      <Portrait src={shot} alt={site.name} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[46svh] bg-gradient-to-t from-ink via-ink/85 to-transparent lg:h-56 lg:via-ink/60" />
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-6 px-4 pb-20 sm:px-8 sm:pb-24 lg:flex-row lg:items-end lg:justify-between lg:pb-10">
        <div>
          <p data-build="type" className="rise font-hand text-2xl [animation-delay:500ms] text-accent sm:text-4xl">
            {site.greet}
          </p>
          <h1 data-build="type" className="rise mt-1 [animation-delay:600ms] font-display text-[1.9rem] leading-none whitespace-nowrap text-white uppercase sm:text-6xl">
            {site.name}
          </h1>
          <p data-build="type" className="rise mt-3 [animation-delay:700ms] label">
            {hero.tag}
          </p>
        </div>
        <div className="rise flex items-center gap-6 [animation-delay:850ms]">
          <a data-build="pop" href="#work" className="btn btn-red">
            {site.cta.work}
            <ArrowDown size={14} />
          </a>
          <span data-build="pop" aria-hidden className="hidden items-center gap-3 label lg:flex">
            <span className="cue relative h-10 w-px overflow-hidden bg-zinc-800" />
            {hero.scroll}
          </span>
        </div>
      </div>
    </section>
  );
}
