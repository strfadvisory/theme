"use client";

import dynamic from "next/dynamic";
import { Check, Heart } from "lucide-react";
import { Badge, Button, Modal } from "@/components/ui";
import { SurveyPreviewSkeleton } from "@/components/survey/SurveyPreviewSkeleton";
import { usePreviewTheme } from "@/hooks/useSelectedTheme";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";
import { ColorPalette } from "./ColorPalette";
import { ExportThemeButton } from "./ExportThemeButton";

const SurveyPreview = dynamic(
  () => import("@/components/survey/SurveyPreview").then((mod) => mod.SurveyPreview),
  { ssr: false, loading: () => <SurveyPreviewSkeleton /> }
);

/**
 * Focused, in-depth preview of a single theme: palette, description, and the
 * sample survey rendered live — without affecting the app's active theme
 * until the user clicks "Apply Theme".
 */
export function ThemePreviewModal() {
  const theme = usePreviewTheme();
  const closePreview = useThemeStore((state) => state.closePreview);
  const selectedThemeId = useThemeStore((state) => state.selectedThemeId);
  const favorites = useThemeStore((state) => state.favorites);
  const toggleFavorite = useThemeStore((state) => state.toggleFavorite);
  const setSelectedTheme = useThemeStore((state) => state.setSelectedTheme);

  const isApplied = !!theme && selectedThemeId === theme.id;
  const isFavorite = !!theme && favorites.includes(theme.id);

  return (
    <Modal open={!!theme} onClose={closePreview} title={theme?.name ?? "Theme preview"}>
      {theme && (
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{theme.category}</Badge>
              {isApplied && (
                <Badge variant="primary">
                  <Check className="h-3 w-3" aria-hidden="true" />
                  Applied
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground">{theme.description}</p>

            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Color Palette
              </h3>
              <ColorPalette theme={theme} />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                type="button"
                onClick={() => setSelectedTheme(theme.id)}
                disabled={isApplied}
              >
                {isApplied ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Applied
                  </>
                ) : (
                  "Apply Theme"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={() => toggleFavorite(theme.id)}>
                <Heart
                  className={cn("h-4 w-4", isFavorite && "fill-current text-rose-500")}
                  aria-hidden="true"
                />
                {isFavorite ? "Remove Favorite" : "Add to Favorites"}
              </Button>
              <ExportThemeButton theme={theme} variant="secondary" />
            </div>
          </div>

          <div className="min-h-[420px] overflow-hidden rounded-theme-lg border border-border">
            <SurveyPreview theme={theme} />
          </div>
        </div>
      )}
    </Modal>
  );
}
