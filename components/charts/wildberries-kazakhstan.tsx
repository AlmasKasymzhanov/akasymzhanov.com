"use client";

/**
 * Brock UI charts for the article «Wildberries ищет склады в Казахстане.
 * Единого блока на 100 тыс. кв. м нет» (wildberries-kazakhstan).
 *
 * Данные — только публикационные CSV редакционного пакета:
 *   data/marketpapa-category-change.csv   → Grafik1
 *   data/mpstats-astana-daily.csv         → Grafik2, Grafik3
 *   data/mpstats-pre-post-summary.csv     → PrePostTable
 *
 * Осознанные ограничения подачи (редакционные, не косметические):
 *  - Grafik1 — публичная ОЦЕНКА стороннего канала: слово «оценочное» обязано
 *    остаться и в заголовке, и в подписи; график заменяет таблицу в тексте,
 *    дубля быть не должно.
 *  - Grafik2 — 18.07.2026 отмечено только вертикальной линией события. PRE/POST
 *    различаются как временные периоды, а не как причинный эффект: POST не
 *    закрашивается и не окрашивается отдельным цветом.
 *  - Grafik3 — показатель является НИЖНЕЙ границей: отсутствующая строка склада
 *    не приравнивается к явному нулю (в данных нет нулей — есть пропуск строки).
 *  - Ось X — временная шкала: даты наблюдений идут неравномерно (18 июня, затем
 *    июльские срезы), и равномерная категориальная ось врала бы о расстояниях.
 */

import { LineChart, type LineChartTooltipSlotProps } from "@/components/charts/line-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { DataTable, type DataTableColumn } from "@/components/charts/data-table";
import { Term } from "@/components/canon/term";

const WB = "var(--viz-wb)";

