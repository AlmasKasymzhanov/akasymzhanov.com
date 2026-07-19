"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart, type BarChartTooltipSlotProps } from "@/components/charts/bar-chart";
import {
  LineChart,
  type LineChartSeries,
  type LineChartTooltipSlotProps,
} from "@/components/charts/line-chart";
import { DataTable, type DataTableColumn } from "@/components/charts/data-table";

const formatOne = (value: number) =>
  value.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const formatInt = (value: number) => value.toLocaleString("ru-RU");
const formatMln = (value: number) => `${formatOne(value)} млн ₽`;
const formatPct = (value: number) => `${value > 0 ? "+" : value < 0 ? "−" : ""}${formatOne(Math.abs(value))}%`;

function ChartShell({
  id,
  title,
  subtitle,
  source,
  light,
  dark,
  fallbackAlt,
  wide = false,
  children,
  afterSource,
  table,
  labelledBy,
  hideTitle = false,
}: {
  id: string;
  title: string;
  subtitle: string;
  source: string;
  light: string;
  dark: string;
  fallbackAlt: string;
  wide?: boolean;
  children: React.ReactNode;
  afterSource?: React.ReactNode;
  table: React.ReactNode;
  labelledBy?: string;
  hideTitle?: boolean;
}) {
  return (
    <section
      id={id}
      data-chart-slot={id}
      className={`relative left-1/2 my-9 -translate-x-1/2 rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 ${
        wide ? "w-[calc(100vw-2rem)] max-w-[1120px]" : "w-full max-w-[760px]"
      }`}
      aria-labelledby={labelledBy ?? `${id}-title`}
    >
      <header className="mb-5">
        {!hideTitle && (
          <h3 id={`${id}-title`} className="text-[16px] font-bold leading-snug text-[var(--color-text)]">
            {title}
          </h3>
        )}
        <p className={`${hideTitle ? "" : "mt-1 "}font-mono text-[11px] leading-relaxed text-[var(--color-dim)]`}>{subtitle}</p>
      </header>

      <div className="wb-chart-interactive">{children}</div>
      <noscript>
        <style>{`
          .wb-chart-interactive{display:none!important}
          .wb-chart-fallback-light{display:none!important}
          .wb-chart-fallback-dark{display:block!important}
          @media (prefers-color-scheme: light){
            .wb-chart-fallback-light{display:block!important}
            .wb-chart-fallback-dark{display:none!important}
          }
        `}</style>
        <div className="overflow-hidden rounded-[2px] border border-[var(--color-border)] bg-[var(--color-bg)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="wb-chart-fallback-light h-auto w-full" src={light} alt={fallbackAlt} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="wb-chart-fallback-dark h-auto w-full" src={dark} alt={fallbackAlt} />
        </div>
      </noscript>

      <p className="mt-3 font-mono text-[11px] leading-relaxed text-[var(--color-dim)]">{source}</p>
      {afterSource}
      <details className="mt-4 border-t border-[var(--color-border)] pt-3">
        <summary className="cursor-pointer font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand)]">
          Данные графика
        </summary>
        {table}
      </details>
      <p className="mt-3 font-mono text-[10px] text-[var(--color-dim)]">
        График: {" "}
        <a className="hover:underline" href="https://brockui.com" target="_blank" rel="noopener noreferrer">
          Brock UI
        </a>
      </p>
    </section>
  );
}

type RankingRow = {
  category: string;
  turnover: number;
  sales: number;
  perSale: number;
  fbo: number;
};

const RANKING: readonly RankingRow[] = [
  { category: "Бронеодежда", turnover: 246.0, sales: 16115, perSale: 15266, fbo: 42.2 },
  { category: "Маскировочные костюмы", turnover: 241.4, sales: 65676, perSale: 3676, fbo: 44.4 },
  { category: "Приборы ночного видения", turnover: 96.3, sales: 3680, perSale: 26158, fbo: 13.4 },
  { category: "Тепловизоры", turnover: 75.9, sales: 2832, perSale: 26814, fbo: 1.7 },
  { category: "Маскировочные сети", turnover: 66.3, sales: 28505, perSale: 2326, fbo: 24.5 },
  { category: "Аптечки первой помощи", turnover: 51.9, sales: 33673, perSale: 1543, fbo: 27.7 },
  { category: "Разгрузочные жилеты", turnover: 51.8, sales: 8095, perSale: 6398, fbo: 36.2 },
  { category: "Детекторы дронов", turnover: 10.7, sales: 225, perSale: 47339, fbo: 16.8 },
];

