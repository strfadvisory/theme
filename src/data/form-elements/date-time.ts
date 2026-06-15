import type { ShowcaseSection } from "@/types/form-elements";

export const DATE_TIME_SECTION: ShowcaseSection = {
  id: "date-time",
  title: "Date & Time Inputs",
  description: "Native date and time pickers, configured via the `inputType` property of a text question.",
  items: [
    {
      id: "date-picker",
      title: "Date Picker",
      description:
        "Text input configured with `inputType: \"date\"` for a native browser date picker. Includes a required field validated to be in the past and a disabled field.",
      badges: ["Required", "Expression validator", "Disabled"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "text",
            inputType: "date",
            name: "date_basic",
            title: "Event Date",
            description: "Opens the browser's native date picker.",
          },
          {
            type: "text",
            inputType: "date",
            name: "date_dob",
            title: "Date of Birth",
            description: "Required and must be in the past.",
            isRequired: true,
            requiredErrorText: "Date of birth is required.",
            validators: [
              { type: "expression", expression: "{date_dob} < today()", text: "Date must be in the past." },
            ],
          },
          {
            type: "text",
            inputType: "date",
            name: "date_created",
            title: "Account Created",
            description: "Disabled field with a preset value.",
            defaultValue: "2023-01-15",
            enableIf: "false",
          },
        ],
      },
    },
    {
      id: "time-picker",
      title: "Time Picker",
      description:
        "Text input configured with `inputType: \"time\"` for a native browser time picker. Includes a required field and a read-only field.",
      badges: ["Required", "Read-only"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "text",
            inputType: "time",
            name: "time_basic",
            title: "Preferred Time",
            description: "Opens the browser's native time picker.",
          },
          {
            type: "text",
            inputType: "time",
            name: "time_meeting",
            title: "Meeting Start Time",
            description: "Required field.",
            isRequired: true,
            requiredErrorText: "A start time is required.",
          },
          {
            type: "text",
            inputType: "time",
            name: "time_hours",
            title: "Office Open Hours",
            description: "Read-only field.",
            defaultValue: "09:00",
            readOnly: true,
          },
        ],
      },
    },
  ],
};
