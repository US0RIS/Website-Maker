import clsx from "clsx";
import React from "react";

type Tab = { id: string; label: string };

type Props = {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
};

export function Tabs({ tabs, value, onChange }: Props) {
  return (
    <div>
      <div className="flex gap-2 border-b border-border/60 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              "rounded-lg px-3 py-1 text-sm font-semibold focus-ring",
              value === tab.id ? "bg-accent/10 text-ink" : "text-muted hover:text-ink"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
