/**
 * Minimal typing for the SurveyJS sample survey JSON used in the live preview.
 * SurveyJS' own `Model` accepts a loosely-typed JSON object, so we keep this
 * intentionally permissive while documenting the shape we rely on.
 */
export interface SurveyJSON {
  title: string;
  description?: string;
  pages: SurveyPageJSON[];
  [key: string]: unknown;
}

export interface SurveyPageJSON {
  name: string;
  elements: SurveyElementJSON[];
  [key: string]: unknown;
}

export interface SurveyElementJSON {
  type: string;
  name: string;
  title?: string;
  [key: string]: unknown;
}
