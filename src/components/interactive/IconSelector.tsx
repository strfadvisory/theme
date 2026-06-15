"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IconOption, InteractiveMultiValue, InteractiveValue } from "./types";

export interface IconSelectorProps {
  /** Each option provides either a Lucide `icon` or an emoji `glyph`. */
  options: IconOption[];
  value?: InteractiveValue | InteractiveMultiValue;
  onChange?: (value: InteractiveValue | InteractiveMultiValue) => void;
  multiple?: boolean;
}

/** Icon-driven choice grid — replaces text labels with icons or brand glyphs. */
export function IconSelector({ options, value, onChange, multiple }: IconSelectorProps) {
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
    <div
      role={multiple ? "group" : "radiogroup"}
      className="grid grid-cols-2 gap-3 py-2 sm:grid-cols-3 md:grid-cols-4"
    >
      {options.map((option) => {
        const selected = isSelected(option.value);
        const Icon = option.icon;
        return (
          <motion.button
            key={option.value}
            type="button"
            role={multiple ? "checkbox" : "radio"}
            aria-checked={selected}
            onClick={() => handleSelect(option.value)}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            animate={selected ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "focus-ring relative flex flex-col items-center gap-2 rounded-theme-lg border px-3 py-4 text-center transition-colors",
              selected
                ? "border-primary bg-primary/10 shadow-theme-md"
                : "border-border bg-surface hover:bg-surface-hover"
            )}
          >
            {selected && (
              <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
            )}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
              {Icon ? (
                <Icon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <span aria-hidden="true">{option.glyph}</span>
              )}
            </span>
            <span className={cn("text-sm font-semibold", selected ? "text-primary" : "text-foreground")}>
              {option.label}
            </span>
            {option.description && <span className="text-xs text-muted-foreground">{option.description}</span>}
          </motion.button>
        );
      })}
    </div>
  );
}
