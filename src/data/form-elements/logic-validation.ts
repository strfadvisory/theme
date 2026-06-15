import type { ShowcaseSection } from "@/types/form-elements";

export const LOGIC_VALIDATION_SECTION: ShowcaseSection = {
  id: "logic-validation",
  title: "Validation & Conditional Logic",
  description:
    "Patterns for required fields, custom validators, conditional visibility, and values calculated from other answers.",
  items: [
    {
      id: "required-validation",
      title: "Required Validation",
      description:
        "Several question types marked `isRequired: true` with custom error text. Click Validate with everything empty to see SurveyJS's built-in required-field indicators and error messages.",
      badges: ["isRequired", "requiredErrorText"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "text",
            name: "rv_name",
            title: "Full Name",
            description: "Required text field.",
            isRequired: true,
            requiredErrorText: "Full name is required.",
          },
          {
            type: "dropdown",
            name: "rv_country",
            title: "Country",
            description: "Required dropdown selection.",
            isRequired: true,
            requiredErrorText: "Please select your country.",
            choices: ["United States", "Canada", "Mexico"],
          },
          {
            type: "checkbox",
            name: "rv_terms",
            title: "Agreements",
            description: "Required checkbox — at least one must be checked.",
            isRequired: true,
            requiredErrorText: "You must accept the agreement.",
            choices: ["I agree to the Terms of Service"],
          },
        ],
      },
    },
    {
      id: "custom-validation",
      title: "Custom Validation",
      description:
        "Beyond built-in validators, SurveyJS supports regex validators, cross-field expression validators, and custom functions registered with `FunctionFactory`.",
      badges: ["Regex", "Expression", "Custom function"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "text",
            name: "cv_username",
            title: "Username",
            description: "Regex validator — letters, numbers, and underscores only, 3-16 characters.",
            isRequired: true,
            requiredErrorText: "Username is required.",
            validators: [
              { type: "regex", regex: "^[A-Za-z0-9_]{3,16}$", text: "3-16 characters: letters, numbers, underscores only." },
            ],
          },
          {
            type: "text",
            name: "cv_handle",
            title: "Handle",
            description:
              "Custom function validator — checks against a reserved-word list (\"admin\", \"root\", \"support\", \"test\", \"moderator\" are taken).",
            validators: [
              { type: "expression", expression: "isHandleAvailable({cv_handle})", text: "This handle is already taken — try another." },
            ],
          },
          {
            type: "text",
            inputType: "number",
            name: "cv_min",
            title: "Minimum Value",
            description: "Used by the expression validator below.",
            defaultValue: 10,
          },
          {
            type: "text",
            inputType: "number",
            name: "cv_max",
            title: "Maximum Value",
            description: "Cross-field expression validator — must be greater than \"Minimum Value\" above.",
            defaultValue: 5,
            validators: [
              { type: "expression", expression: "{cv_max} > {cv_min}", text: "Maximum value must be greater than the minimum value." },
            ],
          },
        ],
      },
    },
    {
      id: "conditional-visibility",
      title: "Conditional Visibility",
      description:
        "Questions can show or hide based on other answers using `visibleIf` expressions. Change \"Employment Status\" to reveal the matching follow-up question.",
      badges: ["visibleIf"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "radiogroup",
            name: "cond_employment",
            title: "Employment Status",
            description: "Choose an option to reveal a related follow-up question below.",
            isRequired: true,
            choices: ["Employed", "Self-employed", "Student", "Unemployed"],
          },
          {
            type: "text",
            name: "cond_employer",
            title: "Employer Name",
            description: "Visible only when \"Employed\" is selected.",
            visibleIf: "{cond_employment} = 'Employed'",
            isRequired: true,
          },
          {
            type: "text",
            name: "cond_business",
            title: "Business Name",
            description: "Visible only when \"Self-employed\" is selected.",
            visibleIf: "{cond_employment} = 'Self-employed'",
            isRequired: true,
          },
          {
            type: "dropdown",
            name: "cond_school",
            title: "School",
            description: "Visible only when \"Student\" is selected.",
            visibleIf: "{cond_employment} = 'Student'",
            choices: ["High School", "College", "Graduate School"],
          },
          {
            type: "boolean",
            name: "cond_newsletter",
            title: "Subscribe to job alerts?",
            description: "Visible only when \"Unemployed\" is selected.",
            visibleIf: "{cond_employment} = 'Unemployed'",
          },
        ],
      },
    },
    {
      id: "calculated-values",
      title: "Calculated Values",
      description:
        "Survey-level `calculatedValues` compute hidden values from other answers — here, a hidden flag drives the visibility of a bonus notice, while an `expression` question shows a live total.",
      badges: ["calculatedValues", "expression", "visibleIf"],
      json: {
        showCompleteButton: false,
        calculatedValues: [{ name: "isBulkOrder", expression: "{calc_qty} >= 10", includeIntoResult: true }],
        elements: [
          {
            type: "text",
            inputType: "number",
            name: "calc_price",
            title: "Item Price ($)",
            description: "Used to compute the total below.",
            defaultValue: 25,
          },
          {
            type: "text",
            inputType: "number",
            name: "calc_qty",
            title: "Quantity",
            description: "Set to 10 or more to reveal the bulk-order notice.",
            defaultValue: 2,
          },
          {
            type: "expression",
            name: "calc_total",
            title: "Total ($)",
            description: "Computed live via an `expression` question: Price × Quantity.",
            expression: "{calc_price} * {calc_qty}",
            displayStyle: "currency",
            currency: "USD",
          },
          {
            type: "html",
            name: "calc_bulk_notice",
            description: "Visibility is driven by the hidden \"isBulkOrder\" calculated value.",
            visibleIf: "{isBulkOrder} = true",
            html:
              "<div style='padding:10px 14px;border-radius:8px;background:#ecfdf5;border:1px solid #6ee7b7;color:#065f46'>" +
              "🎉 Bulk order discount applied for 10 or more items!</div>",
          },
        ],
      },
    },
  ],
};
