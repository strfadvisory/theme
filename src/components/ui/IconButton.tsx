"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required for accessibility — describes the action to assistive tech. */
  "aria-label": string;
  active?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, active = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "focus-ring inline-flex h-9 w-9 items-center justify-center rounded-theme",
          "border border-border bg-surface text-muted-foreground",
          "transition-[background-color,border-color,color,transform] duration-200",
          "hover:text-foreground hover:bg-surface-hover active:scale-90",
          active && "text-primary border-primary/30 bg-primary/10",
          className
        )}
        {...props}
      />
    );
  }
);

IconButton.displayName = "IconButton";
