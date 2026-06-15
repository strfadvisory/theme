"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatBubbleProps {
  role: "ai" | "user";
  children: ReactNode;
}

/** A single chat message bubble with an AI or user avatar. */
export function ChatBubble({ role, children }: ChatBubbleProps) {
  const isAI = role === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("flex items-start gap-2", isAI ? "justify-start" : "justify-end")}
    >
      {isAI && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-theme-lg px-4 py-3 text-sm shadow-theme-sm",
          isAI ? "rounded-tl-sm bg-surface-hover text-foreground" : "rounded-tr-sm bg-primary text-primary-foreground"
        )}
      >
        {children}
      </div>
      {!isAI && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-hover text-foreground">
          <User className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </motion.div>
  );
}

/** Animated "..." indicator shown while the AI assistant is "typing". */
export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Bot className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="flex items-center gap-1 rounded-theme-lg rounded-tl-sm bg-surface-hover px-4 py-3 shadow-theme-sm">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-muted-foreground"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
