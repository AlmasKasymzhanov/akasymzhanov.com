"use client";

import { useState } from "react";
import Link from "next/link";

/* ───── design tokens ───── */
const C = {
  bg: "#0a0a0f", surface: "#111119", border: "#1e1e30",
  accent: "#e8729a", green: "#00d2a0", text: "#e8e8f0",
  dim: "#999", faint: "#444", red: "#f87171", amber: "#f59e0b",
  blue: "#60a5fa", pink: "#f472b6", cyan: "#22d3ee", purple: "#a78bfa",
};

/* ───── style helpers ───── */
const sSection: React.CSSProperties = { marginBottom: 56 };
const sH2: React.CSSProperties = { fontSize: 22, fontWeight: 700, margin: "0 0 24px", color: C.text, letterSpacing: "-0.01em", borderBottom: `1px solid ${C.border}`, paddingBottom: 12 };
const sH3: React.CSSProperties = { fontSize: 16, fontWeight: 600, margin: "28px 0 12px", color: C.text };
const sP: React.CSSProperties = { fontSize: 14, lineHeight: 1.75, color: "#ccc", margin: "0 0 12px" };
const sCard: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", marginBottom: 16 };
const sBadge = (color: string): React.CSSProperties => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: `${color}18`, color, fontSize: 11, fontWeight: 600, letterSpacing: "0.03em" });

/* ───── Collapsible Section ───── */
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div id={id} style={sSection}>
      <h2 onClick={() => setOpen(!open)} style={{ ...sH2, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, userSelect: "none" }}>
        <span style={{ fontSize: 14, color: C.dim, transform: open ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", display: "inline-block" }}>&#9654;</span>
        {title}
      </h2>
      {open && children}
    </div>
  );
}

