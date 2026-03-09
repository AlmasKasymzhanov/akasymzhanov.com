"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NAV_SECTIONS } from "./sidebar";

export function SidebarMobile() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-surface border border-border text-text hover:bg-surface-hover transition-colors"
        aria-label="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          {/* Drawer */}
          <div
            className="w-72 h-full bg-bg border-r border-border overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Link href="/" className="no-underline" onClick={() => setOpen(false)}>
                <span className="text-lg font-bold tracking-tight text-white">
                  Almas K.
                </span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-dim hover:text-text hover:bg-surface-hover transition-colors"
                aria-label="Close menu"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 4l10 10M14 4L4 14" />
                </svg>
              </button>
            </div>

            <nav className="px-3 pb-6">
              {NAV_SECTIONS.map((section) => (
                <div key={section.title} className="mb-6">
                  <h3 className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-dim">
                    {section.title}
                  </h3>
                  <ul className="space-y-0.5">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`block px-3 py-2.5 rounded-lg text-sm no-underline transition-colors ${
                              isActive
                                ? "bg-accent/15 text-accent font-medium"
                                : "text-dim hover:text-text hover:bg-surface-hover"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="px-6 py-4 border-t border-border">
              <a
                href="https://github.com/AlmasKasymzhanov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-dim hover:text-text transition-colors no-underline"
              >
                GitHub →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
