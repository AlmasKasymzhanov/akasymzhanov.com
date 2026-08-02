"use client";

import Link from "next/link";
import { NewsletterCard } from "@/components/articles";
import { BarChart } from "@/components/charts/bar-chart";
import { DataTable } from "@/components/charts/data-table";
import { ReadingProgress } from "@/components/canon/reading-progress";
import { AuthorBlock, SiteFooter, SiteHeader } from "@/components/canon/site-chrome";
import { ReadTracker } from "@/components/read-tracker";
import { ViewCounter } from "@/components/view-counter";
import {
  firstPriorityNames,
  niches,
  statusCopy,
  statusOrder,
  type Niche,
  type NicheStatus,
} from "./data";

const SLUG = "kaspi-top-30-june-2026";
const ACCENT = "#263cff";
const NEUTRAL = "var(--brock-neutral)";
const WHATSAPP_NUMBER = "77028290908";
const WHATSAPP_MESSAGE = "Здравствуйте, Алмас! Хочу обсудить персональное исследование категории или ниши на Kaspi под мою задачу.";
const PERSONAL_ANALYSIS_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : "mailto:almas@kasymzhanov.com?subject=Персональное%20исследование%20Kaspi";
const REDSTAT_REGISTER_URL = "https://app.redstat.kz/register";

type RedStatPlacement = "top" | "middle" | "end";

const redStatUrl = (placement: RedStatPlacement) =>
  `${REDSTAT_REGISTER_URL}?utm_source=kasymzhanov&utm_medium=editorial&utm_campaign=kaspi_top30_june_2026&utm_content=${placement}`;

const revenueLeaders = [...niches].sort((a, b) => b.revenue - a.revenue).slice(0, 10);
const candidates = niches
  .filter((niche) => niche.status === "check" || niche.status === "test")
  .sort((a, b) => b.growth - a.growth);
const reviewExamples = niches.filter((niche) =>
  [...firstPriorityNames, "Виброплатформы", "Ванны", "Межкомнатные двери", "Тестомесы"].includes(niche.name),
);
const vibro = niches.find((niche) => niche.name === "Виброплатформы")!;

const formatNumber = (value: number, maximumFractionDigits = 1) =>
  value.toLocaleString("ru-RU", { maximumFractionDigits });
const formatGrowth = (value: number) =>
  `${value > 0 ? "+" : value < 0 ? "−" : ""}${formatNumber(Math.abs(value))}%`;
const formatRevenue = (value: number) => `${formatNumber(value)} млн ₸`;

const statusTone: Record<NicheStatus, string> = {
  check: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  test: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  seasonal: "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  restricted: "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

function SectionHeading({ number, title, deck }: { number: string; title: string; deck?: string }) {
  return (
    <header className="mb-8 border-t border-[var(--color-text)] pt-4">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">{number}</p>
      <h2 className="mt-3 max-w-[880px] break-words font-heading text-[34px] font-bold leading-[0.98] tracking-[-0.035em] md:text-[46px]">{title}</h2>
      {deck && <p className="mt-5 max-w-[760px] text-[16px] leading-[1.7] text-[var(--color-dim)] md:text-[18px]">{deck}</p>}
    </header>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="border-t border-[var(--color-border)] pt-4">
      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.13em] text-[var(--color-dim)]">{label}</p>
      <p className="mt-2 font-heading text-[34px] font-bold leading-none tracking-[-0.035em]">{value}</p>
      <p className="mt-3 text-[12px] leading-relaxed text-[var(--color-dim)]">{note}</p>
    </div>
  );
}

function ChartFrame({ children, note }: { children: React.ReactNode; note: string }) {
  return (
    <figure className="my-8 rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
      {children}
      <figcaption className="mt-5 border-t border-[var(--color-border)] pt-3 font-mono text-[10px] leading-relaxed text-[var(--color-dim)]">
        Источник: агрегированные рыночные данные, опубликованный срез июня 2026 года. {note}
      </figcaption>
    </figure>
  );
}

function StatusBadge({ status }: { status: NicheStatus }) {
  return (
    <span className={`inline-flex border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.08em] ${statusTone[status]}`}>
      {statusCopy[status].label}
    </span>
  );
}

