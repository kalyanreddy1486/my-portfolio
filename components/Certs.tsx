import { certs } from "@/content";

export default function Certs() {
  return (
    <div>
      <p data-build="pop" className="label mb-6">
        {certs.label}
      </p>
      <ul className="divide-y divide-zinc-800 border-y border-zinc-800">
        {certs.items.map((c) => (
          <li key={c.name} data-build="wipe" className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <span className="t-body font-medium text-zinc-100">{c.name}</span>
            <span className="t-small text-zinc-400 sm:text-right">{c.by}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
