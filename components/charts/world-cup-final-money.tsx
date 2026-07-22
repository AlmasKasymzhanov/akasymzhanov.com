"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  ReferenceLine,
  LabelList,
} from "recharts";
import { DataTable, type DataTableColumn } from "@/components/charts/data-table";
import { Fn } from "@/components/canon/term";

import RAW from "@/lib/data/world-cup-final-money.json";
const DATA = RAW as WorldCupChartsData;

const KALSHI = "#0D3692";
const POLYMARKET = "#E3120B";
const POLYMARKET_US = "#F4A261";
const NEUTRAL = "#7B8B8B";
const GREEN = "#00C853";
const RED = "#FF3D00";
const BROKER = "#B0B8B8";
const WHITE = "var(--color-text)";
const DIM = "var(--color-dim)";
const BORDER = "var(--color-border)";

/* ─────────── types ─────────── */

type Series = { name: string; color: string; values: number[] };

type ChartMeta = {
  id: string;
  title: string;
  subtitle?: string;
  type: string;
  unit?: string;
  source: string;
  x_axis?: { label?: string; values?: string[] };
  y_axis?: { label?: string };
  series?: Series[];
  categories?: string[];
  values?: number[];
  colors?: string[];
  data?: Array<Record<string, any>>;
  cumulative?: boolean;
};

type WorldCupChartsData = {
  metadata: { project: string; currency: string; generated_for: string; source_file: string; notes: string };
  charts: ChartMeta[];
};

function getChart(id: string): ChartMeta | undefined {
  return DATA.charts.find((c) => c.id === id);
}

function posNeg(value: number): string {
  return value > 0 ? GREEN : value < 0 ? RED : DIM;
}

