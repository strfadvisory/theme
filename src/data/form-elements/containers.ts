import type { ShowcaseSection } from "@/types/form-elements";

export const CONTAINERS_SECTION: ShowcaseSection = {
  id: "containers",
  title: "Containers & Panels",
  description: "Group related questions visually and structurally — static panels, repeatable panels, and nesting.",
  items: [
    {
      id: "panel",
      title: "Panel",
      description:
        "Groups related questions under a single heading with its own description, separating them visually from the rest of the form.",
      badges: ["Grouping", "Required fields"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "panel",
            name: "panel_contact",
            title: "Contact Information",
            description: "All fields in this panel are grouped together visually.",
            elements: [
              { type: "text", name: "panel_first", title: "First Name", isRequired: true, placeholder: "Jane" },
              {
                type: "text",
                name: "panel_last",
                title: "Last Name",
                isRequired: true,
                startWithNewLine: false,
                placeholder: "Doe",
              },
              {
                type: "text",
                inputType: "email",
                name: "panel_email",
                title: "Email",
                placeholder: "jane@example.com",
              },
            ],
          },
        ],
      },
    },
    {
      id: "paneldynamic",
      title: "Dynamic Panel",
      description:
        "Renders a repeatable group of questions — users can add or remove panel instances, each with its own validation.",
      badges: ["Add/remove", "Min/max count", "Required"],
      span: "full",
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "paneldynamic",
            name: "dynamicpanel_contacts",
            title: "Emergency Contacts",
            description: "Add up to 5 contacts — at least 1 is required.",
            templateTitle: "Contact {panelIndex}",
            panelCount: 1,
            minPanelCount: 1,
            maxPanelCount: 5,
            panelAddText: "Add contact",
            panelRemoveText: "Remove",
            templateElements: [
              { type: "text", name: "contact_name", title: "Name", isRequired: true, placeholder: "Full name" },
              {
                type: "text",
                inputType: "tel",
                name: "contact_phone",
                title: "Phone",
                startWithNewLine: false,
                placeholder: "+1 555 0100",
              },
              {
                type: "dropdown",
                name: "contact_relation",
                title: "Relationship",
                startWithNewLine: false,
                choices: ["Parent", "Sibling", "Spouse", "Friend", "Colleague"],
              },
            ],
          },
        ],
      },
    },
    {
      id: "nested-panels",
      title: "Nested Panels",
      description:
        "Panels can be nested inside other panels to build hierarchical sections — useful for multi-level forms like company or organization details.",
      badges: ["Hierarchy", "Required fields"],
      span: "full",
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "panel",
            name: "nested_company",
            title: "Company Details",
            description: "An outer panel containing a nested address panel, which itself nests a location panel.",
            elements: [
              { type: "text", name: "company_name", title: "Company Name", isRequired: true, placeholder: "Acme Inc." },
              {
                type: "panel",
                name: "nested_address",
                title: "Headquarters Address",
                elements: [
                  { type: "text", name: "hq_street", title: "Street", placeholder: "123 Main St" },
                  {
                    type: "panel",
                    name: "nested_location",
                    title: "Location",
                    elements: [
                      { type: "text", name: "hq_city", title: "City", placeholder: "Springfield" },
                      {
                        type: "text",
                        name: "hq_state",
                        title: "State",
                        startWithNewLine: false,
                        placeholder: "IL",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
};
