"use client";

import { useMemo } from "react";
import { THEMES } from "@/data/themes";
import { useThemeStore } from "@/store/theme-store";
import { cn } from "@/lib/utils";
import { FILTER_CATEGORIES, type FilterCategory } from "@/types/theme";

interface FilterBarProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/**
 * Category filter chips ("All", "Light", "Dark", ...). Used both as a
 * horizontally-scrollable row (mobile/tablet toolbar) and as a vertical
 * list inside the sidebar (desktop).
 */
export function FilterBar({ orientation = "horizontal", className }: FilterBarProps) {
  const activeCategory = useThemeStore((state) => state.activeCategory);
  const setActiveCategory = useThemeStore((state) => state.setActiveCategory);

  const counts = useMemo(() => {
    const result: Record<FilterCategory, number> = {
      All: THEMES.length,
      Light: 0,
      Dark: 0,
      Modern: 0,
      Professional: 0,
      Creative: 0,
      Minimal: 0,
      Fun: 0,
      Interactive: 0,
    };
    for (const theme of THEMES) {
      result[theme.category] += 1;
    }
    return result;
  }, []);

  return (
    <div
      role="group"
      aria-label="Filter themes by category"
      className={cn(
        orientation === "horizontal"
          ? "flex gap-2 overflow-x-auto pb-1"
          : "flex flex-col gap-1",
        className
      )}
    >
      {FILTER_CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "focus-ring shrink-0 rounded-theme text-sm font-medium transition-colors duration-200",
              orientation === "horizontal"
                ? "rounded-full border px-3.5 py-1.5"
                : "flex items-center justify-between px-3 py-2",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-hover"
            )}
          >
            <span>{category}</span>
            <span
              className={cn(
                "text-xs",
                orientation === "horizontal" ? "ml-1.5 opacity-70" : "tabular-nums opacity-60"
              )}
            >
              {counts[category]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
