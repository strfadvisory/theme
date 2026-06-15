import type { ShowcaseSection } from "@/types/form-elements";

export const CHOICE_CONTROLS_SECTION: ShowcaseSection = {
  id: "choice-controls",
  title: "Choice & Selection Controls",
  description: "Single- and multi-select controls for picking one or more options from a list of choices.",
  items: [
    {
      id: "dropdown",
      title: "Dropdown",
      description:
        "Single-select dropdown with a searchable list of choices. Includes a required field and a disabled field with a preset value.",
      badges: ["Required", "Disabled"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "dropdown",
            name: "dropdown_basic",
            title: "Country",
            description: "Searchable single-select dropdown.",
            placeholder: "Select a country",
            choices: [
              "United States",
              "Canada",
              "United Kingdom",
              "Germany",
              "France",
              "India",
              "Japan",
              "Australia",
            ],
          },
          {
            type: "dropdown",
            name: "dropdown_plan",
            title: "Subscription Plan",
            description: "Required selection.",
            isRequired: true,
            requiredErrorText: "Please select a plan.",
            choices: [
              { value: "free", text: "Free" },
              { value: "pro", text: "Pro" },
              { value: "enterprise", text: "Enterprise" },
            ],
          },
          {
            type: "dropdown",
            name: "dropdown_region",
            title: "Account Region",
            description: "Disabled field with a preset value.",
            choices: ["US-East", "US-West", "EU-Central"],
            defaultValue: "US-East",
            enableIf: "false",
          },
        ],
      },
    },
    {
      id: "tagbox",
      title: "Tag Box",
      description:
        "Multi-select dropdown that renders each selection as a removable tag. Includes a required field with a minimum-selection count.",
      badges: ["Required", "Answer count validator"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "tagbox",
            name: "tagbox_skills",
            title: "Skills",
            description: "Select any number of skills — each appears as a removable tag.",
            placeholder: "Select skills",
            choices: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "Go", "Rust"],
          },
          {
            type: "tagbox",
            name: "tagbox_languages",
            title: "Languages Spoken",
            description: "Required — select at least one language.",
            isRequired: true,
            requiredErrorText: "Select at least one language.",
            choices: ["English", "Spanish", "French", "German", "Hindi", "Mandarin"],
            validators: [{ type: "answercount", minCount: 1, text: "Select at least one language." }],
          },
        ],
      },
    },
    {
      id: "radiogroup",
      title: "Radio Group",
      description:
        "Single-choice list of mutually exclusive options. Includes a required field and a disabled field with a preset selection.",
      badges: ["Required", "Disabled"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "radiogroup",
            name: "radio_contact",
            title: "Preferred Contact Method",
            description: "Select one option.",
            choices: ["Email", "Phone", "SMS"],
          },
          {
            type: "radiogroup",
            name: "radio_renewal",
            title: "Subscription Renewal",
            description: "Required selection.",
            isRequired: true,
            requiredErrorText: "Please choose an option.",
            choices: ["Auto-renew", "Cancel at period end", "Ask me later"],
          },
          {
            type: "radiogroup",
            name: "radio_tier",
            title: "Account Tier",
            description: "Disabled field with a preset selection.",
            choices: ["Basic", "Pro", "Enterprise"],
            defaultValue: "Pro",
            enableIf: "false",
          },
        ],
      },
    },
    {
      id: "checkbox",
      title: "Checkbox Group",
      description:
        "Multi-select list of independent options, with an optional \"Select All\". Includes a required field with a minimum-selection count and a disabled field.",
      badges: ["Required", "Select All", "Disabled"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "checkbox",
            name: "checkbox_channels",
            title: "Notification Channels",
            description: "Multi-select with a \"Select All\" option.",
            choices: ["Email", "SMS", "Push", "Webhook"],
            hasSelectAll: true,
          },
          {
            type: "checkbox",
            name: "checkbox_policies",
            title: "Accepted Policies",
            description: "Required — select at least two policies.",
            isRequired: true,
            requiredErrorText: "Select at least two policies.",
            choices: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
            validators: [{ type: "answercount", minCount: 2, text: "Select at least two policies." }],
          },
          {
            type: "checkbox",
            name: "checkbox_locked",
            title: "Locked Features",
            description: "Disabled field with preset selections.",
            choices: ["API Access", "Audit Logs"],
            defaultValue: ["API Access"],
            enableIf: "false",
          },
        ],
      },
    },
    {
      id: "boolean",
      title: "Boolean Switch",
      description:
        "Renders as an on/off switch for binary choices. Includes a required switch (must be \"On\") and a disabled switch.",
      badges: ["Custom labels", "Required", "Disabled"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "boolean",
            name: "bool_notifications",
            title: "Enable Notifications",
            description: "Toggle switch with custom on/off labels.",
            labelTrue: "On",
            labelFalse: "Off",
          },
          {
            type: "boolean",
            name: "bool_terms",
            title: "Accept Terms & Conditions",
            description: "Required — must be switched on to pass validation.",
            isRequired: true,
            requiredErrorText: "You must accept the terms.",
            labelTrue: "I agree",
            labelFalse: "Not yet",
            validators: [
              { type: "expression", expression: "{bool_terms} = true", text: "You must accept the terms to continue." },
            ],
          },
          {
            type: "boolean",
            name: "bool_beta",
            title: "Beta Features",
            description: "Disabled switch with a preset value.",
            defaultValue: true,
            enableIf: "false",
          },
        ],
      },
    },
  ],
};
