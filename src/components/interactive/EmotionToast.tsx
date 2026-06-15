"use client";

import { AnimatePresence, motion } from "framer-motion";

export interface EmotionToastProps {
  emoji: string | null;
  message?: string;
}

/**
 * A small animated emoji toast that pops up after each answer — used by the
 * "Customer Emotion Journey" theme to give visual feedback after every
 * question. The host container must be `position: relative`.
 */
export function EmotionToast({ emoji, message }: EmotionToastProps) {
  return (
    <AnimatePresence>
      {emoji && (
        <motion.div
          key={`${emoji}-${message ?? ""}`}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="pointer-events-none absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 shadow-theme-lg"
          role="status"
        >
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.6 }}
            aria-hidden="true"
          >
            {emoji}
          </motion.span>
          {message && <span className="text-sm font-medium text-foreground">{message}</span>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
