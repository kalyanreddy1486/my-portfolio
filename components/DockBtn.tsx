import type { LucideIcon } from "lucide-react";

type P = {
  icon: LucideIcon;
  label: string;
  kbd: string;
  onClick: () => void;
  disabled?: boolean;
  pressed?: boolean;
};

export default function DockBtn({ icon: I, label, kbd, onClick, disabled, pressed }: P) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={pressed}
      title={`${label} (${kbd})`}
      aria-label={label}
      className="btn border-transparent bg-transparent px-2.5 py-1.5 text-[0.72rem] whitespace-nowrap aria-pressed:text-accent"
    >
      <I size={14} />
      <span className="hidden lg:inline">{label}</span>
      <kbd className="hidden rounded border border-zinc-700 px-1 text-[0.6rem] text-zinc-500 xl:inline">{kbd}</kbd>
    </button>
  );
}
