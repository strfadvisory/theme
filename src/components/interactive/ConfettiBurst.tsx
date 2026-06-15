"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface ConfettiBurstProps {
  active: boolean;
  pieces?: number;
}

const COLORS = ["#ff5d8f", "#7c3aed", "#00e5ff", "#ffd60a", "#34c759", "#fb8500"];

/** A short burst of falling confetti rectangles, shown while `active` is true. */
export function ConfettiBurst({ active, pieces = 60 }: ConfettiBurstProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.6 + Math.random() * 1.2,
        rotate: Math.random() * 360,
        color: COLORS[i % COLORS.length],
        width: 6 + Math.random() * 6,
        height: 10 + Math.random() * 6,
        drift: (Math.random() - 0.5) * 200,
      })),
    [pieces]
  );

  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden" aria-hidden="true">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: "-10%", x: `${p.x}%`, rotate: 0 }}
              animate={{
                opacity: [1, 1, 0],
                y: "120%",
                x: `calc(${p.x}% + ${p.drift}px)`,
                rotate: p.rotate,
              }}
              transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
              style={{
                position: "absolute",
                top: 0,
                width: p.width,
                height: p.height,
                background: p.color,
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
