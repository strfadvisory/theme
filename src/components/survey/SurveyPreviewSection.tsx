"use client";

import dynamic from "next/dynamic";
import { Card } from "@/components/ui";
import { SurveyPreviewSkeleton } from "./SurveyPreviewSkeleton";
import type { ThemeConfig } from "@/types/theme";

const SurveyPreview = dynamic(
  () => import("./SurveyPreview").then((mod) => mod.SurveyPreview),
  { ssr: false, loading: () => <SurveyPreviewSkeleton /> }
);

interface SurveyPreviewSectionProps {
  theme: ThemeConfig;
}

/** Card-wrapped, lazily-loaded SurveyJS preview that tracks the active theme. */
export function SurveyPreviewSection({ theme }: SurveyPreviewSectionProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-6 py-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Live Survey Preview</h2>
          <p className="text-sm text-muted-foreground">
            Rendered with the{" "}
            <span className="font-medium text-primary">{theme.name}</span> theme
          </p>
        </div>
      </div>
      <SurveyPreview theme={theme} />
    </Card>
  );
}
