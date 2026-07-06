"use client";

/**
 * Brock UI charts (EN) for "The Marketplace Is Dead. It Will Call You."
 * (freedom-market). Native-English mirror of the RU chart module, per
 * brock-ui-charts-spec-EN.md. Bloomberg Businessweek / FT canon: flat fills,
 * generous air, hairline axes; ONE warm accent (--brock-accent) for the
 * signal, graphite (--brock-neutral) for context. Headlines state takeaways
 * (in the page's ChartSlot), sources in captions.
 */

import { useEffect, useRef, useState } from "react";
import { ColumnChart } from "@/components/charts/column-chart";
import { LineChart } from "@/components/charts/line-chart";
import { Term } from "@/components/canon/term";

const num = (v: number) => v.toLocaleString("en-US");
const ACCENT = "var(--brock-accent)";
const NEUTRAL = "var(--brock-neutral)";

/* Reveal-on-scroll: returns [ref, visible]. Fires once when the element enters
 * the viewport; `prefers-reduced-motion` short-circuits to visible so nothing
 * ever animates for users who opted out. */
function useReveal<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

/* Plain-words colour legend (the orange/grey decoder). */
function Legend({ items }: { items: { color: string; label: string; faint?: boolean }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3.5 font-mono text-[11px] leading-snug text-[var(--color-dim)]">
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block w-3 h-3 rounded-[2px] shrink-0"
            style={{ background: it.color, opacity: it.faint ? 0.3 : 1 }}
          />
          <span>{it.label}</span>
        </span>
      ))}
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-dim)] mb-2">
      {children}
    </p>
  );
}

/* ── CHART 1. The Teez timeline: promises vs. dates ─────────────────── */
type TimelineEvent = {
  date: string;
  side: "promise" | "fact";
  text: React.ReactNode;
  accent?: boolean;
  /** Locks this row and the next one into the visual conflict pair. */
  pairWithNext?: boolean;
};

const TIMELINE: TimelineEvent[] = [
  { date: "Jun 2024", side: "promise", text: <>&ldquo;50 countries in 5 years&rdquo;</> },
  { date: "Sep 2024", side: "fact", text: <>Launch: next-day delivery, Karaganda warehouse</> },
  { date: "Spring 2025", side: "fact", text: <>Peak: 11K orders/day, 28K sellers, 32 cities</> },
  {
    date: "Jan 19–21, 2026",
    side: "promise",
    text: <>&ldquo;A major fintech is buying us&rdquo; (name under <Term tip="Non-disclosure agreement.">NDA</Term>); &ldquo;delays = transition period, 1.5–2 weeks&rdquo;</>,
  },
  {
    date: "Feb 12, 2026",
    side: "fact",
    text: <><Term tip="A preliminary agreement on the key terms of a deal - not yet the deal itself.">Term sheet</Term> signed, <Term tip="The four largest global audit firms: Deloitte, PwC, EY, KPMG.">Big Four</Term> <Term tip="A comprehensive pre-acquisition review of a company: finances, debts, legal risks.">due diligence</Term></>,
  },
  {
    date: "Feb 19, 2026",
    side: "promise",
    text: <>&ldquo;Payment within two weeks, debts settled&rdquo;</>,
    pairWithNext: true,
  },
  {
    date: "Feb 19, 2026",
    side: "fact",
    text: <>A seller writes to Exclusive.kz: no payouts &ldquo;for the second month running&rdquo;</>,
  },
  { date: "Mar 12, 2026", side: "fact", text: <>Venture investor Yerlan Issekeshev exits the ownership chain</> },
  { date: "Apr 24, 2026", side: "fact", text: <>Co-founders Khusnullin and Yeremin leave management</> },
  {
    date: "May 9, 2026",
    side: "fact",
    text: <>fmarket.kz registered, owner hidden</>,
    accent: true,
  },
  {
    date: "May 13, 2026",
    side: "fact",
    text: <><Term tip="A website security certificate; its issuance means the domain is being actively managed.">SSL certificate</Term> issued on fmarket.kz - including the mail subdomain</>,
    accent: true,
  },
  { date: "Jun 1, 2026", side: "fact", text: <>Freedom announces its single-brand migration</> },
  { date: "Jul 5, 2026", side: "fact", text: <>Call and letter to Kaspi sellers from &ldquo;Freedom Market (formerly Teez)&rdquo;</> },
];