function RankingTooltip({ label }: BarChartTooltipSlotProps) {
  const row = RANKING.find((item) => item.category === label);
  if (!row) return null;
  return (
    <div role="tooltip" className="max-w-[min(420px,calc(100vw-3rem))] rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 font-mono text-[11px] leading-relaxed text-[var(--color-text)] shadow-lg">
      {row.category} · оборот {formatMln(row.turnover)} · {formatInt(row.sales)} оценочных продаж · оборот на одну оценочную продажу {formatInt(row.perSale)} ₽ · через склад WB {formatOne(row.fbo)}%
    </div>
  );
}

const rankingColumns: readonly DataTableColumn[] = [
  { header: "Категория" },
  { header: "Оборот, млн ₽" },
  { header: "Оценочные продажи" },
  { header: "Оборот на одну продажу, ₽" },
  { header: "Оборот через склад WB, %" },
];

export function Grafik1() {
  return (
    <ChartShell
      id="grafik-1"
      title="Самые крупные из выбранных категорий"
      labelledBy="selected-categories-heading"
      hideTitle
      subtitle="Оценочный оборот за 30 дней, 18.06–17.07.2026, млн ₽"
      source="Источник: расчёт автора по данным MPStats; показатели оценочные. Окно: 18.06–17.07.2026."
      light="/blog/wb-dual-use/charts/g1-gmv-ranking-light.png"
      dark="/blog/wb-dual-use/charts/g1-gmv-ranking-dark.png"
      fallbackAlt="Статический график рейтинга восьми выбранных категорий по оценочному обороту"
      afterSource={<p className="mt-3 border-l-2 border-[var(--viz-wb)] pl-3 font-mono text-[11px] leading-relaxed text-[var(--color-dim)]">Для масштаба: оборот генераторов составляет 1 917,4 млн ₽. Это широкая категория двойного назначения, поэтому она не включена в рейтинг.</p>}
      table={<DataTable columns={rankingColumns} rows={RANKING.map((row) => [row.category, formatOne(row.turnover), formatInt(row.sales), formatInt(row.perSale), formatOne(row.fbo)])} className="mb-0" />}
    >
      <BarChart
        className="wb-ranking-chart"
        data={RANKING.map((row) => ({ label: row.category, value: row.turnover, color: "var(--viz-wb)" }))}
        sort="desc"
        labelWidth={190}
        barThickness={32}
        gap={10}
        accent="var(--viz-wb)"
        xAxisFormat={(value) => formatOne(value)}
        formatValue={(value) => formatMln(value)}
        dataLabels={{ show: true, format: (value) => formatMln(value) }}
        description="Восемь выбранных категорий Wildberries, отсортированных по оценочному обороту за 30 дней"
        animation={{ enabled: true, duration: 400 }}
        slots={{ tooltip: RankingTooltip }}
      />
      <style jsx global>{`
        .wb-ranking-chart [role="graphics-symbol"] .brock-hbar { transition: opacity 160ms ease; }
        .wb-ranking-chart:has([role="graphics-symbol"]:hover) [role="graphics-symbol"]:not(:hover) .brock-hbar,
        .wb-ranking-chart:has([role="graphics-symbol"]:focus) [role="graphics-symbol"]:not(:focus) .brock-hbar { opacity: .32; }
        @media (prefers-reduced-motion: reduce) { .wb-ranking-chart [role="graphics-symbol"] .brock-hbar { transition: none; } }
      `}</style>
    </ChartShell>
  );
}

const DATES = ["30.07.2025", "30.08.2025", "30.09.2025", "30.10.2025", "30.11.2025", "30.12.2025", "30.01.2026", "28.02.2026", "30.03.2026", "30.04.2026", "30.05.2026", "30.06.2026", "17.07.2026*"] as const;

type DynamicsRow = { category: string; values: readonly (number | null)[] };
const DYNAMICS: readonly DynamicsRow[] = [
  { category: "Бронеодежда", values: [125.1,217.9,217.6,254.1,624.0,317.3,198.1,257.1,291.7,428.2,285.8,235.8,246.0] },
  { category: "Маскировочные костюмы", values: [230.5,215.4,285.2,282.5,249.9,246.7,167.7,202.1,281.6,363.6,323.0,241.1,241.4] },
  { category: "Аксессуары для коптеров", values: [169.1,131.9,120.7,151.8,135.9,117.5,83.3,102.7,113.0,139.1,113.2,111.1,106.4] },
  { category: "Маскировочные сети", values: [39.5,33.1,32.3,47.8,48.4,46.8,38.1,52.3,94.1,171.5,99.0,95.7,66.3] },
  { category: "Разгрузочные жилеты", values: [227.8,139.8,148.1,151.2,112.5,100.6,67.8,69.1,85.1,88.8,75.7,53.5,51.8] },
  { category: "Разгрузочные пояса", values: [31.4,38.8,39.8,42.8,42.5,46.7,33.1,43.3,45.4,44.8,42.2,31.6,30.1] },
  { category: "Детекторы дронов", values: [null,null,null,null,null,27.4,53.0,27.4,29.2,35.5,21.3,14.8,10.7] },
];