function fmtMoney(value: number, unit = "млн долл."): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${Math.abs(value).toLocaleString("ru-RU")} ${unit}`;
}

function signedNode(value: number | string, unit = "млн долл.") {
  if (typeof value === "string") return <span>{value}</span>;
  const color = posNeg(value);
  return <span style={{ color, fontWeight: 700 }}>{fmtMoney(value, unit)}</span>;
}

function roiNode(value: number) {
  const color = value > 0 ? GREEN : value < 0 ? RED : DIM;
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return <span style={{ color, fontWeight: 700 }}>{sign}{Math.abs(value)}%</span>;
}

function ChartCard({
  id,
  title,
  subtitle,
  source,
  children,
  height = "h-[320px] sm:h-[400px]",
}: {
  id: string;
  title: string;
  subtitle?: string;
  source: string;
  children: ReactNode;
  height?: string;
}) {
  return (
    <section
      id={id}
      className="relative my-8 rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5"
      aria-labelledby={`${id}-title`}
    >
      <header className="mb-4">
        <h3 id={`${id}-title`} className="text-[17px] font-bold leading-snug text-[var(--color-text)]">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 font-mono text-[11px] text-[var(--color-dim)]">{subtitle}</p>
        )}
      </header>
      <div className={`${height} w-full`}>{children}</div>
      <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <p className="font-mono text-[10px] text-[var(--color-dim)]">Источник: {source}</p>
        <span className="font-mono text-[10px] text-[var(--color-dim)] opacity-60">Kasymzhanov Media</span>
      </div>
    </section>
  );
}

const tooltipStyle = {
  backgroundColor: "var(--color-bg)",
  border: "1px solid var(--color-border)",
  borderRadius: "3px",
  fontSize: "12px",
  fontFamily: "var(--font-mono)",
  color: "var(--color-text)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
};

const axisStyle = { fontSize: 11, fontFamily: "var(--font-mono)", fill: DIM };

function MultiLineTick({ x, y, payload }: any) {
  if (!payload?.value) return null;
  const lines = String(payload.value).split("\n");
  return (
    <text x={x} y={y + 10} textAnchor="middle" fill={DIM} fontSize={10} fontFamily="var(--font-mono)">
      {lines.map((line: string, i: number) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : "1.1em"}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

/* ─────────── Chart 1 — monthly volume ─────────── */

export function Chart1MonthlyVolume() {
  const c = getChart("chart1_monthly_volume")!;
  const rows = useMemo(() => {
    return c.x_axis!.values!.map((m, i) => ({
      month: m,
      Kalshi: c.series![0].values[i],
      "Polymarket International": c.series![1].values[i],
      "Polymarket US": c.series![2].values[i],
    }));
  }, [c]);

  return (
    <ChartCard id="chart1-monthly-volume" title={c.title} subtitle={c.subtitle} source={c.source}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rows} margin={{ top: 8, right: 8, bottom: 8, left: -8 }}>
          <CartesianGrid stroke={BORDER} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={axisStyle} axisLine={{ stroke: BORDER }} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} domain={[0, 35]} unit=" млрд" />
          <ReTooltip
            contentStyle={tooltipStyle}
            formatter={(value: any, name: any) => [`${value} млрд долл.`, name]}
            labelFormatter={(label: any) => label}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          {c.series!.map((s) => (
            <Line
              key={s.name}
              type="monotone"
              dataKey={s.name}
              stroke={s.color}
              strokeWidth={2.5}
              dot={{ r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ─────────── Chart 2 — ad insertions ─────────── */

export function Chart2AdInsertions() {
  const c = getChart("chart2_ad_insertions")!;
  const rows = useMemo(
    () => c.categories!.map((cat, i) => ({ name: cat, value: c.values![i], color: c.colors![i] })),
    [c]
  );
  return (
    <ChartCard id="chart2-ad-insertions" title={c.title} source={c.source}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 8, right: 8, bottom: 24, left: 0 }}>
          <CartesianGrid stroke={BORDER} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: BORDER }} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
          <ReTooltip contentStyle={tooltipStyle} formatter={(v: any) => [`${v} вставок`, ""]} />
          <Bar dataKey="value" radius={[3, 3, 0, 0]}>
            {rows.map((r, i) => (
              <Cell key={i} fill={r.color} />
            ))}
            <LabelList dataKey="value" position="top" className="font-mono text-[10px]" fill={WHITE} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ─────────── Chart 3 — whales PnL ─────────── */

export function Chart3WhalesPnl() {
  const c = getChart("chart3_whales_pnl")!;
  const rows = useMemo(
    () =>
      [...c.data!]
        .sort((a: any, b: any) => b.value - a.value)
        .map((d: any) => ({ ...d, fill: d.value > 0 ? GREEN : RED })),
    [c]
  );
  return (
    <ChartCard id="chart3-whales-pnl" title={c.title} source={c.source}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} layout="vertical" margin={{ top: 8, right: 24, bottom: 8, left: 100 }}>
          <CartesianGrid stroke={BORDER} strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} unit=" млн" />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ ...axisStyle, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={90}
          />
          <ReTooltip
            contentStyle={tooltipStyle}
            formatter={(v: any, _n: any, p: any) => [
              `${v > 0 ? "+" : "−"}$${Math.abs(v)} млн`,
              p.payload.note,
            ]}
          />
          <Bar dataKey="value" radius={[0, 3, 3, 0]}>
            {rows.map((r, i) => (
              <Cell key={i} fill={r.fill} />
            ))}
            <LabelList dataKey="value" position="inside" fill={WHITE} formatter={(v: any) => `${v > 0 ? "+" : "−"}$${Math.abs(v)}`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ─────────── Chart 4 — FIFA prizes ─────────── */

export function Chart4FifaPrizes() {
  const c = getChart("chart4_fifa_prizes")!;
  const rows = useMemo(
    () => c.categories!.map((cat, i) => ({ name: cat, value: c.values![i], color: c.colors![i] })),
    [c]
  );
  return (
    <ChartCard id="chart4-fifa-prizes" title={c.title} source={c.source}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 8, right: 8, bottom: 44, left: 0 }}>
          <CartesianGrid stroke={BORDER} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={<MultiLineTick />} axisLine={{ stroke: BORDER }} tickLine={false} interval={0} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} unit=" млн" />
          <ReTooltip contentStyle={tooltipStyle} formatter={(v: any) => [`$${v} млн`, ""]} />
          <Bar dataKey="value" radius={[3, 3, 0, 0]}>
            {rows.map((r, i) => (
              <Cell key={i} fill={r.color} />
            ))}
            <LabelList dataKey="value" position="top" fill={WHITE} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ─────────── Chart 5 — Adidas vs Nike EMV ─────────── */

export function Chart5AdidasNikeEmv() {
  const c = getChart("chart5_adidas_nike_emv")!;
  const rows = useMemo(
    () => c.categories!.map((cat, i) => ({ name: cat, value: c.values![i], color: c.colors![i] })),
    [c]
  );
  return (
    <ChartCard id="chart5-adidas-nike-emv" title={c.title} source={c.source}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
          <CartesianGrid stroke={BORDER} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: BORDER }} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} unit=" млн" />
          <ReTooltip contentStyle={tooltipStyle} formatter={(v: any) => [`$${v} млн`, ""]} />
          <Bar dataKey="value" radius={[3, 3, 0, 0]}>
            {rows.map((r, i) => (
              <Cell key={i} fill={r.color} />
            ))}
            <LabelList dataKey="value" position="top" fill={WHITE} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ─────────── Chart 6 — ticket prices ─────────── */

export function Chart6TicketPrices() {
  const c = getChart("chart6_ticket_prices")!;
  const rows = useMemo(
    () => c.categories!.map((cat, i) => ({ name: cat, value: c.values![i], color: c.colors![i] })),
    [c]
  );
  return (
    <ChartCard id="chart6-ticket-prices" title={c.title} source={c.source}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 8, right: 8, bottom: 44, left: 0 }}>
          <CartesianGrid stroke={BORDER} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={<MultiLineTick />} axisLine={{ stroke: BORDER }} tickLine={false} interval={0} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} unit=" тыс." />
          <ReTooltip contentStyle={tooltipStyle} formatter={(v: any) => [`$${v} тыс.`, ""]} />
          <Bar dataKey="value" radius={[3, 3, 0, 0]}>
            {rows.map((r, i) => (
              <Cell key={i} fill={r.color} />
            ))}
            <LabelList dataKey="value" position="top" fill={WHITE} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ─────────── Chart 7 — Drake cumulative losses ─────────── */

export function Chart7DrakeLosses() {
  const c = getChart("chart7_drake_losses")!;
  const rows = useMemo(() => {
    let acc = 0;
    return c.categories!.map((cat, i) => {
      acc += c.values![i];
      return { name: cat, value: acc, raw: c.values![i] };
    });
  }, [c]);
  return (
    <ChartCard id="chart7-drake-losses" title={c.title} source={c.source}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 8, right: 8, bottom: 44, left: 0 }}>
          <CartesianGrid stroke={BORDER} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={<MultiLineTick />} axisLine={{ stroke: BORDER }} tickLine={false} interval={0} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} unit=" млн" />
          <ReTooltip
            contentStyle={tooltipStyle}
            formatter={(v: any, _n: any, p: any) => [
              `кумулятивно −$${Math.abs(v)} млн`,
              `ставка −$${Math.abs(p.payload.raw)} млн`,
            ]}
          />
          <Bar dataKey="value" fill={RED} radius={[3, 3, 0, 0]}>
            <LabelList
              dataKey="value"
              position="top"
              fill={WHITE}
              formatter={(v: any) => `−$${Math.abs(v)}`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ─────────── Chart 8 — ROI top ─────────── */

export function Chart8RoiTop() {
  const c = getChart("chart8_roi_top")!;
  const rows = useMemo(
    () =>
      [...c.data!]
        .sort((a: any, b: any) => b.value - a.value)
        .map((d: any) => ({ ...d, fill: d.value > 0 ? GREEN : RED })),
    [c]
  );
  return (
    <ChartCard id="chart8-roi-top" title={c.title} source={c.source}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} layout="vertical" margin={{ top: 8, right: 24, bottom: 8, left: 140 }}>
          <CartesianGrid stroke={BORDER} strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
          <YAxis type="category" dataKey="name" tick={{ ...axisStyle, fontSize: 10 }} axisLine={false} tickLine={false} width={120} />
          <ReTooltip
            contentStyle={tooltipStyle}
            formatter={(v: any, _n: any, p: any) => [`${v}%`, p.payload.note]}
          />
          <Bar dataKey="value" radius={[0, 3, 3, 0]}>
            {rows.map((r, i) => (
              <Cell key={i} fill={r.fill} />
            ))}
            <LabelList dataKey="value" position="inside" fill={WHITE} formatter={(v: any) => `${v > 0 ? "+" : ""}${v}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ─────────── Chart 9 — noise vs money ─────────── */

