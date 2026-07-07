"use client";

/**
 * «Путешествие одного тенге» / "The Journey of One Tenge" — a mini special
 * project inside the freedom-market piece.
 *
 * Form (v2, after the "traffic-light" critique): a monochrome graphite
 * CHESSBOARD stage — the article's chess frame made literal. Each step is a
 * board square, step labels read like move notation. A single gold coin (the
 * one saturated object on stage) is the piece: on scroll it hops square to
 * square. The Kaspi coin finishes its rank on "account, 0% yield" and goes
 * grey — the piece resigns; a dashed DIAGONAL square («deposit - if you carry
 * it yourself») stays one move aside: the move the seller must make by hand.
 * The Freedom rank closes into a loop — its coin keeps cycling, the clock
 * keeps running, the counter reads ∞.
 *
 * Desktop: coins travel horizontally along ranks (pinned sticky stage).
 * Mobile: the board turns vertical and the coin falls square to square
 * (unpinned; progress driven by the section's own travel through the
 * viewport). prefers-reduced-motion renders the final state statically.
 */

import { useEffect, useRef, useState } from "react";

/* Theme-aware stage tokens: the board lives on the site palette, so the
 * special project follows light/dark like every other figure. The coin's own
 * gold is the only saturated object. */
const STAGE = {
  bg: "var(--color-surface)",
  cellA: "color-mix(in srgb, var(--color-border) 22%, var(--color-surface))",
  cellB: "color-mix(in srgb, var(--color-border) 48%, var(--color-surface))",
  line: "var(--color-border)",
  text: "var(--color-text)",
  dim: "var(--color-dim)",
};

type Step = { n: string; title: string; detail: string };

type Copy = {
  title: string;
  dek: string;
  kaspiName: string;
  freedomName: string;
  kaspiSteps: Step[];
  freedomSteps: Step[];
  depositTitle: string;
  depositNote: string;
  plaque: string;
  caption: string;
  interactiveKicker: string;
};

const RU: Copy = {
  title: "Путешествие одного тенге",
  dek: "Что происходит с одним тенге выручки селлера после продажи. Скрольте - монета пройдёт оба пути: в Kaspi она доходит до расчётного счёта и останавливается, в модели Freedom - продолжает работать каждый день.",
  kaspiName: "Kaspi: путь тенге обрывается",
  freedomName: "Freedom (модель): путь замыкается в круг",
  kaspiSteps: [
    { n: "1.", title: "Покупка", detail: "покупатель платит в приложении" },
    { n: "2.", title: "Кешбэк баллами", detail: "бонусы, которые можно только потратить" },
    { n: "3.", title: "Выплата день в день", detail: "деньги приходят на расчётный счёт" },
    { n: "4.", title: "Счёт: доход 0%", detail: "это счёт, не депозит - монета гаснет" },
  ],
  freedomSteps: [
    { n: "1.", title: "Покупка", detail: "покупатель платит в приложении" },
    { n: "2.", title: "Кешбэк бумагами", detail: "дробные акции - в портфель" },
    { n: "3.", title: "Счёт с ежедневным доходом", detail: "инструменты денежного рынка" },
    { n: "4.", title: "Фондирует рассрочку", detail: "тенге остаётся в контуре" },
  ],
  depositTitle: "Депозит - если донести самому",
  depositNote: "ход в сторону, который селлер делает рукой: отдельный продукт и отдельное действие",
  plaque:
    "Партия «Freedom» - авторская модель на основе публичных прецедентов (Mercado Fondo, eToro, Shopify Balance), а не анонсированный продукт Freedom. Партия Kaspi упрощена до поведения по умолчанию: депозиты у Kaspi есть - включая Business Deposit для предпринимателей, - но требуют отдельного действия. Потухшая монета - образ простоя денег при нулевом доходе, не расчёт покупательной способности.",
  caption: "Модель: расчёты и допущения автора · прецеденты: Mercado Fondo, eToro, Shopify Balance",
  interactiveKicker: "Интерактив",
};

const EN: Copy = {
  title: "The Journey of One Tenge",
  dek: "What happens to one tenge of a seller's revenue after the sale. Scroll - the coin walks both paths: at Kaspi it reaches the settlement account and stops; in the Freedom model it keeps working every day.",
  kaspiName: "Kaspi: the tenge's path ends",
  freedomName: "Freedom (a model): the path closes into a loop",
  kaspiSteps: [
    { n: "1.", title: "Purchase", detail: "the buyer pays in the app" },
    { n: "2.", title: "Cashback as points", detail: "bonuses that can only be spent" },
    { n: "3.", title: "Same-day payout", detail: "money lands on the settlement account" },
    { n: "4.", title: "Account: 0% yield", detail: "an account, not a deposit - the coin goes out" },
  ],
  freedomSteps: [
    { n: "1.", title: "Purchase", detail: "the buyer pays in the app" },
    { n: "2.", title: "Cashback as shares", detail: "fractional stock into a portfolio" },
    { n: "3.", title: "Daily-yield account", detail: "money-market instruments" },
    { n: "4.", title: "Funds the next installment", detail: "the tenge stays in the loop" },
  ],
  depositTitle: "A deposit - if you carry it yourself",
  depositNote: "a move aside the seller makes by hand: a separate product and a separate action",
  plaque:
    "The “Freedom” game is the author's model built on public precedents (Mercado Fondo, eToro, Shopify Balance) - not an announced Freedom product. The Kaspi game is simplified to default behaviour: Kaspi does offer deposits - including a Business Deposit for merchants - but they require a separate action. The extinguished coin depicts idle money at zero yield, not a purchasing-power calculation.",
  caption: "Model: the author's assumptions and calculations · precedents: Mercado Fondo, eToro, Shopify Balance",
  interactiveKicker: "Interactive",
};

