import { Star } from "lucide-react";
import { getContrastColor } from "@/lib/color";
import { cn } from "@/lib/utils";
import type { ThemeConfig } from "@/types/theme";

interface ThemePreviewThumbnailProps {
  theme: ThemeConfig;
  className?: string;
}

/**
 * A miniature mock UI rendered entirely with a theme's own design tokens
 * (via inline styles), independent of the app's currently active theme.
 * Gives every gallery card an instant, accurate visual preview.
 */
export function ThemePreviewThumbnail({ theme, className }: ThemePreviewThumbnailProps) {
  const onPrimary = getContrastColor(theme.primary);

  return (
    <div
      style={{ background: theme.background, color: theme.text }}
      className={cn("relative aspect-[16/10] w-full overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        style={{ background: theme.surface, borderColor: theme.border }}
        className="flex items-center gap-1.5 border-b px-3 py-2"
      >
        <span style={{ background: theme.primary }} className="h-2 w-2 rounded-full" />
        <span style={{ background: theme.secondary }} className="h-2 w-2 rounded-full" />
        <span style={{ background: theme.accent }} className="h-2 w-2 rounded-full" />
        <div
          style={{ background: theme.border }}
          className="ml-2 h-1.5 w-2/3 max-w-[55%] rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2 p-3">
        <div
          style={{
            background: theme.surface,
            borderColor: theme.border,
            borderRadius: theme.radius,
          }}
          className="space-y-1.5 border p-2"
        >
          <div style={{ background: theme.text, opacity: 0.85 }} className="h-2 w-3/4 rounded-full" />
          <div style={{ background: theme.textMuted, opacity: 0.6 }} className="h-1.5 w-1/2 rounded-full" />
        </div>

        <div className="flex items-center gap-2">
          <span
            style={{ background: theme.primary, color: onPrimary, borderRadius: theme.radius }}
            className="px-3 py-1 text-[10px] font-semibold"
          >
            Submit
          </span>
          <span
            style={{ borderColor: theme.border, color: theme.textMuted, borderRadius: theme.radius }}
            className="border px-3 py-1 text-[10px] font-medium"
          >
            Cancel
          </span>
        </div>

        <div className="flex items-center gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3 w-3"
              style={{ color: theme.accent, fill: theme.accent }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
