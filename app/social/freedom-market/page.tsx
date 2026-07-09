"use client";

/**
 * Carousel slide factory for the freedom-market investigation — the
 * BI/Bloomberg Instagram anatomy on our own design system: the site's
 * masthead, Hack mono, entity colours and real Brock UI charts. Each slide
 * is a fixed 1080×1350 (4:5) frame; Playwright screenshots the elements by
 * id (#slide-1 … #slide-18). The page pins itself to the dark theme.
 *
 * Data-storytelling rules baked in: every slide stands alone — the reader
 * only flips images, nobody narrates. Kicker = context, headline = takeaway,
 * named actors, plain-language numbers, sources + legal hedges on slides
 * that can travel without the deck.
 *
 * Dramaturgy (cause → effect, no jumps):
 *   I   mystery: cover → the call → the timeline
 *   II  the offer and its price: offer → ladder → arithmetic (cliffhanger:
 *       "money cheaper than the market's")
 *   III the answer: the tenge model (sellers' balances ARE the cheap money,
 *       with the Kaspi-deposit hedge) → the broker heart ("nobody in the
 *       world has assembled this", per public disclosures)
 *   IV  the stakes: Uzum twin → the theorem + Khusnullin twist → Ozon/Sber
 *   V   the battlefield: KZ context → fashion ×2 (wardrobe left → enter
 *       here; closes on "margin arrives with the TV") → ecosystem+credit →
 *       regulator
 *   VI  check, not mate → CTA
 */

import { useEffect } from "react";
import Image from "next/image";
import { Masthead } from "@/components/canon/masthead";
import { ColumnChart } from "@/components/charts/column-chart";
import { Coin } from "@/components/charts/tenge-journey";

const pct = (v: number) => `${v.toLocaleString("ru-RU")}%`;
const NEUTRAL = "var(--brock-neutral)";
const TOTAL = 20;

/* ── slide frame: masthead → content → source/counter footer ── */
function Slide({
  id,
  n,
  kicker,
  source,
  children,
}: {
  id: string;
  n: number;
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
      <div className="flex items-center justify-between pb-8 border-b" style={{ borderColor: "var(--color-border)" }}>
        <span className="pointer-events-none [&_a]:text-[30px] [&_a]:tracking-[0.14em]">
          <Masthead size="lg" surnameOnly />
        </span>
        <span className="text-[24px] font-bold uppercase tracking-[0.14em] text-right" style={{ color: "var(--color-brand)" }}>
          {kicker}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center min-h-0">{children}</div>

      <div
        className="flex items-end justify-between gap-8 pt-7 border-t text-[20px] leading-snug"
        style={{ borderColor: "var(--color-border)", color: "var(--color-dim)" }}
      >
        <span className="max-w-[760px]">{source ?? ""}</span>
        <span className="tabular-nums whitespace-nowrap">
          {n}/{TOTAL} · kasymzhanov.com
        </span>
      </div>
    </div>
  );
}

/* Shared typographic bits */
function H({ children, size = 64 }: { children: React.ReactNode; size?: number }) {
  return (
    <h2 className="font-bold tracking-tight" style={{ fontSize: size, lineHeight: 1.08 }}>
      {children}
    </h2>
  );
}
function Dek({ children, mt = 32 }: { children: React.ReactNode; mt?: number }) {
  return (
    <p className="text-[32px] leading-relaxed" style={{ color: "var(--color-dim)", marginTop: mt }}>
      {children}
    </p>
  );
}
function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[32px] font-bold leading-snug border-l-4 pl-6" style={{ borderColor: "var(--color-dim)" }}>
      {children}
    </p>
  );
}
function Tease({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[26px] italic mt-12" style={{ color: "var(--color-dim)" }}>
      {children}
    </p>
  );
}

/* ── 1 · cover: our art, zoomed onto the box; headline kept inside the
 * central square so the grid's 1:1 crop never cuts the text ── */
function S1() {
  return (
    <Slide id="slide-1" n={1} kicker="Расследование">
      <div className="relative w-full overflow-hidden" style={{ height: 560, background: "#e93032" }}>
        <Image
          src="/blog/freedom-market/cover.webp"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "center 64%", transform: "scale(1.24)" }}
          priority
          sizes="1300px"
        />
      </div>
      <h1 className="font-bold tracking-tight leading-[1.04] text-[84px] mt-10">
        Маркетплейс умер.
        <br />
        Он вам позвонит.
      </h1>
      <Dek mt={26}>Freedom Тимура Турлова тихо перезапускает мёртвый Teez - против Kaspi. Листайте →</Dek>
    </Slide>
  );
}

