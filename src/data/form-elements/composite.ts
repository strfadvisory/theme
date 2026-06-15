import type { ShowcaseSection } from "@/types/form-elements";

export const COMPOSITE_SECTION: ShowcaseSection = {
  id: "composite",
  title: "Composite Question Types",
  description:
    "SurveyJS lets you register custom, reusable question types built from several nested questions via `ComponentCollection.Instance.add()`.",
  items: [
    {
      id: "address-block",
      title: "Address Block (Composite)",
      description:
        "A custom \"addressblock\" question type registered once via `ComponentCollection`, bundling Street, City, State, and ZIP into a single reusable question with its own validators.",
      badges: ["Custom type", "Required", "Regex validator"],
      span: "full",
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "addressblock",
            name: "composite_shipping",
            title: "Shipping Address",
            description: "Rendered entirely by the registered \"addressblock\" composite question type.",
          },
        ],
      },
    },
  ],
};
