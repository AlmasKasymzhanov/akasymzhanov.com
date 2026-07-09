"use client";

/**
 * Carousel slide factory for the freedom-market investigation — the
 * BI/Bloomberg Instagram anatomy on our own design system: the site's
 * masthead, Hack mono, entity colours and real Brock UI charts. Each slide
 * is a fixed 1080×1350 (4:5) frame; Playwright screenshots the elements by
 * id (#slide-1 … #slide-11) in the dark theme.
 *
 * Data-storytelling rules baked in: every slide stands alone — the reader
 * only flips images, nobody narrates. So each slide answers who/what/when
 * by itself: kicker = context, headline = takeaway (never a topic), named
 * actors, plain-language numbers, source + legal hedges on slides that can
 * travel without the deck.
 */

import Image from "next/image";
import { Masthead } from "@/components/canon/masthead";
import { ColumnChart } from "@/components/charts/column-chart";
import { Coin } from "@/components/charts/tenge-journey";

const pct = (v: number) => `${v.toLocaleString("ru-RU")}%`;
const NEUTRAL = "var(--brock-neutral)";
const TOTAL = 11;

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

/* ── 1 · cover ── */
function S1() {
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
      <Dek mt={28}>Freedom Тимура Турлова тихо перезапускает мёртвый Teez - против Kaspi. Листайте →</Dek>
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
    </Slide>
  );
}

/* ── 4 · exclusive I: the commission ladder ── */
function S4() {
  return (
    <Slide
      id="slide-4"
      n={4}
      kicker="Эксклюзив 1/2"
      source="Условия Freedom Market для первых партнёров, июль 2026. Этой таблицы нет ни у одного СМИ"
    >
      <H size={60}>
        Комиссии компании, которой нет: 5% за карту, 14% за длинную рассрочку.
      </H>
      <Dek mt={24}>Комиссия - доля с каждой продажи, которую продавец отдаёт площадке. Зависит от того, как заплатил покупатель:</Dek>
      <div className="mt-8" style={{ width: 904, height: 730 }}>
        <div style={{ width: 452, transform: "scale(2)", transformOrigin: "top left" }}>
          <ColumnChart
            height={320}
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
    </Slide>
  );
}

/* ── 5 · exclusive II: the arithmetic behind the ladder ── */
function S5() {
  return (
    <Slide
      id="slide-5"
      n={5}
      kicker="Эксклюзив 2/2"
      source="Оценка автора: фондирование 24-месячной рассрочки по ставкам розничных депозитов (13-15% годовых)"
    >
      <H size={60}>
        За два года рассрочки продавец доплатит 9% от чека. Банку эти два года стоят 14–16%.
      </H>
      <div className="mt-14 space-y-8 text-[32px] leading-relaxed" style={{ color: "var(--color-dim)" }}>
        <p>
          <span className="font-bold" style={{ color: "var(--color-text)" }}>14% − 5% = 9% от чека</span> - столько продавец доплачивает за 24-месячную рассрочку против оплаты картой. Один раз.
        </p>
        <p>
          А банку надо два года где-то занимать эти деньги. Даже по ставкам обычных депозитов это{" "}
          <span className="font-bold" style={{ color: "var(--viz-negative)" }}>14–16% от чека</span>.
        </p>
      </div>
      <div className="mt-14">
        <Takeaway>Либо Freedom сознательно доплачивает, чтобы переманить продавцов. Либо рассчитывает на деньги дешевле рыночных. Дальше - про вторые.</Takeaway>
      </div>
    </Slide>
  );
}

/* ── 6 · the theorem ── */
function S6() {
  const rows = [
    { name: "Teez", fate: "перестал платить продавцам - и замолчал" },
    { name: "СберМегаМаркет", fate: "−93% продаж за 2025-й" },
    { name: "KazanExpress", fate: "поглощён «Магнитом», бренда больше нет" },
  ];
  return (
    <Slide id="slide-6" n={6} kicker="Теорема" source="Data Insight · Exclusive.kz · Oborot.ru">
      <H size={72}>Маркетплейс без банка умирает.</H>
      <Dek mt={24}>Скорость и склад не спасают, если некому финансировать рассрочку. Три случая за три года:</Dek>
      <div className="mt-14 space-y-12">
        {rows.map((r) => (
          <div key={r.name} className="border-l-4 pl-8" style={{ borderColor: "var(--viz-negative)" }}>
            <p className="text-[40px] font-bold">{r.name}</p>
            <p className="text-[30px] mt-1.5" style={{ color: "var(--viz-negative)" }}>{r.fate}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* ── 7 · the proof: bank inside vs bank next door ── */
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
function S7() {
  return (
    <Slide
      id="slide-7"
      n={7}
      kicker="Доказательство"
      source="Ozon IR · Data Insight. Панели в своём масштабе: слева выручка финтеха Ozon, справа продажи маркетплейса Сбера"
    >
      <H size={56}>
        Банк внутри витрины растёт.
        <br />
        Банк по соседству - падает.
      </H>
      <div className="mt-14 flex justify-between">
        {/* Built-in x-ticks are hidden: at scale(1.7) Chromium drops random
         * truncated 10px labels; we draw our own year row at native 24px. */}
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

/* ── 8 · context: installments are Kazakhstan's second currency ── */
function S8() {
  return (
    <Slide
      id="slide-8"
      n={8}
      kicker="Контекст · Казахстан"
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
        <Takeaway>Кто научится чаще говорить покупателю «да» - тот и заберёт рынок.</Takeaway>
      </div>
    </Slide>
  );
}

/* ── 9 · the model: the tenge journey ── */
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
function S9() {
  return (
    <Slide
      id="slide-9"
      n={9}
      kicker="Модель"
      source="Авторская модель на прецедентах Mercado Fondo и Shopify Balance - не анонсированный продукт Freedom"
    >
      <H size={56}>Что происходит с тенге продавца после продажи</H>
      <div className="mt-14 space-y-16">
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
      <div className="mt-16">
        <Takeaway>Kaspi владеет временем пользователя. Freedom может владеть его капиталом.</Takeaway>
      </div>
    </Slide>
  );
}

/* ── 10 · the punchline ── */
function S10() {
  return (
    <Slide id="slide-10" n={10} kicker="Вывод">
      <H size={72}>
        Одна фигура есть только у Freedom - брокер.
      </H>
      <Dek mt={40}>
        Деньги продавцов зарабатывают каждый день - и фондируют рассрочку следующему покупателю. За деньги такая фигура не покупается: нужны сразу три лицензии - площадка, банк и брокер.
      </Dek>
      <p className="text-[56px] font-bold mt-16">
        Это шах. <span style={{ color: "var(--color-dim)" }}>Не мат.</span>
      </p>
    </Slide>
  );
}

/* ── 11 · CTA ── */
function S11() {
  return (
    <Slide id="slide-11" n={11} kicker="Полная версия">
      <H size={60}>
        Здесь - десятая часть. Остальное уже опубликовано.
      </H>
      <div className="mt-12 space-y-5 text-[31px] leading-snug" style={{ color: "var(--color-dim)" }}>
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

export default function SocialFreedomMarket() {
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
    </div>
  );
}
