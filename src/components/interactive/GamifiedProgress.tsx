"use client";

import { motion } from "framer-motion";
import { Star, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GamifiedProgressProps {
  /** 0-1 completion progress. */
  progress: number;
  level: number;
  badges: number;
  totalBadges: number;
}

/** XP progress bar with level badge and achievement-star strip. */
export function GamifiedProgress({ progress, level, badges, totalBadges }: GamifiedProgressProps) {
  const pct = Math.min(100, Math.max(0, progress * 100));

  return (
    <div className="flex flex-col gap-2 rounded-theme-lg border border-border bg-surface px-4 py-3 shadow-theme-sm">
      <div className="flex items-center justify-between text-sm font-semibold text-foreground">
        <span className="flex items-center gap-2">
          <motion.span
            key={level}
            initial={{ scale: 0.5, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            {level}
          </motion.span>
          Level {level}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Trophy className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          {badges}/{totalBadges} badges
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-surface-hover">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, var(--app-accent), var(--app-primary))" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: totalBadges }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0.6, opacity: 0.4 }}
            animate={i < badges ? { scale: [0.6, 1.3, 1], opacity: 1 } : { scale: 0.8, opacity: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              i < badges ? "bg-accent/20 text-accent" : "bg-surface-hover text-muted-foreground"
            )}
          >
            <Star className="h-3.5 w-3.5" fill={i < badges ? "currentColor" : "none"} aria-hidden="true" />
          </motion.span>
        ))}
      </div>
    </div>
  );
}
