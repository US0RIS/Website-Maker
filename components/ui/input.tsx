import clsx from "clsx";
import React from "react";

type BaseProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string };

export const Input = React.forwardRef<HTMLInputElement, BaseProps>(({ label, hint, className, ...props }, ref) => {
  return (
    <label className="flex flex-col gap-1 text-sm text-muted">
      {label && <span className="font-medium text-ink">{label}</span>}
      <input
        ref={ref}
        className={clsx(
          "w-full rounded-lg border border-border bg-surface px-3 py-2 text-ink placeholder:text-muted focus-ring",
          className
        )}
        {...props}
      />
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
});

Input.displayName = "Input";
