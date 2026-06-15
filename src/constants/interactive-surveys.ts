import type { InteractiveExperienceId } from "@/types/theme";
import type { SurveyElementJSON, SurveyJSON } from "@/types/survey";
import type { PresentationStyle } from "@/lib/survey-interactive-widgets";

interface InteractiveQuestionJSON extends SurveyElementJSON {
  presentationStyle?: PresentationStyle;
}

/**
 * Sample surveys for the "Interactive Experience" theme category. Each
 * survey pairs ordinary SurveyJS question types (`rating`, `radiogroup`,
 * `checkbox`, `matrix`) with a `presentationStyle` that activates one of the
 * custom widgets registered in `src/lib/survey-interactive-widgets.tsx`
 * (EmojiRating, EmojiNPS, EmojiSlider, MoodSelector, AvatarSelector,
 * IconSelector, ReactionSelector, EmojiMatrix, EmojiRadio/EmojiCheckbox).
 */
export const INTERACTIVE_SURVEYS: Record<InteractiveExperienceId, SurveyJSON> = {
  "emoji-feedback": {
    title: "Emoji Feedback",
    description: "Tell us how we're doing — entirely with emoji.",
    showProgressBar: "top",
    progressBarType: "pages",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "rating",
            name: "service_rating",
            title: "How would you rate our service?",
            description: "Pick the face that matches your experience.",
            presentationStyle: "emoji-rating",
            rateMin: 1,
            rateMax: 5,
          } satisfies InteractiveQuestionJSON,
          {
            type: "radiogroup",
            name: "overall_satisfaction",
            title: "How satisfied are you overall?",
            presentationStyle: "emoji-choice",
            choices: [
              { value: "face-very-bad", text: "Very Bad" },
              { value: "face-bad", text: "Bad" },
              { value: "face-average", text: "Average" },
              { value: "face-good", text: "Good" },
              { value: "face-excellent", text: "Excellent" },
            ],
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "matrix",
            name: "aspect_ratings",
            title: "Rate each part of your experience",
            presentationStyle: "emoji-matrix",
            rows: [
              { value: "speed", text: "Speed" },
              { value: "quality", text: "Quality" },
              { value: "support", text: "Support" },
            ],
            columns: [
              { value: "face-very-bad", text: "Very Bad" },
              { value: "face-bad", text: "Bad" },
              { value: "face-average", text: "Average" },
              { value: "face-good", text: "Good" },
              { value: "face-excellent", text: "Excellent" },
            ],
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "rating",
            name: "nps",
            title: "How likely are you to recommend us to a friend?",
            description: '0 is "Not Likely" and 10 is "Extremely Likely"',
            presentationStyle: "emoji-nps",
            rateMin: 0,
            rateMax: 10,
            minRateDescription: "Not Likely",
            maxRateDescription: "Extremely Likely",
          } satisfies InteractiveQuestionJSON,
          {
            type: "comment",
            name: "feedback",
            title: "Anything else you'd like to share?",
            placeholder: "Tell us what you think...",
          },
        ],
      },
    ],
  },

  "mood-tracker": {
    title: "Mood Tracker",
    description: "A quick daily check-in on how you're feeling.",
    showProgressBar: "top",
    progressBarType: "pages",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "radiogroup",
            name: "today_mood",
            title: "How are you feeling today?",
            presentationStyle: "mood-selector",
            choices: [
              { value: "mood-happy", text: "Happy" },
              { value: "mood-satisfied", text: "Satisfied" },
              { value: "mood-neutral", text: "Neutral" },
              { value: "mood-unhappy", text: "Unhappy" },
              { value: "mood-angry", text: "Angry" },
            ],
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "rating",
            name: "energy_level",
            title: "How would you rate your energy level?",
            presentationStyle: "emoji-slider",
            rateMin: 1,
            rateMax: 5,
            minRateDescription: "Exhausted",
            maxRateDescription: "Energized",
          } satisfies InteractiveQuestionJSON,
          {
            type: "radiogroup",
            name: "mood_driver",
            title: "What's affecting your mood most today?",
            choices: ["Work", "Health", "Relationships", "Finances", "Something else"],
          },
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "comment",
            name: "mood_note",
            title: "What's one thing that would improve your mood tomorrow?",
            placeholder: "Write a quick note to yourself...",
          },
        ],
      },
    ],
  },

  "emotion-journey": {
    title: "Customer Emotion Journey",
    description: "Every step of your journey, mapped to how it felt.",
    showProgressBar: "top",
    progressBarType: "pages",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "rating",
            name: "discovery_feeling",
            title: "How did it feel to find what you were looking for?",
            presentationStyle: "emoji-rating",
            rateMin: 1,
            rateMax: 5,
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "rating",
            name: "checkout_feeling",
            title: "How did the checkout / sign-up step feel?",
            presentationStyle: "emoji-rating",
            rateMin: 1,
            rateMax: 5,
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "rating",
            name: "value_feeling",
            title: "How do you feel about the value for money?",
            presentationStyle: "emoji-rating",
            rateMin: 1,
            rateMax: 5,
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page4",
        elements: [
          {
            type: "radiogroup",
            name: "overall_feeling",
            title: "Taking it all together, how do you feel about us?",
            presentationStyle: "emoji-choice",
            choices: [
              { value: "face-very-bad", text: "Very Bad" },
              { value: "face-bad", text: "Bad" },
              { value: "face-average", text: "Average" },
              { value: "face-good", text: "Good" },
              { value: "face-excellent", text: "Excellent" },
            ],
          } satisfies InteractiveQuestionJSON,
        ],
      },
    ],
  },

  "avatar-select": {
    title: "Tell Us About Yourself",
    description: "Pick the avatar that best represents you.",
    showProgressBar: "top",
    progressBarType: "pages",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "radiogroup",
            name: "user_type",
            title: "Which best describes you?",
            presentationStyle: "avatar-selector",
            choices: [
              { value: "avatar-business", text: "Business User" },
              { value: "avatar-consumer", text: "Consumer" },
              { value: "avatar-student", text: "Student" },
              { value: "avatar-senior", text: "Senior Citizen" },
            ],
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "rating",
            name: "tailored_satisfaction",
            title: "How well do our services fit your profile?",
            presentationStyle: "emoji-rating",
            rateMin: 1,
            rateMax: 5,
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "comment",
            name: "profile_needs",
            title: "What else should we know about your needs?",
            placeholder: "Tell us more...",
          },
        ],
      },
    ],
  },

  "icon-driven": {
    title: "Icon Driven",
    description: "Tap the icons for the products you're interested in.",
    showProgressBar: "top",
    progressBarType: "pages",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "checkbox",
            name: "products_of_interest",
            title: "Which products are you interested in?",
            presentationStyle: "icon-selector",
            choices: [
              { value: "icon-banking", text: "Banking" },
              { value: "icon-vehicle-loan", text: "Vehicle Loan" },
              { value: "icon-home-loan", text: "Home Loan" },
              { value: "icon-credit-card", text: "Credit Card" },
              { value: "icon-mobile-app", text: "Mobile App" },
            ],
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "radiogroup",
            name: "top_priority",
            title: "Which one would you set up first?",
            presentationStyle: "icon-selector",
            choices: [
              { value: "icon-banking", text: "Banking" },
              { value: "icon-vehicle-loan", text: "Vehicle Loan" },
              { value: "icon-home-loan", text: "Home Loan" },
              { value: "icon-credit-card", text: "Credit Card" },
              { value: "icon-mobile-app", text: "Mobile App" },
            ],
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "rating",
            name: "mobile_importance",
            title: "How important is mobile access to these services?",
            presentationStyle: "emoji-rating",
            rateMin: 1,
            rateMax: 5,
          } satisfies InteractiveQuestionJSON,
        ],
      },
    ],
  },

  "app-store-review": {
    title: "Rate Our App",
    description: "Leave a quick App Store-style review.",
    showProgressBar: "top",
    progressBarType: "pages",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "rating",
            name: "app_rating",
            title: "How would you rate this app?",
            description: "Tap to choose a star rating.",
            presentationStyle: "icon-star-rating",
            rateMin: 1,
            rateMax: 5,
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "checkbox",
            name: "highlights",
            title: "What stood out to you?",
            presentationStyle: "reaction-selector",
            choices: [
              { value: "review-like", text: "Like" },
              { value: "review-popular", text: "Popular" },
              { value: "review-amazing", text: "Amazing" },
            ],
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "comment",
            name: "review_text",
            title: "Write a short review (optional)",
            placeholder: "What did you like or what could be better?",
          },
        ],
      },
    ],
  },

  "social-reactions": {
    title: "Social Media Reactions",
    description: "React the way you would on social media.",
    showProgressBar: "top",
    progressBarType: "pages",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "checkbox",
            name: "feature_reactions",
            title: "How do you feel about our latest update?",
            presentationStyle: "reaction-selector",
            choices: [
              { value: "reaction-like", text: "Like" },
              { value: "reaction-love", text: "Love" },
              { value: "reaction-haha", text: "Haha" },
              { value: "reaction-wow", text: "Wow" },
              { value: "reaction-sad", text: "Sad" },
              { value: "reaction-angry", text: "Angry" },
            ],
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "rating",
            name: "share_likelihood",
            title: "How likely are you to share this with friends?",
            presentationStyle: "emoji-nps",
            rateMin: 0,
            rateMax: 10,
            minRateDescription: "Not Likely",
            maxRateDescription: "Extremely Likely",
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "comment",
            name: "reaction_note",
            title: "Tell us more (optional)",
            placeholder: "What did you think?",
          },
        ],
      },
    ],
  },

  gamified: {
    title: "Level Up: Player Feedback Quest",
    description: "Complete each level to earn your reward.",
    showProgressBar: "top",
    progressBarType: "pages",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "rating",
            name: "challenge_rating",
            title: "Level 1: How would you rate this challenge?",
            presentationStyle: "emoji-rating",
            rateMin: 1,
            rateMax: 5,
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "radiogroup",
            name: "next_quest_difficulty",
            title: "Level 2: Pick the difficulty for your next quest",
            presentationStyle: "emoji-choice",
            choices: [
              { value: "game-easy", text: "Easy" },
              { value: "game-medium", text: "Medium" },
              { value: "game-hard", text: "Hard" },
              { value: "game-legendary", text: "Legendary" },
            ],
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "rating",
            name: "replay_likelihood",
            title: "Level 3: How likely are you to play again?",
            presentationStyle: "emoji-nps",
            rateMin: 0,
            rateMax: 10,
            minRateDescription: "Not Likely",
            maxRateDescription: "Extremely Likely",
          } satisfies InteractiveQuestionJSON,
          {
            type: "comment",
            name: "next_level_feedback",
            title: "Any feedback for the next level?",
            placeholder: "Drop your suggestions here...",
          },
        ],
      },
    ],
  },

  "ai-chat": {
    title: "Chat with Our AI Assistant",
    description: "A quick conversational check-in.",
    showProgressBar: "top",
    progressBarType: "pages",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "rating",
            name: "experience_rating",
            title: "On a scale of 1 to 5, how was your experience with us today?",
            presentationStyle: "emoji-rating",
            rateMin: 1,
            rateMax: 5,
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "radiogroup",
            name: "biggest_impression",
            title: "What made the biggest impression? Pick one:",
            presentationStyle: "emoji-choice",
            choices: [
              { value: "face-excellent", text: "Amazing product" },
              { value: "face-good", text: "Great support" },
              { value: "face-average", text: "It was okay" },
              { value: "face-bad", text: "Needs improvement" },
            ],
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "rating",
            name: "recommend_likelihood",
            title: "How likely are you to recommend us to a friend?",
            presentationStyle: "emoji-nps",
            rateMin: 0,
            rateMax: 10,
            minRateDescription: "Not Likely",
            maxRateDescription: "Extremely Likely",
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page4",
        elements: [
          {
            type: "comment",
            name: "anything_else",
            title: "Anything else you'd like to tell me?",
            placeholder: "Type your message...",
          },
        ],
      },
    ],
  },

  "brand-icons": {
    title: "Which Apps Do You Use Daily?",
    description: "Pick your everyday apps — no labels, just icons.",
    showProgressBar: "top",
    progressBarType: "pages",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "checkbox",
            name: "daily_apps",
            title: "Which apps do you use every day?",
            presentationStyle: "icon-selector",
            choices: [
              { value: "brand-apple", text: "Apple" },
              { value: "brand-spotify", text: "Spotify" },
              { value: "brand-netflix", text: "Netflix" },
              { value: "brand-amazon", text: "Amazon" },
              { value: "brand-uber", text: "Uber" },
              { value: "brand-instagram", text: "Instagram" },
              { value: "brand-facebook", text: "Facebook" },
              { value: "brand-youtube", text: "YouTube" },
            ],
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "radiogroup",
            name: "most_missed_app",
            title: "Which app would you miss the most if it disappeared?",
            presentationStyle: "icon-selector",
            choices: [
              { value: "brand-apple", text: "Apple" },
              { value: "brand-spotify", text: "Spotify" },
              { value: "brand-netflix", text: "Netflix" },
              { value: "brand-amazon", text: "Amazon" },
              { value: "brand-uber", text: "Uber" },
              { value: "brand-instagram", text: "Instagram" },
              { value: "brand-facebook", text: "Facebook" },
              { value: "brand-youtube", text: "YouTube" },
            ],
          } satisfies InteractiveQuestionJSON,
        ],
      },
      {
        name: "page3",
        elements: [
          {
            type: "rating",
            name: "integration_importance",
            title: "How important are app integrations to you?",
            presentationStyle: "emoji-rating",
            rateMin: 1,
            rateMax: 5,
          } satisfies InteractiveQuestionJSON,
        ],
      },
    ],
  },
};
