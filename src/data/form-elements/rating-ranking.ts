import type { ShowcaseSection } from "@/types/form-elements";

export const RATING_RANKING_SECTION: ShowcaseSection = {
  id: "rating-ranking",
  title: "Rating, Ranking & Sliders",
  description: "Scaled and ordered-response controls for satisfaction scores, priorities, and numeric ranges.",
  items: [
    {
      id: "rating",
      title: "Rating",
      description:
        "Configurable rating scale — stars, numbers, or smileys. Includes a required NPS-style 0-10 scale with custom min/max descriptions.",
      badges: ["Stars", "Smileys", "Required"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "rating",
            name: "rating_satisfaction",
            title: "Overall Satisfaction",
            description: "Star rating, 1 to 5.",
            rateType: "stars",
            rateMax: 5,
          },
          {
            type: "rating",
            name: "rating_experience",
            title: "How was your experience?",
            description: "Smiley-based rating scale.",
            rateType: "smileys",
            rateMax: 5,
          },
          {
            type: "rating",
            name: "rating_nps",
            title: "Likelihood to Recommend (NPS)",
            description: "Required 0-10 scale with labeled endpoints.",
            isRequired: true,
            requiredErrorText: "Please provide a rating.",
            rateMin: 0,
            rateMax: 10,
            minRateDescription: "Not likely",
            maxRateDescription: "Very likely",
          },
        ],
      },
    },
    {
      id: "ranking",
      title: "Ranking",
      description:
        "Drag-and-drop list for ordering items by priority. The submitted value is the array of choice values in the user's chosen order.",
      badges: ["Drag & drop", "Required"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "ranking",
            name: "ranking_features",
            title: "Rank Features by Importance",
            description: "Drag items to reorder them, from most to least important.",
            choices: ["Performance", "Design", "Price", "Support", "Documentation"],
          },
          {
            type: "ranking",
            name: "ranking_onboarding",
            title: "Rank Onboarding Steps",
            description: "Required — every item must be ranked.",
            isRequired: true,
            requiredErrorText: "Please rank all items.",
            choices: ["Create account", "Verify email", "Complete profile", "Invite team"],
          },
        ],
      },
    },
    {
      id: "slider",
      title: "Slider",
      description:
        "Numeric slider for picking a single value or a range. Includes a single-thumb slider, a dual-thumb range slider, and a required slider.",
      badges: ["Single value", "Range", "Required"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "slider",
            name: "slider_volume",
            title: "Volume",
            description: "Single-value slider with step 5.",
            min: 0,
            max: 100,
            step: 5,
            defaultValue: 50,
          },
          {
            type: "slider",
            name: "slider_price",
            title: "Price Range",
            description: "Dual-thumb range slider.",
            sliderType: "range",
            min: 0,
            max: 1000,
            step: 10,
            defaultValue: [200, 800],
          },
          {
            type: "slider",
            name: "slider_risk",
            title: "Risk Tolerance",
            description: "Required — a value must be selected.",
            isRequired: true,
            requiredErrorText: "Please set a value.",
            min: 1,
            max: 10,
          },
        ],
      },
    },
  ],
};
