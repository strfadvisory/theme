import { type ClassValue, clsx } from "clsx";

/** Merges conditional class names. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}

/** Triggers a browser download of `data` serialized as pretty-printed JSON. */
export function downloadJSON(data: unknown, filename: string): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/** Converts a theme name into a kebab-case filename, e.g. "Ocean" -> "ocean-theme.json". */
export function toFilename(name: string): string {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-theme.json`;
}
