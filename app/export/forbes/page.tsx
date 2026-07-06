"use client";

/**
 * Forbes Kazakhstan — static chart export sheet for «Кризис по канистре».
 *
 * Renders each figure on a FORCED LIGHT theme in Geist, at a fixed pixel size,
 * so Playwright can screenshot each `[data-fig]` element at 2× → 2400px PNG.
 * Static export = no tooltips, so EVERY value/metric is printed on the chart
 * (direct labels, dataLabels, written-out annotations) — and nothing overlaps.
 * Kaspi data source = Redstat only. Brock UI / Tufte canon, reusing the blog
 * chart components (Line/Column). Not linked from nav.
 */

import type { CSSProperties } from "react";
import { LineChart } from "@/components/charts/line-chart";
import { ColumnChart } from "@/components/charts/column-chart";

/* ── Forced light palette + Geist (independent of the site theme toggle) ── */
const LIGHT = {
  "--color-bg": "#ffffff",
  "--color-surface": "#ffffff",
  "--color-text": "#171717",
  "--color-dim": "#666666",
  "--color-border": "#e5e5e5",
  "--color-brand": "#242ef7",
  "--background": "#ffffff",
  "--foreground": "#171717",
  "--muted-foreground": "#666666",
  "--border": "#e5e5e5",
  "--brock-accent": "#f54900",
  "--brock-neutral": "#a6a6a6",
  fontFamily: "var(--font-geist), system-ui, -apple-system, sans-serif",
  background: "#ffffff",
  color: "#171717",
} as CSSProperties;

const ACCENT = "var(--brock-accent)";
const NEUTRAL = "var(--brock-neutral)";
const TEXT = "#171717";
const DIM = "#666666";
const num = (v: number) => v.toLocaleString("ru-RU");

/* Daily labels 01.03 … 27.06 (119 days). */
const DAY_LABELS: string[] = (() => {
  const out: string[] = [];
  const d = new Date(2026, 2, 1);
  for (let i = 0; i < 119; i++) {
    out.push(`${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}`);
    d.setDate(d.getDate() + 1);
  }
  return out;
})();

const ORDERS_2026 = [
  297, 325, 248, 279, 269, 256, 279, 255, 245, 277, 272, 271, 322, 323, 302, 281, 334, 323, 389, 375, 354, 321, 275, 335, 348, 279, 293, 327, 327, 337, 366,
  373, 463, 536, 514, 557, 551, 615, 594, 594, 606, 604, 553, 580, 641, 697, 895, 813, 597, 725, 708, 582, 437, 453, 397, 491, 461, 369, 465, 409, 519,
  577, 681, 709, 656, 696, 840, 582, 604, 429, 463, 536, 557, 582, 532, 508, 449, 597, 623, 617, 625, 501, 585, 536, 689, 700, 576, 647, 629, 658, 721, 1104,
  1043, 973, 916, 884, 807, 622, 788, 894, 840, 752, 699, 685, 796, 978, 967, 1103, 807, 658, 676, 857, 1018, 1123, 1427, 1220, 1110, 1013, 830,
];
const ORDERS_2025 = [
  160, 144, 195, 205, 179, 176, 186, 147, 210, 242, 229, 256, 212, 230, 236, 255, 254, 204, 238, 241, 266, 242, 261, 321, 260, 254, 252, 273, 361, 323, 324,
  307, 316, 297, 251, 186, 226, 251, 238, 249, 274, 260, 251, 286, 325, 363, 328, 328, 310, 301, 316, 420, 403, 380, 348, 395, 409, 404, 385, 422, 445,
  448, 438, 476, 513, 498, 522, 386, 399, 289, 379, 372, 361, 425, 368, 350, 291, 283, 326, 349, 362, 373, 467, 475, 467, 465, 392, 396, 426, 455, 441, 522,
  564, 539, 485, 591, 553, 491, 470, 518, 419, 408, 514, 529, 501, 465, 543, 503, 569, 553, 550, 449, 444, 436, 435, 470, 503, 407, 424,
];

