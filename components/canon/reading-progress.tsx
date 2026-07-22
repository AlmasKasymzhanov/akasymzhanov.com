"use client";

import { useEffect, useState } from "react";

// Sticky reading progress bar at the top of the viewport.
// Appears once the user has scrolled past the article header.
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const article = document.querySelector("article");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrolled = window.scrollY - articleTop + viewportHeight / 2;
      const total = articleHeight;
      const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));

      setProgress(pct);
      setVisible(window.scrollY > articleTop + 100);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 h-[2px] bg-[var(--color-border)] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <div
        className="h-full bg-[var(--color-brand)] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
