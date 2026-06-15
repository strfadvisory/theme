import type { ShowcaseSection } from "@/types/form-elements";
import { swatch } from "./assets";

export const CONTENT_DISPLAY_SECTION: ShowcaseSection = {
  id: "content-display",
  title: "Long-Form Text & Static Content",
  description:
    "Multi-line text entry plus non-input elements for instructions, rich content, computed values, and images.",
  items: [
    {
      id: "comment",
      title: "Text Area / Comment",
      description:
        "Multi-line text area for longer answers. Includes a required field with a character-count validator and a read-only field.",
      badges: ["Required", "Length validator", "Read-only"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "comment",
            name: "comment_basic",
            title: "Additional Comments",
            description: "Multi-line text area.",
            placeholder: "Type your message here...",
            rows: 4,
          },
          {
            type: "comment",
            name: "comment_reason",
            title: "Reason for Request",
            description: "Required, 10-500 characters.",
            isRequired: true,
            requiredErrorText: "Please provide a reason.",
            rows: 4,
            validators: [
              { type: "text", minLength: 10, maxLength: 500, text: "Must be between 10 and 500 characters." },
            ],
          },
          {
            type: "comment",
            name: "comment_terms",
            title: "Terms Summary",
            description: "Read-only field.",
            defaultValue: "By proceeding you agree to our Terms of Service and Privacy Policy.",
            readOnly: true,
            rows: 2,
          },
        ],
      },
    },
    {
      id: "html",
      title: "HTML Content",
      description:
        "Renders static, arbitrary HTML — useful for instructions, banners, dividers, or embedded rich content. Not a question, so it has no value.",
      badges: ["Static content"],
      json: {
        showCompleteButton: false,
        elements: [
          {
            type: "html",
            name: "html_intro",
            html:
              "<h4 style='margin:0 0 4px'>Welcome 👋</h4>" +
              "<p style='margin:0'>This block renders <strong>arbitrary HTML</strong> — great for instructions, " +
              "banners, dividers, or embedded rich content inside a survey.</p>",
          },
          {
            type: "html",
            name: "html_alert",
            html:
              "<div style='padding:10px 14px;border-radius:8px;background:#fff7ed;border:1px solid #fed7aa;color:#9a3412'>" +
              "⚠️ This is a styled inline-HTML alert block.</div>",
          },
        ],
      },
    },
    {
      id: "expression",
      title: "Expression",
      description:
        "A read-only field whose value is computed live from an expression referencing other questions. Change the inputs to see the total update instantly.",
      badges: ["Read-only", "Live calculation"],
      json: {
        showCompleteButton: false,
        elements: [
          {
            type: "text",
            inputType: "number",
            name: "exp_price",
            title: "Unit Price ($)",
            defaultValue: 25,
          },
          {
            type: "text",
            inputType: "number",
            name: "exp_qty",
            title: "Quantity",
            defaultValue: 3,
          },
          {
            type: "expression",
            name: "exp_total",
            title: "Total Price",
            description: "Computed as Unit Price × Quantity.",
            expression: "{exp_price} * {exp_qty}",
            displayStyle: "currency",
            currency: "USD",
          },
        ],
      },
    },
    {
      id: "image",
      title: "Image",
      description:
        "Displays a static image (or video) inside the survey — useful for illustrations, diagrams, or product previews. Not a question, so it has no value.",
      badges: ["Static content"],
      json: {
        showCompleteButton: false,
        elements: [
          {
            type: "image",
            name: "image_basic",
            title: "Product Preview",
            description: "Renders an image with configurable width, height, and fit.",
            imageLink: swatch("SurveyJS Image Question", "#19b394"),
            imageWidth: "100%",
            imageHeight: 140,
            imageFit: "cover",
          },
        ],
      },
    },
  ],
};
