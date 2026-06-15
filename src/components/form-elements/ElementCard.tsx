import { Badge, Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ShowcaseItem } from "@/types/form-elements";
import type { ThemeConfig } from "@/types/theme";
import { SurveyDemo } from "./SurveyDemo";

interface ElementCardProps {
  item: ShowcaseItem;
  theme: ThemeConfig;
}

/** A single showcase card: title, description, state badges, and a live SurveyJS demo. */
export function ElementCard({ item, theme }: ElementCardProps) {
  return (
    <Card
      className={cn("flex flex-col gap-4 p-5 sm:p-6", item.span === "full" && "md:col-span-2 xl:col-span-3")}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        </div>
        {item.badges && item.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:justify-end">
            {item.badges.map((badge) => (
              <Badge key={badge} variant="outline" className="whitespace-nowrap">
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="rounded-theme border border-border bg-background/60 p-2 sm:p-4">
        <SurveyDemo json={item.json} theme={theme} />
      </div>
    </Card>
  );
}
