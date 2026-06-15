"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EmojiOption, InteractiveValue } from "./types";

export interface EmojiMatrixRow {
  value: string;
  label: string;
}

export interface EmojiMatrixProps {
  rows: EmojiMatrixRow[];
  columns: EmojiOption[];
  value: Record<string, InteractiveValue>;
  onChange: (rowValue: string, colValue: InteractiveValue) => void;
}

/** A matrix question where every row gets its own emoji-rating scale. */
export function EmojiMatrix({ rows, columns, value, onChange }: EmojiMatrixProps) {
  const gridTemplateColumns = `minmax(110px, 1fr) repeat(${columns.length}, minmax(44px, auto))`;

  return (
    <div className="flex flex-col gap-1 overflow-x-auto">
      <div className="grid items-end gap-1 px-1 pb-1" style={{ gridTemplateColumns }}>
        <div />
        {columns.map((col) => (
          <div key={col.value} className="flex flex-col items-center gap-1 text-center">
            <span className="text-xl" aria-hidden="true">
              {col.emoji}
            </span>
            {col.label && <span className="text-[10px] text-muted-foreground">{col.label}</span>}
          </div>
        ))}
      </div>
      {rows.map((row, rowIndex) => (
        <div
          key={row.value}
          role="radiogroup"
          aria-label={row.label}
          className={cn(
            "grid items-center gap-1 rounded-theme px-1 py-1.5",
            rowIndex % 2 === 1 && "bg-surface-hover/50"
          )}
          style={{ gridTemplateColumns }}
        >
          <span className="truncate pr-2 text-sm font-medium text-foreground">{row.label}</span>
          {columns.map((col) => {
            const selected = value[row.value] === col.value;
            return (
              <motion.button
                key={col.value}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`${row.label}: ${col.label ?? col.value}`}
                onClick={() => onChange(row.value, col.value)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={selected ? { scale: [1, 1.3, 1.05] } : { scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={cn(
                  "focus-ring mx-auto flex h-9 w-9 items-center justify-center rounded-full text-lg sm:h-10 sm:w-10 sm:text-xl",
                  selected ? "bg-primary/15 ring-2 ring-primary" : "hover:bg-surface-hover"
                )}
              >
                <span aria-hidden="true">{col.emoji}</span>
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
