import { useMemo } from "react";
import { DEFAULT_THEME_ID, THEMES, getThemeById } from "@/data/themes";
import { useThemeStore } from "@/store/theme-store";
import type { ThemeConfig } from "@/types/theme";

const FALLBACK_THEME: ThemeConfig = getThemeById(DEFAULT_THEME_ID) ?? THEMES[0];

/** Returns the full `ThemeConfig` for the theme currently applied app-wide. */
export function useSelectedTheme(): ThemeConfig {
  const selectedThemeId = useThemeStore((state) => state.selectedThemeId);
  return useMemo(() => getThemeById(selectedThemeId) ?? FALLBACK_THEME, [selectedThemeId]);
}

/** Returns the `ThemeConfig` currently open in the preview modal, if any. */
export function usePreviewTheme(): ThemeConfig | null {
  const previewThemeId = useThemeStore((state) => state.previewThemeId);
  return useMemo(
    () => (previewThemeId ? getThemeById(previewThemeId) ?? null : null),
    [previewThemeId]
  );
}
