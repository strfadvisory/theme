import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "primary" | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: "bg-surface-hover text-muted-foreground border border-border",
  primary: "bg-primary/10 text-primary border border-primary/20",
  outline: "bg-transparent text-foreground border border-border",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium leading-none",
          VARIANT_CLASSES[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
