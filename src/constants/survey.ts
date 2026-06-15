import type { SurveyJSON } from "@/types/survey";

/**
 * Sample survey rendered in the live preview, instantly re-themed on theme
 * change. One question (or a small related group) per page, with a top
 * progress bar and Previous/Next/Complete navigation — a multi-step flow
 * similar to a real-world NPS / CSAT survey.
 */
export const SAMPLE_SURVEY_JSON: SurveyJSON = {
  title: "Customer Satisfaction Survey",
  description: "Help us improve by sharing your experience.",
  showProgressBar: "top",
  progressBarType: "pages",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "rating",
          name: "nps",
          title: "How likely are you to recommend this theme gallery to a friend or colleague?",
          description: 'Please rate on a scale of 0-10, where 0 is "Not Likely" and 10 is "Extremely Likely"',
          rateMin: 0,
          rateMax: 10,
          minRateDescription: "Not Likely",
          maxRateDescription: "Extremely Likely",
        },
        {
          type: "comment",
          name: "feedback",
          title: "What did you like the most about your experience with us?",
          placeholder: "Tell us what you think...",
        },
      ],
    },
    {
      name: "page2",
      elements: [
        {
          type: "rating",
          name: "ease_of_use",
          title: "How would you rate the ease of browsing and finding a theme?",
          description: 'Please rate on a scale of 1 to 5, where 1 is "Not Easy" and 5 is "Very Easy"',
          rateMin: 1,
          rateMax: 5,
          minRateDescription: "Not Easy",
          maxRateDescription: "Very Easy",
        },
      ],
    },
    {
      name: "page3",
      elements: [
        {
          type: "rating",
          name: "overall_experience",
          title: "How would you rate your overall experience with the gallery?",
          description: 'Please rate on a scale of 1 to 5, where 1 is "Poor" and 5 is "Excellent"',
          rateMin: 1,
          rateMax: 5,
          minRateDescription: "Poor",
          maxRateDescription: "Excellent",
        },
      ],
    },
    {
      name: "page4",
      elements: [
        {
          type: "rating",
          name: "design_quality",
          title: "How would you rate the design and visual quality of the themes?",
          description: 'Please rate on a scale of 1 to 5, where 1 is "Poor" and 5 is "Excellent"',
          rateMin: 1,
          rateMax: 5,
          minRateDescription: "Poor",
          maxRateDescription: "Excellent",
        },
      ],
    },
    {
      name: "page5",
      elements: [
        {
          type: "rating",
          name: "would_return",
          title: "How likely are you to come back and use this gallery again?",
          description: 'Please rate on a scale of 1 to 5, where 1 is "Not Likely" and 5 is "Very Likely"',
          rateMin: 1,
          rateMax: 5,
          minRateDescription: "Not Likely",
          maxRateDescription: "Very Likely",
        },
      ],
    },
  ],
};
