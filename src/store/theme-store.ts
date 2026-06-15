import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_THEME_ID } from "@/data/themes";
import { STORAGE_KEY } from "@/constants/site";
import type { FilterCategory } from "@/types/theme";

interface ThemeStoreState {
  /** The theme currently applied across the whole application. */
  selectedThemeId: string;
  /** Theme IDs the user has marked as favorite. */
  favorites: string[];
  /** Theme ID currently shown in the preview modal, if any. */
  previewThemeId: string | null;

  /** Free-text search across theme name and category. */
  searchQuery: string;
  /** Active category filter chip. */
  activeCategory: FilterCategory;
  /** When true, the gallery only shows favorited themes. */
  showFavoritesOnly: boolean;

  setSelectedTheme: (id: string) => void;
  toggleFavorite: (id: string) => void;
  openPreview: (id: string) => void;
  closePreview: () => void;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: FilterCategory) => void;
  toggleShowFavoritesOnly: () => void;
  resetFilters: () => void;
}

export const useThemeStore = create<ThemeStoreState>()(
  persist(
    (set) => ({
      selectedThemeId: DEFAULT_THEME_ID,
      favorites: [],
      previewThemeId: null,

      searchQuery: "",
      activeCategory: "All",
      showFavoritesOnly: false,

      setSelectedTheme: (id) => set({ selectedThemeId: id }),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),

      openPreview: (id) => set({ previewThemeId: id }),
      closePreview: () => set({ previewThemeId: null }),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setActiveCategory: (category) => set({ activeCategory: category }),
      toggleShowFavoritesOnly: () =>
        set((state) => ({ showFavoritesOnly: !state.showFavoritesOnly })),

      resetFilters: () =>
        set({ searchQuery: "", activeCategory: "All", showFavoritesOnly: false }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        selectedThemeId: state.selectedThemeId,
        favorites: state.favorites,
      }),
    }
  )
);
