"use client";

import { Heart, Sparkles } from "lucide-react";
import { ExportThemeButton, SearchBar } from "@/components/themes";
import { IconButton } from "@/components/ui";
import { SITE_CONFIG } from "@/constants/site";
import { THEMES } from "@/data/themes";
import { useSelectedTheme } from "@/hooks/useSelectedTheme";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";

export function Header() {
  const selectedTheme = useSelectedTheme();
  const showFavoritesOnly = useThemeStore((state) => state.showFavoritesOnly);
  const toggleShowFavoritesOnly = useThemeStore((state) => state.toggleShowFavoritesOnly);
  const favoritesCount = useThemeStore((state) => state.favorites.length);

  return (
    <header className="glass-surface sticky top-0 z-30 border-b border-border bg-surface/90">
      <div className="mx-auto flex max-w-screen-2xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-theme bg-primary text-primary-foreground shadow-theme-sm">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold leading-tight text-foreground">
              {SITE_CONFIG.shortName}
            </span>
            <span className="text-xs text-muted-foreground">{THEMES.length} themes available</span>
          </span>
        </div>

        <div className="flex-1">
          <SearchBar className="mx-auto max-w-xl" />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <IconButton
              aria-label={showFavoritesOnly ? "Show all themes" : "Show favorite themes only"}
              aria-pressed={showFavoritesOnly}
              active={showFavoritesOnly}
              onClick={toggleShowFavoritesOnly}
            >
              <Heart className={cn("h-4 w-4", showFavoritesOnly && "fill-current")} aria-hidden="true" />
            </IconButton>
            {favoritesCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-none text-accent-foreground"
              >
                {favoritesCount}
              </span>
            )}
          </div>

          <ExportThemeButton theme={selectedTheme} variant="secondary" size="sm" className="hidden sm:flex">
            Export
          </ExportThemeButton>
          <ExportThemeButton theme={selectedTheme} variant="secondary" size="icon" className="sm:hidden">
            <span className="sr-only">Export theme</span>
          </ExportThemeButton>
        </div>
      </div>
    </header>
  );
}
