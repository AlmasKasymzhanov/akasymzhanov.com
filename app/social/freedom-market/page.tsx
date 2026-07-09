"use client";

/**
 * Carousel slide factory for the freedom-market investigation — the
 * BI/Bloomberg Instagram anatomy on our own design system: the site's
 * masthead, Hack mono, entity colours and real Brock UI charts. Each slide
 * is a fixed 1080×1350 (4:5) frame; Playwright screenshots the elements by
 * id (#slide-1, #slide-4, …) in both themes. One idea per slide, ≤20 words.
 */

import Image from "next/image";
import { Masthead } from "@/components/canon/masthead";
import { ColumnChart } from "@/components/charts/column-chart";

const pct = (v: number) => `${v.toLocaleString("ru-RU")}%`;

/* ── slide frame: masthead → content → source/counter footer ── */
function Slide({
  id,
  n,
  total = 9,
  kicker,
  source,
  children,
}: {
  id: string;
  n: number;
  total?: number;
  kicker: string;
  source?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="relative flex flex-col font-mono overflow-hidden"
      style={{ width: 1080, height: 1350, background: "var(--color-bg)", color: "var(--color-text)", padding: 64 }}
    >
      {/* Masthead row */}
      <div className="flex items-center justify-between pb-8 border-b" style={{ borderColor: "var(--color-border)" }}>
        <span className="pointer-events-none [&_a]:text-[30px] [&_a]:tracking-[0.14em]">
          <Masthead size="lg" />
        </span>
        <span className="text-[24px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-brand)" }}>
          {kicker}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center min-h-0">{children}</div>

      {/* Footer */}
      <div
        className="flex items-end justify-between gap-8 pt-7 border-t text-[20px] leading-snug"
        style={{ borderColor: "var(--color-border)", color: "var(--color-dim)" }}
      >
        <span className="max-w-[720px]">{source ?? "kasymzhanov.com"}</span>
        <span className="tabular-nums whitespace-nowrap">
          {n}/{total} · kasymzhanov.com
        </span>
      </div>
    </div>
  );
}

/* ── Slide 1 · cover ── */
function SlideCover() {
  return (
    <Slide id="slide-1" n={1} kicker="Расследование">
      <div className="relative w-full" style={{ aspectRatio: "1600/1195", background: "#e93032" }}>
        <Image src="/blog/freedom-market/cover.webp" alt="" fill className="object-contain" priority sizes="952px" />
      </div>
      <h1 className="font-bold tracking-tight leading-[1.04] text-[84px] mt-12">
        Маркетплейс умер.
        <br />
        Он вам позвонит.
      </h1>
      <p className="text-[30px] leading-relaxed mt-8" style={{ color: "var(--color-dim)" }}>
        Freedom тихо перезапускает Teez против Kaspi. Листайте →
      </p>
    </Slide>
  );
}

/* ── Slide 4 · the commission ladder ── */
function SlideLadder() {
  return (
    <Slide
      id="slide-4"
      n={4}
      kicker="Эксклюзив"
      source="Источник: условия Freedom Market для первых партнёров, июль 2026"
    >
      <h2 className="font-bold tracking-tight leading-[1.08] text-[64px] mb-10">
        5% за карту.
        <br />
        14% за рассрочку
        <br />
        на два года.
      </h2>
      {/* Brock UI chart, scaled ×2 so its type reads at feed size */}
      <div style={{ width: 904, height: 730 }}>
        <div style={{ width: 452, transform: "scale(2)", transformOrigin: "top left" }}>
          <ColumnChart
            height={320}
            barRadius={2}
            gap={8}
            accent="var(--viz-freedom)"
            data={[
              { label: "Карта", value: 5, color: "var(--brock-neutral)" },
              { label: "Кредит", value: 5, color: "var(--brock-neutral)" },
              { label: "3 мес", value: 6, color: "var(--brock-neutral)" },
              { label: "6 мес", value: 8, color: "var(--brock-neutral)" },
              { label: "9 мес", value: 11, color: "var(--brock-neutral)" },
              { label: "12 мес", value: 13, color: "var(--brock-neutral)" },
              { label: "24 мес", value: 14 },
            ]}
            yAxis={{ max: 16, hideTicks: true }}
            slots={{ tooltip: () => null }}
            dataLabels={{ show: true, format: pct }}
            formatValue={pct}
          />
        </div>
      </div>
      <p className="text-[30px] font-bold leading-snug border-l-4 pl-6 mt-6" style={{ borderColor: "var(--color-dim)" }}>
        +9 п.п. - цена двух лет рассрочки для продавца.
      </p>
    </Slide>
  );
}

export default function SocialFreedomMarket() {
  return (
    <div className="min-h-screen py-16 flex flex-col items-center gap-16" style={{ background: "var(--color-surface)" }}>
      <SlideCover />
      <SlideLadder />
    </div>
  );
}
