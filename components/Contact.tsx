import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { contact, heads, site } from "@/content";
import Clock from "./Clock";
import CopyBtn from "./CopyBtn";
import Section from "./Section";

const icons = { github: Github, linkedin: Linkedin };

export default function Contact() {
  const mail = contact.links.find((l) => l.k === "mail");
  const socials = contact.links.filter((l) => l.k !== "mail");
  return (
    <Section id="contact">
      <div className="border-t border-zinc-800 pt-6">
        <p data-build="pop" className="label">
          <span className="text-accent">{heads.contact.no}</span> <span className="text-zinc-600">/</span> {heads.contact.label}
        </p>
        <h2
          data-build="wipe"
          className="metal mt-6 font-display text-[clamp(4.2rem,18.5vw,16.5rem)] whitespace-nowrap leading-[0.85] tracking-tight uppercase"
        >
          {contact.big}
        </h2>
      </div>
      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p data-build="type" className="t-lead max-w-xl text-zinc-400">
            {contact.line}
          </p>
          {mail && (
            <a
              data-build="wipe"
              href={mail.href}
              className="t-h3 group mt-6 inline-flex max-w-full items-center gap-3 font-medium break-all transition-colors hover:text-accent"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                {mail.value}
              </span>
              <ArrowUpRight className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          )}
          <div data-build="pop" className="mt-6">
            <CopyBtn />
          </div>
        </div>
        <ul className="self-end border-t border-zinc-800 lg:col-span-5">
          {socials.map((l) => {
            const I = icons[l.k as keyof typeof icons];
            return (
              <li key={l.k} data-build="wipe" className="border-b border-zinc-800">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 py-5 transition-colors hover:text-accent active:opacity-70"
                >
                  <I size={18} className="shrink-0 text-zinc-500 transition-colors group-hover:text-accent" />
                  <span className="t-list font-semibold text-white transition-colors group-hover:text-accent">
                    {l.label}
                  </span>
                  <span className="ml-auto hidden min-w-0 truncate font-mono text-xs text-zinc-400 sm:block">{l.value}</span>
                  <ArrowUpRight size={20} className="shrink-0 text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <footer className="mt-24 flex flex-col gap-4 border-t border-zinc-800 pt-6 pb-24 font-mono text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <span>{site.name}</span>
        <Clock />
        <a href="#top" className="transition-colors hover:text-accent">
          {contact.top}
        </a>
      </footer>
    </Section>
  );
}
