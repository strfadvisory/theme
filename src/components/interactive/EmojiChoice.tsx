"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EmojiOption, InteractiveMultiValue, InteractiveValue } from "./types";

interface EmojiChoiceGridProps {
  options: EmojiOption[];
  value?: InteractiveValue | InteractiveMultiValue;
  onChange?: (value: InteractiveValue | InteractiveMultiValue) => void;
  multiple?: boolean;
}

function isOptionSelected(
  value: InteractiveValue | InteractiveMultiValue | undefined,
  optionValue: InteractiveValue,
  multiple?: boolean
): boolean {
  if (multiple) return Array.isArray(value) && value.includes(optionValue);
  return value === optionValue;
}

function EmojiChoiceGrid({ options, value, onChange, multiple }: EmojiChoiceGridProps) {
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
    <div
      role={multiple ? "group" : "radiogroup"}
      className="grid gap-3"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(96px, 1fr))" }}
    >
      {options.map((option) => {
        const selected = isOptionSelected(value, option.value, multiple);
        return (
          <motion.button
            key={option.value}
            type="button"
            role={multiple ? "checkbox" : "radio"}
            aria-checked={selected}
            aria-label={option.label ?? String(option.value)}
            onClick={() => handleSelect(option.value)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={selected ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "focus-ring relative flex flex-col items-center gap-1.5 rounded-theme-lg border px-3 py-3 text-center transition-colors",
              selected ? "border-primary bg-primary/10" : "border-border bg-surface hover:bg-surface-hover"
            )}
          >
            {selected && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-2.5 w-2.5" aria-hidden="true" />
              </span>
            )}
            <span className="text-3xl leading-none" aria-hidden="true">
              {option.emoji}
            </span>
            {option.label && (
              <span className={cn("text-xs font-medium", selected ? "text-primary" : "text-foreground")}>
                {option.label}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

/** Single-select emoji choice grid (radio behavior). */
export function EmojiRadio(props: Omit<EmojiChoiceGridProps, "multiple">) {
  return <EmojiChoiceGrid {...props} multiple={false} />;
}

/** Multi-select emoji choice grid (checkbox behavior). */
export function EmojiCheckbox(props: Omit<EmojiChoiceGridProps, "multiple">) {
  return <EmojiChoiceGrid {...props} multiple />;
}
