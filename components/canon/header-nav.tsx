"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { localeFromPathname, dict } from "@/lib/i18n";

const NAV_ITEMS = [
  { key: "data", href: "/data" },
  { key: "practice", href: "/tools" },
  { key: "market", href: "/market" },
  { key: "about", href: "/about" },
] as const;

function MenuIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function HeaderNav() {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  const t = dict[locale].nav;
  const prefix = locale === "en" ? "/en" : "";
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const href = `${prefix}${item.href}`;
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={item.key}
              href={href}
              className={`relative px-3 py-2 text-[12px] font-bold uppercase tracking-[0.08em] no-underline transition-colors ${
                isActive ? "text-[var(--color-brand)]" : "text-[var(--color-dim)] hover:text-[var(--color-text)]"
              }`}
            >
              {t[item.key]}
              {isActive && <span className="absolute bottom-[-1px] left-3 right-3 h-px bg-[var(--color-brand)]" />}
            </Link>
          );
        })}
      </nav>

      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="md:hidden grid place-items-center h-9 w-9 text-[var(--color-text)] hover:opacity-60 transition-opacity"
        aria-label={t.openMenu}
        aria-expanded={mobileOpen}
      >
        <MenuIcon size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-[var(--color-bg)]/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-[var(--color-bg)] border-l border-[var(--color-border)] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
              <span className="font-heading text-[14px] font-bold uppercase tracking-[0.12em] text-[var(--color-text)]">
                {t.menu}
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid place-items-center h-9 w-9 text-[var(--color-text)] hover:opacity-60 transition-opacity"
                aria-label={t.closeMenu}
              >
                <CloseIcon size={20} />
              </button>
            </div>
            <nav className="flex flex-col p-5 gap-1" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => {
                const href = `${prefix}${item.href}`;
                const isActive = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={item.key}
                    href={href}
                    className={`px-3 py-3 text-[15px] font-bold uppercase tracking-[0.06em] no-underline transition-colors border-l-2 ${
                      isActive
                        ? "text-[var(--color-brand)] border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                        : "text-[var(--color-dim)] border-transparent hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                    }`}
                  >
                    {t[item.key]}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
