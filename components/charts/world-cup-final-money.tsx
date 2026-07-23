"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Fn } from "@/components/canon/term";
import RAW from "@/lib/data/world-cup-final-money-simple.json";

type NumberItem = {
  value_usd: number;
  display: string;
  label: string;
  note: string;
  source: string;
};

type ResultItem = {
  account: string;
  result_usd_m: number;
  scope: string;
  source: string;
};

type ChartsData = {
  charts: [
    { id: "three_numbers"; title: string; items: NumberItem[] },
    {
      id: "how_contract_works";
      title: string;
      example: {
        buy_price_usd: number;
        winning_redemption_usd: number;
        gross_gain_per_share_usd: number;
        note: string;
      };
      source: string;
    },
    {
      id: "public_results";
      title: string;
      unit: string;
      items: ResultItem[];
      caveat: string;
    },
  ];
};

const DATA = RAW as unknown as ChartsData;
const THREE_NUMBERS = DATA.charts[0];
const CONTRACT = DATA.charts[1];
const PUBLIC_RESULTS = DATA.charts[2];

function FloatingTooltip({
  id,
  anchor,
  children,
}: {
  id: string;
  anchor: Element | null;
  children: ReactNode;
}) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<{ left: number; top: number; visible: boolean } | null>(null);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!mounted || !anchor) {
      setPosition(null);
      return;
    }

    const place = () => {
      const tooltip = tooltipRef.current;
      if (!tooltip) return;
      const anchorRect = anchor.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const margin = 12;
      const gap = 10;
      const centered = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
      const left = Math.max(margin, Math.min(centered, window.innerWidth - margin - tooltipRect.width));
      const above = anchorRect.top - tooltipRect.height - gap;
      let top = above >= margin ? above : anchorRect.bottom + gap;
      if (top + tooltipRect.height > window.innerHeight - margin) {
        top = Math.max(margin, window.innerHeight - margin - tooltipRect.height);
      }
      setPosition({
        left,
        top,
        visible: anchorRect.bottom > 0 && anchorRect.top < window.innerHeight,
      });
    };

    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [anchor, mounted]);

  if (!mounted || !anchor) return null;
  return createPortal(
    <div
      ref={tooltipRef}
      id={id}
      role="tooltip"
      style={{
        position: "fixed",
        left: position?.left ?? 12,
        top: position?.top ?? 12,
        width: "min(380px, calc(100vw - 24px))",
        visibility: position?.visible ? "visible" : "hidden",
        zIndex: 80,
      }}
      className="pointer-events-none rounded-[3px] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-3 font-mono text-[10.5px] leading-relaxed text-[var(--color-text)] shadow-xl [overflow-wrap:anywhere]"
    >
      {children}
    </div>,
    document.body,
  );
}

type MarkState = { index: number; anchor: SVGGElement };

