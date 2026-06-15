"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Model,
  type CompleteEvent,
  type CurrentPageChangedEvent,
  type PageModel,
  type QuestionRatingModel,
  type ValueChangedEvent,
} from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.css";
import { SAMPLE_SURVEY_JSON } from "@/constants/survey";
import { INTERACTIVE_SURVEYS } from "@/constants/interactive-surveys";
import { createSurveyTheme } from "@/lib/survey-theme";
import { emojiForRatingValue, getChoiceEmoji, registerInteractiveWidgets } from "@/lib/survey-interactive-widgets";
import { ChatBubble, EmotionToast, GamifiedProgress, SuccessCelebration } from "@/components/interactive";
import { cn } from "@/lib/utils";
import type { ThemeConfig } from "@/types/theme";

registerInteractiveWidgets();

interface CompletionCopy {
  emoji: string;
  title: string;
  message: string;
}

const DEFAULT_COMPLETION: CompletionCopy = {
  emoji: "🎉",
  title: "Thank you!",
  message: "This preview will reset shortly so you can keep exploring themes.",
};

const COMPLETION_COPY: Partial<Record<NonNullable<ThemeConfig["interactiveExperience"]>, CompletionCopy>> = {
  "emoji-feedback": { emoji: "😍", title: "Thanks a bunch!", message: "Your feedback has been recorded." },
  "mood-tracker": { emoji: "🎉", title: "Mood logged!", message: "See you for tomorrow's check-in." },
  "emotion-journey": { emoji: "💛", title: "We hear you!", message: "Thanks for sharing your whole journey with us." },
  "avatar-select": { emoji: "🙌", title: "Got it!", message: "We'll tailor things to your profile." },
  "icon-driven": { emoji: "✅", title: "All set!", message: "Thanks for telling us what matters most." },
  "app-store-review": { emoji: "🚀", title: "Thanks for the review!", message: "Your rating helps others find us." },
  "social-reactions": { emoji: "🔥", title: "Reactions received!", message: "Thanks for the feedback." },
  gamified: { emoji: "🏆", title: "Quest Complete!", message: "You earned the full XP bonus for this run." },
  "ai-chat": { emoji: "🤖", title: "Thanks for chatting!", message: "I've saved everything you shared." },
  "brand-icons": { emoji: "✨", title: "Nice picks!", message: "Thanks for sharing your favorite apps." },
};

const DEFAULT_GAME_PROGRESS = { progress: 0, level: 1, badges: 0, totalBadges: 1 };

interface SurveyPreviewProps {
  theme: ThemeConfig;
}

/**
 * Renders the live SurveyJS preview. Non-interactive themes get the standard
 * "Customer Satisfaction Survey"; themes in the "Interactive" category get a
 * tailored survey from `INTERACTIVE_SURVEYS` plus the matching presentation
 * extras (mood toasts, AI chat header, gamified XP bar, completion confetti).
 */
export function SurveyPreview({ theme }: SurveyPreviewProps) {
  const experience = theme.interactiveExperience;
  const [celebrating, setCelebrating] = useState(false);
  const [emotionToast, setEmotionToast] = useState<string | null>(null);
  const [chatTitle, setChatTitle] = useState("");
  const [gameProgress, setGameProgress] = useState(DEFAULT_GAME_PROGRESS);

  const completion = (experience && COMPLETION_COPY[experience]) || DEFAULT_COMPLETION;

  const model = useMemo(() => {
    const surveyJson = experience ? INTERACTIVE_SURVEYS[experience] : SAMPLE_SURVEY_JSON;
    const survey = new Model(surveyJson);
    survey.showQuestionNumbers = "off";
    survey.showCompleteButton = true;
    return survey;
    // `completion` is derived from `experience`, which is already a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experience]);

  // Reset preview-only UI state and seed initial chat/gamified values whenever
  // the survey model is rebuilt (theme switched to a different experience).
  useEffect(() => {
    setCelebrating(false);
    setEmotionToast(null);
    model.completedHtml = `<h3>${completion.title}</h3><p>${completion.message}</p>`;

    if (experience === "ai-chat") {
      const page = model.currentPage as PageModel | undefined;
      setChatTitle(page?.questions[0]?.title ?? "");
    } else {
      setChatTitle("");
    }

    if (experience === "gamified") {
      setGameProgress({ progress: 0, level: 1, badges: 0, totalBadges: Math.max(model.visiblePageCount, 1) });
    } else {
      setGameProgress(DEFAULT_GAME_PROGRESS);
    }
  }, [model, experience, completion]);

  // Completion celebration (confetti + success card) and preview auto-reset.
  useEffect(() => {
    const handleComplete = (sender: Model, _options: CompleteEvent) => {
      if (experience) setCelebrating(true);
      setTimeout(() => {
        sender.clear(true, true);
        setCelebrating(false);
      }, experience ? 2400 : 1800);
    };
    model.onComplete.add(handleComplete);
    return () => model.onComplete.remove(handleComplete);
  }, [model, experience]);

  // "Customer Emotion Journey": pop a feedback emoji toast after every answer.
  useEffect(() => {
    if (experience !== "emotion-journey") return;
    const handleValueChanged = (sender: Model, options: ValueChangedEvent) => {
      const question = sender.getQuestionByName(options.name);
      if (!question) return;
      const emoji =
        question.getType() === "rating"
          ? emojiForRatingValue(question as QuestionRatingModel, options.value)
          : getChoiceEmoji(options.value);
      if (emoji) {
        setEmotionToast(emoji);
        setTimeout(() => setEmotionToast(null), 1500);
      }
    };
    model.onValueChanged.add(handleValueChanged);
    return () => model.onValueChanged.remove(handleValueChanged);
  }, [model, experience]);

  // "AI Assistant Chat": surface the current question as an assistant message.
  useEffect(() => {
    if (experience !== "ai-chat") return;
    const updateChatTitle = (sender: Model, _options: CurrentPageChangedEvent) => {
      const page = sender.currentPage as PageModel | undefined;
      setChatTitle(page?.questions[0]?.title ?? "");
    };
    model.onCurrentPageChanged.add(updateChatTitle);
    return () => model.onCurrentPageChanged.remove(updateChatTitle);
  }, [model, experience]);

  // "Gaming": track XP progress, level, and badges by page.
  useEffect(() => {
    if (experience !== "gamified") return;
    const updateProgress = () => {
      const totalBadges = Math.max(model.visiblePageCount, 1);
      const current = model.currentPageNo;
      setGameProgress({ progress: current / totalBadges, level: current + 1, badges: current, totalBadges });
    };
    model.onCurrentPageChanged.add(updateProgress);
    return () => model.onCurrentPageChanged.remove(updateProgress);
  }, [model, experience]);

  useEffect(() => {
    model.applyTheme(createSurveyTheme(theme));
  }, [model, theme]);

  return (
    <div
      className={cn("survey-preview-host", experience && `survey-preview-host--${experience}`)}
      role="region"
      aria-label="Live survey preview"
    >
      {experience === "gamified" && (
        <div className="mb-4">
          <GamifiedProgress {...gameProgress} />
        </div>
      )}
      {experience === "ai-chat" && chatTitle && (
        <div className="mb-4">
          <ChatBubble role="ai">{chatTitle}</ChatBubble>
        </div>
      )}
      <Survey model={model} />
      {experience === "emotion-journey" && <EmotionToast emoji={emotionToast} />}
      <SuccessCelebration
        active={celebrating}
        emoji={completion.emoji}
        title={completion.title}
        message={completion.message}
      />
    </div>
  );
}
