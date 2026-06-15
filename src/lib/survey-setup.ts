import { ComponentCollection, FunctionFactory } from "survey-core";

const RESERVED_HANDLES = ["admin", "root", "support", "test", "moderator"];

let registered = false;

/**
 * Registers the custom composite question type and validator function used
 * by the "All Form Elements" showcase. Idempotent — `ComponentCollection`
 * and `FunctionFactory` are global singletons, so this must only run once.
 */
export function registerShowcaseExtensions(): void {
  if (registered) return;
  registered = true;

  ComponentCollection.Instance.add({
    name: "addressblock",
    title: "Address Block",
    elementsJSON: [
      {
        type: "text",
        name: "street",
        title: "Street Address",
        isRequired: true,
        placeholder: "123 Main St",
      },
      {
        type: "text",
        name: "city",
        title: "City",
        isRequired: true,
        startWithNewLine: false,
        placeholder: "Springfield",
      },
      {
        type: "text",
        name: "state",
        title: "State / Province",
        startWithNewLine: false,
        placeholder: "IL",
      },
      {
        type: "text",
        name: "zip",
        title: "ZIP / Postal Code",
        startWithNewLine: false,
        placeholder: "62704",
        validators: [{ type: "regex", regex: "^[0-9]{5}$", text: "Enter a 5-digit ZIP code." }],
      },
    ],
  });

  // Used by the "Custom Validation" expression validator below.
  FunctionFactory.Instance.register("isHandleAvailable", (params: unknown[]) => {
    const value = String(params[0] ?? "").toLowerCase();
    return value.length === 0 || !RESERVED_HANDLES.includes(value);
  });
}
