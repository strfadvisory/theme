import type { ShowcaseSection } from "@/types/form-elements";

export const MATRICES_SECTION: ShowcaseSection = {
  id: "matrices",
  title: "Matrix Questions",
  description: "Tabular questions for rating multiple items, collecting structured rows, or building dynamic lists.",
  items: [
    {
      id: "matrix",
      title: "Matrix",
      description:
        "Single-select matrix — choose one option per row from a shared set of columns. Marked as required: every row must be answered.",
      badges: ["Required", "Single-select per row"],
      span: "full",
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "matrix",
            name: "matrix_aspects",
            title: "Rate the Following Aspects",
            description: "Pick one rating per row. Required — click Validate without answering to see the error.",
            isRequired: true,
            requiredErrorText: "Please rate every row.",
            columns: [
              { value: 1, text: "Poor" },
              { value: 2, text: "Fair" },
              { value: 3, text: "Good" },
              { value: 4, text: "Very Good" },
              { value: 5, text: "Excellent" },
            ],
            rows: [
              { value: "speed", text: "Speed" },
              { value: "support", text: "Support" },
              { value: "pricing", text: "Pricing" },
            ],
          },
        ],
      },
    },
    {
      id: "matrixdropdown",
      title: "Matrix Dropdown",
      description:
        "Each column can use a different cell type — dropdown, text, or rating — making it a flexible grid for structured data entry.",
      badges: ["Mixed cell types", "Required column"],
      span: "full",
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "matrixdropdown",
            name: "matrixdropdown_review",
            title: "Quarterly Plan Review",
            description: "\"Status\" is required for every row; \"Owner\" is text and \"Confidence\" is a rating.",
            columns: [
              {
                name: "status",
                title: "Status",
                cellType: "dropdown",
                isRequired: true,
                choices: ["On Track", "At Risk", "Delayed"],
              },
              { name: "owner", title: "Owner", cellType: "text" },
              { name: "confidence", title: "Confidence", cellType: "rating", rateMax: 5 },
            ],
            rows: ["Q1 Roadmap", "Q2 Roadmap", "Q3 Roadmap"],
          },
        ],
      },
    },
    {
      id: "matrixdynamic",
      title: "Dynamic Matrix",
      description:
        "Rows can be added or removed by the user — ideal for itemized lists like invoices, line items, or repeated entries.",
      badges: ["Add/remove rows", "Min/max count"],
      span: "full",
      json: {
        completeText: "Validate",
        elements: [
          {
            type: "matrixdynamic",
            name: "matrixdynamic_lineitems",
            title: "Line Items",
            description: "Add or remove rows. At least 1 row is required, up to 10 allowed.",
            rowCount: 2,
            minRowCount: 1,
            maxRowCount: 10,
            addRowText: "Add line item",
            removeRowText: "Remove",
            columns: [
              { name: "item", title: "Item", cellType: "text", isRequired: true },
              { name: "qty", title: "Qty", cellType: "text", inputType: "number", defaultValue: 1 },
              { name: "price", title: "Unit Price ($)", cellType: "text", inputType: "number" },
            ],
          },
        ],
      },
    },
  ],
};