function TimelineRow({ ev, visible, delay }: { ev: TimelineEvent; visible: boolean; delay: number }) {
  const isPromise = ev.side === "promise";
  const badge = (
    <span
      className={`inline-block font-mono text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-[2px] border ${
        isPromise
          ? "text-[var(--color-dim)] border-[var(--color-border)]"
          : ev.accent
            ? "text-[var(--brock-accent)] border-[var(--brock-accent)]"
            : "text-[var(--color-text)] border-[var(--color-border)] bg-[var(--color-border)]/30"
      }`}
    >
      {isPromise ? "promise" : "fact"}
    </span>
  );
  const body = (
    <div className={`min-w-0 ${isPromise ? "md:text-right" : ""}`}>
      <p className="font-mono text-[11px] text-[var(--color-dim)] tabular-nums mb-1">{ev.date}</p>
      <p className={`text-[13px] leading-snug mb-1.5 ${ev.accent ? "text-[var(--brock-accent)] font-semibold" : isPromise ? "text-[var(--color-dim)] italic" : "text-[var(--color-text)]"}`}>
        {ev.text}
      </p>
      {badge}
    </div>
  );
  return (
    <div
      className="grid grid-cols-[14px_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_14px_minmax(0,1fr)] gap-x-3 md:gap-x-4 transition-[opacity,transform] duration-500 ease-out"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(10px)", transitionDelay: `${delay}ms` }}
    >
      <div className="hidden md:block">{isPromise ? body : null}</div>
      <div className="relative flex justify-center">
        <span className="absolute top-0 bottom-0 w-px bg-[var(--color-border)]" aria-hidden />
        <span
          aria-hidden
          className="relative mt-1 inline-block w-2.5 h-2.5 rounded-full border-2"
          style={{
            borderColor: ev.accent ? "var(--brock-accent)" : "var(--brock-neutral)",
            background: isPromise ? "var(--color-bg)" : ev.accent ? "var(--brock-accent)" : "var(--brock-neutral)",
          }}
        />
      </div>
      <div className="pb-6 md:pb-7">
        <div className="md:hidden">{body}</div>
        <div className="hidden md:block">{!isPromise ? body : null}</div>
      </div>
    </div>
  );
}

export function Grafik1() {
  const [ref, visible] = useReveal<HTMLDivElement>();
  /* Group the Feb 19 promise/fact pair (the spec's key visual conflict) into a
   * dashed accent frame; everything else renders as plain rows. */
  const rows: React.ReactNode[] = [];
  for (let i = 0; i < TIMELINE.length; i++) {
    const ev = TIMELINE[i];
    if (ev.pairWithNext && i + 1 < TIMELINE.length) {
      rows.push(
        <div key={`pair-${i}`} className="relative border border-dashed border-[var(--brock-accent)]/50 rounded-[3px] px-3 pt-4 -mx-3 mb-2">
          <span className="absolute -top-2 left-2 px-1.5 bg-[var(--color-surface)] font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--brock-accent)]">
            one day - two genres
          </span>
          <TimelineRow ev={ev} visible={visible} delay={i * 70} />
          <TimelineRow ev={TIMELINE[i + 1]} visible={visible} delay={(i + 1) * 70} />
        </div>,
      );
      i++;
    } else {
      rows.push(<TimelineRow key={`${ev.date}-${i}`} ev={ev} visible={visible} delay={i * 70} />);
    }
  }
  return (
    <div ref={ref}>
      <div className="hidden md:grid grid-cols-[minmax(0,1fr)_14px_minmax(0,1fr)] gap-x-4 mb-4">
        <SubLabel><span className="block text-right">Public promises</span></SubLabel>
        <span aria-hidden />
        <SubLabel>What actually happened</SubLabel>
      </div>
      <div>{rows}</div>
      <p className="mt-2 text-[13px] font-semibold text-[var(--color-text)] border-l-2 border-[var(--brock-accent)] pl-3">
        There is still no press release. The sales department is already working.
      </p>
      <Legend
        items={[
          { color: ACCENT, label: "the events nobody announced (the domain and its mail)" },
          { color: NEUTRAL, label: "the record, per publications and registries" },
        ]}
      />
    </div>
  );
}

