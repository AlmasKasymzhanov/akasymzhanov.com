"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

const THRESHOLDS = [25, 50, 75, 100];

export function ReadTracker({ slug }: { slug: string }) {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    function handleScroll() {
      const story = document.querySelector<HTMLElement>("[data-article-body]");
      if (!story) return;
      const rect = story.getBoundingClientRect();
      const storyTop = rect.top + window.scrollY;
      const storyHeight = story.scrollHeight;
      if (storyHeight <= 0) return;
      const visibleBottom = window.scrollY + window.innerHeight;
      const pct = Math.max(0, Math.min(100, Math.round(((visibleBottom - storyTop) / storyHeight) * 100)));

      for (const threshold of THRESHOLDS) {
        if (pct >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);

          // Vercel Analytics
          track("read_depth", { slug, depth: threshold });

          // Supabase
          fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slug,
              event_type: "read_depth",
              metadata: { depth: threshold },
            }),
          }).catch(() => {});
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  return null;
}
