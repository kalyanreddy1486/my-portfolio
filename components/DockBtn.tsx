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
      aria-keyshortcuts={kbd}
      className="btn border-transparent bg-transparent px-2.5 py-1.5 text-[0.75rem] whitespace-nowrap aria-pressed:text-accent"
    >
      <I size={14} aria-hidden />
      <span className="sr-only lg:not-sr-only">{label}</span>
      <kbd aria-hidden className="hidden rounded border border-zinc-700 px-1 text-[0.625rem] text-zinc-400 xl:inline">
        {kbd}
      </kbd>
    </button>
  );
}