/* ── TABLE 2. Uzum and Teez: one model, two outcomes ─────────────────
 * Datawrapper-style editorial table: label column in caps, hairline row
 * separators, tabular-nums values, and mini bar cells for the fintech share
 * (the row that IS the story). Bars animate in on first view. */
function MiniBar({ pct, accent, visible }: { pct: number; accent?: boolean; visible: boolean }) {
  return (
    <div className="mt-1 h-1.5 rounded-full bg-[var(--color-border)]/40 overflow-hidden" aria-hidden>
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{ width: visible ? `${pct}%` : "0%", background: accent ? ACCENT : NEUTRAL }}
      />
    </div>
  );
}

function CompareRow({
  label,
  uzum,
  teez,
  uzumBar,
  teezBar,
  visible,
}: {
  label: React.ReactNode;
  uzum: React.ReactNode;
  teez: React.ReactNode;
  uzumBar?: number;
  teezBar?: number;
  visible?: boolean;
}) {
  return (
    <>
      <div className="col-span-2 md:col-span-1 border-t border-[var(--color-border)] pt-2 pb-2.5 md:pr-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-dim)] mb-0.5">{label}</p>
        <p className="text-[13px] leading-snug text-[var(--color-text)] tabular-nums">{uzum}</p>
        {uzumBar !== undefined && <MiniBar pct={uzumBar} accent visible={!!visible} />}
      </div>
      <div className="col-span-2 md:col-span-1 border-t border-[var(--color-border)]/60 md:border-[var(--color-border)] pt-2 pb-2.5 md:pl-3 md:border-l">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-dim)]/60 mb-0.5 md:opacity-0" aria-hidden="true">{label} · Teez</p>
        <p className="text-[13px] leading-snug text-[var(--color-dim)] tabular-nums">{teez}</p>
        {teezBar !== undefined && <MiniBar pct={teezBar} visible={!!visible} />}
      </div>
    </>
  );
}

export function Grafik2() {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="grid grid-cols-2 md:grid-cols-2">
        <div className="pr-3 pb-2">
          <p className="text-[15px] font-bold text-[var(--brock-accent)]">Uzum</p>
          <p className="font-mono text-[10px] text-[var(--color-dim)]">Uzbekistan</p>
        </div>
        <div className="pl-3 pb-2 border-l border-[var(--color-border)]">
          <p className="text-[15px] font-bold text-[var(--color-dim)]">Teez</p>
          <p className="font-mono text-[10px] text-[var(--color-dim)]">Kazakhstan</p>
        </div>
        <CompareRow label="Installments" uzum={<>Nasiya - from day one</>} teez={<>&ldquo;Next stage&rdquo; - never came</>} />
        <CompareRow
          label={<><Term tip="Gross merchandise value: the total value of goods sold through a platform; the standard measure of marketplace size.">GMV</Term> 2024</>}
          uzum={<>$345M, 2.4× YoY</>}
          teez={<>never disclosed</>}
        />
        <CompareRow
          label="Fintech share of turnover"
          uzum={<>~50%</>}
          teez={<>0%</>}
          uzumBar={50}
          teezBar={0}
          visible={visible}
        />
        <CompareRow
          label="Outcome"
          uzum={<><b>Tencent round, $1.5B valuation</b> - the country&rsquo;s first unicorn (Aug 2025)</>}
          teez={<>Sold with debts to sellers (2026)</>}
        />
      </div>
      <p className="mt-4 text-[13px] font-semibold text-[var(--color-text)] border-l-2 border-[var(--brock-accent)] pl-3">
        The entire difference is one product, switched on a year earlier.
      </p>
    </div>
  );
}