/* The user-supplied gold tenge coin (lies flat on the board like a piece). */
function Coin({ dead, size = 56 }: { dead: boolean; size?: number }) {
  return (
    <svg
      viewBox="0 0 150 150"
      width={size}
      height={size}
      aria-hidden
      className="transition-[filter,opacity] duration-700"
      style={{ filter: dead ? "grayscale(1) brightness(0.65)" : "none", opacity: dead ? 0.8 : 1 }}
    >
      <path fill="#F8B916" d="M139.991 81.999c0 27.662-28.827 50.086-64.704 50.086-35.872 0-65.286-21.862-65.286-49.523V68.438L139.991 68v13.999z" />
      <path fill="#FFD113" d="M139.991 68c0 27.662-29.746 50.085-65.622 50.085-35.872 0-64.367-22.424-64.367-50.085s28.495-50.085 64.367-50.085c35.876 0 65.622 22.424 65.622 50.085z" />
      <path fill="#FFE16A" d="M76.371 116.087C40.497 116.087 12 93.661 12 66c0-11.19 4.668-21.521 12.597-29.858C15.457 44.799 10 55.897 10 68c0 27.661 28.497 50.086 64.371 50.086 21.71 0 41.163-8.222 53.151-20.836-12.089 11.478-30.611 18.837-51.151 18.837z" />
      <path fill="#E88824" d="M74.482 26.757c-29.542 0-53.007 18.466-53.007 41.244s23.465 41.243 53.007 41.243c29.539 0 54.036-18.465 54.036-41.243.001-22.778-24.497-41.244-54.036-41.244zm.515 82.485c-28.067 0-50.846-19.601-50.846-41.241s22.266-41.244 50.331-41.244c28.063 0 53.996 18.706 54.015 40.347.022 22.459-25.434 42.138-53.5 42.138z" />
      <path fill="#FFE16A" d="M75.51 109.244c29.543 0 53.009-18.465 53.009-41.245 0-22.777-23.466-41.242-53.009-41.242-29.54 0-54.035 18.465-54.035 41.242 0 22.78 24.495 41.245 54.035 41.245zm-.513-82.485c28.066 0 50.845 19.603 50.845 41.24 0 21.64-22.266 41.245-50.332 41.245-28.063 0-54.014-17.975-54.014-40.346 0-24.626 25.434-42.139 53.501-42.139z" />
      <path fill="#E88824" d="M101.994 113.292v14.267s37.997-11.563 37.997-45.558v-14s1.584 30.685-37.997 45.291z" />
      <path fill="#FFE16A" d="M49.999 128.25S39.407 125.11 32 119.678v-13.883s5.708 4.43 17.999 8.617v13.838z" />
      {/* ₸ embossed on the face */}
      <g fill="#B8860B" opacity="0.85">
        <rect x="52" y="47" width="46" height="7" rx="2" />
        <rect x="52" y="59" width="46" height="7" rx="2" />
        <rect x="71" y="59" width="8" height="34" rx="2" />
      </g>
    </svg>
  );
}

/* One board rank: alternating graphite squares with notation labels. */
function Rank({
  steps,
  coinAt,
  coinDead,
  vertical,
}: {
  steps: Step[];
  coinAt: number;
  coinDead: boolean;
  vertical: boolean;
}) {
  return (
    <div className={`relative grid gap-0 ${vertical ? "grid-cols-1" : "grid-cols-4"}`}>
      {steps.map((s, i) => {
        const active = i <= coinAt;
        return (
          <div
            key={s.title}
            className="relative border p-2.5 md:p-3 transition-opacity duration-300"
            style={{
              background: (i % 2 === 0) !== vertical ? STAGE.cellA : STAGE.cellB,
              borderColor: STAGE.line,
              opacity: active ? 1 : 0.45,
              minHeight: vertical ? 84 : 118,
            }}
          >
            <p className="font-mono text-[10px]" style={{ color: i === coinAt ? STAGE.text : STAGE.dim }}>{s.n}</p>
            <p className="text-[12.5px] font-semibold leading-snug mt-0.5" style={{ color: STAGE.text }}>{s.title}</p>
            <p className="text-[11px] leading-snug mt-0.5" style={{ color: STAGE.dim }}>{s.detail}</p>
          </div>
        );
      })}
      {/* The coin piece: absolutely positioned over the current square. */}
      <div
        aria-hidden
        className="absolute pointer-events-none transition-[left,top,transform] duration-700 ease-in-out"
        style={
          vertical
            ? { left: "auto", right: 6, top: `calc(${coinAt} * 25% + 12.5% - 22px)`, transform: `rotate(${coinAt * 360}deg)` }
            : { top: -24, left: `calc(${coinAt} * 25% + 12.5% - 28px)`, transform: `rotate(${coinAt * 360}deg)` }
        }
      >
        <Coin dead={coinDead} size={vertical ? 44 : 56} />
      </div>
    </div>
  );
}

