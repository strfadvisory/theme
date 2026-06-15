"use client";

import {
  CustomWidgetCollection,
  Serializer,
  type Question,
  type QuestionMatrixModel,
  type QuestionRatingModel,
  type QuestionSelectBase,
} from "survey-core";
import { Car, CreditCard, Home, Landmark, Smartphone, type LucideIcon } from "lucide-react";
import {
  AvatarSelector,
  EmojiCheckbox,
  EmojiMatrix,
  EmojiNPS,
  EmojiRadio,
  EmojiRating,
  EmojiSlider,
  IconSelector,
  MoodSelector,
  ReactionSelector,
} from "@/components/interactive";
import type {
  EmojiOption,
  IconOption,
  InteractiveMultiValue,
  InteractiveValue,
} from "@/components/interactive";

/**
 * Identifies which custom widget renders a question. Set via the
 * `presentationStyle` property added to the base `question` class below, and
 * consumed by `src/constants/interactive-surveys.ts`.
 */
export type PresentationStyle =
  | "emoji-rating"
  | "icon-star-rating"
  | "emoji-nps"
  | "emoji-slider"
  | "mood-selector"
  | "avatar-selector"
  | "icon-selector"
  | "reaction-selector"
  | "emoji-choice"
  | "emoji-matrix";

export const FACE_GRADIENT = ["😡", "😕", "😐", "🙂", "😍"];
const NPS_GRADIENT = ["😡", "😠", "😟", "😕", "😐", "🙂", "😊", "😄", "😁", "🤩", "🥳"];
const STAR_GRADIENT = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];

interface ChoiceVisual {
  emoji?: string;
  glyph?: string;
  icon?: LucideIcon;
}

/**
 * Maps the `value` of a choice/column item in
 * `src/constants/interactive-surveys.ts` to the emoji, brand glyph, or Lucide
 * icon shown by the interactive widgets below.
 */
const CHOICE_VISUALS: Record<string, ChoiceVisual> = {
  // Face/satisfaction gradient (Emoji Feedback choices & matrix columns)
  "face-very-bad": { emoji: "😡" },
  "face-bad": { emoji: "😕" },
  "face-average": { emoji: "😐" },
  "face-good": { emoji: "🙂" },
  "face-excellent": { emoji: "😍" },

  // Mood Tracker
  "mood-happy": { emoji: "😀" },
  "mood-satisfied": { emoji: "😊" },
  "mood-neutral": { emoji: "😐" },
  "mood-unhappy": { emoji: "😔" },
  "mood-angry": { emoji: "😡" },

  // Avatar Selection
  "avatar-business": { glyph: "👨‍💼" },
  "avatar-consumer": { glyph: "👩" },
  "avatar-student": { glyph: "🧑‍🎓" },
  "avatar-senior": { glyph: "👴" },

  // Icon Driven (banking products)
  "icon-banking": { icon: Landmark },
  "icon-vehicle-loan": { icon: Car },
  "icon-home-loan": { icon: Home },
  "icon-credit-card": { icon: CreditCard },
  "icon-mobile-app": { icon: Smartphone },

  // App Store Review actions
  "review-like": { emoji: "❤️" },
  "review-popular": { emoji: "🔥" },
  "review-amazing": { emoji: "🚀" },

  // Social Media Reactions
  "reaction-like": { emoji: "👍" },
  "reaction-love": { emoji: "❤️" },
  "reaction-haha": { emoji: "😂" },
  "reaction-wow": { emoji: "😮" },
  "reaction-sad": { emoji: "😢" },
  "reaction-angry": { emoji: "😡" },

  // Gaming quest difficulty
  "game-easy": { emoji: "🎮" },
  "game-medium": { emoji: "🔥" },
  "game-hard": { emoji: "💎" },
  "game-legendary": { emoji: "🏆" },

  // Brand Icon Select
  "brand-apple": { glyph: "🍎" },
  "brand-spotify": { glyph: "🟢" },
  "brand-netflix": { glyph: "🎬" },
  "brand-amazon": { glyph: "🛒" },
  "brand-uber": { glyph: "🚗" },
  "brand-instagram": { glyph: "📷" },
  "brand-facebook": { glyph: "📘" },
  "brand-youtube": { glyph: "▶️" },
};

