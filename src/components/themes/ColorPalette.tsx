import { toSolid } from "@/lib/color";
import { cn } from "@/lib/utils";
import type { ThemeConfig } from "@/types/theme";

interface ColorPaletteProps {
  theme: ThemeConfig;
  size?: "sm" | "md";
  className?: string;
}

/** Renders a row of swatches representing a theme's core color tokens. */
export function ColorPalette({ theme, size = "md", className }: ColorPaletteProps) {
  const swatches = [
    { label: "Background", color: toSolid(theme.background, theme.surface) },
    { label: "Surface", color: toSolid(theme.surface, theme.background) },
    { label: "Primary", color: theme.primary },
    { label: "Secondary", color: theme.secondary },
    { label: "Accent", color: theme.accent },
  ];

  const dimension = size === "sm" ? "h-5 w-5" : "h-7 w-7";

  return (
    <ul className={cn("flex items-center", className)} aria-label={`${theme.name} color palette`}>
      {swatches.map((swatch, index) => (
        <li
          key={swatch.label}
          title={`${swatch.label}: ${swatch.color}`}
          style={{
            backgroundColor: swatch.color,
            zIndex: swatches.length - index,
            marginLeft: index === 0 ? 0 : "-0.4rem",
          }}
          className={cn(
            dimension,
            "rounded-full border-2 border-surface shadow-theme-sm ring-1 ring-black/5"
          )}
        />
      ))}
    </ul>
  );
}
