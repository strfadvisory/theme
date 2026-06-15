"use client";

import { FilterBar, ThemeGrid } from "@/components/themes";
import { SurveyPreviewSection } from "@/components/survey/SurveyPreviewSection";
import { THEMES } from "@/data/themes";
import { useFilteredThemes } from "@/hooks/useFilteredThemes";
import { useSelectedTheme } from "@/hooks/useSelectedTheme";
import { useThemeStore } from "@/store/theme-store";
import { HeroSection } from "./HeroSection";

export function GalleryView() {
  const selectedTheme = useSelectedTheme();
  const filteredThemes = useFilteredThemes();
  const resetFilters = useThemeStore((state) => state.resetFilters);

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <HeroSection />

      <SurveyPreviewSection theme={selectedTheme} />

      <section aria-labelledby="gallery-heading" className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="gallery-heading" className="text-xl font-semibold tracking-tight text-foreground">
              Theme Gallery
            </h2>
            <p className="text-sm text-muted-foreground">
              Showing {filteredThemes.length} of {THEMES.length} themes
            </p>
          </div>
          <FilterBar orientation="horizontal" className="lg:hidden" />
        </div>

        <ThemeGrid themes={filteredThemes} onClearFilters={resetFilters} />
      </section>
    </div>
  );
}