/* ── CHART 3. A bank inside the storefront vs. a bank next door ─────── */
export function Grafik3() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <SubLabel>Ozon · fintech revenue, ₽B</SubLabel>
            <span className="font-mono text-[17px] font-bold tabular-nums" style={{ color: "var(--brock-accent)" }}>+120%</span>
          </div>
          <ColumnChart
            height={190}
            barRadius={2}
            data={[
              { label: "2023", value: 93.3, color: NEUTRAL },
              { label: "2024", value: 195.2 },
            ]}
            yAxis={{ max: 210, hideTicks: true }}
            slots={{ tooltip: () => null }}
            dataLabels={{ show: true, format: (v: number) => num(v) }}
            formatValue={(v: number) => `₽${num(v)}B`}
          />
          <p className="mt-2 font-mono text-[11px] leading-snug text-[var(--color-dim)]">
            fintech delivers &gt;80% of group{" "}
            <Term tip="Earnings before interest, taxes, depreciation and amortization.">EBITDA</Term>{" "}
            (2024)
          </p>
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <SubLabel>SberMegaMarket · sales, ₽B</SubLabel>
            <span className="font-mono text-[17px] font-bold tabular-nums" style={{ color: "var(--brock-accent)" }}>−93%</span>
          </div>
          <ColumnChart
            height={190}
            barRadius={2}
            data={[
              { label: "2023", value: 312, color: NEUTRAL },
              { label: "2024", value: 342.6, color: NEUTRAL },
              { label: "2025", value: 24.5 },
            ]}
            yAxis={{ max: 380, hideTicks: true }}
            slots={{ tooltip: () => null }}
            dataLabels={{ show: true, format: (v: number) => num(v) }}
            formatValue={(v: number) => `₽${num(v)}B`}
          />
          <p className="mt-2 font-mono text-[11px] leading-snug text-[var(--color-dim)]">
            in 2025: from 4th to 38th place among online retailers
          </p>
        </div>
      </div>
      <p className="mt-4 text-[13px] font-semibold text-[var(--color-text)] border-l-2 border-[var(--brock-accent)] pl-3">
        Sber had more money and more data. Ozon had the bank inside the storefront.
      </p>
    </div>
  );
}

/* ── CHART 4. Freedom Market's commission ladder ────────────────────── */
export function Grafik4() {
  const pct = (v: number) => `${v.toLocaleString("en-US")}%`;
  return (
    <div>
      <ColumnChart
        height={250}
        barRadius={2}
        data={[
          { label: "Card", value: 5, color: NEUTRAL },
          { label: "Loan", value: 5, color: NEUTRAL },
          { label: "3 mo", value: 6, color: NEUTRAL },
          { label: "6 mo", value: 8, color: NEUTRAL },
          { label: "9 mo", value: 11, color: NEUTRAL },
          { label: "12 mo", value: 13, color: NEUTRAL },
          { label: "24 mo", value: 14 },
        ]}
        yAxis={{ max: 16, hideTicks: true }}
        slots={{ tooltip: () => null }}
        dataLabels={{ show: true, format: pct }}
        formatValue={pct}
      />
      <p className="mt-3 text-[13px] font-semibold text-[var(--color-text)] border-l-2 border-[var(--brock-accent)] pl-3">
        +9{" "}
        <Term tip="Percentage points - the difference between two percentage values: 14% vs 5% is 9 p.p.">p.p.</Term>{" "}
        - the seller&rsquo;s price of two years of installments.
      </p>
      <p className="mt-2 font-mono text-[11px] leading-snug text-[var(--color-dim)]">
        *{" "}
        <Term tip="Funding: the price a bank pays to raise the money it lends out.">funding</Term>{" "}
        two years at deposit rates costs the bank ~1.5× more than these 9 points
      </p>
      <Legend
        items={[
          { color: NEUTRAL, label: "card, loan and short installment plans" },
          { color: ACCENT, label: "24 months - the priciest cell of the rate card" },
        ]}
      />
    </div>
  );
}

