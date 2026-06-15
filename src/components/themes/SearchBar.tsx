"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui";
import { useThemeStore } from "@/store/theme-store";
import { cn } from "@/lib/utils";

export function SearchBar({ className }: { className?: string }) {
  const searchQuery = useThemeStore((state) => state.searchQuery);
  const setSearchQuery = useThemeStore((state) => state.setSearchQuery);

  return (
    <div className={cn("relative", className)}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search themes by name or category..."
        aria-label="Search themes by name or category"
        className="pl-10 pr-10"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery("")}
          aria-label="Clear search"
          className="focus-ring absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
