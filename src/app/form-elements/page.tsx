import type { Metadata } from "next";
import { FormElementsShowcase } from "@/components/form-elements";

export const metadata: Metadata = {
  title: "All Form Elements",
  description:
    "A complete SurveyJS component showcase covering every form element, container, validation state, and survey behavior.",
};

export default function FormElementsPage() {
  return <FormElementsShowcase />;
}