function NicheCard({ niche }: { niche: Niche }) {
  return (
    <article className="flex h-full min-w-0 flex-col border border-[var(--color-border)] bg-[var(--color-bg)] p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <StatusBadge status={niche.status} />
        <span className="font-mono text-[10px] text-[var(--color-dim)]">#{String(niche.rank).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-5 font-heading text-[25px] font-bold leading-[1.02] tracking-[-0.025em]">{niche.name}</h3>
      <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-[var(--color-border)] py-4">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--color-dim)]">Выручка</p>
          <p className="mt-1 font-mono text-[13px] font-bold tabular-nums">{formatRevenue(niche.revenue)}</p>
        </div>
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--color-dim)]">Май→июнь</p>
          <p className={`mt-1 font-mono text-[13px] font-bold tabular-nums ${niche.growth < 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-700 dark:text-emerald-400"}`}>{formatGrowth(niche.growth)}</p>
        </div>
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--color-dim)]">Средний чек</p>
          <p className="mt-1 font-mono text-[13px] font-bold tabular-nums">{formatNumber(niche.averageCheck)} тыс. ₸</p>
        </div>
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--color-dim)]">Медиана отзывов</p>
          <p className="mt-1 font-mono text-[13px] font-bold tabular-nums">{niche.medianReviews}</p>
        </div>
      </div>
      <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--color-brand)]">{niche.season}</p>
      <p className="mt-3 text-[13px] leading-[1.65] text-[var(--color-dim)]">{niche.verdict}</p>
    </article>
  );
}

