import { SITE_CONFIG } from "@/constants/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
        <p>
          Built with <span className="font-medium text-foreground">SurveyJS</span>, Next.js, Tailwind
          CSS, and Framer Motion.
        </p>
        <p className="mt-1">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Every theme is free to preview, apply,
          and export.
        </p>
      </div>
    </footer>
  );
}
