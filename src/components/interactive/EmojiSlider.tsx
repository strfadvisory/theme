"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import type { EmojiOption, InteractiveValue } from "./types";

export interface EmojiSliderProps {
  /** Ordered steps, each with the emoji/label shown at that position. */
  options: EmojiOption[];
  value?: InteractiveValue;
  onChange?: (value: InteractiveValue) => void;
  minLabel?: string;
  maxLabel?: string;
}

/** A range slider whose thumb shows the emoji for the current step. */
export function EmojiSlider({ options, value, onChange, minLabel, maxLabel }: EmojiSliderProps) {
  const id = useId();
  const values = options.map((o) => o.value);
  const rawIndex = value !== undefined ? values.indexOf(value) : -1;
  const safeIndex = rawIndex === -1 ? Math.floor(options.length / 2) : rawIndex;
  const current = options[safeIndex];
  const pct = options.length > 1 ? (safeIndex / (options.length - 1)) * 100 : 50;

  return (
    <div className="flex flex-col gap-3 py-4">
      <div className="relative h-12">
        <div
          className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 rounded-full"
          style={{
            background: "linear-gradient(90deg, var(--app-accent), var(--app-secondary), var(--app-primary))",
          }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-2xl shadow-theme-md ring-2 ring-primary"
          animate={{ left: `${pct}%`, scale: [1.2, 1] }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          aria-hidden="true"
        >
          {current?.emoji}
        </motion.div>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={Math.max(options.length - 1, 0)}
        step={1}
        value={safeIndex}
        onChange={(e) => onChange?.(values[Number(e.target.value)])}
        className="w-full cursor-pointer accent-[var(--app-primary)]"
        aria-label={current?.label ?? "Emoji slider"}
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{minLabel}</span>
        <span className="text-sm font-semibold text-foreground">{current?.label}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