interface MatrixQuestionLike {
  rows: Array<{ value: unknown; text: string }>;
  columns: Array<{ value: unknown; text: string }>;
  value?: Record<string, InteractiveValue>;
}

/** Builds an emoji gradient for a rating question's visible rate values. */
function buildRatingEmojiOptions(question: QuestionRatingModel, gradient: string[]): EmojiOption[] {
  const items = question.visibleRateValues;
  const min = question.rateMin;
  const max = question.rateMax;
  const span = Math.max(1, max - min);
  return items.map((item) => {
    const numericValue = Number(item.value);
    const index = Math.round(((numericValue - min) / span) * (gradient.length - 1));
    return {
      value: item.value,
      emoji: gradient[Math.min(gradient.length - 1, Math.max(0, index))],
      label: item.text || String(item.value),
    };
  });
}

function toEmojiOptions(question: QuestionSelectBase): EmojiOption[] {
  return question.visibleChoices.map((choice) => ({
    value: choice.value as InteractiveValue,
    emoji: CHOICE_VISUALS[String(choice.value)]?.emoji ?? "❓",
    label: choice.text,
  }));
}

function toIconOptions(question: QuestionSelectBase): IconOption[] {
  return question.visibleChoices.map((choice) => {
    const visual = CHOICE_VISUALS[String(choice.value)];
    return {
      value: choice.value as InteractiveValue,
      label: choice.text,
      icon: visual?.icon,
      glyph: visual?.glyph,
    };
  });
}

function presentationStyleOf(question: Question): string {
  return question.getPropertyValue("presentationStyle") as string;
}

/** Looks up the emoji/brand glyph associated with a choice/column value. */
export function getChoiceEmoji(value: unknown): string | undefined {
  return CHOICE_VISUALS[String(value)]?.emoji;
}

/** Maps a rating question's current value onto an emoji gradient — used for the "Emotion Journey" feedback toast. */
export function emojiForRatingValue(
  question: QuestionRatingModel,
  value: unknown,
  gradient: string[] = FACE_GRADIENT
): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const min = question.rateMin;
  const max = question.rateMax;
  const span = Math.max(1, max - min);
  const index = Math.round(((Number(value) - min) / span) * (gradient.length - 1));
  return gradient[Math.min(gradient.length - 1, Math.max(0, index))];
}

let registered = false;

/**
 * Registers the `presentationStyle` question property and the custom
 * SurveyJS widgets (Emoji Rating, Visual NPS, Emoji Slider, Mood Tracker,
 * Avatar Selector, Icon Selector, Reaction Picker, Emoji Matrix) used by the
 * Interactive Experience themes. Idempotent — `Serializer` and
 * `CustomWidgetCollection` are global singletons, so this must only run once.
 */