/* ── CHART 5. Fashion's share of turnover: Wildberries vs. Kaspi ────── */
function ShareBar({
  label,
  share,
  detail,
  visible,
}: {
  label: string;
  share: number;
  detail: string;
  visible: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <span className="font-mono text-[12.5px] text-[var(--color-text)]">{label}</span>
        <span className="font-mono text-[13px] font-bold tabular-nums" style={{ color: "var(--brock-accent)" }}>
          {share.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
        </span>
      </div>
      <div className="h-6 rounded-[2px] overflow-hidden flex bg-[var(--color-border)]/40" role="img" aria-label={`${label}: clothing & footwear at ${share}% of turnover`}>
        <div
          className="h-full shrink-0 transition-[width] duration-700 ease-out"
          style={{ width: visible ? `${share}%` : "0%", background: ACCENT }}
        />
      </div>
      <p className="mt-1 font-mono text-[11px] text-[var(--color-dim)]">{detail}</p>
    </div>
  );
}

export function Grafik5() {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="space-y-5">
        <ShareBar
          label="Wildberries"
          share={24.7}
          detail="₽5.7T of ₽23.2T in orders · Jul 2025 - Jun 2026"
          visible={visible}
        />
        <p className="text-[13px] font-semibold text-[var(--color-text)] border-l-2 border-[var(--brock-accent)] pl-3">
          3.6× - fashion&rsquo;s underrepresentation on Kaspi
        </p>
        <ShareBar
          label="Kaspi"
          share={6.8}
          detail="₸11.6B of ₸168.8B · April 2026, top-15 categories · electronics on Kaspi - 27.4%"
          visible={visible}
        />
      </div>
      <Legend
        items={[
          { color: ACCENT, label: "clothing & footwear - share of platform turnover" },
          { color: NEUTRAL, label: "all other categories in one mass" },
        ]}
      />
      <p className="mt-2 font-mono text-[11.5px] italic leading-relaxed text-[var(--color-dim)]">
        WB - full year, orders; Kaspi - monthly snapshot of top-15 categories; a comparison of structures, not absolutes.
      </p>
    </div>
  );
}

