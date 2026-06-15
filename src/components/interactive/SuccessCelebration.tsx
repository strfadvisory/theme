"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ConfettiBurst } from "./ConfettiBurst";

export interface SuccessCelebrationProps {
  active: boolean;
  emoji?: string;
  title?: string;
  message?: string;
}

/** Full-preview completion celebration: confetti burst + bouncing emoji card. */
export function SuccessCelebration({
  active,
  emoji = "🎉",
  title = "Awesome!",
  message,
}: SuccessCelebrationProps) {
  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
          <ConfettiBurst active={active} />
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="flex flex-col items-center gap-2 rounded-theme-xl border border-border bg-surface px-8 py-6 text-center shadow-theme-xl"
          >
            <motion.span
              className="text-5xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.6 }}
              aria-hidden="true"
            >
              {emoji}
            </motion.span>
            <p className="text-lg font-bold text-foreground">{title}</p>
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