/* Детерминированный формат тик-подписи оси X: timestamp → «04.07». */
const dayTick = (ts: number) => {
  const d = new Date(ts);
  return `${String(d.getUTCDate()).padStart(2, "0")}.${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
};

/* ── Общая рамка графика: заголовок → холст → подпись → данные ───────── */
function ChartFigure({
  id,
  title,
  subtitle,
  caption,
  note,
  table,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  caption: React.ReactNode;
  /** Оговорка о кодировании (FT-style «Note:») — например, что означает штриховка. */
  note?: React.ReactNode;
  table: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure
      id={id}
      className="my-9 rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6"
      aria-labelledby={`${id}-title`}
    >
      <figcaption className="mb-5">
        <span id={`${id}-title`} className="block text-[15px] font-bold leading-snug text-[var(--color-text)] sm:text-[17px]">
          {title}
        </span>
        <span className="mt-2 block font-mono text-[10.5px] leading-relaxed text-[var(--color-dim)] sm:text-[11px]">
          {subtitle}
        </span>
      </figcaption>

      <div className="min-w-0">{children}</div>

      {note && (
        <p className="mt-3 font-mono text-[10px] italic leading-relaxed text-[var(--color-dim)]/70">{note}</p>
      )}
      <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-[var(--color-dim)]">{caption}</p>

      <details className="mt-4 border-t border-[var(--color-border)] pt-3">
        <summary className="cursor-pointer font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand)]">
          Данные графика
        </summary>
        {table}
      </details>
    </figure>
  );
}

/* ─── График 1. Оценочное изменение продаж по четырём категориям ────── */

type CategoryRow = { category: string; changePct: number };

const CATEGORY_ROWS: readonly CategoryRow[] = [
  { category: "Красота", changePct: -20 },
  { category: "Одежда", changePct: -25 },
  { category: "Обувь", changePct: -25 },
  { category: "Бытовая химия", changePct: -20 },
];

const categoryColumns: readonly DataTableColumn[] = [
  { header: "Категория" },
  { header: "Оценочное изменение продаж" },
  { header: "Текущий период" },
  { header: "Период сравнения" },
  { header: "Методика" },
];

const formatPct = (v: number) => `${v < 0 ? "−" : v > 0 ? "+" : ""}${Math.abs(v)}%`;

/* На узких экранах колонка подписей обрезает длинные названия категорий. Канон:
   полное название отдаём через Term (hover · tap), а пунктирную «нажми меня»
   подсказку рисует сам чарт на обрезающем боксе (labelInteractive). */
const LABEL_TIPS: Record<string, string> = {
  "Бытовая химия": "Бытовая химия",
};

const labelTip = (label: string): React.ReactNode =>
  LABEL_TIPS[label] ? (
    <Term focusable={false} tip={LABEL_TIPS[label]}>
      {label}
    </Term>
  ) : (
    label
  );

const hasTip = (label: string): boolean => label in LABEL_TIPS;

export function Grafik1() {
  return (
    <ChartFigure
      id="grafik-1"
      title="Оценочное изменение продаж Wildberries: 23–29 июля к 16–22 июля"
      subtitle="Публичная оценка канала MarketPapa · четыре категории · 2026 год"
      caption="Источник: публичный расчет канала MarketPapa. Периоды сравнения: 23–29 июля и 16–22 июля 2026 года. Набор данных и полная методика расчета в публикации не названы; показатели следует трактовать как оценочные."
      table={
        <DataTable
          className="mb-0"
          columns={categoryColumns}
          rows={CATEGORY_ROWS.map((row) => [
            row.category,
            formatPct(row.changePct),
            "23–29.07.2026",
            "16–22.07.2026",
            "Полная методика не раскрыта",
          ])}
        />
      }
    >
      <BarChart
        barThickness={28}
        gap={12}
        barRadius={2}
        labelWidth={128}
        formatLabel={labelTip}
        labelInteractive={hasTip}
        data={CATEGORY_ROWS.map((row) => ({ label: row.category, value: row.changePct, color: WB }))}
        formatValue={formatPct}
        xAxisFormat={formatPct}
        dataDescription="Оценочное изменение продаж Wildberries в четырех категориях за 23–29 июля 2026 года к 16–22 июля 2026 года по публичному расчету канала MarketPapa"
      />
    </ChartFigure>
  );
}

/* ─── Графики 2 и 3. Дневная панель MPStats по складу в Астане ──────── */

type DailyRow = {
  date: string;
  period: "PRE" | "POST";
  positiveSkus: number;
  observedBalance: number;
  interpretable: number;
};

const DAILY_ROWS: readonly DailyRow[] = [
  { date: "2026-06-18", period: "PRE", positiveSkus: 5, observedBalance: 5, interpretable: 40 },
  { date: "2026-07-04", period: "PRE", positiveSkus: 10, observedBalance: 15, interpretable: 40 },
  { date: "2026-07-11", period: "PRE", positiveSkus: 16, observedBalance: 19, interpretable: 40 },
  { date: "2026-07-17", period: "PRE", positiveSkus: 12, observedBalance: 15, interpretable: 40 },
  { date: "2026-07-20", period: "POST", positiveSkus: 12, observedBalance: 19, interpretable: 40 },
  { date: "2026-07-24", period: "POST", positiveSkus: 6, observedBalance: 7, interpretable: 40 },
  { date: "2026-07-27", period: "POST", positiveSkus: 8, observedBalance: 11, interpretable: 40 },
  { date: "2026-07-29", period: "POST", positiveSkus: 6, observedBalance: 7, interpretable: 39 },
];

const PERIOD_NOTE: Record<DailyRow["period"], string> = {
  PRE: "наблюдение до 18 июля",
  POST: "наблюдение после 18 июля",
};

const EVENT_X = "2026-07-18";

const dailyColumns: readonly DataTableColumn[] = [
  { header: "Дата" },
  { header: "Период", align: "left", mono: true },
  { header: "SKU с положительным остатком" },
  { header: "Наблюдаемый остаток" },
  { header: "Интерпретируемых наблюдений" },
];

/*
 * Тултип дневной панели. Канонический тултип LineChart показывает только дату и
 * значение, а HANDOFF требует большего: у Grafik2 в каждой подсказке должен быть
 * период относительно 18.07.2026, у Grafik3 — пометка «нижняя граница». Поэтому
 * слот переопределен: дату берем из строки панели, а не из ISO-подписи оси.
 */
function makeDailyTooltip(footnote: (row: DailyRow) => string) {
  return function DailyTooltip({ x, xLabel, points }: LineChartTooltipSlotProps) {
    const row = DAILY_ROWS.find((item) => Date.parse(item.date) === x);
    const value = points[0]?.formatted ?? "—";
    return (
      <div className="flex max-w-[240px] flex-col gap-1 rounded-[3px] border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-2 shadow-md">
        <span className="font-mono text-[10px] tabular-nums text-[var(--color-dim)]">
          {row ? row.date.split("-").reverse().join(".") : xLabel}
        </span>
        <span className="font-mono text-[12px] font-bold tabular-nums text-[var(--color-text)]">{value}</span>
        {row && (
          <span className="font-mono text-[9.5px] leading-relaxed text-[var(--color-dim)]">{footnote(row)}</span>
        )}
      </div>
    );
  };
}

const SkusTooltip = makeDailyTooltip((row) => PERIOD_NOTE[row.period]);
const BalanceTooltip = makeDailyTooltip((row) => `нижняя граница · ${PERIOD_NOTE[row.period]}`);

function DailyTable() {
  return (
    <DataTable
      className="mb-0"
      columns={dailyColumns}
      rows={DAILY_ROWS.map((row) => [
        row.date.split("-").reverse().join("."),
        row.period === "PRE" ? "до 18.07" : "после 18.07",
        row.positiveSkus,
        row.observedBalance,
        `${row.interpretable} / 40`,
      ])}
    />
  );
}

export function Grafik2() {
  return (
    <ChartFigure
      id="grafik-2"
      title="Товары с положительным остатком на складе Wildberries в Астане"
      subtitle="Фиксированная панель из 40 SKU · восемь дат наблюдения · вертикальная линия — 18.07.2026"
      caption="Источник: собственный расчет автора по данным MPStats API, склад 324108 «Астана Карагандинское шоссе». Вертикальная линия отмечает 18 июля 2026 года; периоды до и после этой даты различаются только как временные, причинная связь из этих данных не следует. Это складская атрибуция MPStats, а не спрос покупателей."
      table={<DailyTable />}
    >
      <LineChart
        height={280}
        xScale="time"
        yBaselineZero
        markers="always"
        accent={WB}
        data={DAILY_ROWS.map((row) => ({
          x: row.date,
          y: row.positiveSkus,
          note: PERIOD_NOTE[row.period],
        }))}
        events={[{ x: EVENT_X, label: "18.07.2026" }]}
        xAxis={{ format: dayTick, ticks: 6 }}
        yAxis={{ title: "SKU панели с положительным остатком", ticks: 4 }}
        formatValue={(v: number) => `${v} SKU`}
        slots={{ tooltip: SkusTooltip }}
        dataDescription="Число SKU фиксированной панели из 40 товаров, у которых MPStats показывает положительный остаток на складе Wildberries в Астане, на восьми датах наблюдения"
      />
    </ChartFigure>
  );
}

export function Grafik3() {
  return (
    <ChartFigure
      id="grafik-3"
      title="Наблюдаемый остаток, атрибутированный складу в Астане"
      subtitle="Фиксированная панель из 40 SKU · восемь дат наблюдения · вертикальная линия — 18.07.2026"
      caption="Наблюдаемый остаток — нижняя граница; отсутствующая строка склада не приравнивается к явному нулю. Источник: собственный расчет автора по данным MPStats API, склад 324108 «Астана Карагандинское шоссе». Показатель описывает складскую атрибуцию MPStats, а не физическое перемещение товара и не страну покупателя."
      table={<DailyTable />}
    >
      <LineChart
        height={280}
        xScale="time"
        yBaselineZero
        markers="always"
        accent={WB}
        data={DAILY_ROWS.map((row) => ({
          x: row.date,
          y: row.observedBalance,
          note: PERIOD_NOTE[row.period],
        }))}
        events={[{ x: EVENT_X, label: "18.07.2026" }]}
        xAxis={{ format: dayTick, ticks: 6 }}
        yAxis={{ title: "единиц товара, нижняя граница", ticks: 4 }}
        formatValue={(v: number) => `${v} ед.`}
        slots={{ tooltip: BalanceTooltip }}
        dataDescription="Наблюдаемый остаток панели из 40 SKU, атрибутированный складу Wildberries в Астане, на восьми датах наблюдения; показатель является нижней границей"
      />
    </ChartFigure>
  );
}

/* ─── Сводная таблица до/после ───────────────────────────────────────── */

type SummaryRow = {
  metric: string;
  pre: string;
  post: string;
  change: string;
};

const SUMMARY_ROWS: readonly SummaryRow[] = [
  {
    metric: "Среднее число SKU с положительным остатком в Астане",
    pre: "10,75",
    post: "8,00",
    change: "−25,6%",
  },
  {
    metric: "Средний дневной наблюдаемый остаток, атрибутированный Астане",
    pre: "13,5",
    post: "11,0",
    change: "−18,5%",
  },
  {
    metric: "Средний дневной суммарный остаток панели по всем складам",
    pre: "210,6 тыс.",
    post: "104,0 тыс.",
    change: "−50,6%",
  },
  {
    metric: "Среднее дневных медиан активных складов на SKU",
    pre: "17,6",
    post: "11,9",
    change: "−32,6%",
  },
];

const summaryColumns: readonly DataTableColumn[] = [
  { header: "Показатель" },
  { header: "До 18 июля" },
  { header: "После 18 июля" },
  { header: "Изменение", emphasis: true },
];

export function PrePostTable({ source }: { source?: React.ReactNode }) {
  return (
    <DataTable
      columns={summaryColumns}
      rows={SUMMARY_ROWS.map((row) => [
        /* Длинные названия показателей переносим по словам: иначе `whitespace-nowrap`
           таблицы выталкивает колонку «Изменение» за пределы колонки статьи. */
        <span key={row.metric} className="block whitespace-nowrap sm:whitespace-normal">
          {row.metric}
        </span>,
        row.pre,
        row.post,
        row.change,
      ])}
      caption="Панель — 40 SKU, четыре даты до и четыре даты после 18 июля 2026 года."
      source={source}
    />
  );
}
