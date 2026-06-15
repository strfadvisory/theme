"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EmojiOption, InteractiveMultiValue, InteractiveValue } from "./types";

export interface ReactionSelectorProps {
  options: EmojiOption[];
  value?: InteractiveValue | InteractiveMultiValue;
  onChange?: (value: InteractiveValue | InteractiveMultiValue) => void;
  multiple?: boolean;
}

/** Facebook-style reaction bar (👍 ❤️ 😂 😮 😢 😡) with pop-up hover & bounce select. */
export function ReactionSelector({ options, value, onChange, multiple }: ReactionSelectorProps) {
  const isSelected = (optionValue: InteractiveValue) =>
    multiple ? Array.isArray(value) && value.includes(optionValue) : value === optionValue;

  const handleSelect = (optionValue: InteractiveValue) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      const next = current.includes(optionValue)
        ? current.filter((v) => v !== optionValue)
        : [...current, optionValue];
      onChange?.(next);
    } else {
      onChange?.(optionValue);
    }
  };

  return (
    <div role="group" aria-label="Reactions" className="flex flex-wrap items-center gap-1.5 py-2 sm:gap-2">
      {options.map((option) => {
        const selected = isSelected(option.value);
        return (
          <motion.button
            key={option.value}
            type="button"
            aria-pressed={selected}
            aria-label={option.label ?? String(option.value)}
            onClick={() => handleSelect(option.value)}
            whileHover={{ scale: 1.3, y: -6, rotate: [0, -10, 10, 0] }}
            whileTap={{ scale: 0.85 }}
            animate={selected ? { scale: [1, 1.4, 1.1], y: [0, -8, 0] } : { scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={cn(
              "focus-ring flex flex-col items-center gap-1 rounded-full px-3 py-2 text-2xl transition-colors sm:text-3xl",
              selected ? "bg-primary/10 ring-2 ring-primary" : "hover:bg-surface-hover"
            )}
          >
            <span aria-hidden="true">{option.emoji}</span>
            {option.label && <span className="text-[10px] font-medium text-muted-foreground">{option.label}</span>}
          </motion.button>
        );
      })}
    </div>
  );
}
