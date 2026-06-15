"use client";

import dynamic from "next/dynamic";
import { Layers } from "lucide-react";
import { FORM_ELEMENT_ITEM_COUNT, FORM_ELEMENT_SECTIONS } from "@/data/form-elements";
import { FormElementsGridSkeleton } from "./FormElementsGridSkeleton";

const FormElementsGrid = dynamic(
  () => import("./FormElementsGrid").then((mod) => mod.FormElementsGrid),
  { ssr: false, loading: () => <FormElementsGridSkeleton /> }
);

/** Top-level "All Form Elements" page: intro header plus the full component grid. */
export function FormElementsShowcase() {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="relative overflow-hidden rounded-theme-xl border border-border bg-surface px-6 py-10 shadow-theme-sm sm:px-10 sm:py-14">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Layers className="h-3.5 w-3.5" aria-hidden="true" />
          Component Showcase
        </span>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Every <span className="text-primary">SurveyJS</span> form element, all in one place
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {FORM_ELEMENT_ITEM_COUNT} fully interactive examples across {FORM_ELEMENT_SECTIONS.length} sections —
          inputs, choices, ratings, files, containers, matrices, validation, and multi-page flows. Every example
          re-renders with the active theme, so you can test any SurveyJS theme against every element and state.
        </p>
      </section>

      <FormElementsGrid />
    </div>
  );
}
