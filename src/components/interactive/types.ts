import type { LucideIcon } from "lucide-react";

/** A single emoji-backed choice (rating point, mood, reaction, ...). */
export interface EmojiOption {
  /** The underlying answer value sent back to the survey. */
  value: number | string;
  /** The glyph rendered for this option. */
  emoji: string;
  /** Optional label shown under/beside the emoji. */
  label?: string;
}

/** A single icon/avatar/brand choice rendered as a visual card. */
export interface IconOption {
  value: number | string;
  label: string;
  /** Emoji or short text glyph (used for avatars and brand icons). */
  glyph?: string;
  /** Lucide icon component (used for category/icon-driven choices). */
  icon?: LucideIcon;
  /** Optional helper text shown under the label. */
  description?: string;
}

export type InteractiveValue = number | string;
export type InteractiveMultiValue = InteractiveValue[];
