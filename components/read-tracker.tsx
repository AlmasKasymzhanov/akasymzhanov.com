"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

const THRESHOLDS = [25, 50, 75, 100];

export function ReadTracker({ slug }: { slug: string }) {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);

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
