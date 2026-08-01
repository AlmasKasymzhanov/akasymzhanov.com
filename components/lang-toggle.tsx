"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALES, type Locale, localeFromPathname, pathForLocale, dict } from "@/lib/i18n";

// RU / EN language switch — segmented pill, both visible on every breakpoint.
// Route-based: the active locale comes from the path ("/" = ru, "/en…" = en),
// and clicking navigates to the same page in the other locale. EN therefore
// has its own crawlable URLs (see lib/i18n).
const LABELS: Record<Locale, string> = { ru: "RU", en: "EN" };

export function LangToggle({ variant = "compact" }: { variant?: "compact" | "panel" }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const active = localeFromPathname(pathname);

  return (
    <div
      role="radiogroup"
      aria-label={dict[active].nav.lang}
      className={
        variant === "panel"
          ? "grid w-full grid-cols-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-1"
          : "inline-flex items-center gap-0.5 rounded-full border border-[var(--color-border)] bg-[var(--color-text)]/5 p-0.5"
      }
    >
      {LOCALES.map((l) => {
        const isActive = l === active;
        return (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={l === "ru" ? "Русский" : "English"}
            onClick={() => {
              if (!isActive) router.push(pathForLocale(pathname, l));
            }}
            className={`flex items-center justify-center text-[11px] font-bold transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-brand)]/60 ${
              variant === "panel" ? "h-11 rounded-[4px] px-3" : "h-6 rounded-full px-1 md:h-7 md:px-2.5"
            } ${
              isActive
                ? "bg-[var(--color-bg)] text-[var(--color-text)] shadow-sm"
                : "text-[var(--color-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-text)]/8"
            }`}
          >
            {LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}
