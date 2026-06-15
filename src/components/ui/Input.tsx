import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "focus-ring h-10 w-full rounded-theme border border-border bg-surface px-3 text-sm text-foreground",
          "placeholder:text-muted-foreground",
          "transition-[background-color,border-color,color,box-shadow] duration-200",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