function PlainParagraph({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-[16px] leading-[1.8] text-[var(--color-dim)]">{children}</p>;
}

const redStatCopy: Record<RedStatPlacement, { kicker: string; title: string; body: string; cta: string }> = {
  top: {
    kicker: "Самостоятельная аналитика · redstat.kz",
    title: "Хотите так же проверить свою категорию?",
    body: "В RedStat вы можете сами открыть нужную нишу и посмотреть выручку, динамику, товары и продавцов. Это хороший первый шаг, если хотите быстро понять рынок до закупки.",
    cta: "Посмотреть свою категорию",
  },
  middle: {
    kicker: "Проверьте свою нишу · redstat.kz",
    title: "В списке нет вашей категории? Посмотрите её самостоятельно",
    body: "В RedStat можно сравнивать категории, изучать конкуренцию, цены и тренды. Выберите интересующую нишу и проверьте, что в ней происходит сейчас.",
    cta: "Открыть RedStat бесплатно",
  },
  end: {
    kicker: "Продолжить самостоятельно · redstat.kz",
    title: "Начните с цифр по своей категории",
    body: "Если персональное исследование пока не нужно, откройте RedStat и проведите первый анализ сами. Найдите категорию, посмотрите рынок и сохраните направления, которые хотите проверить глубже.",
    cta: "Начать анализ в RedStat",
  },
};

function RedStatCallout({ placement }: { placement: RedStatPlacement }) {
  const copy = redStatCopy[placement];
  const dark = placement === "middle";

  return (
    <aside
      data-redstat-placement={placement}
      className={dark
        ? "border-y border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-bg)]"
        : "border border-[var(--color-border)] bg-[var(--color-surface)]"}
    >
      <div className={`grid gap-5 p-5 md:grid-cols-[minmax(0,1fr)_230px] md:items-center md:gap-8 md:p-7 ${dark ? "mx-auto max-w-[1120px] lg:px-10" : ""}`}>
        <div>
          <p className={`font-mono text-[9px] font-bold uppercase tracking-[0.12em] ${dark ? "text-amber-300" : "text-[var(--color-brand)]"}`}>{copy.kicker}</p>
          <h3 className="mt-3 font-heading text-[26px] font-bold leading-[1.02] tracking-[-0.025em] md:text-[30px]">{copy.title}</h3>
          <p className={`mt-3 max-w-[720px] text-[14px] leading-[1.7] ${dark ? "opacity-75" : "text-[var(--color-dim)]"}`}>{copy.body}</p>
        </div>
        <a
          href={redStatUrl(placement)}
          target="_blank"
          rel="noopener noreferrer"
          data-redstat-cta={placement}
          className={`inline-flex min-h-14 items-center justify-center px-5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.08em] transition-colors ${
            dark
              ? "bg-[var(--color-bg)] text-[var(--color-text)] hover:bg-amber-300"
              : "bg-[var(--color-brand)] text-white hover:bg-[var(--color-text)]"
          }`}
        >
          {copy.cta} →
        </a>
      </div>
    </aside>
  );
}

const analysisFeatures = [
  ["Объём рынка", "Я покажу размер категории, её динамику и сезонность. Сразу станет понятно, перед нами большой рынок или красивая витрина без глубины."],
  ["Конкуренты", "Я разберу, кто забирает продажи, какие товары двигает вперёд и как строит ассортимент."],
  ["Товары", "Я найду позиции, которые действительно тянут категорию, и отделю устойчивый спрос от случайного всплеска."],
  ["Отзывы", "Я прочитаю, за что покупателей цепляют сильные карточки и на какие проблемы они жалуются снова и снова."],
  ["Цены", "Я разложу рынок по ценовым полкам и покажу, где продавцы уже толкаются локтями, а где ещё есть пространство."],
  ["Вывод", "Я соберу всё в понятную карту: что стоит проверять дальше, где лежат риски и чем можно отличиться."],
] as const;

function AnalysisLink({ label }: { label: string }) {
  return (
    <a
      href={PERSONAL_ANALYSIS_URL}
      target={PERSONAL_ANALYSIS_URL.startsWith("https://") ? "_blank" : undefined}
      rel={PERSONAL_ANALYSIS_URL.startsWith("https://") ? "noopener noreferrer" : undefined}
      data-personal-analysis-cta
      className="inline-flex min-h-14 items-center justify-center bg-[var(--color-text)] px-5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-bg)] transition-colors hover:bg-[var(--color-brand)]"
    >
      {label} →
    </a>
  );
}

function PersonalAnalysisOffer({ placement }: { placement: "top" | "middle" | "end" }) {
  if (placement === "top") {
    return (
      <aside className="border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:grid md:grid-cols-[minmax(0,1fr)_220px] md:items-center md:gap-8 md:p-6">
        <div>
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--color-brand)]">Персональное исследование</p>
          <h2 className="mt-3 font-heading text-[25px] font-bold leading-tight">Я разберу вашу нишу под вашу задачу, а не по готовому шаблону</h2>
          <p className="mt-3 text-[13px] leading-[1.65] text-[var(--color-dim)]">Если вы уже торгуете, я помогу оценить новую категорию. Если только планируете выходить на рынок, я покажу, что вас там ждёт.</p>
        </div>
        <div className="mt-5 md:mt-0"><AnalysisLink label="Обсудить мою нишу" /></div>
      </aside>
    );
  }

  if (placement === "middle") {
    return (
      <aside className="border-y border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-bg)]">
        <div className="mx-auto grid max-w-[1120px] gap-8 px-6 py-10 md:grid-cols-[minmax(0,1fr)_320px] md:items-end md:py-12 lg:px-10">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-amber-300">Персональное исследование</p>
            <h2 className="mt-4 max-w-[720px] font-heading text-[33px] font-bold leading-[0.98] tracking-[-0.03em] md:text-[44px]">Хотите выйти в новую категорию? Сначала я покажу, что там происходит на самом деле</h2>
            <p className="mt-5 max-w-[700px] text-[15px] leading-[1.7] opacity-75">Я разберу объём рынка, спрос, товары, цены, отзывы и продавцов. Вы увидите не общую статистику, а подробную карту категории именно под ваш вопрос.</p>
          </div>
          <div className="grid gap-3">
            <p className="font-mono text-[10px] leading-relaxed opacity-65">Для действующего продавца это способ найти новое направление. Для новичка это возможность увидеть рынок до того, как он окажется внутри.</p>
            <AnalysisLink label="Заказать исследование" />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside id="personal-analysis" className="border border-[var(--color-text)]">
      <div className="grid gap-8 p-6 md:grid-cols-[minmax(0,1fr)_260px] md:p-10">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-brand)]">Персональное исследование</p>
          <h2 className="mt-4 max-w-[680px] font-heading text-[36px] font-bold leading-[0.98] tracking-[-0.03em] md:text-[46px]">Я соберу персональное исследование вашей категории</h2>
          <p className="mt-5 max-w-[700px] text-[15px] leading-[1.7] text-[var(--color-dim)]">Сначала я разберусь, где вы находитесь и что хотите понять. Затем изучу рынок, конкурентов, товары и покупателей. В итоге вы получите не пачку цифр, а ясную картину категории и ответы на свои вопросы.</p>
        </div>
        <div className="self-end"><AnalysisLink label="Заказать исследование" /></div>
      </div>
      <div className="grid gap-px border-t border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
        {analysisFeatures.map(([title, body], index) => (
          <div key={title} className="bg-[var(--color-bg)] p-5">
            <p className="font-mono text-[9px] font-bold text-[var(--color-brand)]">0{index + 1} · {title.toUpperCase()}</p>
            <p className="mt-3 text-[13px] leading-[1.6] text-[var(--color-dim)]">{body}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function KaspiTop30JuneReport() {
  return (
    <div className="font-body text-[var(--color-text)]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col border-x border-[var(--color-border)]">
        <ReadTracker slug={SLUG} />
        <ReadingProgress />
        <SiteHeader locale="ru" />

        <main id="main-content" className="flex-1">
          <header className="border-b border-[var(--color-text)]">
            <div className="mx-auto grid max-w-[1120px] gap-10 px-6 py-12 md:grid-cols-[190px_minmax(0,1fr)] md:py-16 lg:px-10 lg:py-20">
              <aside className="order-2 border-t border-[var(--color-border)] pt-5 md:order-1 md:border-t-0 md:pt-1">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">Kaspi Market</p>
                <p className="mt-4 text-[13px] font-bold">Алмас Касымжанов</p>
                <time className="mt-2 block font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--color-dim)]">2 августа 2026</time>
                <p className="mt-4 font-mono text-[10px] text-[var(--color-dim)]">16 минут · <ViewCounter slug={SLUG} /></p>
              </aside>

              <div className="order-1 md:order-2">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">Рыночный срез · июнь 2026</p>
                <h1 className="mt-5 max-w-[900px] font-heading text-[43px] font-bold leading-[0.94] tracking-[-0.045em] sm:text-[56px] md:text-[68px] lg:text-[78px]">
                  30 ниш Kaspi: что я бы проверял к осени
                </h1>
                <p className="mt-7 max-w-[840px] text-[19px] leading-[1.5] text-[var(--color-dim)] md:text-[23px]">
                  Подписчик спросил, с каким товаром сейчас заходить на Kaspi. Я решил не гадать и посмотрел цифры. Вот что нашёл: от беговых дорожек до виброплатформ.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  <a href="#short-answer" className="border border-[var(--color-border)] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.07em] hover:border-[var(--color-text)]">Короткий ответ</a>
                  <a href="#vibro" className="border border-[var(--color-border)] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.07em] hover:border-[var(--color-text)]">Виброплатформы</a>
                  <a href="#all-30" className="border border-[var(--color-border)] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.07em] hover:border-[var(--color-text)]">Все 30 ниш</a>
                  <a href="#method" className="border border-[var(--color-border)] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.07em] hover:border-[var(--color-text)]">Как я считал</a>
                </div>
              </div>
            </div>
          </header>

          <article>
            <section className="mx-auto max-w-[760px] px-6 py-12 md:py-16">
              <p className="mb-7 font-heading text-[26px] font-bold leading-[1.2] tracking-[-0.02em]">
                Если вы пришли сюда из Telegram после моего Reels, вы по адресу. Ниже не «волшебные товары», а список ниш, которые стоит проверить подробнее.
              </p>
              <PlainParagraph>
                Вопрос «с чем заходить на Kaspi» звучит просто, но одного правильного ответа для всех нет. У кого-то есть склад и доставка крупногабаритного товара. Кто-то умеет работать с электроникой и гарантией. А кто-то только начинает и не может заморозить несколько миллионов тенге в остатках.
              </PlainParagraph>
              <PlainParagraph>
                Поэтому я сделал так: сначала отобрал категории с заметной выручкой, не слишком огромным количеством товаров и продавцов, а затем проверил рост, сезонность и отзывы. После этого красивый список заметно сократился.
              </PlainParagraph>
              <div className="my-8">
                <RedStatCallout placement="top" />
              </div>
              <div className="my-8 border-l-4 border-[var(--color-brand)] bg-[var(--color-surface)] p-5 md:p-6">
                <p className="font-heading text-[22px] font-bold leading-tight">Сразу важная оговорка</p>
                <p className="mt-3 text-[14px] leading-[1.7] text-[var(--color-dim)]">
                  Я не предлагаю воспринимать этот отчёт как команду закупать товар. С его помощью я выбираю, что проверять дальше: поставщика, маржу, доставку, возвраты, документы и тестовую партию.
                </p>
              </div>
            </section>

            <div className="mx-auto max-w-[960px] px-6 pb-12 md:pb-16">
              <PersonalAnalysisOffer placement="top" />
            </div>

            <section id="short-answer" className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="mx-auto max-w-[1120px] px-6 py-12 md:py-16 lg:px-10">
                <SectionHeading number="01 · Короткий ответ" title="Что я бы проверял в первую очередь" deck="Сначала я оставил пять ниш, которые выглядят логичнее остальных. Но даже здесь я бы не переходил к закупке, пока не проверил конкретные товары." />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                  <Metric label="Ниш в срезе" value="30" note="После первичного фильтра рынка" />
                  <Metric label="Первый shortlist" value="5" note="Для подробной проверки к осени" />
                  <Metric label="Самый большой рынок" value="414,8 млн ₸" note="Беговые дорожки в июне" />
                  <Metric label="Самый резкий рост" value="+728,9%" note="Но это летние тенты для бассейнов" />
                  <Metric label="Виброплатформы" value="62,3 млн ₸" note="Только как небольшой тест с отличием" />
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-5">
                  {firstPriorityNames.map((name, index) => {
                    const niche = niches.find((item) => item.name === name)!;
                    return (
                      <div key={name} className="border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                        <p className="font-mono text-[9px] text-[var(--color-brand)]">0{index + 1}</p>
                        <h3 className="mt-3 text-[16px] font-bold leading-[1.1]">{name}</h3>
                        <p className="mt-4 font-mono text-[12px] font-bold">{formatRevenue(niche.revenue)}</p>
                        <p className="mt-2 text-[11px] leading-relaxed text-[var(--color-dim)]">{niche.season}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-[1120px] px-6 py-12 md:py-16 lg:px-10">
              <SectionHeading number="02 · Размер рынка" title="Большая выручка ещё не означает хороший вход" deck="В первой десятке я вижу много летних и технически сложных товаров. Поэтому я никогда не выбираю нишу только по одной большой цифре." />
              <ChartFrame note="Выручка расчётная; столбики начинаются от нуля.">
                <BarChart
                  accent={ACCENT}
                  barRadius={2}
                  labelWidth={190}
                  barThickness={24}
                  gap={10}
                  header={{ title: "10 крупнейших рынков из выборки", subtitle: "Расчётная выручка за июнь 2026 · млн ₸" }}
                  data={revenueLeaders.map((niche) => ({
                    label: niche.name,
                    value: niche.revenue,
                    color: firstPriorityNames.includes(niche.name) ? ACCENT : NEUTRAL,
                    highlight: firstPriorityNames.includes(niche.name),
                  }))}
                  dataLabels={{ show: true, format: (value) => formatNumber(value) }}
                  formatValue={formatRevenue}
                  xAxisFormat={(value) => `${formatNumber(value, 0)} млн`}
                  description="Рейтинг десяти крупнейших ниш по расчётной выручке июня 2026 года"
                />
              </ChartFrame>

              <div className="mx-auto mt-10 max-w-[760px]">
                <PlainParagraph>
                  Например, садовая мебель дала <strong className="text-[var(--color-text)]">321,1 млн ₸</strong>, но исторически от августа к сентябрю категория снижалась на 42,2%. Если зайти в неё в конце лета, можно купить красивый отчёт о прошлом и склад товара на будущее лето.
                </PlainParagraph>
                <PlainParagraph>
                  Поэтому дальше я смотрю на направление рынка: растёт он прямо сейчас или уже разворачивается вниз.
                </PlainParagraph>
              </div>

              <ChartFrame note="Показаны только кандидаты из групп «проверить сейчас» и «небольшой тест».">
                <BarChart
                  accent={ACCENT}
                  barRadius={2}
                  labelWidth={190}
                  barThickness={22}
                  gap={9}
                  header={{ title: "Кандидаты движутся в разные стороны", subtitle: "Изменение выручки от майского среза к июньскому" }}
                  data={candidates.map((niche) => ({
                    label: niche.name,
                    value: niche.growth,
                    color: niche.name === "Виброплатформы" ? "#f59e0b" : undefined,
                    highlight: niche.name === "Виброплатформы",
                    note: niche.name === "Виброплатформы" ? "проверить причину" : undefined,
                  }))}
                  dataLabels={{ show: true, format: formatGrowth }}
                  formatValue={(value) => formatGrowth(value)}
                  xAxisFormat={(value) => formatGrowth(value)}
                  description="Изменение выручки кандидатов между майским и июньским срезами"
                />
              </ChartFrame>
            </section>

            <section id="vibro" className="border-y border-[var(--color-border)] bg-[var(--color-text)] text-[var(--color-bg)]">
              <div className="mx-auto grid min-w-0 max-w-[1120px] gap-10 px-6 py-12 md:grid-cols-[minmax(0,1fr)_360px] md:py-16 lg:px-10">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300">Отдельно про видео</p>
                  <h2 className="mt-4 max-w-[720px] break-words font-heading text-[32px] font-bold leading-[0.98] tracking-[-0.035em] sm:text-[38px] md:text-[52px]">Виброплатформы в отчёте остаются</h2>
                  <p className="mt-6 max-w-[720px] text-[17px] leading-[1.7] opacity-80">
                    На видео я называю их одним из вариантов, и это корректно. Здесь есть рынок и заметная доля товаров без указанного бренда. Но я не советую просто привезти ещё одну такую же модель.
                  </p>
                  <p className="mt-5 max-w-[720px] text-[17px] leading-[1.7] opacity-80">
                    Возможность я вижу в новинке, полезной функции, лучшей комплектации, понятной инструкции или сервисе. Из-за снижения рынка и сильных карточек конкурентов начинал бы только с маленькой партии.
                  </p>
                </div>
                <div className="grid min-w-0 grid-cols-2 gap-px self-start bg-white/20">
                  {[
                    ["Выручка", formatRevenue(vibro.revenue)],
                    ["Заказы", formatNumber(vibro.orders, 0)],
                    ["Средний чек", `${formatNumber(vibro.averageCheck)} тыс. ₸`],
                    ["Активные SKU", String(vibro.activeSku)],
                    ["Продавцы", String(vibro.sellers)],
                    ["Без бренда", `${formatNumber(vibro.unbrandedShare)}%`],
                  ].map(([label, value]) => (
                    <div key={label} className="min-w-0 bg-[var(--color-text)] p-4">
                      <p className="font-mono text-[8px] uppercase tracking-[0.08em] opacity-55">{label}</p>
                      <p className="mt-2 font-mono text-[15px] font-bold tabular-nums">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-[1120px] px-6 py-12 md:py-16 lg:px-10">
              <SectionHeading number="03 · Отзывы" title="Отзывы показывают, насколько трудно карточке без истории" deck="Я не придумывал жалобы покупателей: текстовых отзывов для честного массового вывода здесь недостаточно. Вместо этого я смотрю на количество отзывов и на то, получают ли выручку карточки без накопленной истории." />
              <ChartFrame note="Это доля денег, а не доля количества карточек. Остаток до 100% приходится на карточки с 10 отзывами и больше.">
                <BarChart
                  accent={ACCENT}
                  barRadius={2}
                  labelWidth={190}
                  barThickness={22}
                  gap={9}
                  header={{ title: "Где карточки без накопленной истории получают выручку", subtitle: "Доля выручки у активных SKU с 0-9 отзывами" }}
                  data={reviewExamples.map((niche) => ({
                    label: niche.name,
                    value: niche.lowReviewRevenueShare,
                    color: niche.name === "Виброплатформы" ? "#f59e0b" : undefined,
                    highlight: niche.name === "Виброплатформы",
                  }))}
                  dataLabels={{ show: true, format: (value) => `${formatNumber(value)}%` }}
                  formatValue={(value) => `${formatNumber(value)}%`}
                  xAxisFormat={(value) => `${formatNumber(value, 0)}%`}
                  xAxis={{ max: 100, title: "Доля выручки категории" }}
                  description="Доля выручки активных карточек с числом отзывов от нуля до девяти в выбранных нишах. Остальная выручка приходится на карточки с десятью отзывами и больше."
                />
              </ChartFrame>

              <div className="mx-auto mt-8 max-w-[900px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:p-7">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-brand)]">Как читать каждый столбец</p>
                <p className="mt-3 max-w-[760px] text-[14px] leading-[1.7] text-[var(--color-dim)]">
                  За 100% я беру всю выручку категории за июнь. Цветной столбец показывает, сколько из этих денег получили активные карточки с 0-9 отзывами. Всё, что осталось до 100%, получили карточки с 10 отзывами и больше. Само число отзывов не показывает дату создания карточки, поэтому 0-9 отзывов я использую только как признак небольшой накопленной истории.
                </p>
                <div className="mt-6 grid gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
                  {reviewExamples.map((niche) => {
                    const establishedShare = 100 - niche.lowReviewRevenueShare;
                    return (
                      <div key={niche.name} className="bg-[var(--color-bg)] p-4">
                        <h3 className="min-h-[2.6em] font-heading text-[17px] font-bold leading-[1.3]">{niche.name}</h3>
                        <p className="mt-4 font-mono text-[12px] leading-[1.65]">
                          <span className="font-bold text-[var(--color-brand)]">{formatNumber(niche.lowReviewRevenueShare)}%</span> выручки: карточки с 0-9 отзывами
                        </p>
                        <p className="mt-2 font-mono text-[12px] leading-[1.65] text-[var(--color-dim)]">
                          <span className="font-bold text-[var(--color-text)]">{formatNumber(establishedShare)}%</span> выручки: карточки с 10 отзывами и больше
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-5 text-[13px] leading-[1.7] text-[var(--color-dim)]">
                  Например, 53,1% у ванн означает: из каждых 100 ₸ выручки 53,1 ₸ получили карточки с 0-9 отзывами, остальные 46,9 ₸ получили карточки с 10 отзывами и больше.
                </p>
              </div>

              <div className="mx-auto mt-10 grid max-w-[900px] gap-4 md:grid-cols-2">
                {[
                  ["Медиана отзывов", "Если медиана равна 31, это значит: у половины продающихся карточек не больше 31 отзыва, у второй половины не меньше."],
                  ["Выручка карточек с 0-9 отзывами", "Показывает, могут ли карточки без длинной истории уже получать продажи. Остаток до 100% относится к карточкам с 10 отзывами и больше. Это полезный сигнал, но не гарантия лёгкого входа."],
                  ["Активный SKU", "Это конкретный товар, по которому в выбранном периоде были продажи. Просто созданные и никому не нужные карточки сюда не входят."],
                  ["Без бренда", "Это доля выручки товаров, у которых бренд не указан. Она не даёт права копировать чужой товар и не означает отсутствие конкуренции."],
                ].map(([term, explanation]) => (
                  <div key={term} className="border-t border-[var(--color-border)] pt-4">
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.06em]">{term}</h3>
                    <p className="mt-3 text-[13px] leading-[1.7] text-[var(--color-dim)]">{explanation}</p>
                  </div>
                ))}
              </div>
            </section>

            <RedStatCallout placement="middle" />

            <PersonalAnalysisOffer placement="middle" />

            <section id="all-30" className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="mx-auto max-w-[1120px] px-6 py-12 md:py-16 lg:px-10">
                <SectionHeading number="04 · Все 30 ниш" title="Мой вывод по каждой категории" deck="Я разделил список на четыре группы. Так проще понять, что проверять сейчас, где ограничиться тестом, а что отложить." />

                {statusOrder.map((status, groupIndex) => {
                  const group = niches.filter((niche) => niche.status === status);
                  return (
                    <section key={status} className={groupIndex === 0 ? "" : "mt-16"}>
                      <div className="mb-7 grid gap-4 border-t border-[var(--color-text)] pt-4 md:grid-cols-[260px_minmax(0,1fr)]">
                        <div><StatusBadge status={status} /></div>
                        <div>
                          <h2 className="font-heading text-[30px] font-bold leading-none tracking-[-0.025em]">{statusCopy[status].title}</h2>
                          <p className="mt-3 max-w-[720px] text-[14px] leading-[1.7] text-[var(--color-dim)]">{statusCopy[status].description}</p>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {group.map((niche) => <NicheCard key={niche.name} niche={niche} />)}
                      </div>
                    </section>
                  );
                })}
              </div>
            </section>

            <section className="mx-auto max-w-[1120px] px-6 py-12 md:py-16 lg:px-10">
              <SectionHeading number="05 · Все цифры" title="Таблица для самостоятельной проверки" deck="Если хотите сравнить ниши по одному показателю, здесь собраны все исходные цифры. На телефоне таблицу можно прокручивать вбок." />
              <DataTable
                columns={[
                  { header: "Ниша", align: "left", mono: false },
                  { header: "Выручка" },
                  { header: "Май→июнь", type: "delta" },
                  { header: "Заказы" },
                  { header: "Ср. чек" },
                  { header: "SKU" },
                  { header: "Продавцы" },
                  { header: "Без бренда" },
                  { header: "0-9 отзывов" },
                ]}
                rows={niches.map((niche) => [
                  niche.name,
                  `${formatNumber(niche.revenue)} млн ₸`,
                  niche.growth,
                  formatNumber(niche.orders, 0),
                  `${formatNumber(niche.averageCheck)} тыс. ₸`,
                  niche.activeSku,
                  niche.sellers,
                  `${formatNumber(niche.unbrandedShare)}%`,
                  `${formatNumber(niche.lowReviewRevenueShare)}%`,
                ])}
                caption="Показатели расчётные и нужны для сравнения категорий, а не для бухгалтерской сверки."
                source="Агрегированные рыночные данные · июнь 2026"
              />
            </section>

            <section id="method" className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="mx-auto max-w-[960px] px-6 py-12 md:py-16">
                <SectionHeading number="06 · Что делать дальше" title="Как я бы проверял нишу перед закупкой" />
                <div className="grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2">
                  {[
                    ["1", "Выбрать 5-10 конкретных товаров", "Я сравню цену, продажи, продавцов, рейтинг и характеристики. Категория помогает сориентироваться, но деньги зарабатывает конкретный товар."],
                    ["2", "Посчитать все расходы", "Закупка, доставка, комиссия, упаковка, реклама, возвраты, гарантия, налоги и деньги, которые будут лежать в остатках."],
                    ["3", "Прочитать отрицательные отзывы", "Я посмотрю свежие отзывы на 1-3 звезды у лидеров по выручке и найду повторяющиеся проблемы, а не одну случайную жалобу."],
                    ["4", "Запустить маленький тест", "Я начну с одной-трёх моделей и ограниченной партии. До старта задам условия остановки по марже, возвратам и сроку продажи."],
                  ].map(([number, title, body]) => (
                    <div key={number} className="bg-[var(--color-bg)] p-6 md:p-8">
                      <p className="font-mono text-[11px] font-bold text-[var(--color-brand)]">ШАГ {number}</p>
                      <h3 className="mt-4 font-heading text-[25px] font-bold leading-tight">{title}</h3>
                      <p className="mt-4 text-[14px] leading-[1.7] text-[var(--color-dim)]">{body}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 border-t border-[var(--color-border)] pt-8">
                  <h3 className="font-heading text-[30px] font-bold tracking-tight">Как я считал</h3>
                  <div className="mt-5 space-y-4 text-[14px] leading-[1.75] text-[var(--color-dim)]">
                    <p>Я взял опубликованный сопоставимый срез июня 2026 года и оставил конечные категории с выручкой от 50 млн ₸, от 10 до 300 активных SKU, от 3 до 100 продавцов и ненулевой выручкой у товаров без указанного бренда.</p>
                    <p>В Reels я использовал более строгий порог: от 10% безбрендовой выручки. Для расширенного списка из 30 ниш я ослабил только этот порог до ненулевой доли, после чего отдельно проверил динамику, сезонность и отзывы.</p>
                    <p>Рост сравнивает сопоставимые майский и июньский периоды. Сезонность показывает, как категория вела себя по полным месяцам 2025 года. Это ориентир, а не обещание, что рынок повторит прошлый год.</p>
                    <p>Данных текстовых отзывов по всем 30 нишам недостаточно, чтобы честно назвать массовые жалобы. Поэтому я не стал их придумывать и использовал только количественные показатели отзывов.</p>
                  </div>

                  <div className="mt-8 grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2">
                    {[
                      ["Средний чек", "Выручка категории ÷ количество заказов. Считается до округления показанных на странице цифр."],
                      ["Рост май→июнь", "(Выручка июня ÷ выручка мая − 1) × 100%. Сравниваются одинаковые по логике месячные срезы."],
                      ["Доля без бренда", "Выручка товаров без указанного бренда ÷ вся выручка категории × 100%. Это доля денег, а не доля карточек."],
                      ["Доля карточек с <10 отзывами", "Выручка активных SKU, у которых меньше 10 отзывов, ÷ вся выручка категории × 100%."],
                      ["Медиана отзывов", "Я беру серединное значение: у половины активных SKU отзывов не больше этого числа, у второй половины не меньше."],
                      ["Активные SKU и продавцы", "Считаются только товары и продавцы с зафиксированными продажами в выбранном периоде."],
                    ].map(([title, formula]) => (
                      <div key={title} className="bg-[var(--color-bg)] p-5">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.07em] text-[var(--color-brand)]">{title}</p>
                        <p className="mt-3 text-[13px] leading-[1.65] text-[var(--color-dim)]">{formula}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 font-mono text-[9px] leading-relaxed text-[var(--color-dim)]">
                    Почему видимое деление иногда отличается на десятые: на странице я округляю выручку до 0,1 млн ₸, а средний чек считаю раньше по полному значению. В расчёте я использую точное число, не сокращённую подпись.
                  </p>
                </div>

                <div className="mt-10 border border-[var(--color-border)] p-6 md:p-8">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-brand)]">Ограничения</p>
                  <ul className="mt-5 grid gap-3 text-[13px] leading-[1.65] text-[var(--color-dim)] md:grid-cols-2 md:gap-x-8">
                    <li>Цифры расчётные и нужны для сравнения ниш.</li>
                    <li>Для июня я использовал опубликованный месячный срез примерно за четыре недели.</li>
                    <li>Неполный июльский период я не использовал.</li>
                    <li>Спрос не подтверждает маржинальность и наличие поставщика.</li>
                    <li>Высокая доля товаров без бренда не отменяет права на товарные знаки.</li>
                    <li>Технические и регулируемые товары требуют отдельной проверки.</li>
                  </ul>
                  <p className="mt-6 border-t border-[var(--color-border)] pt-4 font-mono text-[9px] leading-relaxed text-[var(--color-dim)]">
                    Я выпускаю Kaspi Market как независимый редакционный проект Kasymzhanov. Проект не связан с Kaspi.kz и не является официальным продуктом компании.
                  </p>
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-[960px] px-6 py-12 md:py-16">
              <PersonalAnalysisOffer placement="end" />

              <div className="mt-8">
                <RedStatCallout placement="end" />
              </div>

              <div className="mt-12">
                <NewsletterCard source="kaspi-top-30-june-2026" locale="ru" />
              </div>

              <div className="mt-8 text-center">
                <Link href="/kaspi" className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-dim)] hover:text-[var(--color-brand)]">← Все материалы Kaspi Market</Link>
              </div>
            </section>
          </article>
        </main>

        <AuthorBlock variant="horizontal" locale="ru" />
        <SiteFooter locale="ru" />
      </div>
    </div>
  );
}
