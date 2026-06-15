"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { IconOption, InteractiveValue } from "./types";

export interface AvatarSelectorProps {
  /** `glyph` holds the avatar emoji shown inside the circle. */
  options: IconOption[];
  value?: InteractiveValue;
  onChange?: (value: InteractiveValue) => void;
}

/** Replaces radio buttons with friendly avatar circles (👨 👩 🧑 👴 ...). */
export function AvatarSelector({ options, value, onChange }: AvatarSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Choose an avatar" className="grid grid-cols-2 gap-4 py-2 sm:grid-cols-4">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <motion.button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange?.(option.value)}
            whileHover={{ y: -4, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            animate={selected ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="focus-ring flex flex-col items-center gap-2 rounded-theme-lg p-2 text-center"
          >
            <span
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-full text-3xl shadow-theme-sm ring-2 transition-all sm:h-20 sm:w-20 sm:text-4xl",
                selected ? "bg-primary/10 ring-primary" : "bg-surface ring-border"
              )}
              aria-hidden="true"
            >
              {option.glyph}
            </span>
            <span className={cn("text-sm font-medium", selected ? "text-primary" : "text-foreground")}>
              {option.label}
            </span>
            {option.description && <span className="text-xs text-muted-foreground">{option.description}</span>}
          </motion.button>
        );
      })}
    </div>
  );
}
