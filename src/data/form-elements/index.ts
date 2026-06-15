import type { ShowcaseSection } from "@/types/form-elements";
import { TEXT_INPUTS_SECTION } from "./text-inputs";
import { DATE_TIME_SECTION } from "./date-time";
import { CONTENT_DISPLAY_SECTION } from "./content-display";
import { CHOICE_CONTROLS_SECTION } from "./choice-controls";
import { RATING_RANKING_SECTION } from "./rating-ranking";
import { MEDIA_FILES_SECTION } from "./media-files";
import { CONTAINERS_SECTION } from "./containers";
import { MATRICES_SECTION } from "./matrices";
import { COMPOSITE_SECTION } from "./composite";
import { LOGIC_VALIDATION_SECTION } from "./logic-validation";
import { NAVIGATION_FLOW_SECTION } from "./navigation-flow";

/** Every section rendered on the "All Form Elements" showcase page, in display order. */
export const FORM_ELEMENT_SECTIONS: ShowcaseSection[] = [
  TEXT_INPUTS_SECTION,
  DATE_TIME_SECTION,
  CONTENT_DISPLAY_SECTION,
  CHOICE_CONTROLS_SECTION,
  RATING_RANKING_SECTION,
  MEDIA_FILES_SECTION,
  CONTAINERS_SECTION,
  MATRICES_SECTION,
  COMPOSITE_SECTION,
  LOGIC_VALIDATION_SECTION,
  NAVIGATION_FLOW_SECTION,
];

export const FORM_ELEMENT_ITEM_COUNT = FORM_ELEMENT_SECTIONS.reduce(
  (total, section) => total + section.items.length,
  0
);
