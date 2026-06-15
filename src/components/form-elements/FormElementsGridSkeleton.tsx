import { Skeleton } from "@/components/ui";

/** Loading placeholder shown while the SurveyJS-powered grid is dynamically imported. */
export function FormElementsGridSkeleton() {
  return (
    <div className="flex flex-col gap-12" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, sectionIndex) => (
        <div key={sectionIndex} className="flex flex-col gap-4">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="flex flex-col gap-4 rounded-theme-lg border border-border bg-surface p-5 shadow-theme-sm"
              >
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