/* ── 2 · the hook: the call ── */
function S2() {
  return (
    <Slide id="slide-2" n={2} kicker="Что происходит" source="По переписке и созвонам продавца с командой площадки, июль 2026">
      <H size={64}>
        5 июля одному из крупных продавцов Kaspi позвонили из компании, которой не существует.
      </H>
      <Dek mt={48}>
        «Меня зовут А., я представляю маркетплейс{" "}
        <span className="font-bold" style={{ color: "var(--color-text)" }}>Freedom Market (ранее Teez)</span>»
      </Dek>
      <div className="mt-12 space-y-6 text-[32px] leading-snug">
        <p style={{ color: "var(--viz-negative)" }}>Нет: сайта, пресс-релиза, товарного знака.</p>
        <p style={{ color: "var(--viz-freedom)" }}>Есть: менеджер по партнёрам, шаблон письма и прейскурант комиссий.</p>
      </div>
    </Slide>
  );
}

/* ── 3 · the timeline ── */
function S3() {
  const rows: { d: string; t: string; accent?: boolean }[] = [
    { d: "20.04", t: "Турлов на форуме: «партнёрство или своя платформа - ещё определяем»" },
    { d: "09.05", t: "Зарегистрирован домен fmarket.kz, владелец скрыт", accent: true },
    { d: "13.05", t: "На домене выпущен SSL-сертификат - сразу с почтовым поддоменом", accent: true },
    { d: "01.06", t: "Freedom объявляет единый бренд для всех сервисов холдинга" },
    { d: "05.07", t: "Звонок и письмо продавцам Kaspi от «Freedom Market»" },
  ];
  return (
    <Slide
      id="slide-3"
      n={3}
      kicker="Хроника · 2026"
      source="WHOIS KazNIC · Certificate Transparency · Forbes Kazakhstan. Принадлежность домена холдингу не установлена"
    >
      <H size={56}>
        Глава Freedom публично: «ещё определяем». Инфраструктура тем временем строилась.
      </H>
      <Dek mt={24}>Хроника перезапуска купленного Teez - по датам:</Dek>
      <div className="mt-12 space-y-9">
        {rows.map((r) => (
          <div key={r.d} className="grid grid-cols-[150px_1fr] gap-6 items-baseline">
            <span
              className="text-[30px] font-bold tabular-nums"
              style={{ color: r.accent ? "var(--viz-freedom)" : "var(--color-dim)" }}
            >
              {r.d}
            </span>
            <span className="text-[28px] leading-snug" style={{ color: r.accent ? "var(--color-text)" : "var(--color-dim)" }}>
              {r.t}
            </span>
          </div>
        ))}
      </div>
      <Tease>Зачем такая спешка - видно по тому, что они предлагают →</Tease>
    </Slide>
  );
}

