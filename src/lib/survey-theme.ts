import type { ITheme } from "survey-core";
import { FlatDark, FlatLight } from "survey-core/themes";
import type { ThemeConfig } from "@/types/theme";
import { getContrastColor, mix, toSolid, withAlpha } from "./color";

/**
 * Maps a gallery `ThemeConfig` onto a SurveyJS `ITheme`. Every theme starts
 * from SurveyJS's "Flat" preset (the most neutral base) and then overrides
 * the color-related CSS variables with the theme's design tokens, so the
 * survey preview always matches the active gallery theme.
 */
export function createSurveyTheme(theme: ThemeConfig): ITheme {
  const base = theme.isDark ? FlatDark : FlatLight;
  const pageBackground = toSolid(theme.background, theme.surface);
  const tilt = theme.isDark ? "#ffffff" : "#000000";

  return {
    ...base,
    themeName: "flat",
    colorPalette: theme.isDark ? "dark" : "light",
    isPanelless: false,
    cssVariables: {
      ...base.cssVariables,
      "--sjs-general-backcolor": theme.surface,
      "--sjs-general-backcolor-dark": mix(theme.surface, tilt, 0.05),
      "--sjs-general-backcolor-dim": pageBackground,
      "--sjs-general-backcolor-dim-light": theme.surface,
      "--sjs-general-backcolor-dim-dark": mix(pageBackground, tilt, 0.05),
      "--sjs-general-forecolor": theme.text,
      "--sjs-general-forecolor-light": withAlpha(theme.text, 0.6),
      "--sjs-general-dim-forecolor": theme.text,
      "--sjs-general-dim-forecolor-light": theme.textMuted,
      "--sjs-primary-backcolor": theme.primary,
      "--sjs-primary-backcolor-light": withAlpha(theme.primary, 0.1),
      "--sjs-primary-backcolor-dark": mix(theme.primary, "#000000", 0.15),
      "--sjs-primary-forecolor": getContrastColor(theme.primary),
      "--sjs-primary-forecolor-light": withAlpha(getContrastColor(theme.primary), 0.25),
      "--sjs-base-unit": "8px",
      "--sjs-corner-radius": theme.radius,
      "--sjs-secondary-backcolor": theme.accent,
      "--sjs-secondary-backcolor-light": withAlpha(theme.accent, 0.1),
      "--sjs-secondary-backcolor-semi-light": withAlpha(theme.accent, 0.25),
      "--sjs-secondary-forecolor": getContrastColor(theme.accent),
      "--sjs-secondary-forecolor-light": withAlpha(getContrastColor(theme.accent), 0.25),
      "--sjs-shadow-small": `0px 1px 2px 0px ${theme.shadow}`,
      "--sjs-shadow-medium": `0px 2px 8px 0px ${theme.shadow}`,
      "--sjs-shadow-large": `0px 8px 24px 0px ${theme.shadow}`,
      "--sjs-shadow-inner": `0px 0px 0px 1px ${theme.border}`,
      "--sjs-border-light": theme.border,
      "--sjs-border-default": theme.border,
      "--sjs-border-inside": theme.border,
    },
  };
}
