"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormInput, Heart, LayoutGrid } from "lucide-react";
import { ColorPalette, FilterBar } from "@/components/themes";
import { useSelectedTheme } from "@/hooks/useSelectedTheme";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";

export function Sidebar() {
  const pathname = usePathname();
  const selectedTheme = useSelectedTheme();
  const showFavoritesOnly = useThemeStore((state) => state.showFavoritesOnly);
  const toggleShowFavoritesOnly = useThemeStore((state) => state.toggleShowFavoritesOnly);
  const isGalleryPage = pathname === "/";

  return (
    <aside className="sticky top-[61px] hidden h-[calc(100vh-61px)] w-64 shrink-0 flex-col gap-6 overflow-y-auto border-r border-border bg-surface/60 p-5 lg:flex">
      <nav aria-label="Primary navigation" className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => showFavoritesOnly && toggleShowFavoritesOnly()}
          aria-current={isGalleryPage && !showFavoritesOnly ? "page" : undefined}
          className={cn(
            "focus-ring flex items-center gap-2 rounded-theme px-3 py-2 text-sm font-medium transition-colors duration-200",
            isGalleryPage && !showFavoritesOnly
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
          )}
        >
          <LayoutGrid className="h-4 w-4" aria-hidden="true" />
          All Themes
        </button>
        <button
          type="button"
          onClick={() => !showFavoritesOnly && toggleShowFavoritesOnly()}
          aria-current={isGalleryPage && showFavoritesOnly ? "page" : undefined}
          className={cn(
            "focus-ring flex items-center gap-2 rounded-theme px-3 py-2 text-sm font-medium transition-colors duration-200",
            isGalleryPage && showFavoritesOnly
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
          )}
        >
          <Heart className="h-4 w-4" aria-hidden="true" />
          Favorites
        </button>
        <Link
          href="/form-elements"
          aria-current={pathname === "/form-elements" ? "page" : undefined}
          className={cn(
            "focus-ring flex items-center gap-2 rounded-theme px-3 py-2 text-sm font-medium transition-colors duration-200",
            pathname === "/form-elements"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
          )}
        >
          <FormInput className="h-4 w-4" aria-hidden="true" />
          All Form Elements
        </Link>
      </nav>

      <div>
        <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Categories
        </h2>
        <FilterBar orientation="vertical" />
      </div>

      <div className="mt-auto rounded-theme-lg border border-border bg-surface p-4 shadow-theme-sm">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Active Theme
        </h2>
        <p className="mb-3 text-sm font-semibold text-foreground">{selectedTheme.name}</p>
        <ColorPalette theme={selectedTheme} size="sm" />
      </div>
    </aside>
  );
}