/* ── 4 · the offer: undo everything Kaspi forbids ── */
function S4() {
  const rows = [
    {
      t: "Свой магазин у каждого продавца - как на WB и Ozon",
      d: "против общей карточки Kaspi, где на одном iPhone сидят до 59 продавцов и режут друг другу маржу",
    },
    {
      t: "Аналитика трафика и «оцифровка рекламных вложений»",
      d: "против рекламы вслепую",
    },
    {
      t: "Открытые категории",
      d: "против категорийных турникетов",
    },
  ];
  return (
    <Slide
      id="slide-4"
      n={4}
      kicker="Оферта"
      source="Письмо Freedom Market первым партнёрам и созвоны с продавцами, июль 2026 · Redstat: 59 продавцов на карточке iPhone 17 Pro"
    >
      <H size={58}>
        Freedom обзванивает продавцов Kaspi - и обещает разрешить всё, что тот запрещает.
      </H>
      <Dek mt={24}>Площадка ещё до запуска спрашивает селлеров, чего им не хватает. Из письма:</Dek>
      <div className="mt-12 space-y-10">
        {rows.map((r) => (
          <div key={r.t} className="border-l-4 pl-8" style={{ borderColor: "var(--viz-freedom)" }}>
            <p className="text-[32px] font-bold leading-snug">{r.t}</p>
            <p className="text-[27px] leading-snug mt-2" style={{ color: "var(--color-dim)" }}>{r.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <Takeaway>Freedom продаёт селлерам не комиссию. Он продаёт всё, что им запрещает Kaspi.</Takeaway>
      </div>
    </Slide>
  );
}

/* ── 5 · exclusive I: the commission ladder ── */
function S5() {
  return (
    <Slide
      id="slide-5"
      n={5}
      kicker="Эксклюзив 1/2"
      source="Условия Freedom Market для первых партнёров, июль 2026. Этой таблицы нет ни у одного СМИ"
    >
      <H size={54}>
        Комиссии компании, которой нет: 5% за карту, 14% за длинную рассрочку.
      </H>
      <div className="mt-6" style={{ width: 814, height: 590 }}>
        <div style={{ width: 452, transform: "scale(1.8)", transformOrigin: "top left" }}>
          <ColumnChart
            height={290}
            barRadius={2}
            gap={8}
            accent="var(--viz-freedom)"
            data={[
              { label: "Карта", value: 5, color: NEUTRAL },
              { label: "Кредит", value: 5, color: NEUTRAL },
              { label: "3 мес", value: 6, color: NEUTRAL },
              { label: "6 мес", value: 8, color: NEUTRAL },
              { label: "9 мес", value: 11, color: NEUTRAL },
              { label: "12 мес", value: 13, color: NEUTRAL },
              { label: "24 мес", value: 14 },
            ]}
            yAxis={{ max: 16, hideTicks: true }}
            slots={{ tooltip: () => null }}
            dataLabels={{ show: true, format: pct }}
            formatValue={pct}
          />
        </div>
      </div>
      {/* How to read it — one line per payment genre, no jargon */}
      <div className="mt-9 space-y-5 text-[27px] leading-snug" style={{ color: "var(--color-dim)" }}>
        <p>
          <span className="font-bold" style={{ color: "var(--color-text)" }}>Карта и кредит - 5%.</span>{" "}
          За кредит проценты платит сам покупатель, продавцу он стоит как обычная оплата.
        </p>
        <p>
          <span className="font-bold" style={{ color: "var(--color-text)" }}>Рассрочка - до 14%.</span>{" "}
          Её «0%» для покупателя всегда кем-то оплачен. Здесь - продавцом: чем длиннее рассрочка, тем выше его комиссия.
        </p>
      </div>
    </Slide>
  );
}

/* ── 6 · exclusive II: the arithmetic behind the ladder ── */
function S6() {
  return (
    <Slide
      id="slide-6"
      n={6}
      kicker="Эксклюзив 2/2"
      source="Оценка автора: аннуитет 24 мес → средний долг ≈ 52% чека; 52% × 2 года × 15-18% годовых ≈ 16-19% от чека. Ставки - КФГД, 2026"
    >
      <H size={60}>
        За два года рассрочки продавец доплатит 9% от чека. Банку эти два года стоят 16–19%.
      </H>
      <div className="mt-14 space-y-8 text-[32px] leading-relaxed" style={{ color: "var(--color-dim)" }}>
        <p>
          <span className="font-bold" style={{ color: "var(--color-text)" }}>14% − 5% = 9% от чека</span> - столько продавец доплачивает за 24-месячную рассрочку против оплаты картой. Один раз.
        </p>
        <p>
          А банку надо два года где-то занимать эти деньги. Даже по ставкам обычных тенговых депозитов (15–18% годовых) это{" "}
          <span className="font-bold" style={{ color: "var(--viz-negative)" }}>16–19% от чека</span> - в 1,7–2 раза дороже.
        </p>
      </div>
      <div className="mt-14">
        <Takeaway>Либо Freedom сознательно доплачивает, чтобы переманить продавцов. Либо рассчитывает на деньги дешевле рыночных →</Takeaway>
      </div>
    </Slide>
  );
}

/* ── 7 · the answer: the tenge model ── */
function Lane({
  name,
  cells,
  dead,
  color,
}: {
  name: string;
  cells: string[];
  dead: boolean;
  color: string;
}) {
  return (
    <div>
      <p className="text-[28px] font-bold mb-6" style={{ color }}>{name}</p>
      <div className="grid grid-cols-4 gap-3">
        {cells.map((c, i) => {
          const last = i === cells.length - 1;
          return (
            <div
              key={c}
              className="border p-4 min-h-[150px] relative"
              style={{
                borderColor: "var(--color-border)",
                background: i % 2 === 0 ? "color-mix(in srgb, var(--color-border) 22%, var(--color-bg))" : "color-mix(in srgb, var(--color-border) 44%, var(--color-bg))",
                opacity: last ? 1 : 0.85,
              }}
            >
              <p className="text-[20px] tabular-nums" style={{ color: "var(--color-dim)" }}>{i + 1}.</p>
              <p className="text-[23px] font-bold leading-snug mt-1" style={{ color: last ? color : "var(--color-text)" }}>{c}</p>
              {last && (
                <span aria-hidden className="absolute -top-9 right-2">
                  <Coin dead={dead} size={64} />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function S7() {
  return (
    <Slide
      id="slide-7"
      n={7}
      kicker="Разгадка"
      source="Авторская модель на прецедентах Mercado Fondo и Shopify Balance - не анонсированный продукт Freedom"
    >
      <H size={54}>Деньги дешевле рыночных - это остатки самих продавцов.</H>
      <Dek mt={22}>Сравните, что происходит с тенге продавца после продажи:</Dek>
      <div className="mt-12 space-y-16">
        <Lane
          name="Kaspi: деньги приходят - и спят под 0%"
          color="var(--viz-kaspi)"
          dead
          cells={["Продажа", "Выплата день в день", "Счёт: доход 0%", "Монета гаснет"]}
        />
        <Lane
          name="Freedom (модель): деньги работают каждый день"
          color="var(--viz-freedom)"
          dead={false}
          cells={["Продажа", "Выплата", "Доход каждый день", "Фондирует рассрочку"]}
        />
      </div>
      <p className="text-[24px] leading-snug mt-12" style={{ color: "var(--color-dim)" }}>
        Честно: депозиты у Kaspi есть - включая Business Deposit для бизнеса. Но это отдельное действие, а не поведение счёта по умолчанию.
      </p>
      <Tease>На чём всё это замыкается →</Tease>
    </Slide>
  );
}

/* ── 8 · the heart: brokerage ── */
function S8() {
  return (
    <Slide
      id="slide-8"
      n={8}
      kicker="Сердце схемы"
      source="FRHC 10-K FY2026 (SEC), сегментная отчётность · Kursiv, 07.2025 · prior-art-обзор автора по публичным раскрытиям платформ"
    >
      <H size={64}>Всё замыкается на брокере.</H>
      <div className="mt-14 space-y-12">
        <div>
          <p className="text-[96px] font-bold tabular-nums leading-none" style={{ color: "var(--viz-freedom)" }}>55%</p>
          <p className="text-[30px] leading-snug mt-3" style={{ color: "var(--color-dim)" }}>
            маржа брокерского сегмента Freedom Holding - против 15% у банковского. Брокеридж и кормит весь холдинг
          </p>
        </div>
        <div>
          <p className="text-[44px] font-bold leading-tight">Кешбэк - бумагами</p>
          <p className="text-[30px] leading-snug mt-3" style={{ color: "var(--color-dim)" }}>
            кешбэк супераппа уже начисляется биржевой нотой, привязанной к акциям холдинга, - прямо на брокерский счёт. Покупатель чайника становится брокерским клиентом бесплатно
          </p>
        </div>
      </div>
      <div className="mt-14">
        <Takeaway>
          Тройную связку - маркетплейс, доходность на деньги продавцов и вознаграждения бумагами через своего брокера - не собрал, судя по публичным раскрытиям, ещё никто в мире. Freedom может стать первым.
        </Takeaway>
      </div>
      <Tease>Почему без этого умирают →</Tease>
    </Slide>
  );
}

/* ── 9 · the stakes I: the doppelgänger ── */
function S9() {
  const rows = [
    { l: "Рассрочка", u: "Nasiya - с первого дня", t: "«следующий этап» - так и не наступил" },
    { l: "Финтех в обороте", u: "~50%", t: "0%" },
    { l: "Итог", u: "раунд Tencent, оценка $1,5 млрд - первый единорог страны", t: "продан с долгами перед продавцами" },
  ];
  return (
    <Slide
      id="slide-9"
      n={9}
      kicker="Доппельгангер"
      source="Пресс-релиз Uzum, 02.2025 · TechCrunch, 08.2025 · Zakon.kz"
    >
      <H size={60}>
        У Teez есть близнец. Он жив - и стоит $1,5 млрд.
      </H>
      <Dek mt={24}>Uzum строит в Узбекистане ту же модель: склад, быстрая доставка, суперапп. С одной разницей:</Dek>
      <div className="mt-12">
        <div className="grid grid-cols-[220px_1fr_1fr] gap-x-8 pb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
          <span />
          <span className="text-[30px] font-bold" style={{ color: "var(--viz-uzum)" }}>Uzum</span>
          <span className="text-[30px] font-bold" style={{ color: "var(--color-dim)" }}>Teez</span>
        </div>
        {rows.map((r) => (
          <div key={r.l} className="grid grid-cols-[220px_1fr_1fr] gap-x-8 py-6 border-b items-baseline" style={{ borderColor: "var(--color-border)" }}>
            <span className="text-[22px] uppercase tracking-[0.08em]" style={{ color: "var(--color-dim)" }}>{r.l}</span>
            <span className="text-[27px] leading-snug font-bold">{r.u}</span>
            <span className="text-[27px] leading-snug" style={{ color: "var(--color-dim)" }}>{r.t}</span>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <Takeaway>Одна модель, два исхода. Разница - банк внутри.</Takeaway>
      </div>
    </Slide>
  );
}

/* ── 10 · the stakes II: the theorem + the twist ── */
function S10() {
  const rows = [
    { name: "Teez", fate: "перестал платить продавцам - и замолчал" },
    { name: "СберМегаМаркет", fate: "−93% продаж за 2025-й" },
    { name: "KazanExpress", fate: "поглощён «Магнитом», бренда больше нет" },
  ];
  return (
    <Slide id="slide-10" n={10} kicker="Теорема" source="Data Insight · Exclusive.kz · Oborot.ru · Business-Gazeta">
      <H size={68}>Маркетплейс без банка умирает.</H>
      <Dek mt={22}>Скорость и склад не спасают, если некому финансировать рассрочку. Три случая за три года:</Dek>
      <div className="mt-12 space-y-10">
        {rows.map((r) => (
          <div key={r.name} className="border-l-4 pl-8" style={{ borderColor: "var(--viz-negative)" }}>
            <p className="text-[38px] font-bold">{r.name}</p>
            <p className="text-[28px] mt-1" style={{ color: "var(--viz-negative)" }}>{r.fate}</p>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <Takeaway>
          Поворот: Teez и KazanExpress строил один человек - Линар Хуснуллин. И жалобы продавцов на задержки выплат были одинаковыми.
        </Takeaway>
      </div>
    </Slide>
  );
}

/* ── 11 · the stakes III: proof ── */
function Panel({
  label,
  big,
  bigColor,
  children,
}: {
  label: string;
  big: string;
  bigColor: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ width: 430 }}>
      <p className="text-[23px] uppercase tracking-[0.06em] whitespace-nowrap" style={{ color: "var(--color-dim)" }}>
        {label}
      </p>
      <p className="mt-3 mb-8">
        <span className="text-[60px] font-bold tabular-nums" style={{ color: bigColor }}>{big}</span>
        <span className="ml-4 text-[24px]" style={{ color: "var(--color-dim)" }}>за 2025-й</span>
      </p>
      {children}
    </div>
  );
}
function S11() {
  return (
    <Slide
      id="slide-11"
      n={11}
      kicker="Доказательство"
      source="Ozon IR · Data Insight. Панели в своём масштабе: слева выручка финтеха Ozon, справа продажи маркетплейса Сбера"
    >
      <H size={56}>
        Банк внутри витрины растёт.
        <br />
        Банк по соседству - падает.
      </H>
      <div className="mt-14 flex justify-between">
        {/* Built-in x-ticks hidden: at scale() Chromium drops random truncated
         * 10px labels; we draw our own year row at native 24px. */}
        <Panel label="Ozon · финтех, млрд ₽" big="+120%" bigColor="var(--viz-ozon)">
          <div style={{ width: 430, height: 430 }}>
            <div style={{ width: 254, transform: "scale(1.7)", transformOrigin: "top left" }}>
              <ColumnChart
                height={240}
                barRadius={2}
                gap={14}
                accent="var(--viz-ozon)"
                data={[
                  { label: "2024", value: 88.8, color: NEUTRAL },
                  { label: "2025", value: 195.2 },
                ]}
                xAxis={{ hideTicks: true }}
                yAxis={{ max: 380, hideTicks: true }}
                slots={{ tooltip: () => null }}
                dataLabels={{ show: true, format: (v: number) => v.toLocaleString("ru-RU") }}
                formatValue={(v: number) => `${v.toLocaleString("ru-RU")} млрд ₽`}
              />
            </div>
          </div>
          <div className="flex text-[24px] tabular-nums" style={{ width: 430, gap: 24, color: "var(--color-dim)" }}>
            <span className="flex-1 text-center">2024</span>
            <span className="flex-1 text-center">2025</span>
          </div>
        </Panel>
        <Panel label="МегаМаркет · продажи, млрд ₽" big="−93%" bigColor="var(--viz-negative)">
          <div style={{ width: 430, height: 430 }}>
            <div style={{ width: 254, transform: "scale(1.7)", transformOrigin: "top left" }}>
              <ColumnChart
                height={240}
                barRadius={2}
                gap={14}
                accent="var(--viz-negative)"
                data={[
                  { label: "2023", value: 312, color: NEUTRAL },
                  { label: "2024", value: 342.6, color: NEUTRAL },
                  { label: "2025", value: 24.5 },
                ]}
                xAxis={{ hideTicks: true }}
                yAxis={{ max: 380, hideTicks: true }}
                slots={{ tooltip: () => null }}
                dataLabels={{ show: true, format: (v: number) => v.toLocaleString("ru-RU") }}
                formatValue={(v: number) => `${v.toLocaleString("ru-RU")} млрд ₽`}
              />
            </div>
          </div>
          <div className="flex text-[24px] tabular-nums" style={{ width: 430, gap: 24, color: "var(--color-dim)" }}>
            <span className="flex-1 text-center">2023</span>
            <span className="flex-1 text-center">2024</span>
            <span className="flex-1 text-center">2025</span>
          </div>
        </Panel>
      </div>
      <div className="mt-10">
        <Takeaway>У Сбера было больше денег и данных. У Ozon банк был внутри витрины.</Takeaway>
      </div>
    </Slide>
  );
}

/* ── 12 · battlefield I: KZ context ── */
function S12() {
  return (
    <Slide
      id="slide-12"
      n={12}
      kicker="Поле боя · Казахстан"
      source="Kaspi.kz IR, FY2025 · АФК и НБРК, 2024-2025"
    >
      <H size={64}>
        Рассрочка здесь - вторая валюта. И её вечно не хватает.
      </H>
      <div className="mt-16 space-y-14">
        <div>
          <p className="text-[96px] font-bold tabular-nums leading-none" style={{ color: "var(--viz-kaspi)" }}>77</p>
          <p className="text-[30px] leading-snug mt-3" style={{ color: "var(--color-dim)" }}>
            транзакций в месяц совершает средний активный клиент Kaspi - коммуналка, переводы, QR у продавца шаурмы
          </p>
        </div>
        <div>
          <p className="text-[96px] font-bold tabular-nums leading-none">26–31%</p>
          <p className="text-[30px] leading-snug mt-3" style={{ color: "var(--color-dim)" }}>
            кредитных заявок одобряется в среднем по стране: до трёх из четырёх получают отказ
          </p>
        </div>
      </div>
      <div className="mt-16">
        <Takeaway>Кто научится чаще говорить покупателю «да» - тот и заберёт рынок. Вопрос - с какой категории заходить →</Takeaway>
      </div>
    </Slide>
  );
}

/* ── 13 · battlefield II: the wardrobe has left ── */
function S13() {
  return (
    <Slide
      id="slide-13"
      n={13}
      kicker="Первый удар 1/2"
      source="MPSTATS, июль 2025 - июнь 2026 · Redstat, апрель 2026. Доли считаны по категорийным срезам"
    >
      <H size={60}>Шкаф Казахстана уже уехал - на Wildberries.</H>
      <div className="mt-14 grid grid-cols-2 gap-12">
        <div>
          <p className="text-[88px] font-bold tabular-nums leading-none" style={{ color: "var(--viz-wb)" }}>24,7%</p>
          <p className="text-[28px] leading-snug mt-3" style={{ color: "var(--color-dim)" }}>
            оборота Wildberries - одежда и обувь
          </p>
        </div>
        <div>
          <p className="text-[88px] font-bold tabular-nums leading-none" style={{ color: "var(--viz-kaspi)" }}>~7%</p>
          <p className="text-[28px] leading-snug mt-3" style={{ color: "var(--color-dim)" }}>
            у Kaspi: магазин электроники размером со страну
          </p>
        </div>
      </div>
      <div className="mt-12">
        <p className="text-[88px] font-bold tabular-nums leading-none" style={{ color: "var(--viz-wb)" }}>76%+</p>
        <p className="text-[28px] leading-snug mt-3" style={{ color: "var(--color-dim)" }}>
          одежды на WB продаётся со склада площадки (FBW), а не со склада продавца. Мода живёт на складе: примерки, возвраты, обмены
        </p>
      </div>
      <Tease>Склад, готовый под это, в стране один →</Tease>
    </Slide>
  );
}

/* ── 14 · battlefield III: enter through the wardrobe ── */
function S14() {
  const rows = [
    {
      t: "Склад - в Караганде, примерочные - в пунктах выдачи по стране",
      d: "единственная в стране модель с центрального склада: доставка за день и ПВЗ с примерочными - наследство Teez, работавшего в 32 городах",
    },
    {
      t: "FBF (Fulfillment by Freedom): отгрузил на склад - остальное делает площадка",
      d: "удобно селлеру из Казахстана, России, всего СНГ - остаётся товар и продвижение. И открытая дверь продавцам из Китая с их быстрой модой",
    },
    {
      t: "Тяжёлые фигуры Kaspi стоят в электронике",
      d: "фланг, который не усилить, не перестроив всю армию: у Kaspi нет ни склада, ни примерочных",
    },
  ];
  return (
    <Slide
      id="slide-14"
      n={14}
      kicker="Первый удар 2/2"
      source="Forbes Kazakhstan, 2024 · письмо Freedom Market первым партнёрам, июль 2026"
    >
      <H size={58}>Freedom может зайти именно отсюда - через шкаф.</H>
      <div className="mt-12 space-y-10">
        {rows.map((r) => (
          <div key={r.t} className="border-l-4 pl-8" style={{ borderColor: "var(--viz-freedom)" }}>
            <p className="text-[32px] font-bold leading-snug">{r.t}</p>
            <p className="text-[27px] leading-snug mt-2" style={{ color: "var(--color-dim)" }}>{r.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <Takeaway>Мода покупает частоту и привычку. Маржа приходит позже - вместе с телевизором.</Takeaway>
      </div>
    </Slide>
  );
}

/* ── 15 · battlefield IV: super-app traffic ── */
function S15() {
  return (
    <Slide
      id="slide-15"
      n={15}
      kicker="Арсенал · трафик"
      source="FRHC FY2026: MAU супераппа 2,59 млн против 1,02 млн годом ранее; 5,03 млн банковских клиентов"
    >
      <H size={58}>
        Дефицитный ресурс этой партии - покупатель. У Freedom он уже в приложении.
      </H>
      <div className="mt-14 grid grid-cols-2 gap-12">
        <div>
          <p className="text-[88px] font-bold tabular-nums leading-none" style={{ color: "var(--viz-freedom)" }}>2,6 млн</p>
          <p className="text-[28px] leading-snug mt-3" style={{ color: "var(--color-dim)" }}>
            месячная аудитория супераппа Freedom - выросла в 2,5 раза за год
          </p>
        </div>
        <div>
          <p className="text-[88px] font-bold tabular-nums leading-none">5 млн</p>
          <p className="text-[28px] leading-snug mt-3" style={{ color: "var(--color-dim)" }}>
            клиентов банка Freedom - каждый уже в контуре холдинга
          </p>
        </div>
      </div>
      <Dek mt={48}>
        Кешбэк за коммуналку, билеты и покупки - поводы заходить, не собираясь ничего покупать. То, что Kaspi строил десятилетие. Осталось соединить провода с витриной.
      </Dek>
      <div className="mt-12">
        <Takeaway>У Teez между заказами не было ни одной причины открыть приложение. У Freedom Market она есть с первого дня.</Takeaway>
      </div>
    </Slide>
  );
}

/* ── 16 · battlefield V: data + money + credit ── */
function S16() {
  return (
    <Slide
      id="slide-16"
      n={16}
      kicker="Экосистема"
      source="BG.ru, февраль 2026 · письмо Freedom Market первым партнёрам · оценка «внутренней аналитики» - по словам селлеров"
    >
      <H size={58}>
        Банк, который видит продажи селлера, кредитует его дешевле всех.
      </H>
      <div className="mt-14 space-y-9 text-[30px] leading-relaxed" style={{ color: "var(--color-dim)" }}>
        <p>
          В России это уже поняли: банк «Точка» купил аналитику{" "}
          <span className="font-bold" style={{ color: "var(--color-text)" }}>MPSTATS за ~2 млрд ₽</span>, Альфа-Банк ответил покупкой MarketGuru.
        </p>
        <p>
          У Freedom всё может жить под одной крышей: счёт продавца, кредит под обороты, аналитика кабинета и рынка. Kaspi за десятилетие, по словам селлеров, не построил им даже внутреннюю аналитику.
        </p>
        <p>
          Плюс открытый API, которого рынок ещё не видел, - и вокруг площадки вырастает экосистема сервисов, как вокруг Wildberries.
        </p>
      </div>
      <div className="mt-14">
        <Takeaway>«Данные, деньги и управленческие решения должны жить вместе» - CEO банка «Точка».</Takeaway>
      </div>
    </Slide>
  );
}

/* ── 17 · battlefield VI: the regulator ── */
function S17() {
  return (
    <Slide
      id="slide-17"
      n={17}
      kicker="Регулятор"
      source="АРРФР · НБРК · Послание Президента, 09.2023 · DataHub ПКБ"
    >
      <H size={60}>Регулятор жмёт на тормоз. И держит дверь открытой.</H>
      <div className="mt-14 space-y-10">
        <div className="border-l-4 pl-8" style={{ borderColor: "var(--viz-negative)" }}>
          <p className="text-[32px] font-bold">Встречный ветер</p>
          <p className="text-[29px] leading-snug mt-2" style={{ color: "var(--color-dim)" }}>
            потребкредитование охлаждают: лимиты долговой нагрузки, выдачи падают, отказов всё больше
          </p>
        </div>
        <div className="border-l-4 pl-8" style={{ borderColor: "var(--viz-freedom)" }}>
          <p className="text-[32px] font-bold">Попутный ветер</p>
          <p className="text-[29px] leading-snug mt-2" style={{ color: "var(--color-dim)" }}>
            власти который год требуют от банков кредитовать бизнес. Кредит селлеру под обороты - это и есть кредит малому бизнесу: Freedom окажется не против повестки, а внутри неё
          </p>
        </div>
      </div>
      <div className="mt-14">
        <Takeaway>Предупреждение тоже есть: Yu&rsquo;e Bao в Китае задушили лимитами ровно на пике.</Takeaway>
      </div>
    </Slide>
  );
}

/* ── 18 · the punchline: the game in notation ── */
function S18() {
  const moves = [
    "Доставка за день - ход.",
    "Комиссия 5% - ход.",
    "Свои магазины, открытые категории, выплаты назавтра - ход, ход, ход.",
  ];
  return (
    <Slide id="slide-18" n={18} kicker="Партия">
      <div className="flex items-center gap-9 mb-10">
        <ChessClock width={300} />
        <p className="text-[40px] font-bold tracking-tight">Часы включены.</p>
      </div>
      <H size={54}>
        Дальше партию можно записывать по нотации.
      </H>
      <div className="mt-12 space-y-6">
        {moves.map((m) => (
          <p key={m} className="text-[34px] font-bold leading-snug border-l-4 pl-8" style={{ borderColor: "var(--viz-freedom)" }}>
            {m}
          </p>
        ))}
      </div>
      <Dek mt={44}>
        На каждый ход у Kaspi найдётся ответ: у чемпиона кредитный конвейер, частота и десять лет форы. Защищается он лучше всех в стране - лёгкой партии не будет.
      </Dek>
      <div className="mt-12">
        <Takeaway>
          Но одна фигура есть только у Freedom - брокер, и за деньги она не покупается. Это ещё не мат. Но это уже сильный шах.
        </Takeaway>
      </div>
    </Slide>
  );
}

/* A chess clock, mid-game: Freedom has made its move and slapped its (green)
 * button down - the red side's clock is now running. */
function ChessClock({ width = 360 }: { width?: number }) {
  return (
    <svg width={width} height={Math.round((width * 164) / 360)} viewBox="0 0 360 164" aria-hidden>
      <rect x="86" y="28" width="44" height="16" rx="3" fill="var(--viz-freedom)" />
      <rect x="230" y="12" width="44" height="32" rx="3" fill="var(--viz-kaspi)" />
      <rect x="20" y="44" width="320" height="112" rx="10" fill="none" stroke="var(--color-dim)" strokeWidth="3" />
      <circle cx="104" cy="100" r="40" fill="none" stroke="var(--color-dim)" strokeWidth="3" />
      <circle cx="256" cy="100" r="40" fill="none" stroke="var(--color-dim)" strokeWidth="3" />
      {/* Freedom's dial: stopped at 12 - the move is made */}
      <line x1="104" y1="100" x2="104" y2="68" stroke="var(--viz-freedom)" strokeWidth="4" strokeLinecap="round" />
      {/* Kaspi's dial: running */}
      <line x1="256" y1="100" x2="256" y2="76" stroke="var(--color-dim)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <line x1="256" y1="100" x2="281" y2="79" stroke="var(--viz-kaspi)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
function S19() {
  return (
    <Slide id="slide-19" n={19} kicker="Полная версия">
      <H size={60}>
        Здесь - десятая часть. Остальное уже опубликовано.
      </H>
      <div className="mt-10 space-y-5 text-[31px] leading-snug" style={{ color: "var(--color-dim)" }}>
        <p>· Вся хроника сделки - с документами и датами</p>
        <p>· Прейскурант целиком и его экономика</p>
        <p>· Интерактив: монета сама проходит оба пути</p>
        <p>· Три вопроса, на которые пока нет ответа</p>
        <p>· 46 источников - каждая цифра со ссылкой</p>
      </div>
      <p className="text-[64px] font-bold tracking-tight mt-16" style={{ color: "var(--color-brand)" }}>
        kasymzhanov.com
      </p>
      <p className="text-[30px] mt-4" style={{ color: "var(--color-dim)" }}>
        Ссылка в шапке профиля →
      </p>
    </Slide>
  );
}

/* ── 20 · your move: the audience question ── */
function S20() {
  return (
    <Slide id="slide-20" n={20} kicker="Ваш ход">
      <H size={64}>Теперь ваш ход.</H>
      <div className="mt-14 space-y-10">
        <div className="border-l-4 pl-8" style={{ borderColor: "var(--color-brand)" }}>
          <p className="text-[26px] uppercase tracking-[0.1em] mb-2" style={{ color: "var(--color-dim)" }}>Покупателям</p>
          <p className="text-[34px] font-bold leading-snug">
            Купили бы на новой площадке - с доставкой за день и рассрочкой?
          </p>
        </div>
        <div className="border-l-4 pl-8" style={{ borderColor: "var(--viz-freedom)" }}>
          <p className="text-[26px] uppercase tracking-[0.1em] mb-2" style={{ color: "var(--color-dim)" }}>Селлерам</p>
          <p className="text-[34px] font-bold leading-snug">
            Зашли бы на маркетплейс, где есть аналитика, трафик и инструменты продвижения?
          </p>
        </div>
      </div>
      <Dek mt={52}>
        Расскажите в комментариях - и подпишитесь: у этой партии будет продолжение, и мы его посчитаем первыми.
      </Dek>
      <p className="text-[34px] font-bold tracking-tight mt-10" style={{ color: "var(--color-brand)" }}>
        kasymzhanov.com
      </p>
    </Slide>
  );
}

export default function SocialFreedomMarket() {
  /* The deck ships dark-only: pin the dark theme while this factory page is
   * open and restore whatever the visitor had on unmount. */
  useEffect(() => {
    const html = document.documentElement;
    const wasLight = html.classList.contains("light");
    html.classList.remove("light");
    html.classList.add("dark");
    return () => {
      if (wasLight) {
        html.classList.remove("dark");
        html.classList.add("light");
      }
    };
  }, []);

  return (
    <div className="min-h-screen py-16 flex flex-col items-center gap-16" style={{ background: "var(--color-surface)" }}>
      <S1 />
      <S2 />
      <S3 />
      <S4 />
      <S5 />
      <S6 />
      <S7 />
      <S8 />
      <S9 />
      <S10 />
      <S11 />
      <S12 />
      <S13 />
      <S14 />
      <S15 />
      <S16 />
      <S17 />
      <S18 />
      <S19 />
      <S20 />
    </div>
  );
}
