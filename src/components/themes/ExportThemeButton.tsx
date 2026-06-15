"use client";

import { Download } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui";
import { downloadJSON, toFilename } from "@/lib/utils";
import type { ThemeConfig } from "@/types/theme";

interface ExportThemeButtonProps extends Omit<ButtonProps, "onClick"> {
  theme: ThemeConfig;
}

/** Downloads the given theme's full configuration as a formatted JSON file. */
export function ExportThemeButton({ theme, children, ...props }: ExportThemeButtonProps) {
  return (
    <Button
      type="button"
      onClick={() => downloadJSON(theme, toFilename(theme.name))}
      aria-label={`Export ${theme.name} theme as JSON`}
      {...props}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {children ?? "Export Theme"}
    </Button>
  );
}