/* ───── Data Table ───── */
function DataTable({ headers, rows, highlight }: { headers: string[]; rows: (string | number)[][]; highlight?: number }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 16 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>{headers.map((h, i) => (
            <th key={i} style={{ padding: "10px 12px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 11 }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: highlight !== undefined && ri === highlight ? `${C.accent}12` : "transparent" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "10px 12px", textAlign: "left", color: ci === 0 ? C.text : "#ccc", borderBottom: `1px solid ${C.border}20`, fontWeight: ci === 0 ? 500 : 400, whiteSpace: ci === 0 ? "nowrap" : "normal" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───── MetricCard ───── */
function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ ...sCard, padding: "16px 20px", flex: 1, minWidth: 140 }}>
      <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: color || C.text }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

/* ───── Quote ───── */
function Quote({ text, rating }: { text: string; rating: number }) {
  const color = rating <= 2 ? C.red : rating === 3 ? C.amber : C.green;
  return (
    <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 14, margin: "8px 0", fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>
      <span style={{ ...sBadge(color), marginRight: 8, fontSize: 10 }}>{rating}/5</span>
      {text}
    </div>
  );
}

/* ───── Tier Badge ───── */
function Tier({ tier }: { tier: 1 | 2 | 3 | 4 | 5 }) {
  const map: Record<number, [string, string]> = { 1: [C.green, "ЛИДЕР"], 2: [C.blue, "СРЕДНИЙ"], 3: [C.amber, "СЛАБЫЙ"], 4: [C.dim, "НУЛЕВЫЕ"], 5: [C.red, "НЕТ НА KASPI"] };
  const [color, label] = map[tier];
  return <span style={sBadge(color)}>{label}</span>;
}

/* ═══════════════════════════════════════════════ */
/*                  MAIN PAGE                      */
/* ═══════════════════════════════════════════════ */
export default function KoreanCosmeticsReport() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ═══ Header ═══ */}
        <div style={{ marginBottom: 16 }}>
          <Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; akasymzhanov.com</Link>
        </div>

        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, background: `${C.accent}18`, color: C.accent, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", marginBottom: 16, textTransform: "uppercase" }}>
            Enterprise Analytics Report
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Корейская косметика<br />на Kaspi.kz
          </h1>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong> &middot; на основе данных <strong style={{ color: C.text }}>RedStat</strong>
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim, flexWrap: "wrap" }}>
            <span>Дата: <strong style={{ color: C.text }}>27 марта 2026</strong></span>
            <span>Данные: <strong style={{ color: C.text }}>73 000+ ниш, 16 мес</strong></span>
            <span>Брендов: <strong style={{ color: C.text }}>21 бренд</strong></span>
            <span>Рынок: <strong style={{ color: C.text }}>Kaspi.kz</strong></span>
          </div>
        </div>

        {/* ═══ TOC ═══ */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["sec-market", "1. Рынок Beauty на Kaspi — TAM, структура, ключевые ниши"],
            ["sec-skincare", "2. Уход за лицом — где Корея доминирует"],
            ["sec-decor", "3. Декоративная косметика — территория Sen Sulu"],
            ["sec-seasons", "4. Сезонность — когда что продавать"],
            ["sec-yoy", "5. Год к году — кто вырос, кто упал"],
            ["sec-brands", "6. Разбор 21 бренда клиента — тиры и карточки"],
            ["sec-top10", "7. Топ-10 K-beauty SKU на Kaspi"],
            ["sec-fakes", "8. Проблема подделок — масштаб и решения"],
            ["sec-prices", "9. Ценовые сегменты — где маржа, где подделки"],
            ["sec-recs", "10. Рекомендации и план действий"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", padding: "6px 0", fontSize: 13, color: C.accent, textDecoration: "none" }}>{label}</a>
          ))}
        </div>

        {/* ═══ SECTION 1: MARKET ═══ */}
        <Section id="sec-market" title="1. Рынок Beauty на Kaspi — TAM и структура">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
            <MetricCard label="TAM (агрегат 16 мес)" value="612B" sub="KZT" color={C.accent} />
            <MetricCard label="Заказов" value="198M" sub="за 16 месяцев" />
            <MetricCard label="Товаров" value="1.5M" sub="SKU" />
            <MetricCard label="Брендов" value="271K" sub="на площадке" />
          </div>
          <p style={sP}>«Красота и здоровье» — 7-я по выручке категория на Kaspi, но <strong style={{ color: C.text }}>1-я по количеству заказов</strong> (198M — больше, чем телефоны и бытовая техника).</p>

          <h3 style={sH3}>Структура рынка: L2 подкатегории</h3>
          <DataTable headers={["Подкатегория", "Выручка/мес", "% рынка", "Продавцов", "Брендов"]} rows={[
            ["Уход за лицом", "2 919M", "18.3%", "1 438", "882"],
            ["Техника для красоты", "2 221M", "13.9%", "884", "493"],
            ["Уход за волосами", "2 013M", "12.6%", "2 075", "939"],
            ["Декоративная косметика", "1 716M", "10.8%", "1 093", "587"],
            ["Парфюмерия", "1 650M", "10.3%", "404", "356"],
            ["Уход за телом", "1 012M", "6.3%", "1 311", "888"],
            ["Наборы косметики", "862M", "5.4%", "388", "242"],
          ]} />
          <p style={sP}><strong style={{ color: C.accent }}>SAM для корейской косметики:</strong> Уход за лицом (2.9B) + Декор (1.7B) + Волосы (2B) + Тело (1B) + Наборы (862M) = <strong style={{ color: C.text }}>~8.5B KZT/мес</strong></p>
        </Section>

        {/* ═══ SECTION 2: SKINCARE ═══ */}
        <Section id="sec-skincare" title="2. Уход за лицом — территория Кореи">
          <DataTable headers={["Leaf-ниша", "Выручка", "% от L2", "SKU", "Брендов"]} rows={[
            ["Кремы и сыворотки", "1 712M", "59%", "3 095", "551"],
            ["Средства для умывания", "517M", "18%", "954", "287"],
            ["Тоники, тонеры", "290M", "10%", "546", "194"],
            ["Маски для лица", "122M", "4%", "627", "170"],
            ["Снятие макияжа", "84M", "3%", "158", "64"],
            ["Скрабы и пилинги", "64M", "2%", "199", "96"],
            ["Патчи", "45M (+114% YoY!)", "2%", "182", "62"],
          ]} />

          <h3 style={sH3}>Кремы и сыворотки (1 712M) — ТОП-10 брендов</h3>
          <DataTable headers={["#", "Бренд", "Выручка", "SKU", "Заказов", "Страна"]} rows={[
            ["1", "Dr. Althea", "142M", "62", "28 901", "Корея"],
            ["2", "Bioderma", "96M", "60", "11 523", "Франция"],
            ["3", "Celimax", "89M", "74", "20 542", "Корея"],
            ["4", "MEDI-PEEL", "63M", "82", "11 701", "Корея"],
            ["5", "Skin1004", "55M", "89", "15 177", "Корея"],
            ["6", "La Roche-Posay", "55M", "37", "4 652", "Франция"],
            ["7", "ANGIOPHARM", "51M", "56", "3 571", "Россия"],
            ["8", "AXIS-Y", "47M", "43", "20 872", "Корея"],
            ["9", "Round Lab", "39M", "58", "9 947", "Корея"],
            ["10", "Без бренда", "39M", "133", "11 997", "—"],
          ]} highlight={0} />
          <p style={sP}><strong style={{ color: C.green }}>Инсайт:</strong> Корея = 5 из топ-10 в кремах. Dr. Althea <strong>сместил Bioderma с #1</strong> за последний год (рост +133% YoY).</p>

          <h3 style={sH3}>Тоники (290M) — абсолютная корейская территория</h3>
          <DataTable headers={["#", "Бренд", "Выручка", "Доля", "Страна"]} rows={[
            ["1", "Celimax", "61M", "21%", "Корея"],
            ["2", "BIDALLI", "14M", "5%", "Корея"],
            ["3", "Paula's Choice", "12M", "4%", "США"],
            ["4", "AXIS-Y", "12M", "4%", "Корея"],
            ["5", "Round Lab", "10M", "3%", "Корея"],
          ]} highlight={0} />
          <p style={sP}><strong style={{ color: C.green }}>Инсайт:</strong> 7 из 10 в тониках = Корея. Celimax — абсолютный лидер с 21% долей.</p>

          <div style={{ ...sCard, borderLeft: `3px solid ${C.cyan}` }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.cyan }}>Карта доминирования Кореи</h3>
            <div style={{ fontSize: 13, lineHeight: 1.8, color: "#ccc" }}>
              <div><span style={{ color: C.green }}>Доминирует (&gt;50%):</span> Тоники, Кремы, Умывание, Скрабы</div>
              <div><span style={{ color: C.amber }}>Присутствует (20-40%):</span> Маски, Патчи, Наборы</div>
              <div><span style={{ color: C.red }}>Слабо (&lt;10%):</span> Шампуни, Тональные, Помады, Тушь, Дезодоранты</div>
            </div>
          </div>
        </Section>

        {/* ═══ SECTION 3: DECOR ═══ */}
        <Section id="sec-decor" title="3. Декоративная косметика — территория Sen Sulu">
          <DataTable headers={["Leaf-ниша", "Выручка", "SKU", "Брендов", "#1 бренд"]} rows={[
            ["Тональные средства", "536M", "758", "170", "RoRoBell (72M)"],
            ["Помады, блески", "209M", "1 077", "153", "Sen Sulu (26M)"],
            ["Румяна, бронзеры", "203M", "500", "110", "HOURGLASS (30M)"],
            ["Тушь", "149M", "355", "84", "Loreal (23M)"],
            ["Пудры", "116M", "250", "81", "Sen Sulu (24M)"],
            ["Тени для век", "97M", "358", "96", "Sen Sulu (18M)"],
            ["Корректоры", "95M", "218", "62", "Sen Sulu (30M)"],
          ]} />

          <div style={{ ...sCard, borderTop: `3px solid ${C.pink}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px", color: C.pink }}>Sen Sulu = The Yeon — скрытый гигант</h3>
            <p style={sP}><strong>Sen Sulu — #1 в 5 из 8 категорий</strong> декоративной косметики (пудры, тени, корректоры, помады, контур). Суммарно ~135M/мес.</p>
            <p style={sP}>BB кремы The Yeon Cover Fit SPF36 продаются под Sen Sulu. Это <strong>казахстанский бренд с корейским производством</strong>.</p>
            <DataTable headers={["Категория", "Выручка", "Позиция"]} rows={[
              ["Корректоры", "30M", "#1"],
              ["Помады", "26M", "#1"],
              ["Пудры", "24M", "#1"],
              ["Тени", "18M", "#1"],
              ["Тональные", "18M", "#7"],
              ["Наборы", "127M", "#1"],
            ]} />
          </div>
        </Section>

        {/* ═══ SECTION 4: SEASONS ═══ */}
        <Section id="sec-seasons" title="4. Сезонность — когда что продавать">
          <DataTable headers={["Категория", "Янв-Фев", "Март (8М)", "Апр-Май", "Июн-Авг", "Сен-Окт", "Ноя-Дек"]} rows={[
            ["Кремы/сыворотки", "Рост", "Пик", "Ровно", "Ровно", "Ровно", "Высокий"],
            ["Тональные", "Рост", "ПИК (991M!)", "Спад", "Лето", "Рост", "Высокий"],
            ["Наборы", "Ровно", "ПИК #2 (1029M)", "Спад", "Ровно", "Рост", "ПИК #1 (1126M)"],
            ["Патчи", "Ровно", "Ровно", "Ровно", "Ровно", "Рост", "Рост"],
            ["Помады", "Дно", "Рост", "Дно", "Рост", "Высокий", "ПИК (323M)"],
            ["Румяна", "Ровно", "Ровно", "Ровно", "Пик (232M)", "Ровно", "ПИК (256M)"],
          ]} />
          <div style={{ ...sCard, borderLeft: `3px solid ${C.green}` }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.green }}>Ключевые даты для K-beauty</h3>
            <div style={{ fontSize: 13, lineHeight: 1.8, color: "#ccc" }}>
              <div><strong style={{ color: C.text }}>8 марта:</strong> Наборы (1029M), тональные (991M), кремы — пиковый месяц. Закупка за 4-6 недель.</div>
              <div><strong style={{ color: C.text }}>Kaspi Жума (ноябрь):</strong> Все категории +20-40%. Скидки решают.</div>
              <div><strong style={{ color: C.text }}>Новый год (декабрь):</strong> Наборы — ПИКОВЫЙ (1126M). Подарочные сеты = 43% выручки наборов.</div>
              <div><strong style={{ color: C.text }}>Лето:</strong> SPF-кремы, умывание, тоники — летний уход.</div>
            </div>
          </div>
        </Section>

        {/* ═══ SECTION 5: YOY ═══ */}
        <Section id="sec-yoy" title="5. Год к году — кто вырос, кто упал">
          <p style={sP}>Сравнение ноябрь-февраль 2024/25 vs 2025/26.</p>
          <DataTable headers={["Категория", "2024/25", "2025/26", "YoY рост"]} rows={[
            ["Кремы для тела", "796M", "1 603M", "+101%"],
            ["Патчи", "86M", "165M", "+92%"],
            ["Шампуни", "1 313M", "2 361M", "+80%"],
            ["Наборы", "1 890M", "3 262M", "+73%"],
            ["Румяна", "539M", "894M", "+66%"],
            ["Кремы/сыворотки", "4 069M", "6 424M", "+58%"],
            ["Тоники", "790M", "1 100M", "+39%"],
            ["Помады", "796M", "1 001M", "+26%"],
            ["Скрабы", "226M", "267M", "+18%"],
            ["Тональные", "2 083M", "2 190M", "+5%"],
          ]} highlight={0} />

          <h3 style={sH3}>Лестница брендов: кто вытеснил кого</h3>
          <DataTable headers={["Позиция", "Прошлый год", "Текущий год", "Изменение"]} rows={[
            ["#1 кремы", "Bioderma ~320M", "Dr. Althea 550M", "Сместил Bioderma!"],
            ["#2 кремы", "Dr. Althea ~240M", "Celimax ~390M", "Рост +63%"],
            ["#1 тоники", "Celimax ~76M", "Celimax 234M", "x3 за год"],
            ["#1 умывание", "Bioderma", "Bioderma (удержал)", "Round Lab #2 давит"],
          ]} />
        </Section>

        {/* ═══ SECTION 6: BRANDS ═══ */}
        <Section id="sec-brands" title="6. Разбор 21 бренда клиента">

          {/* Tier 1 */}
          <h3 style={{ ...sH3, color: C.green }}>Тир 1 — Лидеры (&gt;50M/мес)</h3>
          {[
            { name: "Celimax", rev: "~239M", cats: "Тоники #1, Скрабы #1, Кремы #3, Умывание #3, Наборы #3", sku: "Dual Barrier Toner (32M/мес)", reviews: "3 411", rating: "4.9", insight: "Абсолютный лидер тоников. Линейка Dual Barrier — системообразующая. Рост x3.2 за год.", growth: "+208% YoY" },
            { name: "Dr. Althea", rev: "~171M", cats: "Кремы #1, Умывание #8, Тоники #6, Скрабы #4", sku: "345 Relief Cream (39M/мес)", reviews: "4 900", rating: "4.9", insight: "Сместил Bioderma с #1. Но цена 1K = 50% негативов о подделках. Нужно поднять цену.", growth: "+133% YoY" },
            { name: "Skin1004", rev: "~136M", cats: "Кремы #5, Наборы #4, Умывание #4, Тоники, Маски", sku: "Madagascar Set (17M/мес)", reviews: "934", rating: "4.8", insight: "Самый широкий ассортимент (89 SKU в кремах). Madagascar Centella — узнаваемая линейка.", growth: "+83% YoY" },
            { name: "Sen Sulu (The Yeon)", rev: "~135M", cats: "Декор: Пудры #1, Корректоры #1, Тени #1, Помады #1, Наборы #1", sku: "BB Cream Cover Fit SPF36 (10M)", reviews: "914", rating: "4.9", insight: "#1 в 5 категориях декоративки. КЗ-бренд + корейское производство.", growth: "Стабильный" },
            { name: "Round Lab", rev: "~86M", cats: "Умывание #2, Кремы #9, Тоники #5", sku: "1025 Dokdo Cleanser (19M)", reviews: "7 191", rating: "4.8", insight: "Рекорд по отзывам. Но 376 негативных (5.2%) — подделки. Рост замедляется (+22% YoY).", growth: "+22% YoY" },
            { name: "AXIS-Y", rev: "~78M", cats: "Кремы #8, Тоники #4, Маски #2, Наборы #10", sku: "Dark Spot Serum (18M)", reviews: "6 796", rating: "4.8", insight: "Средний чек упал в 2 раза (4.1K → 2.3K) — демпинг. Заказы растут, выручка стагнирует.", growth: "+27% YoY" },
          ].map((b) => (
            <div key={b.name} style={sCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{b.name}</span>
                  <span style={sBadge(C.green)}>{b.rev}/мес</span>
                </div>
                <span style={sBadge(C.green)}>{b.growth}</span>
              </div>
              <div style={{ fontSize: 12, color: C.dim, marginBottom: 8 }}>{b.cats}</div>
              <div style={{ fontSize: 12, color: "#ccc", marginBottom: 8 }}>Бестселлер: <strong style={{ color: C.text }}>{b.sku}</strong> | {b.reviews} отзывов | {b.rating}</div>
              <p style={{ ...sP, fontSize: 13, margin: 0 }}>{b.insight}</p>
            </div>
          ))}

          {/* Tier 2 */}
          <h3 style={{ ...sH3, color: C.blue }}>Тир 2 — Средние (5-50M/мес)</h3>
          <DataTable headers={["Бренд", "Выручка", "Категория", "Бестселлер", "Инсайт"]} rows={[
            ["Anua", "~18M", "Кремы (сыворотки)", "Azelaic Acid Serum 5K", "PDRN и Azelaic — тренды. Средний чек выше = меньше подделок"],
            ["Mommy Care", "~15M", "Техника (массажёры)", "Микротоковый 60K", "Не косметика — другой рынок"],
            ["VT Cosmetics", "~14M", "Кремы (PDRN)", "PDRN Essence 14K", "1 негативный из 70. PDRN тренд. Высокий чек — рост потенциал"],
            ["COSRX", "~8M", "Патчи #3", "Acne Pimple Master 1K", "Глобальный #1 K-beauty, но на Kaspi только патчи! Нет Snail/BHA"],
          ]} />

          {/* Tier 3-5 */}
          <h3 style={{ ...sH3, color: C.amber }}>Тир 3-5 — Слабые, нулевые, отсутствующие</h3>
          <DataTable headers={["Бренд", "Выручка", "Статус", "Возможность"]} rows={[
            ["Mediheal", "~4M", "Патчи, скрабы", "Тканевые маски = пустая ниша (122M, лидер Китай)"],
            ["TFIT", "~2M", "Консилеры", "Нишевый, низкий потенциал"],
            ["Mizon (MIZON)", "~1M", "Green Monster набор", "Минимальные продажи"],
            ["Beplain", "<1M", "Карточки есть, 0 продаж", "Наборы Mung Bean + отзывы = 10M+ потенциал"],
            ["Skinfood", "<1M", "Карточки есть, 0 продаж", "Rice + Carrot линейки, наборы = 10M+"],
            ["Treecell", "<1M", "Масло-флюид, шампунь", "Шампуни 630M, 0 корейских лидеров!"],
            ["Moda Moda", "<1M", "Оттеночные шампуни", "Нулевые продажи на Kaspi"],
            ["Bohicare", "<1M", "SPF крем, бальзам", "Нулевые продажи"],
            ["Bueno", "0", "Нет на Kaspi", "Не представлен"],
            ["Healthy", "0", "Нет на Kaspi", "Не представлен"],
          ]} />
        </Section>

        {/* ═══ SECTION 7: TOP 10 SKU ═══ */}
        <Section id="sec-top10" title="7. Топ-10 K-beauty SKU на Kaspi">
          <DataTable headers={["#", "Товар", "Бренд", "Цена", "Rev/мес", "Отзывов", "Причина лидерства"]} rows={[
            ["1", "345 Relief Cream 50мл", "Dr. Althea", "1K", "39M", "4 900", "TikTok-вирусность, #1 крем КЗ"],
            ["2", "Dual Barrier Toner 150мл", "Celimax", "2K", "32M", "3 411", "#1 тоник, Dual Barrier линейка"],
            ["3", "Bfadation тональный 21", "RoRoBell", "13K", "30M", "590", "#1 тональное, премиум"],
            ["4", "Dual Barrier набор", "Celimax", "27K", "23M", "609", "Высокий чек набора"],
            ["5", "Bfadation тональный 23", "RoRoBell", "13K", "21M", "545", "Второй оттенок #1"],
            ["6", "1025 Dokdo Cleanser", "Round Lab", "1K", "19M", "7 191", "#1 умывалка, рекорд отзывов"],
            ["7", "Peptide 9 Emulsion", "MEDI-PEEL", "4K", "19M", "4 245", "#1 пептидная эмульсия"],
            ["8", "Dark Spot Glow Serum", "AXIS-Y", "1K", "18M", "6 796", "Сыворотка от пигментации"],
            ["9", "Madagascar Set", "Skin1004", "9K", "17M", "934", "Набор 4-5 средств Centella"],
            ["10", "Bfadation тональный 19", "RoRoBell", "16K", "16M", "85", "Новый оттенок, быстрый рост"],
          ]} />
        </Section>

        {/* ═══ SECTION 8: FAKES ═══ */}
        <Section id="sec-fakes" title="8. Проблема подделок — масштаб и решения">
          <p style={sP}>Подделки — <strong style={{ color: C.red }}>проблема #1 рынка K-beauty на Kaspi.</strong> Корреляция: чем ниже цена → тем больше подделок.</p>

          <DataTable headers={["Ценовой сегмент", "% негатива о подделках", "Бренды-жертвы"]} rows={[
            ["<2K KZT", "50%+", "Dr. Althea, Round Lab, AXIS-Y"],
            ["2-5K KZT", "25-30%", "Celimax, Skin1004"],
            ["5-10K KZT", "5-10%", "Anua, VT Cosmetics"],
            [">10K KZT", "<3%", "RoRoBell, Наборы"],
          ]} highlight={0} />

          <Quote text="Товар оказался подделкой. Упаковка и консистенция отличаются от оригинала, вызывает раздражение." rating={1} />
          <Quote text="Не ориг." rating={1} />
          <Quote text="Подделкасын салып жіберген — подделку прислали." rating={1} />

          <div style={{ ...sCard, borderLeft: `3px solid ${C.red}` }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.red }}>Корневая причина</h3>
            <p style={sP}>При цене 1K KZT за крем (Dr. Althea 345) маржа продавца = 100-200 KZT. Нет экономического смысла торговать оригиналом. Подделка обходится в 300-500 KZT → маржа x2-3.</p>
          </div>

          <div style={{ ...sCard, borderLeft: `3px solid ${C.green}` }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.green }}>Решения</h3>
            <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>
              <div>1. <strong>Не продавать дешевле 3-5K</strong> — отсекает подделочников</div>
              <div>2. <strong>QR-верификация</strong> на каждой упаковке (~$0.05/шт)</div>
              <div>3. <strong>«Авторизованный дистрибьютор»</strong> в заголовке карточки</div>
              <div>4. <strong>Фото с корейского склада</strong> в галерее</div>
              <div>5. <strong>Видео-распаковка</strong> от блогера</div>
              <div>6. <strong>Ответ на каждый негативный отзыв</strong> о подделке</div>
            </div>
          </div>
        </Section>

        {/* ═══ SECTION 9: PRICES ═══ */}
        <Section id="sec-prices" title="9. Ценовые сегменты — где маржа, где подделки">
          <h3 style={sH3}>Кремы и сыворотки (1 712M)</h3>
          <DataTable headers={["Сегмент", "Медиана", "Выручка", "Доля", "Бренд %"]} rows={[
            ["Низкий", "1K", "135M", "8%", "92%"],
            ["Бюджетный", "3K", "311M", "18%", "96%"],
            ["Средний", "6K", "440M", "26%", "95%"],
            ["Дорогой", "10K", "449M", "26%", "95%"],
            ["Премиум", "23K", "376M", "22%", "99%"],
          ]} highlight={3} />
          <p style={sP}><strong style={{ color: C.green }}>Sweetspot: медиана 6-10K.</strong> Средний + Дорогой = 52% рынка. Dr. Althea (1K) и Round Lab (1K) в низком сегменте — подвержены подделкам.</p>

          <h3 style={sH3}>Наборы (862M) — премиум = 43%!</h3>
          <DataTable headers={["Сегмент", "Медиана", "Выручка", "Доля"]} rows={[
            ["Низкий", "2K", "64M", "7%"],
            ["Бюджетный", "5K", "87M", "10%"],
            ["Средний", "9K", "167M", "19%"],
            ["Дорогой", "15K", "172M", "20%"],
            ["Премиум", "34K", "371M", "43%"],
          ]} highlight={4} />
          <p style={sP}>Покупатели <strong>готовы платить за наборы 34K+</strong> (подарки). Celimax набор 27K — верная стратегия.</p>
        </Section>

        {/* ═══ SECTION 10: RECS ═══ */}
        <Section id="sec-recs" title="10. Рекомендации и план действий">

          <h3 style={sH3}>Приоритет A — Масштабировать</h3>
          <DataTable headers={["Бренд", "Текущая", "Потенциал", "Действие"]} rows={[
            ["Celimax", "239M", "350M+", "Расширить (SPF, маски). Наборы к 8 марта и НГ."],
            ["Dr. Althea", "171M", "250M+", "Поднять цены 1K→3-5K. QR-верификация."],
            ["Skin1004", "136M", "200M+", "Madagascar — расширить. Наборы усилить."],
            ["Round Lab", "86M", "120M+", "Birch Juice развить. Бороться с подделками."],
            ["AXIS-Y", "78M", "100M+", "Dark Spot — основа. Mugwort линейка."],
          ]} />

          <h3 style={sH3}>Приоритет B — Раскрутить</h3>
          <DataTable headers={["Бренд", "Текущая", "Потенциал", "Действие"]} rows={[
            ["COSRX", "8M", "50M+", "Завести Snail 96, BHA Blackhead, AHA 7 — на Kaspi только патчи!"],
            ["VT Cosmetics", "14M", "40M+", "PDRN тренд. Высокий чек = мало подделок."],
            ["Mediheal", "4M", "30M+", "Тканевые маски — пустая ниша 122M, лидер = Китай."],
            ["Treecell", "<1M", "15M+", "Шампуни 630M, 0 корейских лидеров. Night Collagen."],
          ]} />

          <h3 style={sH3}>Приоритет C — Создать с нуля</h3>
          <DataTable headers={["Бренд", "Потенциал", "Стратегия"]} rows={[
            ["Beplain", "10M+", "Наборы Mung Bean. Отзывы. Премиум-позиционирование."],
            ["Skinfood", "10M+", "Rice Brightening Set. Carrot Carotene линейка."],
          ]} />

          <h3 style={sH3}>Топ-10 конкретных действий (30 дней)</h3>
          <div style={sCard}>
            <div style={{ fontSize: 13, lineHeight: 2.2, color: "#ccc" }}>
              {[
                "Завести COSRX Snail 96 + BHA Blackhead на Kaspi — потенциал +30M/мес",
                "Создать наборы к 8 марта: Celimax + Skin1004 + AXIS-Y — пик наборов 1029M",
                "Завести Mediheal тканевые маски (10-15 SKU) — ниша 122M без корейских лидеров",
                "Поднять цену Dr. Althea 345 Relief до 3-5K — меньше подделок, выше маржа",
                "Запустить Treecell шампуни — ниша 630M, 0 корейских лидеров",
                "Создать набор Beplain Mung Bean Set — вход в нишу 862M (наборы)",
                "Масштабировать VT Cosmetics PDRN — тренд, высокий чек",
                "Завести Skinfood Rice Brightening Set — уникальное позиционирование",
                "QR-верификация на топ-SKU (Dr. Althea, Round Lab, AXIS-Y)",
                "50+ отзывов на каждый новый SKU перед масштабированием",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: C.accent, fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 24, padding: "20px 24px", background: `${C.accent}08`, borderRadius: 12, border: `1px solid ${C.accent}30` }}>
            <p style={{ ...sP, margin: 0, fontSize: 13, color: C.dim }}>
              Данные: <strong style={{ color: C.text }}>RedStat API</strong> (ClickHouse, 73 000+ ниш, нояб 2024 — фев 2026).
              Отзывы: покупатели Kaspi.kz (40+ SKU проанализировано, 35 000+ отзывов).
            </p>
          </div>
        </Section>

      </div>
    </div>
  );
}
