import { agents } from "@/content";

export default function Boot() {
  return (
    <div aria-hidden className="boot fixed inset-0 z-[60] flex-col items-center justify-center bg-ink px-4">
      <div className="w-full max-w-md font-mono text-xs text-zinc-400">
        <p className="mb-3 text-zinc-200">
          <span className="text-accent">●</span> {agents.boot}
        </p>
        <div className="h-px w-full bg-zinc-800">
          <div className="boot-bar h-px origin-left bg-accent" />
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-4 gap-y-1">
          {agents.names.map((n, i) => (
            <li key={n} className="boot-row flex justify-between gap-2" style={{ animationDelay: `${i * 35}ms` }}>
              <span>{n}</span>
              <span className="text-wire">{agents.ready}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
