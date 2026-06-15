import { useMemo } from "react";
import { THEMES } from "@/data/themes";
import { useThemeStore } from "@/store/theme-store";
import type { ThemeConfig } from "@/types/theme";

/**
 * Returns the theme catalogue filtered by the gallery's search query,
 * active category chip, and "favorites only" toggle.
 */
export function useFilteredThemes(): ThemeConfig[] {
  const searchQuery = useThemeStore((state) => state.searchQuery);
  const activeCategory = useThemeStore((state) => state.activeCategory);
  const showFavoritesOnly = useThemeStore((state) => state.showFavoritesOnly);
  const favorites = useThemeStore((state) => state.favorites);

  return useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return THEMES.filter((theme) => {
      if (activeCategory !== "All" && theme.category !== activeCategory) {
        return false;
      }

      if (showFavoritesOnly && !favorites.includes(theme.id)) {
        return false;
      }

      if (!query) return true;

      return (
        theme.name.toLowerCase().includes(query) ||
        theme.category.toLowerCase().includes(query) ||
        theme.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, activeCategory, showFavoritesOnly, favorites]);
}
