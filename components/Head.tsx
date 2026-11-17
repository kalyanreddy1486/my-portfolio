type P = { no: string; label: string; title: string };

export default function Head({ no, label, title }: P) {
  return (
    <div className="mb-10 flex flex-col gap-4 border-t border-zinc-800 pt-6 sm:mb-14">
      <p data-build="pop" className="label">
        <span className="text-accent">{no}</span> <span className="text-zinc-600">/</span> {label}
      </p>
      <h2 data-build="type" className="t-h2">
        {title}
      </h2>
    </div>
  );
}