function useInteractiveMarks(rootRef: React.RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState<MarkState | null>(null);
  const [pinned, setPinned] = useState<MarkState | null>(null);
  const shown = pinned ?? active;

  useEffect(() => {
    if (!pinned) return;
    const closeOutside = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setPinned(null);
      setActive(null);
    };
    document.addEventListener("pointerdown", closeOutside, true);
    return () => document.removeEventListener("pointerdown", closeOutside, true);
  }, [pinned, rootRef]);

  useEffect(() => {
    if (!shown) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setPinned(null);
      setActive(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [shown]);

  const markProps = (index: number, label: string) => ({
    role: "button" as const,
    tabIndex: 0,
    "aria-label": label,
    "aria-pressed": pinned?.index === index,
    onPointerEnter: (event: ReactPointerEvent<SVGGElement>) => {
      if (event.pointerType === "mouse") setActive({ index, anchor: event.currentTarget });
    },
    onPointerLeave: (event: ReactPointerEvent<SVGGElement>) => {
      if (event.pointerType === "mouse") setActive((current) => current?.index === index ? null : current);
    },
    onFocus: (event: React.FocusEvent<SVGGElement>) => setActive({ index, anchor: event.currentTarget }),
    onBlur: () => setActive((current) => current?.index === index ? null : current),
    onClick: (event: React.MouseEvent<SVGGElement>) => {
      const next = { index, anchor: event.currentTarget };
      setPinned((current) => current?.index === index ? null : next);
    },
    onKeyDown: (event: ReactKeyboardEvent<SVGGElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      const next = { index, anchor: event.currentTarget };
      setPinned((current) => current?.index === index ? null : next);
    },
  });

  return {
    shown,
    pinned,
    markProps,
    close: () => {
      setPinned(null);
      setActive(null);
    },
  };
}

function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left font-mono text-[10px] leading-relaxed">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="border-b border-[var(--color-border)] px-2 py-2 font-bold text-[var(--color-text)]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b border-[var(--color-border)] px-2 py-2 align-top text-[var(--color-dim)]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ChartShell({
  id,
  title,
  subtitle,
  caption,
  children,
  table,
}: {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  children: ReactNode;
  table: ReactNode;
}) {
  return (
    <section
      id={id}
      data-chart-renderer="interactive-svg"
      className="relative left-1/2 my-9 w-[calc(100vw-2rem)] max-w-[920px] -translate-x-1/2 rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6"
      aria-labelledby={`${id}-title`}
    >
      <header className="mb-6">
        <h3 id={`${id}-title`} className="text-[17px] font-bold leading-snug text-[var(--color-text)] sm:text-[19px]">
          {title}
        </h3>
        <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-[var(--color-dim)] sm:text-[11px]">{subtitle}</p>
      </header>
      {children}
      <p className="mt-4 font-mono text-[10.5px] leading-relaxed text-[var(--color-dim)]">{caption}</p>
      <details className="mt-4 border-t border-[var(--color-border)] pt-3">
        <summary className="cursor-pointer font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand)]">
          Данные графика
        </summary>
        {table}
      </details>
    </section>
  );
}

const CARD_LINES = [
  ["сумма всех сделок", "по рынкам, связанным", "с финалом"],
  ["пакет выплат FIFA", "48 сборным"],
  ["выплата испанской", "федерации за победу"],
] as const;

function ThreeNumbersSvg({
  mobile,
  markProps,
  tooltipId,
  shownIndex,
}: {
  mobile: boolean;
  markProps: ReturnType<typeof useInteractiveMarks>["markProps"];
  tooltipId: string;
  shownIndex: number | null;
}) {
  const width = mobile ? 320 : 720;
  const height = mobile ? 522 : 270;
  const cardWidth = mobile ? 320 : 232;
  const cardHeight = mobile ? 158 : 250;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={mobile ? "block h-auto w-full sm:hidden" : "hidden h-auto w-full sm:block"}
      role="img"
      aria-labelledby={`three-numbers-svg-title-${mobile ? "mobile" : "desktop"}`}
    >
      <title id={`three-numbers-svg-title-${mobile ? "mobile" : "desktop"}`}>Три разные денежные метрики без общей количественной шкалы</title>
      {THREE_NUMBERS.items.map((item, index) => {
        const x = mobile ? 0 : index * 244;
        const y = mobile ? index * 174 : 0;
        const label = `${item.display}. ${item.label}. ${item.note}. Источник: ${item.source}`;
        return (
          <g
            key={item.display}
            {...markProps(index, label)}
            aria-describedby={shownIndex === index ? tooltipId : undefined}
            className="group cursor-pointer focus:outline-none"
          >
            <rect
              x={x + 1}
              y={y + 1}
              width={cardWidth - 2}
              height={cardHeight - 2}
              rx="4"
              fill="var(--color-bg)"
              stroke="var(--color-border)"
              strokeWidth="1.5"
              className="transition-colors group-hover:stroke-[var(--color-brand)] group-focus-visible:stroke-[var(--color-brand)]"
            />
            <text x={x + 18} y={y + 45} fill={index === 0 ? "var(--color-brand)" : "var(--color-text)"} fontSize={mobile ? 26 : 24} fontWeight="700">
              {item.display}
            </text>
            <text x={x + 18} y={y + 92} fill="var(--color-text)" fontSize={mobile ? 13 : 12} fontWeight="700">
              {CARD_LINES[index].map((line, lineIndex) => (
                <tspan key={line} x={x + 18} dy={lineIndex === 0 ? 0 : 18}>{line}</tspan>
              ))}
            </text>
            <text x={x + 18} y={y + (mobile ? 141 : 222)} fill="var(--color-dim)" fontSize={mobile ? 10 : 9.5}>
              {item.note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ThreeNumbersChart() {
  const rootRef = useRef<HTMLDivElement>(null);
  const interaction = useInteractiveMarks(rootRef);
  const shownIndex = interaction.shown?.index ?? null;
  const shown = shownIndex === null ? null : THREE_NUMBERS.items[shownIndex];
  const tooltipId = "three-numbers-tooltip";
  return (
    <ChartShell
      id="three-numbers"
      title={THREE_NUMBERS.title}
      subtitle="Их можно поставить рядом, но нельзя сравнивать как один и тот же показатель"
      caption="Источники: Fortune; FIFA Council; Associated Press. Карточки намеренно не используют общую количественную шкалу: оборот и выплаты отвечают на разные вопросы."
      table={<DataTable headers={["Сумма", "Что означает", "Оговорка", "Источник"]} rows={THREE_NUMBERS.items.map((item) => [item.display, item.label, item.note, item.source])} />}
    >
      <div ref={rootRef} role="group" aria-label="Три карточки с несопоставимыми денежными метриками">
        <ThreeNumbersSvg mobile markProps={interaction.markProps} tooltipId={tooltipId} shownIndex={shownIndex} />
        <ThreeNumbersSvg mobile={false} markProps={interaction.markProps} tooltipId={tooltipId} shownIndex={shownIndex} />
        <p className="mt-3 font-mono text-[9.5px] leading-relaxed text-[var(--color-dim)]">
          Наведите или сфокусируйте карточку. На сенсорном экране нажмите, чтобы закрепить подсказку.
        </p>
        {interaction.pinned && (
          <button type="button" onClick={interaction.close} className="mt-2 rounded-[3px] border border-[var(--color-border)] px-2 py-1 font-mono text-[10px] text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]">
            Закрыть подсказку
          </button>
        )}
        {shown && (
          <FloatingTooltip id={tooltipId} anchor={interaction.shown?.anchor ?? null}>
            <p className="font-bold">{shown.display}</p>
            <p className="mt-1 text-[var(--color-dim)]">{shown.label}</p>
            <p className="mt-1">{shown.note}</p>
            <p className="mt-2 text-[var(--color-dim)]">Источник: {shown.source}</p>
          </FloatingTooltip>
        )}
      </div>
    </ChartShell>
  );
}

const CONTRACT_STEPS = [
  { title: "Покупка", lines: ["Контракт стоит", "$0,59"] },
  { title: "Результат", lines: ["Испания", "побеждает"] },
  { title: "Расчёт", lines: ["$1,00 выплата", "$0,41 результат*"] },
] as const;

export function ContractFlowChart() {
  const rootRef = useRef<HTMLDivElement>(null);
  const interaction = useInteractiveMarks(rootRef);
  const shownIndex = interaction.shown?.index ?? null;
  const tooltipId = "contract-flow-tooltip";
  const tooltipCopy = [
    `Покупка по $${CONTRACT.example.buy_price_usd.toFixed(2).replace(".", ",")} за контракт.`,
    "Если Испания побеждает, контракт рассчитывается в пользу владельца.",
    `Выплата $${CONTRACT.example.winning_redemption_usd.toFixed(2).replace(".", ",")}; результат до комиссий $${CONTRACT.example.gross_gain_per_share_usd.toFixed(2).replace(".", ",")} на контракт.`,
  ];
  return (
    <ChartShell
      id="how-contract-works"
      title={CONTRACT.title}
      subtitle="Упрощённый пример: «Испания станет чемпионом»"
      caption={`Источник: ${CONTRACT.source}. * До комиссий и изменения цены при крупном ордере.`}
      table={<DataTable headers={["Шаг", "Действие"]} rows={CONTRACT_STEPS.map((step, index) => [step.title, tooltipCopy[index]])} />}
    >
      <div ref={rootRef} role="group" aria-label="Три шага работы контракта рынка прогнозов">
        <svg viewBox="0 0 360 420" className="mx-auto block h-auto w-full max-w-[560px]" role="img" aria-labelledby="contract-flow-svg-title">
          <title id="contract-flow-svg-title">Покупка контракта за 59 центов, победа Испании и выплата одного доллара</title>
          <defs>
            <marker id="world-cup-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-dim)" />
            </marker>
          </defs>
          {CONTRACT_STEPS.map((step, index) => {
            const y = 4 + index * 124;
            const label = `${index + 1}. ${step.title}. ${tooltipCopy[index]}`;
            return (
              <g key={step.title} {...interaction.markProps(index, label)} aria-describedby={shownIndex === index ? tooltipId : undefined} className="group cursor-pointer focus:outline-none">
                <rect x="25" y={y} width="310" height="96" rx="4" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" className="transition-colors group-hover:stroke-[var(--color-brand)] group-focus-visible:stroke-[var(--color-brand)]" />
                <text x="45" y={y + 25} fill="var(--color-brand)" fontSize="11" fontWeight="700">0{index + 1}</text>
                <text x="45" y={y + 51} fill="var(--color-text)" fontSize="18" fontWeight="700">{step.title}</text>
                <text x="185" y={y + 45} fill="var(--color-dim)" fontSize="14">
                  {step.lines.map((line, lineIndex) => <tspan key={line} x="185" dy={lineIndex === 0 ? 0 : 19}>{line}</tspan>)}
                </text>
                {index < 2 && <line x1="180" y1={y + 98} x2="180" y2={y + 119} stroke="var(--color-dim)" strokeWidth="2" markerEnd="url(#world-cup-arrow)" aria-hidden />}
              </g>
            );
          })}
          <text x="25" y="394" fill="var(--color-text)" fontSize="9.5" fontWeight="700">До финала контракт можно перепродать.</text>
          <text x="25" y="408" fill="var(--color-dim)" fontSize="8.5">Каждая сделка увеличивает оборот.</text>
        </svg>
        <p className="mt-3 font-mono text-[9.5px] leading-relaxed text-[var(--color-dim)]">Наведите, сфокусируйте или нажмите на шаг.</p>
        {interaction.pinned && <button type="button" onClick={interaction.close} className="mt-2 rounded-[3px] border border-[var(--color-border)] px-2 py-1 font-mono text-[10px] text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]">Закрыть подсказку</button>}
        {shownIndex !== null && (
          <FloatingTooltip id={tooltipId} anchor={interaction.shown?.anchor ?? null}>
            <p className="font-bold">Шаг {shownIndex + 1}. {CONTRACT_STEPS[shownIndex].title}</p>
            <p className="mt-1 text-[var(--color-dim)]">{tooltipCopy[shownIndex]}</p>
            <p className="mt-2 text-[var(--color-dim)]">Источник: {CONTRACT.source}</p>
          </FloatingTooltip>
        )}
      </div>
    </ChartShell>
  );
}

function resultX(value: number) {
  return 100 + ((value + 12.5) / 17.5) * 245;
}

function mobileResultX(value: number) {
  return 18 + ((value + 12.5) / 17.5) * 284;
}

function formatResult(value: number) {
  const sign = value > 0 ? "+" : "−";
  return `${sign}${Math.abs(value).toLocaleString("ru-RU")} млн $`;
}

export function PublicResultsChart() {
  const rootRef = useRef<HTMLDivElement>(null);
  const interaction = useInteractiveMarks(rootRef);
  const shownIndex = interaction.shown?.index ?? null;
  const shown = shownIndex === null ? null : PUBLIC_RESULTS.items[shownIndex];
  const tooltipId = "public-results-tooltip";
  const zero = resultX(0);
  const ticks = [-12.5, -10, -7.5, -5, -2.5, 0, 2.5, 5];
  return (
    <ChartShell
      id="public-results"
      title={PUBLIC_RESULTS.title}
      subtitle="Прибыль и убыток, млн долларов · это не рейтинг всех участников"
      caption={`${PUBLIC_RESULTS.caveat} Источники: BeInCrypto, Benzinga, Prediction News.`}
      table={<DataTable headers={["Аккаунт", "Результат", "Охват", "Источник"]} rows={PUBLIC_RESULTS.items.map((item) => [item.account, formatResult(item.result_usd_m), item.scope, item.source])} />}
    >
      <div ref={rootRef} role="group" aria-label="Четыре публично отслеживаемых результата на Polymarket">
        <svg viewBox="0 0 320 520" className="block h-auto w-full sm:hidden" role="img" aria-labelledby="public-results-svg-title-mobile">
          <title id="public-results-svg-title-mobile">Дивергентные горизонтальные бары: два убытка и две прибыли в миллионах долларов</title>
          {[-12.5, -10, -5, 0, 5].map((tick) => {
            const x = mobileResultX(tick);
            return (
              <g key={tick} aria-hidden>
                <line x1={x} y1="18" x2={x} y2="461" stroke={tick === 0 ? "var(--color-text)" : "var(--color-border)"} strokeWidth={tick === 0 ? 1.2 : 0.7} />
                {[-10, -5, 0, 5].includes(tick) && (
                  <text x={x} y="482" textAnchor="middle" fill="var(--color-dim)" fontSize="8">{tick === 0 ? "$0" : `${tick < 0 ? "−" : "+"}$${Math.abs(tick).toLocaleString("ru-RU")} млн`}</text>
                )}
              </g>
            );
          })}
          {PUBLIC_RESULTS.items.map((item, index) => {
            const y = 44 + index * 108;
            const zeroMobile = mobileResultX(0);
            const end = mobileResultX(item.result_usd_m);
            const x = Math.min(zeroMobile, end);
            const width = Math.max(3, Math.abs(end - zeroMobile));
            const positive = item.result_usd_m > 0;
            const valueText = `${item.result_usd_m > 0 ? "+" : "−"}${Math.abs(item.result_usd_m).toLocaleString("ru-RU")}`;
            const valueW = valueText.length * 6.4;
            const fitsOutside = positive ? end + 6 + valueW <= 316 : end - 6 - valueW >= 4;
            const valueX = fitsOutside ? (positive ? end + 6 : end - 6) : (positive ? end - 6 : end + 6);
            const valueAnchor = positive === fitsOutside ? "start" : "end";
            const valueFill = fitsOutside ? (positive ? "var(--color-brand)" : "var(--viz-negative)") : "var(--color-bg)";
            const label = `${item.account}. ${formatResult(item.result_usd_m)}. ${item.scope}. Источник: ${item.source}`;
            return (
              <g key={item.account} {...interaction.markProps(index, label)} aria-describedby={shownIndex === index ? tooltipId : undefined} className="group cursor-pointer focus:outline-none">
                <rect x="3" y={y - 22} width="314" height="91" rx="3" fill="transparent" stroke="transparent" className="group-focus-visible:stroke-[var(--color-brand)]" />
                <text x="8" y={y} fill="var(--color-text)" fontSize="12" fontWeight="700">{item.account}</text>
                <text x="8" y={y + 17} fill="var(--color-dim)" fontSize="8.5">{item.scope}</text>
                <rect x={x} y={y + 29} width={width} height="24" rx="1.5" fill={positive ? "var(--color-brand)" : "var(--viz-negative)"} className="transition-[filter,opacity] group-hover:brightness-110 group-focus-visible:brightness-110" />
                <text x={valueX} y={y + 45} textAnchor={valueAnchor} fill={valueFill} fontSize="10" fontWeight="700">{valueText}</text>
              </g>
            );
          })}
          <text x="18" y="508" fill="var(--color-dim)" fontSize="8.5">убыток</text>
          <text x="302" y="508" textAnchor="end" fill="var(--color-dim)" fontSize="8.5">прибыль</text>
        </svg>
        <svg viewBox="0 0 360 430" className="hidden h-auto w-full sm:block" role="img" aria-labelledby="public-results-svg-title">
          <title id="public-results-svg-title">Дивергентные горизонтальные бары: два убытка и две прибыли в миллионах долларов</title>
          {ticks.map((tick) => {
            const x = resultX(tick);
            return (
              <g key={tick} aria-hidden>
                <line x1={x} y1="22" x2={x} y2="373" stroke={tick === 0 ? "var(--color-text)" : "var(--color-border)"} strokeWidth={tick === 0 ? 1.2 : 0.7} />
                {[-10, -5, 0, 5].includes(tick) && (
                  <text x={x} y="393" textAnchor="middle" fill="var(--color-dim)" fontSize="7.5">{tick === 0 ? "$0" : `${tick < 0 ? "−" : "+"}$${Math.abs(tick).toLocaleString("ru-RU")} млн`}</text>
                )}
              </g>
            );
          })}
          {PUBLIC_RESULTS.items.map((item, index) => {
            const y = 43 + index * 86;
            const end = resultX(item.result_usd_m);
            const x = Math.min(zero, end);
            const width = Math.max(2, Math.abs(end - zero));
            const positive = item.result_usd_m > 0;
            const valueText = `${item.result_usd_m > 0 ? "+" : "−"}${Math.abs(item.result_usd_m).toLocaleString("ru-RU")}`;
            const valueW = valueText.length * 5.8;
            const fitsOutside = positive ? end + 5 + valueW <= 356 : end - 5 - valueW >= 2;
            const valueX = fitsOutside ? (positive ? end + 5 : end - 5) : (positive ? end - 5 : end + 5);
            const valueAnchor = positive === fitsOutside ? "start" : "end";
            const valueFill = fitsOutside ? (positive ? "var(--color-brand)" : "var(--viz-negative)") : "var(--color-bg)";
            const label = `${item.account}. ${formatResult(item.result_usd_m)}. ${item.scope}. Источник: ${item.source}`;
            return (
              <g key={item.account} {...interaction.markProps(index, label)} aria-describedby={shownIndex === index ? tooltipId : undefined} className="group cursor-pointer focus:outline-none">
                <rect x="3" y={y - 19} width="353" height="66" rx="3" fill="transparent" stroke="transparent" className="group-focus-visible:stroke-[var(--color-brand)]" />
                <text x="7" y={y} fill="var(--color-text)" fontSize="10.5" fontWeight="700">{item.account}</text>
                <text x="7" y={y + 30} fill="var(--color-dim)" fontSize="8">{item.scope}</text>
                <rect x={x} y={y - 8} width={width} height="26" rx="1.5" fill={positive ? "var(--color-brand)" : "var(--viz-negative)"} className="transition-[filter,opacity] group-hover:brightness-110 group-focus-visible:brightness-110" />
                <text x={valueX} y={y + 8} textAnchor={valueAnchor} fill={valueFill} fontSize="9" fontWeight="700">{valueText}</text>
              </g>
            );
          })}
          <text x="100" y="415" fill="var(--color-dim)" fontSize="7.5">убыток</text>
          <text x="345" y="415" textAnchor="end" fill="var(--color-dim)" fontSize="7.5">прибыль</text>
        </svg>
        <p className="mt-3 font-mono text-[9.5px] leading-relaxed text-[var(--color-dim)]">Наведите или сфокусируйте строку. На сенсорном экране нажмите; повторное нажатие, Escape или кнопка ниже закрывает подсказку.</p>
        {interaction.pinned && <button type="button" onClick={interaction.close} className="mt-2 rounded-[3px] border border-[var(--color-border)] px-2 py-1 font-mono text-[10px] text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]">Закрыть подсказку</button>}
        {shown && (
          <FloatingTooltip id={tooltipId} anchor={interaction.shown?.anchor ?? null}>
            <p className="font-bold">{shown.account} · {formatResult(shown.result_usd_m)}</p>
            <p className="mt-1 text-[var(--color-dim)]">{shown.scope}</p>
            <p className="mt-2 text-[var(--color-dim)]">Источник: {shown.source}</p>
          </FloatingTooltip>
        )}
      </div>
    </ChartShell>
  );
}

type SourceRef = {
  n: number;
  publication: string;
  title: string;
  date: string;
  hrefs: { label: string; href: string }[];
};

const SOURCES: SourceRef[] = [
  { n: 1, publication: "FIFA", title: "Spain 1-0 Argentina | World Cup 2026 report and highlights", date: "19.07.2026", hrefs: [{ label: "FIFA", href: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/spain-argentina-final-report-highlights" }] },
  { n: 2, publication: "Associated Press", title: "The World Cup winner will earn $51 million under expanded purse", date: "19.07.2026", hrefs: [{ label: "AP", href: "https://apnews.com/article/38dffaf95bf0130f14a7b5c9e8f274a9" }] },
  { n: 3, publication: "Fortune", title: "Thanks to $5.7 billion in Kalshi and Polymarket bets, FIFA’s World Cup final may be “the largest gambling event in history”", date: "20.07.2026", hrefs: [{ label: "Fortune", href: "https://fortune.com/2026/07/20/thanks-to-5-7-billion-kalshi-polymarket-bets-fifa-world-cup-final-may-be-largest-gambling-event-history/" }] },
  { n: 4, publication: "Polymarket Help Center", title: "«What is a Prediction Market?» и «How Are Prediction Markets Resolved?»", date: "", hrefs: [{ label: "What is a Prediction Market?", href: "https://help.polymarket.com/en/articles/13364272-what-is-a-prediction-market" }, { label: "How Are Prediction Markets Resolved?", href: "https://help.polymarket.com/en/articles/13364518-how-are-prediction-markets-resolved" }] },
  { n: 5, publication: "FIFA", title: "FIFA Council increases record financial distribution to all 48 Participating Member Associations at the FIFA World Cup 2026", date: "28.04.2026", hrefs: [{ label: "FIFA Council", href: "https://inside.fifa.com/organisation/fifa-council/media-releases/council-increases-record-financial-distribution-member-associations-world-cup-2026" }] },
  { n: 6, publication: "Fortune", title: "World Cup final is already the biggest ever prediction market as Kalshi bets top $1.27 billion", date: "17.07.2026", hrefs: [{ label: "Fortune", href: "https://fortune.com/2026/07/17/world-cup-final-biggest-ever-prediction-market-kalshi-bets-top-spain-argentina/" }] },
  { n: 7, publication: "Benzinga", title: "A Mysterious Polymarket Trader Walked Away With $1.35 Million in Hours After One Bold World Cup Wager", date: "20.07.2026", hrefs: [{ label: "Benzinga", href: "https://www.benzinga.com/crypto/cryptocurrency/26/07/60545485/a-mysterious-polymarket-trader-walked-away-with-1-35-million-in-hours-after-one-bold-world-cup-wager-and-its-raising-eyebrows" }] },
  { n: 8, publication: "BeInCrypto", title: "Polymarket Whale Turns $1.9M $TRUMP Win Into $1.2M World Cup Loss", date: "20.07.2026", hrefs: [{ label: "BeInCrypto", href: "https://beincrypto.com/polymarket-trump-argentina-world-cup-bet/" }] },
  { n: 9, publication: "BeInCrypto", title: "Polymarket Trader Loses Over $11 Million on 2026 World Cup Bets in 10 Days", date: "06.07.2026", hrefs: [{ label: "BeInCrypto", href: "https://beincrypto.com/polymarket-coldsway-world-cup-losses/" }] },
  { n: 10, publication: "Prediction News", title: "Polymarket trader “fishalive” turns $427K into $4.7M on Spain–Cabo Verde draw", date: "16.06.2026", hrefs: [{ label: "Prediction News", href: "https://predictionnews.com/story/polymarket-trader-fishalive-bets-400k-against-spain-beating-cabo-verde-at-9-odds" }] },
  { n: 11, publication: "Digital Music News", title: "The “Drake Curse” Strikes Again: Rapper Loses $1.5 Million as Argentina Loses to Spain In the World Cup", date: "19.07.2026", hrefs: [{ label: "Digital Music News", href: "https://www.digitalmusicnews.com/2026/07/19/drake-curse-world-cup-lost-bet/" }] },
  { n: 12, publication: "Super", title: "Super выяснил, сколько зарабатывает Ганвест и почему его обвиняют в фальсификации скринов", date: "21.07.2026", hrefs: [{ label: "Super", href: "https://super.ru/celebrity-news/super-ganvest-zarabatyvaet-na-chastnyh-vystupleniyah-1-5-millionov-rubley" }] },
  { n: 13, publication: "Miami Herald", title: "World Cup Final ticket prices most expensive in history", date: "17.07.2026", hrefs: [{ label: "Miami Herald", href: "https://www.miamiherald.com/sports/fifa-world-cup/article316535179.html" }] },
  { n: 14, publication: "Help Net Security", title: "Cybercriminals create 19,000 FIFA-themed domains ahead of 2026 World Cup", date: "08.06.2026", hrefs: [{ label: "Help Net Security", href: "https://www.helpnetsecurity.com/2026/06/08/fifa-world-cup-cyber-threats/" }] },
  { n: 15, publication: "PYMNTS", title: "Texas Attorney General Investigates StubHub Over World Cup Ticket Cancellations", date: "03.07.2026", hrefs: [{ label: "PYMNTS", href: "https://www.pymnts.com/legal/2026/texas-attorney-general-investigates-stubhub-over-world-cup-ticket-cancellations/" }] },
];

export function Cite({ n }: { n: number }) {
  const source = SOURCES.find((item) => item.n === n)!;
  return <Fn n={n} tip={<><span className="font-bold text-[var(--color-text)]">{source.publication}</span>{source.date ? ` · ${source.date}. ${source.title}` : ` · ${source.title}`}<span className="mt-1 block text-[10px]">Кликабельная ссылка находится в разделе «Источники».</span></>} />;
}

export function SourcesList() {
  return (
    <section className="mb-12" aria-labelledby="article-sources-heading">
      <h2 id="article-sources-heading" className="mb-6 text-[20px] font-bold tracking-tight text-[var(--color-text)]">Источники</h2>
      <ol className="list-decimal space-y-3 pl-5 text-[12px] leading-relaxed text-[var(--color-dim)] marker:font-mono marker:text-[var(--color-text)]">
        {SOURCES.map((source) => (
          <li key={source.n} id={`source-${source.n}`}>
            <span className="font-bold text-[var(--color-text)]">{source.publication}</span>{` · ${source.title}${source.date ? `, ${source.date}` : ""} - `}
            {source.hrefs.map((link, index) => <span key={link.href}>{index > 0 && "; "}<a href={link.href} target="_blank" rel="noopener noreferrer" className="underline decoration-solid underline-offset-2 hover:text-[var(--color-text)]">{link.label}</a></span>)}
          </li>
        ))}
      </ol>
    </section>
  );
}
