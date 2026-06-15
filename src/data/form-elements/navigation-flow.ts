import type { ShowcaseSection } from "@/types/form-elements";

export const NAVIGATION_FLOW_SECTION: ShowcaseSection = {
  id: "navigation-flow",
  title: "Survey Navigation & Flow",
  description: "Multi-page surveys, progress indicators, and navigation controls for guiding users through a form.",
  items: [
    {
      id: "progress-bar",
      title: "Progress Bar",
      description:
        "Multi-page surveys can show a progress indicator via `showProgressBar` and `progressBarType`. Click \"Next\" to watch it advance across pages.",
      badges: ["showProgressBar", "Multi-page"],
      json: {
        showProgressBar: "top",
        progressBarType: "questions",
        pages: [
          {
            name: "pb_page1",
            elements: [{ type: "text", name: "pb_q1", title: "What's your name?" }],
          },
          {
            name: "pb_page2",
            elements: [{ type: "text", inputType: "email", name: "pb_q2", title: "What's your email?" }],
          },
          {
            name: "pb_page3",
            elements: [{ type: "comment", name: "pb_q3", title: "Any feedback for us?" }],
          },
        ],
      },
    },
    {
      id: "navigation-buttons",
      title: "Navigation Buttons",
      description:
        "Customize the Previous/Next/Complete buttons with `showPrevButton`, `pagePrevText`, `pageNextText`, and `completeText`.",
      badges: ["showPrevButton", "Custom labels"],
      json: {
        showPrevButton: true,
        pagePrevText: "Back",
        pageNextText: "Continue",
        completeText: "Finish",
        pages: [
          {
            name: "nav_page1",
            elements: [{ type: "text", name: "nav_q1", title: "Step 1: Your Name" }],
          },
          {
            name: "nav_page2",
            elements: [{ type: "text", name: "nav_q2", title: "Step 2: Your Role" }],
          },
        ],
      },
    },
    {
      id: "multi-page-survey",
      title: "Multi-Page Survey Example",
      description:
        "A complete multi-page survey combining a progress bar, custom navigation, conditional pages, and several question types — Personal Information, Experience, and Review & Submit.",
      badges: ["Multi-page", "showProgressBar", "Mixed question types"],
      span: "full",
      json: {
        showProgressBar: "top",
        progressBarType: "pages",
        completeText: "Submit Application",
        pages: [
          {
            name: "mp_personal",
            title: "Personal Information",
            elements: [
              { type: "text", name: "mp_name", title: "Full Name", isRequired: true, placeholder: "Jane Doe" },
              {
                type: "text",
                inputType: "email",
                name: "mp_email",
                title: "Email",
                isRequired: true,
                validators: [{ type: "email", text: "Enter a valid email address." }],
              },
              { type: "text", inputType: "date", name: "mp_dob", title: "Date of Birth" },
            ],
          },
          {
            name: "mp_experience",
            title: "Experience",
            elements: [
              {
                type: "dropdown",
                name: "mp_role",
                title: "Role Applying For",
                isRequired: true,
                choices: ["Frontend Engineer", "Backend Engineer", "Designer", "Product Manager"],
              },
              { type: "rating", name: "mp_years", title: "Years of Experience", rateMin: 0, rateMax: 10 },
              { type: "comment", name: "mp_summary", title: "Summary", placeholder: "Tell us about yourself" },
            ],
          },
          {
            name: "mp_review",
            title: "Review & Submit",
            elements: [
              {
                type: "checkbox",
                name: "mp_confirm",
                title: "Confirmation",
                isRequired: true,
                requiredErrorText: "Please confirm before submitting.",
                choices: ["I confirm the above information is accurate."],
              },
            ],
          },
        ],
      },
    },
  ],
};
