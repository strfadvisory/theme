"use client";

import { motion } from "framer-motion";
import { Heart, Palette, Sparkles, Zap } from "lucide-react";
import { THEMES } from "@/data/themes";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-theme-xl border border-border bg-surface px-6 py-10 shadow-theme-sm sm:px-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="max-w-2xl"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Theme Marketplace
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Find the perfect look for your <span className="text-primary">SurveyJS</span> forms
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Browse {THEMES.length} professionally designed themes, preview any of them instantly, and
          watch your entire survey transform in real time — no page refresh required.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Palette className="h-4 w-4 text-primary" aria-hidden="true" />
            {THEMES.length} curated themes
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
            Instant live switching
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-primary" aria-hidden="true" />
            Save your favorites
          </div>
        </div>
      </motion.div>
    </section>
  );
}