function linearRegression(points: { x: number; y: number }[]) {
  const n = points.length;
  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumXX = points.reduce((s, p) => s + p.x * p.x, 0);
  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) return null;
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

export function Chart9NoiseMoney() {
  const c = getChart("chart9_noise_money")!;
  const rows = useMemo(
    () =>
      c.data!.map((d: any) => ({
        name: d.name,
        noise: d.noise_index,
        money: d.money_m,
        note: d.note,
      })),
    [c]
  );
  const trend = useMemo(() => {
    const pts = rows.map((r) => ({ x: r.noise, y: r.money }));
    return linearRegression(pts);
  }, [rows]);
  const trendPoints = trend
    ? [
        { x: 0, y: trend.intercept },
        { x: 100, y: trend.intercept + trend.slope * 100 },
      ]
    : [];
  return (
    <ChartCard id="chart9-noise-money" title={c.title} source={c.source}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
          <CartesianGrid stroke={BORDER} strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="noise"
            name="Медийный шум"
            tick={axisStyle}
            axisLine={{ stroke: BORDER }}
            tickLine={false}
            domain={[0, 100]}
            label={{ value: "Медийный шум, 0–100", position: "insideBottom", offset: -2, fill: DIM, fontSize: 11 }}
          />
          <YAxis
            type="number"
            dataKey="money"
            name="Финансовый результат"
            tick={axisStyle}
            axisLine={false}
            tickLine={false}
            unit=" млн"
          />
          <ZAxis type="number" dataKey="noise" range={[60, 300]} />
          <ReTooltip
            contentStyle={tooltipStyle}
            formatter={(_v: any, _n: any, p: any) => [
              `${p.payload.name}: шум ${p.payload.noise}, деньги ${p.payload.money > 0 ? "+" : ""}${p.payload.money} млн`,
              p.payload.note,
            ]}
          />
          <Scatter data={rows} fill={POLYMARKET}>
            {rows.map((r, i) => (
              <Cell key={i} fill={r.money > 0 ? GREEN : RED} />
            ))}
          </Scatter>
          {trend && <ReferenceLine segment={trendPoints as any} stroke={NEUTRAL} strokeDasharray="5 5" ifOverflow="extendDomain" />}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ─────────── Tables ─────────── */

const winnersColumns: readonly DataTableColumn[] = [
  { header: "Трейдер" },
  { header: "Ставка" },
  { header: "Исход" },
  { header: "Результат" },
  { header: "Источник" },
  { header: "Примечание" },
];

export function WinnersTable() {
  const rows: (ReactNode | number | string)[][] = [
    [
      "fishalive",
      "~$4,2 млн",
      "Испания не победит Кабо-Верде и фора Кабо-Верде +2,5",
      signedNode(9.0),
      "Benzinga, Yahoo Finance",
      "Кошелёк 0xed64…ef217d; две ставки на один матч, обе зашли при 0:0",
    ],
    [
      "yamal19",
      "$1,95 млн",
      "Испания — чемпион в финале",
      signedNode(1.35),
      "Benzinga",
      "Кошелёк без истории, созданный перед финалом; подозрение на инсайд",
    ],
    ["blunttedge", "н/д", "Швеция—Япония, Эквадор—Германия", signedNode(8.47), "CryptoAdventure", "Требует дополнительной проверки"],
    ["mintblade", "н/д", "5 ставок на ЧМ", signedNode(9.24), "Blockchain News", "Один из трёх связанных кошельков"],
    ["GRIMDRIP", "н/д", "2 ставки", signedNode(7.6), "Blockchain News", "Выводит на тот же Binance-адрес, что и mintblade"],
    ["endlessFate", "н/д", "9 ставок", signedNode(7.41), "Blockchain News", "Выводит на тот же Binance-адрес"],
  ];
  return <DataTable columns={winnersColumns} rows={rows} source="Lookonchain, ForkLog, Benzinga, Casino.org, Yahoo Finance" />;
}

const losersColumns: readonly DataTableColumn[] = [
  { header: "Трейдер" },
  { header: "Ставка" },
  { header: "Исход" },
  { header: "Результат" },
  { header: "Источник" },
];

export function LosersTable() {
  const rows: (ReactNode | number | string)[][] = [
    ["coldsway", "15 ставок за 10 дней", "в основном на фаворитов", signedNode(-11.6), "ForkLog, Lookonchain"],
    ["FlickRaw", "2 ставки за сутки", "Нидерланды и Бельгия", signedNode(-4.2), "Inc.com, Fox Sports Radio"],
    ["gud.hl", "$1,23 млн", "Аргентина — чемпион", signedNode(-1.23), "ForkLog, Phemex"],
  ];
  return <DataTable columns={losersColumns} rows={rows} source="ForkLog, Lookonchain, Inc.com, Fox Sports Radio, Phemex" />;
}

const roiColumns: readonly DataTableColumn[] = [
  { header: "Игрок" },
  { header: "Вложено" },
  { header: "Прибыль / убыток" },
  { header: "ROI", type: "delta" },
  { header: "Примечание" },
];

export function RoiTable() {
  const rows: (readonly (ReactNode | number | string)[])[] = [
    ["fishalive", "~$4,2 млн", 9.0, 214, "Поставил против Испании в матче с Кабо-Верде, а не в финале"],
    ["yamal19", "$1,95 млн", 1.35, 69, "Кошелёк создан перед финалом; инсайд или удача"],
    ["Ганвест (заявка)", "110 млн ₽", 71.5, 65, "Неподтверждённое заявление; расследование Super о лимитах и фейковых скринах"],
    ["gud.hl", "$1,23 млн", -1.23, -100, "Самый крупный бык Аргентины; не зафиксировал позицию"],
    ["Дрейк", "$1,5 млн", -1.5, -100, "Публичная ставка на Аргентину в основное время"],
    ["Макгрегор", "$100 тыс.", -0.1, -100, "Точный счёт 3:2"],
    ["Смолов", "1,5 млн ₽", -1.5, -100, "Итоговая победа Аргентины"],
    ["Бустер", "6,7 млн ₽", -6.7, -100, "Тотал больше 2,5"],
  ] as const;
  return <DataTable columns={roiColumns} rows={rows} source="Lookonchain, ForkLog, Benzinga, Рейтинг Букмекеров, Super" />;
}

const noiseColumns: readonly DataTableColumn[] = [
  { header: "Объект" },
  { header: "Медиа-шум" },
  { header: "Реальные деньги" },
  { header: "Вывод" },
];

export function NoiseMoneyTable() {
  const rows: (ReactNode | number | string)[][] = [
    ["fishalive", "Почти ноль — анонимный кошелёк", signedNode(9.0), "Самый большой ROI, никакого пиара"],
    ["yamal19", "Средний — несколько новостей о «загадочном ките»", signedNode(1.35), "Деньги есть, личности нет"],
    ["Ганвест", "Вирусные скрины, обсуждения в Telegram", "неподтверждённо", "Шум на порядок выше доказанной прибыли"],
    ["Дрейк", "Миллионы просмотров, мемы", signedNode(-3.5), "Медийный актив Stake, а не инвестор"],
    ["Kalshi + Polymarket", "Реклама на каждом матче", "Сотни млн сборов + 3 млн пользователей", "Заработали на инфраструктуре"],
    ["FIFA", "Постоянная повестка", signedNode(871), "Организатор заработал меньше, чем поставили на матч"],
    ["Мошенники", "Минимальный легальный PR", "Оценки — десятки/сотни млн", "Чем тише, тем больше денег"],
  ];
  return <DataTable columns={noiseColumns} rows={rows} source="Kasymzhanov Media (оценка шума по упоминаниям в СМИ и соцсетях)" />;
}

/* ─────────── Sources / Cite ─────────── */

type SourceLink = { label: string; href: string };

type SourceRef = {
  n: number;
  publication: string;
  date: string;
  claim: string;
  links: SourceLink[];
};

const SOURCES: readonly SourceRef[] = [
  {
    n: 1,
    publication: "Crypto Briefing",
    date: "19.07.2026",
    claim: "FIFA sets record $871M payout for 2026 World Cup teams as prediction markets explode.",
    links: [{ label: "Crypto Briefing", href: "https://cryptobriefing.com/fifa-record-871m-world-cup-prediction-markets/" }],
  },
  {
    n: 2,
    publication: "TrendingTopics.eu",
    date: "20.07.2026",
    claim: "Kalshi & Polymarket: $5.7B Wagered on the World Cup Final.",
    links: [{ label: "TrendingTopics.eu", href: "https://www.trendingtopics.eu/kalshi-polymarket-wm-finals/" }],
  },
  {
    n: 3,
    publication: "DD India",
    date: "13.07.2026",
    claim: "FIFA World Cup 2026 prize money rises to record USD 871 million.",
    links: [{ label: "DD India", href: "https://ddindia.co.in/2026/07/fifa-world-cup-2026-prize-money-rises-to-record-usd-871-million/" }],
  },
  {
    n: 4,
    publication: "Euronews (RU)",
    date: "16.07.2026",
    claim: "Сколько получат игроки сборной Испании, если выиграют финал?",
    links: [{ label: "Euronews", href: "https://ru.euronews.com/2026/07/16/how-much-will-gain-the-champion" }],
  },
  {
    n: 5,
    publication: "ForkLog",
    date: "20.07.2026",
    claim: "Polymarket traders lose over $37M on 2026 World Cup outcome.",
    links: [{ label: "ForkLog", href: "https://forklog.com/en/polymarket-traders-lose-over-37m-on-2026-world-cup-outcome/" }],
  },
  {
    n: 6,
    publication: "CoinDesk",
    date: "14.07.2026",
    claim: "Prediction markets just crushed traditional sportsbooks in a massive $50 billion World Cup breakout.",
    links: [{ label: "CoinDesk", href: "https://www.coindesk.com/business/2026/07/14/prediction-markets-just-crushed-traditional-sportsbooks-in-a-massive-usd50-billion-world-cup-breakout" }],
  },
  {
    n: 7,
    publication: "Fortune",
    date: "17.07.2026",
    claim: "World Cup final is already the biggest ever prediction market as Kalshi bets top $1.27 billion.",
    links: [{ label: "Fortune", href: "https://fortune.com/2026/07/17/world-cup-final-biggest-ever-prediction-market-kalshi-bets-top-spain-argentina/" }],
  },
  {
    n: 8,
    publication: "Yellow Exchange",
    date: "20.07.2026",
    claim: "Kalshi Adds 3M Users As World Cup Trading Breaks Platform Records.",
    links: [{ label: "Yellow Exchange", href: "https://yellow.com/news/kalshi-world-cup-user-boom" }],
  },
  {
    n: 9,
    publication: "Trending Topics",
    date: "20.07.2026",
    claim: "Kalshi & Polymarket: $5.7B Wagered on the World Cup Final.",
    links: [{ label: "Trending Topics", href: "https://www.trendingtopics.eu/kalshi-polymarket-wm-finals/" }],
  },
  {
    n: 10,
    publication: "Yahoo Finance / BeInCrypto",
    date: "14.07.2026",
    claim: "Polymarket vs Kalshi: Where are Fans Placing Their FIFA World Cup Predictions?",
    links: [{ label: "Yahoo Finance", href: "https://finance.yahoo.com/markets/crypto/articles/polymarket-vs-kalshi-where-fans-160253815.html" }],
  },
  {
    n: 11,
    publication: "CoinDesk",
    date: "14.07.2026",
    claim: "Polymarket международная версия — $10,8 млрд, американская — $3,5 млрд в июне 2026.",
    links: [{ label: "CoinDesk", href: "https://www.coindesk.com/business/2026/07/14/prediction-markets-just-crushed-traditional-sportsbooks-in-a-massive-usd50-billion-world-cup-breakout" }],
  },
  {
    n: 12,
    publication: "Polymarket Analytics",
    date: "2026",
    claim: "Рынок «Победитель ЧМ-2026» накопил $4,33 млрд оборота.",
    links: [{ label: "Polymarket Analytics", href: "https://polymarketanalytics.com/tags/2026%20FIFA%20World%20Cup" }],
  },
  {
    n: 13,
    publication: "Sportico",
    date: "21.07.2026",
    claim: "How Kalshi, Other Prediction Markets Performed at 2026 World Cup.",
    links: [{ label: "Sportico", href: "https://www.sportico.com/business/sports-betting/2026/prediction-market-data-volume-polymarket-kalshi-world-cup-1234939529/" }],
  },
  {
    n: 14,
    publication: "Dune",
    date: "2026",
    claim: "Prediction Markets — 2026 FIFA World Cup.",
    links: [{ label: "Dune", href: "https://dune.com/dune_curated_data/prediction-markets-2026-fifa-world-cup-updated-jul-17" }],
  },
  {
    n: 15,
    publication: "Polygonscan",
    date: "2026",
    claim: "Проверка транзакций в блокчейне Polygon.",
    links: [{ label: "Polygonscan", href: "https://polygonscan.com/" }],
  },
  {
    n: 16,
    publication: "Lookonchain / Predicts.guru",
    date: "2026",
    claim: "Идентификация крупных игроков и PnL по кошелькам.",
    links: [
      { label: "Lookonchain", href: "https://lookonchain.com/" },
      { label: "Predicts.guru", href: "https://www.predicts.guru/checker/0xed64a7bf029040aa331abc87902434d815ef217d" },
    ],
  },
  {
    n: 17,
    publication: "Allium",
    date: "2026",
    claim: "Аналитика кошельков и гео-данных.",
    links: [{ label: "Allium", href: "https://www.allium.so/" }],
  },
  {
    n: 18,
    publication: "Yahoo Finance",
    date: "17.06.2026",
    claim: "Polymarket Trader Turns $427,000 Into $4.7 Million on Spain World Cup Shock.",
    links: [{ label: "Yahoo Finance", href: "https://finance.yahoo.com/markets/crypto/articles/polymarket-trader-turns-427-000-205221883.html" }],
  },
  {
    n: 19,
    publication: "Benzinga",
    date: "16.06.2026",
    claim: "Spain's Historic World Cup Stumble Made A Stranger $9 Million On Polymarket.",
    links: [{ label: "Benzinga", href: "https://www.benzinga.com/markets/prediction-markets/26/06/53227424/spains-historic-world-cup-stumble-made-a-stranger-9-million-on-polymarket" }],
  },
  {
    n: 20,
    publication: "Benzinga",
    date: "20.07.2026",
    claim: "A Mysterious Polymarket Trader Walked Away With $1.35 Million in Hours After One Bold World Cup Wager.",
    links: [{ label: "Benzinga", href: "https://www.benzinga.com/crypto/cryptocurrency/26/07/60545485/a-mysterious-polymarket-trader-walked-away-with-1-35-million-in-hours-after-one-bold-world-cup-wager-and-its-raising-eyebrows" }],
  },
  {
    n: 21,
    publication: "CryptoAdventure",
    date: "06.07.2026",
    claim: "Polymarket World Cup Trader Loses $11.6M After 15-Bet Run Collapses.",
    links: [{ label: "CryptoAdventure", href: "https://cryptoadventure.com/polymarket-world-cup-trader-loses-11-6m-after-15-bet-run-collapses/" }],
  },
  {
    n: 22,
    publication: "Blockchain News",
    date: "21.06.2026",
    claim: "Lookonchain: Insider Nets $24.25M on World Cup Bets.",
    links: [{ label: "Blockchain News", href: "https://blockchain.news/flashnews/lookonchain-insider-nets-24-25m-world-cup-bets" }],
  },
  {
    n: 23,
    publication: "ForkLog",
    date: "20.07.2026",
    claim: "Polymarket traders lose over $37M on 2026 World Cup outcome.",
    links: [{ label: "ForkLog", href: "https://forklog.com/en/polymarket-traders-lose-over-37m-on-2026-world-cup-outcome/" }],
  },
  {
    n: 24,
    publication: "Inc.com",
    date: "15.06.2026",
    claim: "A Single Polymarket Trader Lost $4.2 Million on the World Cup in Less Than 24 Hours.",
    links: [{ label: "Inc.com", href: "https://www.inc.com/georgia-fearn/single-polymarket-trader-lost-four-million-on-world-cup-in-less-than-24-hours/91361322" }],
  },
  {
    n: 25,
    publication: "Phemex",
    date: "20.07.2026",
    claim: "Gambler Loses $1.23 Million on Argentina World Cup Bet.",
    links: [{ label: "Phemex", href: "https://phemex.com/news/article/gambler-loses-123-million-on-argentina-world-cup-bet-93782" }],
  },
  {
    n: 26,
    publication: "PredictMarketCap",
    date: "2026",
    claim: "2026 FIFA World Cup Winner — Polymarket vs Kalshi Odds.",
    links: [{ label: "PredictMarketCap", href: "https://predictmarketcap.com/canonical/2026-fifa-world-cup-winner" }],
  },
  {
    n: 27,
    publication: "Oddpool",
    date: "2026",
    claim: "All World Cup 2026 Markets | Kalshi & Polymarket.",
    links: [{ label: "Oddpool", href: "https://www.oddpool.com/explore/world-cup" }],
  },
  {
    n: 28,
    publication: "European Gaming",
    date: "17.07.2026",
    claim: "World Cup 2026 Final Betting Explained: Odds & Markets.",
    links: [{ label: "European Gaming", href: "https://europeangaming.eu/portal/how-to-bet-on-world-cup/" }],
  },
  {
    n: 29,
    publication: "Laika AI",
    date: "2026",
    claim: "Polymarket vs Kalshi Arbitrage in 2026.",
    links: [{ label: "Laika AI", href: "https://laikalabs.ai/prediction-markets/polymarket-kalshi-arbitrage-guide" }],
  },
  {
    n: 30,
    publication: "Help Net Security",
    date: "08.06.2026",
    claim: "Cybercriminals create 19,000 FIFA-themed domains ahead of 2026 World Cup.",
    links: [{ label: "Help Net Security", href: "https://www.helpnetsecurity.com/2026/06/08/fifa-world-cup-cyber-threats/" }],
  },
  {
    n: 31,
    publication: "dnsspy.io",
    date: "30.05.2026",
    claim: "498 Fake FIFA World Cup Domains and How Phishing Sentinel Catches Them.",
    links: [{ label: "dnsspy.io", href: "https://dnsspy.io/blog/fifa-world-cup-fake-domains-phishing-sentinel" }],
  },
  {
    n: 32,
    publication: "PYMNTS",
    date: "03.07.2026",
    claim: "Texas Attorney General Investigates StubHub Over World Cup Ticket Cancellations.",
    links: [{ label: "PYMNTS", href: "https://www.pymnts.com/legal/2026/texas-attorney-general-investigates-stubhub-over-world-cup-ticket-cancellations/" }],
  },
  {
    n: 33,
    publication: "SudoFlare",
    date: "06.06.2026",
    claim: "FBI Warning: 4300+ Fake FIFA Sites Target World Cup 2026.",
    links: [{ label: "SudoFlare", href: "https://sudoflare.com/cybersecurity/fbi-warning-fake-fifa-sites-world-cup-2026-cyber-fraud/" }],
  },
  {
    n: 34,
    publication: "Digital Music News",
    date: "19.07.2026",
    claim: "The ‘Drake Curse’ Strikes Again: Rapper Loses $1.5 Million as Argentina Loses to Spain In the World Cup.",
    links: [{ label: "Digital Music News", href: "https://www.digitalmusicnews.com/2026/07/19/drake-curse-world-cup-lost-bet/" }],
  },
  {
    n: 35,
    publication: "The News International",
    date: "20.07.2026",
    claim: "Drake loses World Cup bet as Spain beats Argentina.",
    links: [{ label: "The News International", href: "https://www.thenews.com.pk/latest/1409621-drake-loses-world-cup-bet-as-spain-beats-argentina" }],
  },
  {
    n: 36,
    publication: "Bloody Elbow",
    date: "19.07.2026",
    claim: "Conor McGregor loses out on $3.6 million after $100,000 World Cup final bet is way off.",
    links: [{ label: "Bloody Elbow", href: "https://bloodyelbow.com/2026/07/19/conor-mcgregor-loses-out-on-3-6-million-after-100000-world-cup-final-bet-is-way-off/" }],
  },
  {
    n: 37,
    publication: "Рейтинг Букмекеров",
    date: "19.07.2026",
    claim: "Фёдор Смолов сделал ставку в 1,5 млн рублей на финал Чемпионата мира.",
    links: [{ label: "Рейтинг Букмекеров", href: "https://bookmaker-ratings.ru/news/fyodor-smolov-sdelal-stavku-v-1-5-mln-rublej-na-final-chempionata-mira/" }],
  },
  {
    n: 38,
    publication: "Рейтинг Букмекеров",
    date: "19.07.2026",
    claim: "Стример Бустер поставил 6,7 миллиона рублей на тотал больше 2,5 голов в финале чемпионата мира.",
    links: [{ label: "Рейтинг Букмекеров", href: "https://bookmaker-ratings.ru/news/buster-stavka-total-balshe-final-chm-2026/" }],
  },
  {
    n: 39,
    publication: "Sports.ru",
    date: "20.07.2026",
    claim: "Ганвест выиграл 181,5 млн рублей, поставив на победу Испании в финале ЧМ.",
    links: [{ label: "Sports.ru", href: "https://www.sports.ru/betting/1117306222-ganvest-vyigral-182-mln-rublej-postaviv-na-pobedu-ispanii-v-finale-chm.html" }],
  },
  {
    n: 40,
    publication: "Super",
    date: "21.07.2026",
    claim: "Super выяснил, сколько зарабатывает Ганвест и почему его обвиняют в фальсификации скринов.",
    links: [{ label: "Super", href: "https://super.ru/celebrity-news/super-ganvest-zarabatyvaet-na-chastnyh-vystupleniyah-1-5-millionov-rubley" }],
  },
  {
    n: 41,
    publication: "Digiday",
    date: "26.06.2026",
    claim: "Nike versus Adidas: Who’s winning the World Cup’s brand head to head?",
    links: [{ label: "Digiday", href: "https://digiday.com/marketing/nike-versus-adidas-whos-winning-the-world-cups-brand-head-to-head/" }],
  },
  {
    n: 42,
    publication: "Miami Herald",
    date: "17.07.2026",
    claim: "World Cup Final ticket prices most expensive in history.",
    links: [{ label: "Miami Herald", href: "https://www.miamiherald.com/sports/fifa-world-cup/article316535179.html" }],
  },
  {
    n: 43,
    publication: "Sports Illustrated",
    date: "2026",
    claim: "2026 World Cup Final Tickets Hit Astounding Prices as Reselling Begins.",
    links: [{ label: "Sports Illustrated", href: "https://www.si.com/soccer/2026-world-cup-final-tickets-prices-reselling" }],
  },
  {
    n: 44,
    publication: "CoinMarketCap",
    date: "2026",
    claim: "ARG Price Analysis.",
    links: [{ label: "CoinMarketCap", href: "https://coinmarketcap.com/cmc-ai/argentine-football-association-fan-token/price-analysis/" }],
  },
  {
    n: 45,
    publication: "Coingabbar",
    date: "20.07.2026",
    claim: "Argentina and Spain Fan Token Tell a Different World Cup Story.",
    links: [{ label: "Coingabbar", href: "https://www.coingabbar.com/en/crypto-currency-news/argentina-and-spain-fan-token-world-cup-final" }],
  },
  {
    n: 46,
    publication: "TheDrakeCurse.com",
    date: "19.07.2026",
    claim: "Drake's Full Sport Betting History & Analysis.",
    links: [{ label: "TheDrakeCurse.com", href: "https://thedrakecurse.com/" }],
  },
];

export function Cite({ n }: { n: number }) {
  const s = SOURCES.find((x) => x.n === n)!;
  return (
    <Fn
      n={n}
      tip={
        <>
          <span className="font-bold text-[var(--color-text)]">{s.publication}</span>
          {` · ${s.date}. ${s.claim}`}
          <span className="mt-1 block text-[10px]">Кликабельная ссылка находится в разделе «Источники».</span>
        </>
      }
    />
  );
}

export function SourcesList() {
  return (
    <section className="mb-12" aria-labelledby="article-sources-heading">
      <h2 id="article-sources-heading" className="mb-6 text-[20px] font-bold tracking-tight text-[var(--color-text)]">
        Источники
      </h2>
      <ol className="list-decimal space-y-3 pl-5 text-[12px] leading-relaxed text-[var(--color-dim)] marker:font-mono marker:text-[var(--color-text)]">
        {SOURCES.map((s) => (
          <li key={s.n} id={`source-${s.n}`}>
            <span className="font-bold text-[var(--color-text)]">{s.publication}</span>
            {` · ${s.date}. ${s.claim} `}
            {s.links.map((link, idx) => (
              <span key={link.href}>
                {idx > 0 && " · "}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-solid underline-offset-2 hover:text-[var(--color-text)]"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </li>
        ))}
      </ol>
    </section>
  );
}
