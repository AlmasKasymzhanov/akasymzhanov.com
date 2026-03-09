"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_SECTIONS = [
  {
    title: "Инструменты",
    items: [
      { label: "WB Analyzer", href: "/tools/wb-analyzer" },
      { label: "MPStats API Гайд", href: "/tools/mpstats-api" },
    ],
  },
  {
    title: "Отчёты",
    items: [{ label: "BG Optic", href: "/reports/bg-optic" }],
  },
  {
    title: "Блог",
    items: [{ label: "Все посты", href: "/blog" }],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-border bg-surface overflow-y-auto">
      <div className="px-6 py-6">
        <Link href="/" className="block no-underline">
          <span className="text-lg font-bold tracking-tight text-white">
            Almas K.
          </span>
          <span className="block text-xs text-dim mt-1">
            Marketplace Analytics
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 pb-6">
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
                      className={`block px-3 py-2 rounded-lg text-sm no-underline transition-colors ${
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
    </aside>
  );
}

export { NAV_SECTIONS };
