import clsx from "clsx";

type Props = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  description?: string;
};

export function Toggle({ label, checked, onChange, description }: Props) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={clsx(
        "flex w-full items-center justify-between rounded-xl border border-border bg-surface px-3 py-2 text-left transition focus-ring",
        checked ? "border-accent/70 bg-accent/10" : ""
      )}
    >
      <div>
        <div className="text-sm font-semibold text-ink">{label}</div>
        {description && <div className="text-xs text-muted">{description}</div>}
      </div>
      <span
        aria-hidden
        className={clsx(
          "inline-flex h-5 w-10 items-center rounded-full border border-border transition",
          checked ? "bg-accent/70" : "bg-white/5"
        )}
      >
        <span
          className={clsx(
            "m-0.5 h-4 w-4 rounded-full bg-white transition",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </span>
    </button>
  );
}
