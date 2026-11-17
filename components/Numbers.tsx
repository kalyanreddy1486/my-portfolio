import { numbers } from "@/content";

export default function Numbers() {
  return (
    <dl className="mt-14 grid grid-cols-2 border-y border-zinc-800 md:grid-cols-4">
      {numbers.map((n, i) => (
        <div
          key={n.l}
          data-build="pop"
          className={`flex flex-col gap-1 py-6 pr-4 ${i % 2 ? "pl-4 md:pl-6" : "md:pl-6 md:first:pl-0"} ${i > 0 ? "md:border-l md:border-zinc-800" : ""} ${i % 2 ? "border-l border-zinc-800" : ""} ${i > 1 ? "border-t border-zinc-800 md:border-t-0" : ""}`}
        >
          <dt className="label order-2 mt-2">{n.l}</dt>
          <dd className="t-num order-1">{n.v}</dd>
        </div>
      ))}
    </dl>
  );
}
