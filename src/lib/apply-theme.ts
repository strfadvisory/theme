import type { ThemeConfig } from "@/types/theme";
import { getContrastColor, parsePx, shade, toSolid, withAlpha } from "./color";

/**
 * Applies a theme's design tokens to `document.documentElement` as CSS
 * custom properties. The Tailwind `@theme inline` block in `globals.css`
 * maps these onto utility classes (`bg-surface`, `text-foreground`, ...),
 * so every themed component updates instantly with no re-render required.
 */
export function applyThemeToDocument(theme: ThemeConfig): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const lighten = theme.isDark ? 0.12 : -0.08;
  const radiusPx = parsePx(theme.radius);

  const vars: Record<string, string> = {
    "--app-background": theme.background,
    "--app-background-solid": toSolid(theme.background, theme.surface),
    "--app-surface": theme.surface,
    "--app-surface-hover": shade(toSolid(theme.surface, theme.background), theme.isDark ? 0.06 : -0.03),
    "--app-foreground": theme.text,
    "--app-muted-foreground": theme.textMuted,
    "--app-primary": theme.primary,
    "--app-primary-foreground": getContrastColor(theme.primary),
    "--app-primary-hover": shade(theme.primary, lighten),
    "--app-secondary": theme.secondary,
    "--app-secondary-foreground": getContrastColor(theme.secondary),
    "--app-accent": theme.accent,
    "--app-accent-foreground": getContrastColor(theme.accent),
    "--app-border": theme.border,
    "--app-ring": withAlpha(theme.primary, 0.45),
    "--app-radius": theme.radius,
    "--app-radius-sm": `${Math.max(radiusPx * 0.5, 0)}px`,
    "--app-radius-lg": `${radiusPx * 1.5}px`,
    "--app-radius-xl": `${radiusPx * 2}px`,
    "--app-shadow-color": theme.shadow,
    "--app-shadow-sm": `0 1px 2px 0 ${theme.shadow}`,
    "--app-shadow-md": `0 4px 16px -2px ${theme.shadow}`,
    "--app-shadow-lg": `0 16px 40px -8px ${theme.shadow}`,
    "--app-shadow-xl": `0 24px 64px -12px ${theme.shadow}`,
    "--app-blur": theme.glass ? "16px" : "0px",
  };

  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }

  root.dataset.theme = theme.id;
  root.dataset.mode = theme.isDark ? "dark" : "light";
}
