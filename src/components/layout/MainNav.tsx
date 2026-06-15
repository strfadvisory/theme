"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormInput, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Theme Gallery", icon: LayoutGrid },
  { href: "/form-elements", label: "All Form Elements", icon: FormInput },
] as const;

/** Primary tab navigation between the theme gallery and the form elements showcase. */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="glass-surface border-b border-border bg-surface/60">
      <div className="mx-auto flex max-w-screen-2xl gap-1 px-4 sm:px-6 lg:px-8">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "focus-ring flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