export function registerInteractiveWidgets(): void {
  if (registered) return;
  registered = true;

  Serializer.addProperty("question", {
    name: "presentationStyle",
    category: "interactive",
    visible: false,
    default: "",
  });

  const collection = CustomWidgetCollection.Instance;

  collection.addCustomWidget({
    name: "emoji-rating",
    isFit: (question: Question) =>
      question.getType() === "rating" && presentationStyleOf(question) === "emoji-rating",
    render: (question: QuestionRatingModel) => (
      <EmojiRating
        options={buildRatingEmojiOptions(question, FACE_GRADIENT)}
        value={question.value}
        onChange={(value) => {
          question.value = value;
        }}
        readOnly={question.isReadOnly}
      />
    ),
  });

  collection.addCustomWidget({
    name: "icon-star-rating",
    isFit: (question: Question) =>
      question.getType() === "rating" && presentationStyleOf(question) === "icon-star-rating",
    render: (question: QuestionRatingModel) => (
      <EmojiRating
        options={buildRatingEmojiOptions(question, STAR_GRADIENT)}
        value={question.value}
        onChange={(value) => {
          question.value = value;
        }}
        readOnly={question.isReadOnly}
        aria-label="Star rating"
      />
    ),
  });

  collection.addCustomWidget({
    name: "emoji-nps",
    isFit: (question: Question) =>
      question.getType() === "rating" && presentationStyleOf(question) === "emoji-nps",
    render: (question: QuestionRatingModel) => (
      <EmojiNPS
        value={question.value}
        onChange={(value) => {
          question.value = value;
        }}
        min={question.rateMin}
        max={question.rateMax}
        minLabel={question.minRateDescription}
        maxLabel={question.maxRateDescription}
        readOnly={question.isReadOnly}
      />
    ),
  });

  collection.addCustomWidget({
    name: "emoji-slider",
    isFit: (question: Question) =>
      question.getType() === "rating" && presentationStyleOf(question) === "emoji-slider",
    render: (question: QuestionRatingModel) => (
      <EmojiSlider
        options={buildRatingEmojiOptions(question, NPS_GRADIENT)}
        value={question.value}
        onChange={(value) => {
          question.value = value;
        }}
        minLabel={question.minRateDescription}
        maxLabel={question.maxRateDescription}
      />
    ),
  });

  collection.addCustomWidget({
    name: "mood-selector",
    isFit: (question: Question) =>
      question.getType() === "radiogroup" && presentationStyleOf(question) === "mood-selector",
    render: (question: QuestionSelectBase) => (
      <MoodSelector
        options={toEmojiOptions(question)}
        value={question.value}
        onChange={(value) => {
          question.value = value;
        }}
      />
    ),
  });

  collection.addCustomWidget({
    name: "avatar-selector",
    isFit: (question: Question) =>
      question.getType() === "radiogroup" && presentationStyleOf(question) === "avatar-selector",
    render: (question: QuestionSelectBase) => (
      <AvatarSelector
        options={toIconOptions(question)}
        value={question.value}
        onChange={(value) => {
          question.value = value;
        }}
      />
    ),
  });

  collection.addCustomWidget({
    name: "icon-selector",
    isFit: (question: Question) =>
      (question.getType() === "radiogroup" || question.getType() === "checkbox") &&
      presentationStyleOf(question) === "icon-selector",
    render: (question: QuestionSelectBase) => (
      <IconSelector
        options={toIconOptions(question)}
        value={question.value}
        onChange={(value) => {
          question.value = value;
        }}
        multiple={question.getType() === "checkbox"}
      />
    ),
  });

  collection.addCustomWidget({
    name: "reaction-selector",
    isFit: (question: Question) =>
      (question.getType() === "radiogroup" || question.getType() === "checkbox") &&
      presentationStyleOf(question) === "reaction-selector",
    render: (question: QuestionSelectBase) => (
      <ReactionSelector
        options={toEmojiOptions(question)}
        value={question.value}
        onChange={(value) => {
          question.value = value;
        }}
        multiple={question.getType() === "checkbox"}
      />
    ),
  });

  collection.addCustomWidget({
    name: "emoji-choice",
    isFit: (question: Question) =>
      (question.getType() === "radiogroup" || question.getType() === "checkbox") &&
      presentationStyleOf(question) === "emoji-choice",
    render: (question: QuestionSelectBase) => {
      const options = toEmojiOptions(question);
      const onChange = (value: InteractiveValue | InteractiveMultiValue) => {
        question.value = value;
      };
      return question.getType() === "checkbox" ? (
        <EmojiCheckbox options={options} value={question.value} onChange={onChange} />
      ) : (
        <EmojiRadio options={options} value={question.value} onChange={onChange} />
      );
    },
  });

  collection.addCustomWidget({
    name: "emoji-matrix",
    isFit: (question: Question) =>
      question.getType() === "matrix" && presentationStyleOf(question) === "emoji-matrix",
    render: (question: QuestionMatrixModel) => {
      const matrixQuestion = question as unknown as MatrixQuestionLike;
      const rows = matrixQuestion.rows.map((row) => ({ value: String(row.value), label: row.text }));
      const columns = matrixQuestion.columns.map((col) => ({
        value: col.value as InteractiveValue,
        emoji: CHOICE_VISUALS[String(col.value)]?.emoji ?? "❓",
        label: col.text,
      }));
      const value = matrixQuestion.value ?? {};
      return (
        <EmojiMatrix
          rows={rows}
          columns={columns}
          value={value}
          onChange={(rowValue, colValue) => {
            question.value = { ...value, [rowValue]: colValue };
          }}
        />
      );
    },
  });
}
