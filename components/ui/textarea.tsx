import clsx from "clsx";
import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string };

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ label, hint, className, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-1 text-sm text-muted">
        {label && <span className="font-medium text-ink">{label}</span>}
        <textarea
          ref={ref}
          className={clsx(
            "w-full rounded-lg border border-border bg-surface px-3 py-3 text-ink placeholder:text-muted focus-ring",
            className
          )}
          {...props}
        />
        {hint && <span className="text-xs text-muted">{hint}</span>}
      </label>
    );
  }
);

Textarea.displayName = "Textarea";
