import type { Metadata } from "next";

const title = "Кто заработал и кто потерял деньги на ЧМ-2026";
const description =
  "$5,69 млрд оборота на рынках финала ЧМ-2026 — это не банк и не прибыль. Разбираем, кто реально заработал и потерял, и какие суммы нельзя сравнивать.";
const canonical = "https://kasymzhanov.com/blog/world-cup-final-money";

export const metadata: Metadata = {
  title,
  description,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical,
    languages: {
      "ru-RU": canonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "article",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
