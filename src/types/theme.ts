/**
 * Core theming types shared across the gallery, store, and SurveyJS integration.
 */

export type ThemeCategory =
  | "Light"
  | "Dark"
  | "Modern"
  | "Professional"
  | "Creative"
  | "Minimal"
  | "Fun"
  | "Interactive";

export type FilterCategory = "All" | ThemeCategory;

export const THEME_CATEGORIES: ThemeCategory[] = [
  "Light",
  "Dark",
  "Modern",
  "Professional",
  "Creative",
  "Minimal",
  "Fun",
  "Interactive",
];

/**
 * Identifies which "Interactive Experience" survey + widget set a theme
 * should render in the live preview. Only set for themes in the
 * `"Interactive"` category — see `src/constants/interactive-surveys.ts` and
 * `src/lib/survey-interactive-widgets.ts`.
 */
export type InteractiveExperienceId =
  | "emoji-feedback"
  | "mood-tracker"
  | "emotion-journey"
  | "avatar-select"
  | "icon-driven"
  | "app-store-review"
  | "social-reactions"
  | "gamified"
  | "ai-chat"
  | "brand-icons";

export const FILTER_CATEGORIES: FilterCategory[] = ["All", ...THEME_CATEGORIES];

/**
 * Design-token contract for a single theme. These values drive both the
 * application UI (via CSS variables) and the SurveyJS theme mapping.
 */
export interface ThemeConfig {
  id: string;
  name: string;
  category: ThemeCategory;
  description: string;

  /** Page background. May be a solid color or a CSS gradient. */
  background: string;
  /** Surface color for cards, panels, and form controls. */
  surface: string;
  /** Primary brand / action color. */
  primary: string;
  /** Secondary supporting color. */
  secondary: string;
  /** Accent color used for highlights, ratings, and badges. */
  accent: string;
  /** Default text color. */
  text: string;
  /** Muted / secondary text color. */
  textMuted: string;
  /** Default border color. */
  border: string;
  /** Box-shadow color (rgba recommended). */
  shadow: string;
  /** Base corner radius applied across surfaces and controls. */
  radius: string;

  /** Whether this theme uses a dark color palette. */
  isDark: boolean;
  /** Whether surfaces should render with a translucent/blurred glass effect. */
  glass?: boolean;

  /**
   * For `category: "Interactive"` themes, selects the survey + custom
   * widget experience rendered in the live preview (emoji ratings, mood
   * cards, avatar pickers, gamification, AI chat, ...).
   */
  interactiveExperience?: InteractiveExperienceId;
}

/** Serializable subset of a theme exported by the "Export Theme" action. */
export type ExportedTheme = ThemeConfig;
