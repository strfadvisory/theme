import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type CardProps = HTMLAttributes<HTMLDivElement>;

/**
 * Themed surface container. Automatically picks up a frosted-glass look
 * when the active theme sets `glass: true` (via `.glass-surface`).
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-surface rounded-theme-lg border border-border bg-surface shadow-theme-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