export function TengeJourney({ locale = "ru" }: { locale?: "ru" | "en" }) {
  const c = locale === "en" ? EN : RU;
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setProgress(1);
      return;
    }
    const mq = window.matchMedia("(min-width: 768px)");
    const syncMode = () => setPinned(mq.matches);
    syncMode();
    mq.addEventListener("change", syncMode);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = trackRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        let p: number;
        if (mq.matches) {
          const total = rect.height - vh;
          const passed = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
          p = total > 0 ? passed / total : 1;
        } else {
          p = Math.min(Math.max((vh - rect.top) / Math.max(rect.height, 1), 0), 1);
        }
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", syncMode);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const step = Math.min(3, Math.floor(progress * 4.4));
  // The Kaspi coin dies the moment it LANDS on "account, 0%": tied to the
  // step (works identically in pinned and unpinned modes), not to a raw
  // progress threshold. All coin movement is scroll-driven — no idle loops.
  const kaspiDead = step >= 3;
  const vertical = !pinned;

  return (
    <figure
      data-chart-slot="interactive"
      data-chart-type="chessboard scrolly"
      className="my-10 lg:w-[min(1060px,calc(100vw-3rem))] lg:relative lg:left-1/2 lg:-translate-x-1/2"
    >
      <div ref={trackRef} style={{ height: pinned && !reduced ? "280vh" : "auto" }} className="relative">
        <div className={pinned && !reduced ? "sticky top-[56px]" : ""}>
          <div className="rounded-[4px] px-5 py-7 md:px-10 md:py-10" style={{ background: STAGE.bg, border: `1px solid ${STAGE.line}` }}>
            {/* Header */}
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "var(--brock-accent)" }}>
              {c.interactiveKicker}
            </p>
            <h3 className="text-[20px] md:text-[24px] font-bold tracking-tight leading-tight" style={{ color: STAGE.text }}>
              {c.title}
            </h3>
            <p className="mt-1.5 text-[13px]" style={{ color: STAGE.dim }}>{c.dek}</p>

            <div className={`mt-8 grid grid-cols-1 gap-9 ${vertical ? "" : ""}`}>
              {/* ── Kaspi game ── */}
              <div>
                <p className="text-[14px] font-bold mb-4" style={{ color: STAGE.text }}>{c.kaspiName}</p>
                <div className={vertical ? "" : "grid grid-cols-[1fr_auto] gap-4 items-start"}>
                  <Rank steps={c.kaspiSteps} coinAt={step} coinDead={kaspiDead} vertical={vertical} />
                  {/* The diagonal deposit square - one move aside (down-right,
                   * clear of the header row), made by hand. */}
                  <div
                    className={`border border-dashed rounded-[2px] p-2.5 transition-colors duration-500 ${vertical ? "mt-3" : "w-[176px]"}`}
                    style={{ borderColor: step >= 3 ? STAGE.dim : STAGE.line }}
                  >
                    <p className="font-mono text-[10px]" style={{ color: step >= 3 ? STAGE.text : STAGE.dim }}>4…♟?</p>
                    <p className="text-[12px] font-semibold leading-snug mt-0.5" style={{ color: STAGE.text }}>{c.depositTitle}</p>
                    <p className="text-[10.5px] leading-snug mt-1" style={{ color: STAGE.dim }}>{c.depositNote}</p>
                  </div>
                </div>
              </div>

              {/* ── Freedom game ── */}
              <div>
                <p className="text-[14px] font-bold mb-4" style={{ color: STAGE.text }}>{c.freedomName}</p>
                <Rank steps={c.freedomSteps} coinAt={step} coinDead={false} vertical={vertical} />
              </div>
            </div>

            {/* Progress rail */}
            <div className="mt-6 h-1 rounded-full overflow-hidden" style={{ background: STAGE.line }} aria-hidden>
              <div className="h-full rounded-full transition-[width] duration-150" style={{ width: `${Math.round(progress * 100)}%`, background: STAGE.dim }} />
            </div>

            {/* Methodology plaque */}
            <p className="mt-4 font-mono text-[11.5px] italic leading-relaxed border-l-2 pl-3" style={{ color: STAGE.dim, borderColor: STAGE.line }}>
              {c.plaque}
            </p>

            {/* Caption + credit */}
            <p className="mt-3 font-mono text-[11px] leading-relaxed" style={{ color: STAGE.dim }}>
              {c.caption}
              <span className="mx-1.5" style={{ color: STAGE.line }}>·</span>
              Interactive:{" "}
              <a
                href="https://brockui.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline decoration-dotted underline-offset-2 transition-colors"
                style={{ color: STAGE.dim }}
              >
                Brock UI
              </a>
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