function dynamicsSeries(row: DynamicsRow): readonly LineChartSeries[] {
  return [
    {
      name: row.category,
      color: "var(--viz-wb)",
      emphasis: true,
      data: row.values.map((value, index) => ({ x: DATES[index], y: index === 12 ? null : value })),
    },
    {
      name: "Срез до 17.07.2026",
      color: "var(--viz-wb)",
      emphasis: true,
      data: row.values.map((value, index) => ({ x: DATES[index], y: index === 12 ? value : null })),
    },
  ];
}

function DynamicsTooltip({ category, xLabel, points }: LineChartTooltipSlotProps & { category: string }) {
  const point = points.find((item) => item.value !== null);
  if (!point || point.value === null) return null;
  const text = xLabel === "17.07.2026*"
    ? `Срез до 17.07.2026 · ${formatMln(point.value)} · окно перекрывает срез до 30.06 и показано отдельно`
    : `${category} · окно до ${xLabel} · ${formatMln(point.value)}`;
  return <div role="tooltip" className="max-w-[min(360px,calc(100vw-3rem))] rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 font-mono text-[10px] leading-relaxed text-[var(--color-text)] shadow-lg">{text}</div>;
}

const dynamicsColumns: readonly DataTableColumn[] = [
  { header: "Ниша" },
  ...DATES.map((date) => ({ header: date })),
];

export function Grafik2() {
  return (
    <ChartShell
      id="grafik-2"
      title="Динамика по нишам: 12 окон за год и срез перед атакой"
      subtitle="Оценочный оборот, млн ₽ за 30 дней. У каждой панели своя шкала."
      source="Источник: расчёт автора по данным MPStats; показатели оценочные. Срез до 17.07.2026 перекрывает предыдущее окно и показан отдельно."
      light="/blog/wb-dual-use/charts/g2-dynamics-light.png"
      dark="/blog/wb-dual-use/charts/g2-dynamics-dark.png"
      fallbackAlt="Статический график динамики семи ниш по двенадцати историческим окнам и отдельному срезу до 17 июля"
      wide
      afterSource={<p className="mt-3 font-mono text-[11px] leading-relaxed text-[var(--color-dim)]">Сравнивайте форму тренда, а не высоту линий между панелями: у каждой панели независимая шкала. Символ ◆ обозначает отдельный перекрывающийся срез до 17.07.2026. `NA` означает отсутствие строки категории, а не нулевой оборот.</p>}
      table={<DataTable columns={dynamicsColumns} rows={DYNAMICS.map((row) => [row.category, ...row.values.map((value) => value === null ? "NA" : formatOne(value))])} caption="* Срез до 17.07.2026 перекрывает окно до 30.06.2026 и не является тринадцатым последовательным месяцем." className="mb-0" />}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DYNAMICS.map((row) => (
          <section key={row.category} className="rounded-[2px] border border-[var(--color-border)] bg-[var(--color-bg)] p-3">
            <h4 className="min-h-10 text-[12px] font-bold leading-snug text-[var(--color-text)]">{row.category}</h4>
            {row.category === "Бронеодежда" && <p className="mb-1 font-mono text-[9px] text-[var(--viz-wb)]">624 млн ₽ · ноябрь 2025</p>}
            <LineChart
              className="wb-dynamics-panel"
              data={dynamicsSeries(row)}
              height={180}
              curve="linear"
              markers="always"
              legend="none"
              directLabels={false}
              yAxisFormat={(value) => formatOne(value)}
              formatValue={(value) => formatMln(value)}
              xAxis={{ hideTicks: true }}
              yAxis={{ ticks: 3 }}
              accent="var(--viz-wb)"
              animation={{ enabled: true, duration: 500 }}
              description={`${row.category}: двенадцать исторических окон и отдельный перекрывающийся срез до 17 июля`}
              slots={{ tooltip: (props) => <DynamicsTooltip {...props} category={row.category} /> }}
            />
            <div className="mt-1 grid grid-cols-[1fr_auto_1fr] items-center gap-2 font-mono text-[8px] text-[var(--color-dim)]">
              <span className="whitespace-nowrap">июл. 2025</span>
              <span className="whitespace-nowrap text-center">июн. 2026</span>
              <span className="whitespace-nowrap text-right">◆ 17.07.2026</span>
            </div>
          </section>
        ))}
      </div>
      <style jsx global>{`
        .wb-dynamics-panel .brock-point:last-of-type { border-radius: 1px !important; transform: translate(-50%, -50%) rotate(45deg) !important; }
      `}</style>
    </ChartShell>
  );
}

