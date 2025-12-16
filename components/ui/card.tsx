import clsx from "clsx";
import React from "react";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx("card p-4 lg:p-5", className)}>{children}</div>;
}
