"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { applyThemeToDocument } from "@/lib/apply-theme";
import { useSelectedTheme } from "@/hooks/useSelectedTheme";

/**
 * Applies the currently selected theme's design tokens to the document root
 * as CSS custom properties. Mounted once near the root of the app so every
 * themed surface — header, sidebar, cards, survey preview — updates
 * instantly when the user applies a new theme. Also configures Framer Motion
 * to respect the user's reduced-motion preference app-wide.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSelectedTheme();

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