type SupplyRow = { category: string; turnover: number; cards: number; sellers: number };
const SUPPLY: readonly SupplyRow[] = [
  { category: "Бронеодежда", turnover: -14.8, cards: 48.9, sellers: 22.9 },
  { category: "Детекторы дронов", turnover: -48.4, cards: 14.6, sellers: 13.4 },
  { category: "Аксессуары для коптеров", turnover: -11.5, cards: 12.4, sellers: 10.7 },
  { category: "Жгуты", turnover: -46.3, cards: 22.3, sellers: 7.2 },
  { category: "Каски", turnover: -0.4, cards: 22.4, sellers: 9.8 },
];

const supplyColumns: readonly DataTableColumn[] = [
  { header: "Категория" },
  { header: "Оборот, %", type: "delta" },
  { header: "Карточки, %", type: "delta" },
  { header: "Продавцы, %", type: "delta" },
];

function DivergingBars() {
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pinned === null) return;
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setPinned(null);
    };
    document.addEventListener("pointerdown", closeOutside, true);
    return () => document.removeEventListener("pointerdown", closeOutside, true);
  }, [pinned]);
  const shown = pinned ?? active;
  return (
    <div ref={rootRef} className="space-y-5" role="img" aria-label="Изменение оценочного оборота и числа карточек в пяти категориях">
      <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] text-[var(--color-dim)]">
        <span className="inline-flex items-center gap-2"><i className="size-3 bg-[var(--viz-negative)]" aria-hidden />Оборот, снижение</span>
        <span className="inline-flex items-center gap-2"><i className="size-3 bg-[var(--viz-wb)]" aria-hidden />Карточки, рост</span>
      </div>
      {SUPPLY.map((row, index) => (
        <div key={row.category} className="relative">
          <p className="mb-2 text-[12px] font-bold text-[var(--color-text)]">{row.category}</p>
          <div className="grid grid-cols-2 gap-0 font-mono text-[10px] tabular-nums"><span className="pr-2 text-right text-[var(--viz-negative)]">{formatPct(row.turnover)} оборот</span><span className="pl-2 text-[var(--viz-wb)]">{formatPct(row.cards)} карточки</span></div>
          <div className="mt-1 grid h-7 grid-cols-2 border-y border-[var(--color-border)]">
            <div className="relative border-r border-[var(--color-border)]">
              <button type="button" aria-label={`${row.category}: оборот ${formatPct(row.turnover)}, карточки ${formatPct(row.cards)}, продавцы ${formatPct(row.sellers)}`} onPointerEnter={() => setActive(index)} onPointerLeave={() => setActive(null)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} onClick={() => setPinned((value) => value === index ? null : index)} className="absolute right-0 top-1/2 h-4 -translate-y-1/2 bg-[var(--viz-negative)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text)]" style={{ width: `${Math.max(1.5, Math.abs(row.turnover) / 50 * 100)}%` }} />
            </div>
            <div className="relative">
              <button type="button" aria-label={`${row.category}: оборот ${formatPct(row.turnover)}, карточки ${formatPct(row.cards)}, продавцы ${formatPct(row.sellers)}`} onPointerEnter={() => setActive(index)} onPointerLeave={() => setActive(null)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} onClick={() => setPinned((value) => value === index ? null : index)} className="absolute left-0 top-1/2 h-4 -translate-y-1/2 bg-[var(--viz-wb)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text)]" style={{ width: `${Math.max(1.5, row.cards / 50 * 100)}%` }} />
            </div>
          </div>
          {shown === index && <div role="tooltip" className="absolute bottom-[calc(100%+8px)] left-1/2 z-20 w-max max-w-[min(420px,calc(100vw-3rem))] -translate-x-1/2 rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 font-mono text-[11px] leading-relaxed text-[var(--color-text)] shadow-lg">{row.category} · оборот {formatPct(row.turnover)} · карточки {formatPct(row.cards)} · продавцы {formatPct(row.sellers)}</div>}
        </div>
      ))}
    </div>
  );
}

export function Grafik3() {
  return (
    <ChartShell
      id="grafik-3"
      title="Оборот падал, а карточек становилось больше"
      subtitle="Изменение окна до 17.07 относительно соседнего окна до 17.06, %"
      source="Источник: расчёт автора по данным MPStats; показатели оценочные. Сравниваются соседние окна до 17.06 и 17.07.2026."
      light="/blog/wb-dual-use/charts/g3-supply-vs-demand-light.png"
      dark="/blog/wb-dual-use/charts/g3-supply-vs-demand-dark.png"
      fallbackAlt="Статический расходящийся график изменения оборота и числа карточек в пяти категориях"
      table={<DataTable columns={supplyColumns} rows={SUPPLY.map((row) => [row.category, row.turnover, row.cards, row.sellers])} deltaUpColor="var(--viz-wb)" deltaDownColor="var(--viz-negative)" className="mb-0" />}
    >
      <DivergingBars />
    </ChartShell>
  );
}
