"use client";

import { motion } from "framer-motion";
import { Check, Eye, Heart } from "lucide-react";
import { Badge, Button, Card, IconButton } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";
import type { ThemeConfig } from "@/types/theme";
import { ColorPalette } from "./ColorPalette";
import { ThemePreviewThumbnail } from "./ThemePreviewThumbnail";

interface ThemeCardProps {
  theme: ThemeConfig;
  index?: number;
}

export function ThemeCard({ theme, index = 0 }: ThemeCardProps) {
  const isApplied = useThemeStore((state) => state.selectedThemeId === theme.id);
  const isFavorite = useThemeStore((state) => state.favorites.includes(theme.id));
  const toggleFavorite = useThemeStore((state) => state.toggleFavorite);
  const setSelectedTheme = useThemeStore((state) => state.setSelectedTheme);
  const openPreview = useThemeStore((state) => state.openPreview);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: (index % 8) * 0.04 }}
      className="list-none"
    >
      <Card className="flex h-full flex-col overflow-hidden p-0 transition-shadow duration-300 hover:shadow-theme-lg">
        <div className="relative">
          <ThemePreviewThumbnail theme={theme} className="rounded-t-[calc(var(--radius-theme-lg)-1px)]" />

          {isApplied && (
            <Badge variant="primary" className="absolute left-2 top-2 gap-1 shadow-theme-sm">
              <Check className="h-3 w-3" aria-hidden="true" />
              Applied
            </Badge>
          )}

          <IconButton
            aria-label={isFavorite ? `Remove ${theme.name} from favorites` : `Add ${theme.name} to favorites`}
            aria-pressed={isFavorite}
            onClick={() => toggleFavorite(theme.id)}
            className={cn(
              "absolute right-2 top-2 border-none bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 hover:text-white",
              isFavorite && "text-rose-400 hover:text-rose-300"
            )}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} aria-hidden="true" />
          </IconButton>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-tight text-foreground">{theme.name}</h3>
            <Badge className="shrink-0">{theme.category}</Badge>
          </div>

          <p className="line-clamp-2 text-sm text-muted-foreground">{theme.description}</p>

          <ColorPalette theme={theme} size="sm" />

          <div className="mt-auto flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => openPreview(theme.id)}
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              Preview
            </Button>
            <Button
              type="button"
              variant={isApplied ? "secondary" : "primary"}
              size="sm"
              className="flex-1"
              onClick={() => setSelectedTheme(theme.id)}
              disabled={isApplied}
              aria-label={isApplied ? `${theme.name} is the active theme` : `Apply ${theme.name} theme`}
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
          </div>
        </div>
      </Card>
    </motion.li>
  );
}