/* ── CHART 6. The seasonal fulfillment wave on WB ───────────────────── */
export function Grafik6() {
  return (
    <div>
      <LineChart
        height={230}
        lineWidth={2.5}
        markers="always"
        directLabels={false}
        xScale="point"
        x={["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
        data={[
          {
            /* April is a source-data anomaly: the accent line BREAKS there (an
             * honest gap, per the component's missing-data canon) and the value
             * renders as a standalone grey marker in the second series. */
            name: "WB market-wide fulfillment share",
            data: [
              { y: 24.4 },
              { y: 28.5 },
              { y: 35.3 },
              { y: 47.6 },
              { y: 48.1 },
              { y: 50.3, note: "peak season: half of WB's turnover ships from platform warehouses" },
              { y: 49.6 },
              { y: 47.6 },
              { y: 46.5 },
              { y: null },
              { y: 44.4 },
              { y: 34.2 },
            ],
            emphasis: true,
          },
          {
            name: "April - source anomaly",
            data: [null, null, null, null, null, null, null, null, null, { y: 34.0, note: "source data anomaly (data-suspect)" }, null, null],
            color: NEUTRAL,
          },
        ]}
        events={[{ x: "Dec", label: "peak 50.3%" }]}
        yAxis={{ min: 0, max: 60, title: "% of turnover" }}
        formatValue={(v: number) => `${v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`}
      />
      <Legend
        items={[
          { color: ACCENT, label: "December - 50.3%: at peak season, half of WB's turnover ships from platform warehouses" },
          { color: NEUTRAL, label: "April (34.0%) - a source data anomaly" },
        ]}
      />
      <p className="mt-2 font-mono text-[11px] leading-snug text-[var(--color-dim)]">
        Fashion, meanwhile, lives in the warehouse year-round: clothing&rsquo;s fulfillment share never drops below 76%.
      </p>
    </div>
  );
}

/* ── INTERACTIVE. "The Journey of One Tenge" ────────────────────────── */
type JourneyStep = { title: string; detail: string };

const KASPI_STEPS: JourneyStep[] = [
  { title: "Purchase", detail: "the buyer pays in the app" },
  { title: "Cashback as points", detail: "bonuses that can only be spent" },
  { title: "Same-day seller payout", detail: "money lands on the seller's account" },
  { title: "Withdrawal to another bank", detail: "the tenge leaves the loop - the counter stops" },
];

const FREEDOM_STEPS: JourneyStep[] = [
  { title: "Purchase", detail: "the buyer pays in the app" },
  { title: "Cashback as fractional shares", detail: "settles into a portfolio via the holding's broker" },
  { title: "Revenue on a daily-yield account", detail: "the balance is parked in money-market instruments" },
  { title: "The balance funds the next installment plan", detail: "the tenge stays in the loop - the counter keeps ticking" },
];

function JourneyLane({
  name,
  steps,
  activeStep,
  days,
  accent,
  daysLabel,
}: {
  name: string;
  steps: JourneyStep[];
  activeStep: number;
  days: string;
  accent?: boolean;
  daysLabel: string;
}) {
  return (
    <div className={`rounded-[3px] border p-4 ${accent ? "border-[var(--brock-accent)]" : "border-[var(--color-border)]"}`}>
      <div className="flex items-baseline justify-between gap-2 mb-3">
        <p className={`text-[13px] font-bold ${accent ? "text-[var(--brock-accent)]" : "text-[var(--color-text)]"}`}>{name}</p>
        <p className="font-mono text-[11px] text-[var(--color-dim)] text-right">
          {daysLabel}
          <br />
          <span className={`text-[16px] font-bold tabular-nums ${accent ? "text-[var(--brock-accent)]" : "text-[var(--color-text)]"}`}>{days}</span>
        </p>
      </div>
      <ol className="space-y-2.5">
        {steps.map((s, i) => {
          const on = i <= activeStep;
          return (
            <li key={s.title} className="flex gap-2.5 transition-opacity duration-300" style={{ opacity: on ? 1 : 0.3 }}>
              <span
                aria-hidden
                className="mt-0.5 inline-flex w-4 h-4 shrink-0 items-center justify-center rounded-full font-mono text-[9px] border"
                style={{
                  borderColor: on ? (accent ? "var(--brock-accent)" : "var(--brock-neutral)") : "var(--color-border)",
                  background: on ? (accent ? "var(--brock-accent)" : "var(--brock-neutral)") : "transparent",
                  color: on ? "#fff" : "var(--color-dim)",
                }}
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-[12.5px] font-semibold leading-snug text-[var(--color-text)]">{s.title}</p>
                <p className="text-[11.5px] leading-snug text-[var(--color-dim)]">{s.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function TengeJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [freedomDays, setFreedomDays] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = trackRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const passed = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        setProgress(total > 0 ? passed / total : 1);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeStep = Math.min(3, Math.floor(progress * 4));

  useEffect(() => {
    if (activeStep < 3) {
      setFreedomDays(0);
      return;
    }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFreedomDays(-1);
      return;
    }
    const id = window.setInterval(() => setFreedomDays((d) => (d < 0 ? d : d + 1)), 90);
    return () => window.clearInterval(id);
  }, [activeStep]);

  const kaspiDays = activeStep >= 3 ? "1 - stop" : activeStep >= 2 ? "1" : "0";
  const freedomDisplay = activeStep >= 3 ? (freedomDays < 0 ? "∞" : `${freedomDays}…`) : String(Math.min(activeStep, 1) === 0 ? 0 : activeStep - 1);

  return (
    <div ref={trackRef} style={{ height: "260vh" }} className="relative">
      <div className="sticky top-[64px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <JourneyLane
            name="The Kaspi loop"
            steps={KASPI_STEPS}
            activeStep={activeStep}
            days={kaspiDays}
            daysLabel="days in the loop"
          />
          <JourneyLane
            name="The Freedom loop (a model)"
            steps={FREEDOM_STEPS}
            activeStep={activeStep}
            days={freedomDisplay}
            accent
            daysLabel="days in the loop"
          />
        </div>
        <div className="mt-3 h-1 rounded-full bg-[var(--color-border)]/50 overflow-hidden" aria-hidden>
          <div className="h-full rounded-full transition-[width] duration-150" style={{ width: `${Math.round(progress * 100)}%`, background: ACCENT }} />
        </div>
        <p className="mt-3 font-mono text-[11.5px] italic leading-relaxed text-[var(--color-dim)] border-l-2 border-[var(--color-border)] pl-3">
          The &ldquo;Freedom&rdquo; track is the author&rsquo;s model built on public precedents (Mercado Fondo, eToro, Shopify Balance) - not an announced Freedom product.
        </p>
      </div>
    </div>
  );
}
