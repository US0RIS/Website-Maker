import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React from "react";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition focus-ring disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        solid: "bg-accent text-panel shadow-soft hover:translate-y-[-1px]",
        ghost: "border border-border bg-surface hover:border-accent/70",
        subtle: "bg-white/5 border border-border"
      },
      size: {
        sm: "text-sm py-2 px-3",
        md: "text-sm",
        lg: "text-base px-5 py-3"
      }
    },
    defaultVariants: {
      variant: "solid",
      size: "md"
    }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonStyles>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={clsx(buttonStyles({ variant, size }), className)} {...props} />
  )
);

Button.displayName = "Button";