/* June slice (index 92 = 01.06) for FIG-04 left panel. */
const JUNE = 92;
const JUNE_2026 = ORDERS_2026.slice(JUNE);
const JUNE_2025 = ORDERS_2025.slice(JUNE);
const JUNE_LABELS = DAY_LABELS.slice(JUNE);

/* ── Figure frame: title + optional subtitle + chart + source line ── */
function Fig({
  id,
  w,
  h,
  title,
  subtitle,
  source,
  children,
}: {
  id: string;
  w: number;
  h: number;
  title: string;
  subtitle?: string;
  source: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      data-fig={id}
      style={{
        width: w,
        height: h,
        background: "#ffffff",
        padding: "34px 40px 20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        margin: 0,
      }}
    >
      <h2 style={{ fontSize: 27, lineHeight: 1.18, fontWeight: 700, color: TEXT, margin: 0, letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      {subtitle && <p style={{ fontSize: 15, color: DIM, margin: "8px 0 0" }}>{subtitle}</p>}
      <div style={{ flex: 1, position: "relative", marginTop: 18, minHeight: 0 }}>{children}</div>
      <p style={{ fontSize: 13, color: DIM, margin: "12px 0 0", borderTop: "1px solid #e5e5e5", paddingTop: 10 }}>
        Источник: {source} · График: Алмас Касымжанов / Brock UI
      </p>
    </figure>
  );
}

/* Static annotation callout — placed only in EMPTY chart space (never on marks). */
function Callout({
  style,
  children,
  accent = false,
}: {
  style: CSSProperties;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        fontSize: 14,
        lineHeight: 1.35,
        color: TEXT,
        background: "#ffffff",
        border: `1px solid ${accent ? "#f54900" : "#e5e5e5"}`,
        borderLeft: `3px solid ${accent ? "#f54900" : "#a6a6a6"}`,
        padding: "8px 11px",
        borderRadius: 3,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function ForbesExport() {
  return (
    <div style={{ ...LIGHT, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 48, padding: 40 }}>
      {/* ─────────── FIG-01. Дневная кривая ─────────── */}
      <Fig
        id="fig01"
        w={1200}
        h={750}
        title="Канистры взлетели в день, когда запретили топливо"
        source="MPStats (Wildberries)"
      >
        <LineChart
          height={560}
          lineWidth={2.5}
          markers="none"
          directLabels
          xScale="point"
          x={DAY_LABELS}
          data={[
            { name: "2026", data: ORDERS_2026, emphasis: true },
            { name: "2025", data: ORDERS_2025, color: NEUTRAL, dashed: true },
          ]}
          bands={[{ from: "20.06", to: "22.06" }]}
          events={[{ x: "23.06" }]}
          xAxis={{ ticks: 7 }}
          yAxis={{ title: "заказов в день", max: 1700 }}
          formatValue={(v: number) => num(Math.round(v))}
        />
        <Callout accent style={{ top: 2, right: 285, textAlign: "right", maxWidth: 275 }}>
          <b>Пик 23 июня — 1 427</b>
          <br />
          +228% год к году
          <br />
          <span style={{ color: DIM }}>сразу после запрета топлива 20–22.06; в 2025-м в этот день — 435</span>
        </Callout>
      </Fig>

      {/* ─────────── FIG-02. Сезонный контроль ─────────── */}
      <Fig
        id="fig02"
        w={1200}
        h={900}
        title="Сезон объясняет половину роста. Вторую половину объясняет страх"
        subtitle="Во сколько раз вырос спрос на канистры с марта по конец июня"
        source="MPStats (Wildberries)"
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ width: 640, margin: "0 auto", flex: 1, minHeight: 0 }}>
            <ColumnChart
              height={660}
              barRadius={3}
              data={[
                { label: "2025", value: 1.88, color: NEUTRAL },
                { label: "2026", value: 3.51 },
              ]}
              yAxis={{ max: 4 }}
              xAxis={{ hideTicks: true }}
              slots={{ tooltip: () => null }}
              dataLabels={{
                show: true,
                format: (v: number) => `×${v.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              }}
              formatValue={(v: number) => `×${v.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            />
          </div>
          <div style={{ width: 640, margin: "16px auto 0", display: "flex" }}>
            <div style={{ flex: 1, textAlign: "center", padding: "0 12px" }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: TEXT }}>2025 · ×1,88</div>
              <div style={{ fontSize: 14, color: DIM, marginTop: 2 }}>обычная летняя сезонность</div>
            </div>
            <div style={{ flex: 1, textAlign: "center", padding: "0 12px" }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: ACCENT }}>2026 · ×3,51</div>
              <div style={{ fontSize: 14, color: DIM, marginTop: 2 }}>почти вдвое выше нормы — избыток и есть паника</div>
            </div>
          </div>
        </div>
      </Fig>

      {/* ─────────── FIG-04. Россия vs Казахстан ─────────── */}
      <Fig
        id="fig04"
        w={1280}
        h={780}
        title="В России канистра стала прибором страха. В Казахстане осталась канистрой"
        source="MPStats (Wildberries) · Redstat (Kaspi)"
      >
        <div style={{ display: "flex", gap: 48, height: "100%" }}>
          {/* Left — Russia daily June */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: TEXT, margin: "0 0 2px" }}>
              Россия · дневные заказы, июнь
            </p>
            <p style={{ fontSize: 14, color: ACCENT, fontWeight: 600, margin: "0 0 10px" }}>
              резкий пик 23 июня — 1 427 заказов
            </p>
            <div style={{ flex: 1, minHeight: 0 }}>
              <LineChart
                height={460}
                lineWidth={2.5}
                markers="none"
                directLabels
                xScale="point"
                x={JUNE_LABELS}
                data={[
                  { name: "2026", data: JUNE_2026, emphasis: true },
                  { name: "2025", data: JUNE_2025, color: NEUTRAL, dashed: true },
                ]}
                bands={[{ from: "20.06", to: "22.06" }]}
                xAxis={{ ticks: 5 }}
                yAxis={{ max: 1700 }}
                formatValue={(v: number) => num(Math.round(v))}
              />
            </div>
          </div>
          {/* Right — Kazakhstan monthly */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: TEXT, margin: "0 0 2px" }}>
              Казахстан · заказы по месяцам (Kaspi)
            </p>
            <p style={{ fontSize: 14, color: DIM, fontWeight: 600, margin: "0 0 10px" }}>
              ровная сезонность — без дня-аномалии
            </p>
            <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
              <ColumnChart
                height={460}
                barRadius={2}
                data={[
                  { label: "Дек", value: 1452, color: NEUTRAL },
                  { label: "Янв", value: 1432, color: NEUTRAL },
                  { label: "Фев", value: 1145, color: NEUTRAL },
                  { label: "Мар", value: 1671, color: NEUTRAL },
                  { label: "Апр", value: 1868, color: NEUTRAL },
                  { label: "Май", value: 1976, color: NEUTRAL },
                ]}
                yAxis={{ max: 2300 }}
                slots={{ tooltip: () => null }}
                dataLabels={{ show: true, format: (v: number) => num(v) }}
                formatValue={(v: number) => num(v)}
              />
              <div
                style={{
                  position: "absolute",
                  top: 6,
                  left: 58,
                  maxWidth: 250,
                  fontSize: 13.5,
                  lineHeight: 1.35,
                  color: TEXT,
                  background: "#ffffff",
                  border: "1px dashed #a6a6a6",
                  padding: "7px 10px",
                  borderRadius: 3,
                }}
              >
                <b>1–15 июня: 1 092 продажи</b>
                <br />
                +14% к маю — сезонность ровная
                <br />
                <span style={{ color: DIM }}>неполный месяц, показан отдельно</span>
              </div>
            </div>
          </div>
        </div>
      </Fig>

      {/* ─────────── FIG-05. Ценовой арбитраж ─────────── */}
      <Fig
        id="fig05"
        w={1200}
        h={750}
        title="Кризис развёл цены соседних рынков"
        subtitle="Та же 20-литровая пластиковая канистра, ₽"
        source="MPStats (Wildberries) · Redstat (Kaspi) · курс ЦБ РФ 0,159 ₽/₸"
      >
        <LineChart
          height={520}
          lineWidth={3}
          markers="always"
          directLabels
          xScale="point"
          x={["Обычное время", "Кризис (июнь)"]}
          data={[
            { name: "Россия (Wildberries)", data: [1220, 2400], emphasis: true },
            { name: "Казахстан (Kaspi)", data: [780, 780], color: NEUTRAL, dashed: true },
          ]}
          yAxis={{ max: 2700, min: 0 }}
          formatValue={(v: number) => `${num(Math.round(v))} ₽`}
        />
        <Callout style={{ top: 200, left: 120 }}>
          Россия: <b>1 220 ₽</b>
        </Callout>
        <Callout accent style={{ top: 18, right: 130, textAlign: "right" }}>
          Россия: <b>2 400 ₽</b>
        </Callout>
        <Callout style={{ bottom: 92, left: 120 }}>
          Казахстан: <b>780 ₽</b> (4 900 ₸)
        </Callout>
        <Callout accent style={{ top: 250, right: 250, textAlign: "center" }}>
          <b>разрыв ×1,5 → ×3</b>
        </Callout>
      </Fig>

      {/* ─────────── FIG-03. Золотая лихорадка (опционально) ─────────── */}
      <Fig
        id="fig03"
        w={1200}
        h={700}
        title="Золотая лихорадка: прибежали тысячи — заработали единицы"
        subtitle="Категория «Ёмкости для масел и горючего», июнь 2026 (очищено от ценовых аномалий)"
        source="MPStats (Wildberries)"
      >
        <div style={{ display: "flex", gap: 32, height: "100%" }}>
          <div style={{ flex: 1, border: "1px solid #e5e5e5", borderLeft: "3px solid #a6a6a6", borderRadius: 4, padding: "26px 30px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: 16, color: DIM, margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>Прибежали</p>
            <p style={{ fontSize: 62, fontWeight: 700, color: TEXT, margin: "6px 0 2px", lineHeight: 1 }}>13 981</p>
            <p style={{ fontSize: 17, color: TEXT, margin: "10px 0 0", lineHeight: 1.5 }}>новых карточек за июнь — около 466 в день.</p>
            <p style={{ fontSize: 17, color: DIM, margin: "12px 0 0", lineHeight: 1.5 }}>
              Продажа случилась лишь у <b style={{ color: TEXT }}>3,07%</b> из них; их доля заказов — 1,8%. К концу месяца{" "}
              <b style={{ color: TEXT }}>95%</b> продававшихся карточек стояли с нулевым остатком.
            </p>
          </div>
          <div style={{ flex: 1, border: "1px solid #f54900", borderLeft: "3px solid #f54900", borderRadius: 4, padding: "26px 30px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: 16, color: "#f54900", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>Заработали</p>
            <p style={{ fontSize: 62, fontWeight: 700, color: TEXT, margin: "6px 0 2px", lineHeight: 1 }}>2 карточки</p>
            <p style={{ fontSize: 17, color: TEXT, margin: "10px 0 0", lineHeight: 1.5 }}>
              алюминиевые 10 л и 20 л от одного продавца: 6 253 заказа, 24,8 млн ₽ — <b>16,9%</b> выручки среза.
            </p>
            <p style={{ fontSize: 17, color: DIM, margin: "12px 0 0", lineHeight: 1.5 }}>
              Топ-10 карточек забрали <b style={{ color: TEXT }}>31,5%</b> выручки. Сливки снял тот, у кого был товар на складе.
            </p>
          </div>
        </div>
      </Fig>
    </div>
  );
}
