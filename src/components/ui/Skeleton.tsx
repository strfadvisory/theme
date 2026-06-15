import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-theme bg-surface-hover",
        className
      )}
      aria-hidden="true"
    />
  );
}
