import type { ShowcaseSection } from "@/types/form-elements";
import { swatch } from "./assets";

export const MEDIA_FILES_SECTION: ShowcaseSection = {
  id: "media-files",
  title: "Media & File Inputs",
  description: "Visual selection, file uploads, and freehand signature capture.",
  items: [
    {
      id: "image-picker",
      title: "Image Picker",
      description:
        "Visual choice list rendered as selectable images. Includes a single-select example and a required multi-select example.",
      badges: ["Single-select", "Multi-select", "Required"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "imagepicker",
            name: "imagepicker_theme",
            title: "Choose a Theme Style",
            description: "Single-select — click an image to choose it.",
            imageWidth: 120,
            imageHeight: 80,
            choices: [
              { value: "light", text: "Light", imageLink: swatch("Light", "#f8fafc", "#1a1a1a") },
              { value: "dark", text: "Dark", imageLink: swatch("Dark", "#0f1115") },
              { value: "colorful", text: "Colorful", imageLink: swatch("Colorful", "#6c5ce7") },
            ],
          },
          {
            type: "imagepicker",
            name: "imagepicker_addons",
            title: "Select Add-ons",
            description: "Required multi-select — choose at least one.",
            isRequired: true,
            requiredErrorText: "Select at least one add-on.",
            multiSelect: true,
            imageWidth: 120,
            imageHeight: 80,
            choices: [
              { value: "analytics", text: "Analytics", imageLink: swatch("Analytics", "#19b394") },
              { value: "support", text: "Priority Support", imageLink: swatch("Support", "#ff9814") },
              { value: "storage", text: "Extra Storage", imageLink: swatch("Storage", "#00b8d9") },
            ],
          },
        ],
      },
    },
    {
      id: "file-upload",
      title: "File Upload",
      description:
        "Drag-and-drop or browse-to-upload file input. Includes a multi-file example and a required, type-restricted example.",
      badges: ["Drag & drop", "Multiple files", "Required"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "file",
            name: "file_attachments",
            title: "Upload Attachments",
            description: "Drag and drop, or browse to upload multiple files.",
            allowMultiple: true,
          },
          {
            type: "file",
            name: "file_resume",
            title: "Resume / CV",
            description: "Required, PDF only, up to 5 MB.",
            isRequired: true,
            requiredErrorText: "Please upload your resume.",
            acceptedTypes: ".pdf",
            maxSize: 5242880,
          },
        ],
      },
    },
    {
      id: "signature-pad",
      title: "Signature Pad",
      description:
        "Freehand signature capture using mouse or touch. Includes a basic example and a required example with a clear button.",
      badges: ["Required", "Clearable"],
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "signaturepad",
            name: "signature_basic",
            title: "Signature",
            description: "Draw using mouse, stylus, or touch.",
          },
          {
            type: "signaturepad",
            name: "signature_authorized",
            title: "Authorized Signature",
            description: "Required — sign before clicking Validate.",
            isRequired: true,
            requiredErrorText: "A signature is required.",
            allowClear: true,
          },
        ],
      },
    },
  ],
};
