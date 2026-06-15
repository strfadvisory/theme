"use client";

import { AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";
import { EmptyState } from "@/components/ui";
import type { ThemeConfig } from "@/types/theme";
import { ThemeCard } from "./ThemeCard";

interface ThemeGridProps {
  themes: ThemeConfig[];
  onClearFilters?: () => void;
}

/** Responsive theme card grid: 1 column on mobile, 2 on tablet, 4 on desktop. */
export function ThemeGrid({ themes, onClearFilters }: ThemeGridProps) {
  if (themes.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No themes found"
        description="Try adjusting your search or selecting a different category filter."
        action={
          onClearFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="focus-ring rounded-theme text-sm font-medium text-primary hover:underline"
            >
              Clear filters
            </button>
          )
        }
      />
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <AnimatePresence initial={false}>
        {themes.map((theme, index) => (
          <ThemeCard key={theme.id} theme={theme} index={index} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
