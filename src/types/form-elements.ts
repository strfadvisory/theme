/**
 * Data contracts for the "All Form Elements" showcase page. Each section
 * groups related SurveyJS question/container types; each item renders a
 * single, fully interactive `Model` inside its own card.
 */

/** A SurveyJS survey JSON definition. Intentionally permissive — `Model` accepts loosely-typed JSON. */
export type ShowcaseSurveyJSON = Record<string, unknown>;

export interface ShowcaseItem {
  /** Unique, stable id used as the React key. */
  id: string;
  /** Element or feature name shown as the card title. */
  title: string;
  /** Short explanation of the element and what the live demo highlights. */
  description: string;
  /** Chips summarizing the states demonstrated (Required, Disabled, ...). */
  badges?: string[];
  /** When `"full"`, the card spans every column of the responsive grid. */
  span?: "full";
  /** The SurveyJS survey JSON rendered live inside the card. */
  json: ShowcaseSurveyJSON;
}

export interface ShowcaseSection {
  id: string;
  title: string;
  description: string;
  items: ShowcaseItem[];
}
