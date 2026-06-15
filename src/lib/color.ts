/**
 * Lightweight color utilities used to derive hover/active/contrast shades
 * from a theme's base palette without pulling in a full color library.
 */

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const RGBA_RE = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/;

export function parseColor(input: string): RGBA | null {
  const value = input.trim();

  const hexMatch = value.match(HEX_RE);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    const num = parseInt(hex, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255, a: 1 };
  }

  const rgbaMatch = value.match(RGBA_RE);
  if (rgbaMatch) {
    return {
      r: parseFloat(rgbaMatch[1]),
      g: parseFloat(rgbaMatch[2]),
      b: parseFloat(rgbaMatch[3]),
      a: rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1,
    };
  }

  return null;
}

/** Returns a copy of `color` with the given alpha. Falls back to `color` if unparsable. */
export function withAlpha(color: string, alpha: number): string {
  const c = parseColor(color);
  if (!c) return color;
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
}

/** Mixes `color` toward `target` by `weight` (0 = color, 1 = target). */
export function mix(color: string, target: string, weight: number): string {
  const c1 = parseColor(color);
  const c2 = parseColor(target);
  if (!c1 || !c2) return color;
  const r = Math.round(c1.r + (c2.r - c1.r) * weight);
  const g = Math.round(c1.g + (c2.g - c1.g) * weight);
  const b = Math.round(c1.b + (c2.b - c1.b) * weight);
  const a = c1.a + (c2.a - c1.a) * weight;
  return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(3))})`;
}

/** Lightens or darkens a color by mixing it toward white/black. */
export function shade(color: string, amount: number): string {
  return amount >= 0 ? mix(color, "#ffffff", amount) : mix(color, "#000000", -amount);
}

/** Returns "#1a1a1a" or "#ffffff" — whichever yields better contrast on `color`. */
export function getContrastColor(color: string): string {
  const c = parseColor(color);
  if (!c) return "#ffffff";
  const luminance = (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255;
  return luminance > 0.6 ? "#1a1a1a" : "#ffffff";
}

export function isGradient(value: string): boolean {
  return /gradient/i.test(value);
}

/** Returns a solid color, falling back to `fallback` if `value` is a gradient. */
export function toSolid(value: string, fallback: string): string {
  return isGradient(value) ? fallback : value;
}

/** Parses a CSS length like "14px" and returns the numeric pixel value. */
export function parsePx(value: string): number {
  const match = value.trim().match(/^(-?[\d.]+)px$/);
  return match ? parseFloat(match[1]) : 0;
}
