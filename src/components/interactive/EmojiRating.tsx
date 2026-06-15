"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EmojiOption, InteractiveValue } from "./types";

export interface EmojiRatingProps {
  /** Ordered emoji choices, worst to best. */
  options: EmojiOption[];
  value?: InteractiveValue;
  onChange?: (value: InteractiveValue) => void;
  readOnly?: boolean;
  "aria-label"?: string;
}

/**
 * Reusable emoji-based rating scale (😡 → 😍). Used for CSAT/rating
 * questions and for icon-only ratings (e.g. ⭐ App Store reviews) by
 * swapping the `emoji` glyphs in `options`.
 */
export function EmojiRating({
  options,
  value,
  onChange,
  readOnly,
  "aria-label": ariaLabel,
}: EmojiRatingProps) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel ?? "Emoji rating"}
      className="flex flex-wrap items-end justify-center gap-2 py-2 sm:gap-4"
    >
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <motion.button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={option.label ?? String(option.value)}
            disabled={readOnly}
            onClick={() => onChange?.(option.value)}
            whileHover={readOnly ? undefined : { scale: 1.18, rotate: [0, -8, 8, 0] }}
            whileTap={readOnly ? undefined : { scale: 0.9 }}
            animate={selected ? { scale: [1, 1.35, 1.1] } : { scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={cn(
              "focus-ring flex flex-col items-center gap-1.5 rounded-theme-lg px-2 py-2 transition-colors",
              selected ? "bg-primary/10 ring-2 ring-primary" : "hover:bg-surface-hover"
            )}
          >
            <span className="text-3xl leading-none sm:text-4xl" aria-hidden="true">
              {option.emoji}
            </span>
            {option.label && (
              <span
                className={cn(
                  "text-[11px] font-medium sm:text-xs",
                  selected ? "text-primary" : "text-muted-foreground"
                )}
              >
                {option.label}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
