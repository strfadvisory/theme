"use client";

import { useEffect, useMemo } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.css";
import { createSurveyTheme } from "@/lib/survey-theme";
import type { ShowcaseSurveyJSON } from "@/types/form-elements";
import type { ThemeConfig } from "@/types/theme";

interface SurveyDemoProps {
  json: ShowcaseSurveyJSON;
  theme: ThemeConfig;
}

const DEFAULT_COMPLETED_HTML =
  "<h5 style='margin:0 0 4px'>✓ Looks good!</h5>" +
  "<p style='margin:0'>This demo resets automatically so you can keep exploring.</p>";

/**
 * Renders one fully interactive SurveyJS `Model` for a showcase card.
 * Re-themes on every theme change and resets itself shortly after a
 * successful "Validate" / complete so the demo stays reusable.
 */
export function SurveyDemo({ json, theme }: SurveyDemoProps) {
  const model = useMemo(() => {
    const survey = new Model(json);
    survey.showQuestionNumbers = "off";
    survey.checkErrorsMode = "onValueChanged";
    if (!("completedHtml" in json)) {
      survey.completedHtml = DEFAULT_COMPLETED_HTML;
    }
    return survey;
  }, [json]);

  useEffect(() => {
    const handleComplete = (sender: Model) => {
      setTimeout(() => sender.clear(true, true), 1800);
    };
    model.onComplete.add(handleComplete);
    return () => model.onComplete.remove(handleComplete);
  }, [model]);

  useEffect(() => {
    model.applyTheme(createSurveyTheme(theme));
  }, [model, theme]);

  return <Survey model={model} />;
}
