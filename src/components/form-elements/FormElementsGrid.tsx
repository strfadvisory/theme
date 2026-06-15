"use client";

import { FORM_ELEMENT_SECTIONS } from "@/data/form-elements";
import { useSelectedTheme } from "@/hooks/useSelectedTheme";
import { registerShowcaseExtensions } from "@/lib/survey-setup";
import { ElementCard } from "./ElementCard";

// Registers the custom composite question type and validator function used by
// a few cards below. Runs once when this client-only chunk is first loaded,
// before any `Model` instances are created.
registerShowcaseExtensions();

/** Renders every showcase section and card, re-themed live with the active gallery theme. */
export function FormElementsGrid() {
  const theme = useSelectedTheme();

  return (
    <div className="flex flex-col gap-12">
      {FORM_ELEMENT_SECTIONS.map((section) => (
        <section key={section.id} aria-labelledby={`${section.id}-heading`} className="flex flex-col gap-4">
          <div className="max-w-3xl">
            <h2 id={`${section.id}-heading`} className="text-xl font-semibold tracking-tight text-foreground">
              {section.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {section.items.map((item) => (
              <ElementCard key={item.id} item={item} theme={theme} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
