"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { InteractiveValue } from "./types";

const NPS_EMOJI = ["😡", "😠", "😟", "😕", "😐", "🙂", "😊", "😄", "😁", "🤩", "🥳"];

export interface EmojiNPSProps {
  value?: InteractiveValue;
  onChange?: (value: InteractiveValue) => void;
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  readOnly?: boolean;
}

/** Visual Net Promoter Score scale — a 0-10 row of mood-gradient emoji. */
export function EmojiNPS({
  value,
  onChange,
  min = 0,
  max = 10,
  minLabel,
  maxLabel,
  readOnly,
}: EmojiNPSProps) {
  const count = max - min + 1;
  const scores = Array.from({ length: count }, (_, i) => min + i);

  return (
    <div className="flex flex-col gap-2 py-2">
      <div role="radiogroup" aria-label="Emoji NPS score" className="flex items-end justify-between gap-1">
        {scores.map((score) => {
          const selected = value === score;
          const emojiIndex = Math.round(
            ((score - min) / Math.max(1, max - min)) * (NPS_EMOJI.length - 1)
          );
          return (
            <motion.button
              key={score}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`Score ${score}`}
              disabled={readOnly}
              onClick={() => onChange?.(score)}
              whileHover={readOnly ? undefined : { scale: 1.25, y: -4 }}
              whileTap={readOnly ? undefined : { scale: 0.9 }}
              animate={selected ? { scale: [1, 1.4, 1.15], y: [0, -6, -2] } : { scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={cn(
                "focus-ring flex flex-1 flex-col items-center gap-1 rounded-theme px-0.5 py-1.5",
                selected ? "bg-primary/10 ring-2 ring-primary" : "hover:bg-surface-hover"
              )}
            >
              <span className="text-xl sm:text-2xl" aria-hidden="true">
                {NPS_EMOJI[emojiIndex]}
              </span>
              <span
                className={cn(
                  "text-[10px] font-semibold tabular-nums sm:text-xs",
                  selected ? "text-primary" : "text-muted-foreground"
                )}
              >
                {score}
              </span>
            </motion.button>
          );
        })}
      </div>
      {(minLabel || maxLabel) && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
