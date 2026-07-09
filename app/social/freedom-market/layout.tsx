import type { Metadata } from "next";

/* Internal social-card factory: rendered only to be screenshotted (1080×1350
 * Instagram carousel slides). Never indexed, never linked from the site. */
export const metadata: Metadata = {
  title: "Соцпак: freedom-market",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
