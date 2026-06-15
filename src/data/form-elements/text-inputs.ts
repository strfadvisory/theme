import type { ShowcaseSection } from "@/types/form-elements";

export const TEXT_INPUTS_SECTION: ShowcaseSection = {
  id: "text-inputs",
  title: "Text & Number Inputs",
  description:
    "Single-line entry questions for short, structured answers — names, contact details, quantities, and grouped fields.",
  items: [
    {
      id: "text-input",
      title: "Text Input",
      description:
        "Single-line text entry. Includes a placeholder example, a required field with length validation, a disabled field, and a read-only field.",
      badges: ["Placeholder", "Required", "Validation", "Disabled", "Read-only"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "text",
            name: "ti_name",
            title: "Full Name",
            description: "Standard text input with a placeholder.",
            placeholder: "Jane Doe",
          },
          {
            type: "text",
            name: "ti_username",
            title: "Username",
            description: "Required, 3-20 characters — leave empty and click Validate to see the error state.",
            isRequired: true,
            requiredErrorText: "Username is required.",
            placeholder: "jane_doe",
            validators: [
              { type: "text", minLength: 3, maxLength: 20, text: "Must be between 3 and 20 characters." },
            ],
          },
          {
            type: "text",
            name: "ti_account",
            title: "Account ID",
            description: "Disabled field — value is fixed and cannot be edited.",
            defaultValue: "ACC-10293",
            enableIf: "false",
          },
          {
            type: "text",
            name: "ti_plan",
            title: "Plan Tier",
            description: "Read-only field — shown for reference only.",
            defaultValue: "Professional",
            readOnly: true,
          },
        ],
      },
    },
    {
      id: "email-input",
      title: "Email Input",
      description:
        "Text input configured with `inputType: \"email\"` for browser-native email keyboards and built-in format hints, plus an email-format validator.",
      badges: ["Required", "Email validator", "Disabled"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "text",
            inputType: "email",
            name: "email_basic",
            title: "Email Address",
            description: "Renders with the browser's native email input affordances.",
            placeholder: "you@example.com",
          },
          {
            type: "text",
            inputType: "email",
            name: "email_required",
            title: "Work Email",
            description: "Required and format-validated — try an invalid value and click Validate.",
            isRequired: true,
            requiredErrorText: "A work email is required.",
            placeholder: "you@company.com",
            validators: [{ type: "email", text: "Enter a valid email address." }],
          },
          {
            type: "text",
            inputType: "email",
            name: "email_disabled",
            title: "Recovery Email",
            description: "Disabled field with a preset value.",
            defaultValue: "owner@company.com",
            enableIf: "false",
          },
        ],
      },
    },
    {
      id: "password-input",
      title: "Password Input",
      description:
        "Masked text input for sensitive values. Demonstrates a minimum-length validator and a cross-field \"confirm password\" expression validator.",
      badges: ["Required", "Min length", "Cross-field validation"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "text",
            inputType: "password",
            name: "password_basic",
            title: "Password",
            description: "Characters are masked as you type.",
            placeholder: "Enter a password",
          },
          {
            type: "text",
            inputType: "password",
            name: "password_new",
            title: "New Password",
            description: "Required, minimum 8 characters.",
            isRequired: true,
            requiredErrorText: "Password is required.",
            validators: [{ type: "text", minLength: 8, text: "Must be at least 8 characters long." }],
          },
          {
            type: "text",
            inputType: "password",
            name: "password_confirm",
            title: "Confirm Password",
            description: "Must match \"New Password\" above — an expression validator compares the two values.",
            isRequired: true,
            requiredErrorText: "Please confirm your password.",
            validators: [
              {
                type: "expression",
                expression: "{password_new} = {password_confirm}",
                text: "Passwords do not match.",
              },
            ],
          },
        ],
      },
    },
    {
      id: "number-input",
      title: "Number Input",
      description:
        "Text input configured with `inputType: \"number\"`, rendering a numeric stepper. Includes a required field with a numeric range validator and a read-only field.",
      badges: ["Required", "Range validator", "Read-only"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "text",
            inputType: "number",
            name: "number_basic",
            title: "Quantity",
            description: "Numeric input with browser stepper controls.",
            defaultValue: 1,
          },
          {
            type: "text",
            inputType: "number",
            name: "number_age",
            title: "Age",
            description: "Required, must be between 18 and 99.",
            isRequired: true,
            requiredErrorText: "Age is required.",
            validators: [{ type: "numeric", minValue: 18, maxValue: 99, text: "Enter a number between 18 and 99." }],
          },
          {
            type: "text",
            inputType: "number",
            name: "number_seats",
            title: "Allocated Seats",
            description: "Read-only field.",
            defaultValue: 25,
            readOnly: true,
          },
        ],
      },
    },
    {
      id: "multiple-text",
      title: "Multiple Text",
      description:
        "Groups several related text inputs into a single question — ideal for structured data like addresses. Each sub-field has its own validators.",
      badges: ["Required", "Regex validator"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "multipletext",
            name: "mt_address",
            title: "Shipping Address",
            description: "Each row is an independent text input with its own validation.",
            items: [
              { name: "street", title: "Street", isRequired: true, placeholder: "123 Main St" },
              { name: "city", title: "City", isRequired: true, placeholder: "Springfield" },
              {
                name: "zip",
                title: "ZIP Code",
                placeholder: "12345",
                validators: [{ type: "regex", regex: "^[0-9]{5}$", text: "Enter a 5-digit ZIP code." }],
              },
            ],
          },
        ],
      },
    },
  ],
};
