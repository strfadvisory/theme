"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EmojiOption, InteractiveValue } from "./types";

export interface MoodSelectorProps {
  options: EmojiOption[];
  value?: InteractiveValue;
  onChange?: (value: InteractiveValue) => void;
}

/** Animated mood cards (😀 Happy ... 😡 Angry) with staggered entrance and a gentle bob when selected. */
export function MoodSelector({ options, value, onChange }: MoodSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Mood" className="grid grid-cols-2 gap-3 py-2 sm:grid-cols-5">
      {options.map((option, index) => {
        const selected = value === option.value;
        return (
          <motion.button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange?.(option.value)}
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: selected ? [1, 1.12, 1.05] : 1,
            }}
            transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
            whileHover={{ scale: 1.08, rotate: [0, -6, 6, 0] }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "focus-ring flex flex-col items-center gap-2 rounded-theme-lg border px-3 py-4 text-center transition-colors",
              selected
                ? "border-primary bg-primary/10 shadow-theme-md"
                : "border-border bg-surface hover:bg-surface-hover"
            )}
          >
            <motion.span
              className="text-4xl leading-none"
              aria-hidden="true"
              animate={selected ? { y: [0, -6, 0] } : { y: 0 }}
              transition={{ duration: 0.6, repeat: selected ? Infinity : 0, repeatDelay: 1 }}
            >
              {option.emoji}
            </motion.span>
            <span className={cn("text-sm font-semibold", selected ? "text-primary" : "text-foreground")}>
              {option.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
