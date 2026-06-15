/**
 * Generates a small inline SVG data URI for image-based demo questions
 * (Image, Image Picker). Keeps the showcase fully self-contained — no
 * network requests or placeholder assets required.
 */
export function swatch(label: string, bg: string, fg = "#ffffff"): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100">` +
    `<rect width="100%" height="100%" fill="${bg}" rx="8"/>` +
    `<text x="50%" y="50%" fill="${fg}" font-size="15" font-family="sans-serif" ` +
    `text-anchor="middle" dominant-baseline="middle">${label}</text>` +
    `</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
