"use client";

import { useState } from "react";
import Link from "next/link";

const C = {
  bg: "#0a0a0f", surface: "#111119", border: "#1e1e30",
  accent: "#e8729a", green: "#00d2a0", text: "#e8e8f0",
  dim: "#999", faint: "#444", red: "#f87171", amber: "#f59e0b",
  blue: "#60a5fa", pink: "#f472b6", cyan: "#22d3ee", purple: "#a78bfa",
};

const sSection: React.CSSProperties = { marginBottom: 56 };
const sH2: React.CSSProperties = { fontSize: 22, fontWeight: 700, margin: "0 0 24px", color: C.text, letterSpacing: "-0.01em", borderBottom: `1px solid ${C.border}`, paddingBottom: 12 };
const sH3: React.CSSProperties = { fontSize: 16, fontWeight: 600, margin: "28px 0 12px", color: C.text };
const sP: React.CSSProperties = { fontSize: 14, lineHeight: 1.75, color: "#ccc", margin: "0 0 12px" };
const sCard: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", marginBottom: 16 };
const sBadge = (color: string): React.CSSProperties => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: `${color}18`, color, fontSize: 11, fontWeight: 600 });

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (<div id={id} style={sSection}><h2 onClick={() => setOpen(!open)} style={{ ...sH2, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, userSelect: "none" }}><span style={{ fontSize: 14, color: C.dim, transform: open ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", display: "inline-block" }}>&#9654;</span>{title}</h2>{open && children}</div>);
}

function DataTable({ headers, rows, highlight }: { headers: string[]; rows: (string | number)[][]; highlight?: number }) {
  return (<div style={{ overflowX: "auto", marginBottom: 16 }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}><thead><tr>{headers.map((h, i) => (<th key={i} style={{ padding: "10px 12px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 11 }}>{h}</th>))}</tr></thead><tbody>{rows.map((row, ri) => (<tr key={ri} style={{ background: highlight !== undefined && ri === highlight ? `${C.accent}12` : "transparent" }}>{row.map((cell, ci) => (<td key={ci} style={{ padding: "10px 12px", textAlign: "left", color: ci === 0 ? C.text : "#ccc", borderBottom: `1px solid ${C.border}20`, fontWeight: ci === 0 ? 500 : 400, whiteSpace: ci === 0 ? "nowrap" : "normal" }}>{cell}</td>))}</tr>))}</tbody></table></div>);
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (<div style={{ ...sCard, padding: "16px 20px", flex: 1, minWidth: 140 }}><div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>{label}</div><div style={{ fontSize: 22, fontWeight: 700, color: color || C.text }}>{value}</div>{sub && <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{sub}</div>}</div>);
}

function Quote({ text, rating }: { text: string; rating: number }) {
  const color = rating <= 2 ? C.red : rating === 3 ? C.amber : C.green;
  return (<div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 14, margin: "8px 0", fontSize: 13, color: "#bbb", lineHeight: 1.6 }}><span style={{ ...sBadge(color), marginRight: 8, fontSize: 10 }}>{rating}/5</span>{text}</div>);
}

/* ───── Brand Card Component ───── */
function BrandCard({ name, tier, rev, growth, categories, bestSku, skuPrice, skuRev, reviews, rating, negPct, topComplaint, topPraise, insight, recommendation, color }: {
  name: string; tier: string; rev: string; growth: string; categories: string; bestSku: string; skuPrice: string; skuRev: string; reviews: string; rating: string; negPct: string; topComplaint: string; topPraise: string; insight: string; recommendation: string; color: string;
}) {
  return (
    <div style={{ ...sCard, borderLeft: `4px solid ${color}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18, fontWeight: 700 }}>{name}</span>
          <span style={sBadge(color)}>{tier}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={sBadge(C.text)}>{rev}/мес</span>
          <span style={sBadge(growth.startsWith("+") ? C.green : growth === "—" ? C.dim : C.amber)}>{growth}</span>
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.dim, marginBottom: 12 }}>Категории: {categories}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 14 }}>
        <div style={{ background: `${C.surface}`, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: C.dim }}>Бестселлер</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginTop: 2 }}>{bestSku}</div>
          <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{skuPrice} &middot; {skuRev}/мес</div>
        </div>
        <div style={{ background: `${C.surface}`, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: C.dim }}>Отзывы</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginTop: 2 }}>{reviews} отзывов &middot; {rating}</div>
          <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>Негативных: {negPct}</div>
        </div>
      </div>
      {topComplaint && <Quote text={topComplaint} rating={1} />}
      {topPraise && <Quote text={topPraise} rating={5} />}
      <div style={{ borderLeft: `3px solid ${C.blue}`, paddingLeft: 14, margin: "12px 0", fontSize: 13, color: "#ccc", lineHeight: 1.6 }}><strong style={{ color: C.blue }}>Инсайт: </strong>{insight}</div>
      <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 14, margin: "12px 0", fontSize: 13, color: "#ccc", lineHeight: 1.6 }}><strong style={{ color: C.accent }}>Рекомендация: </strong>{recommendation}</div>
    </div>
  );
}

/* ═══════════════════ MAIN ═══════════════════ */
export default function BrandPortfolioReport() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ marginBottom: 16 }}><Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; akasymzhanov.com</Link></div>

        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={sBadge(C.accent)}><span style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>Часть II — Портфель брендов</span></div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "16px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Анализ портфеля<br />21 бренда на Kaspi.kz
          </h1>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong>
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim, flexWrap: "wrap" }}>
            <span>Дата: <strong style={{ color: C.text }}>Март 2026</strong></span>
            <span>Брендов: <strong style={{ color: C.text }}>21</strong></span>
            <span>SKU проанализировано: <strong style={{ color: C.text }}>40+</strong></span>
            <span>Отзывов: <strong style={{ color: C.text }}>35 000+</strong></span>
          </div>
          <p style={{ ...sP, marginTop: 16, fontSize: 13, color: C.dim }}>Данный отчёт накладывает портфель из 21 бренда клиента на рыночные данные из <a href="/reports/kaspi-cosmetics" style={{ color: C.accent, textDecoration: "none" }}>Части I (Рынок «Красота и здоровье»)</a>. По каждому бренду: позиция на рынке, SKU-анализ, отзывы, динамика, рекомендации.</p>
        </div>

        {/* ═══ TOC ═══ */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["s1", "1. Executive Summary — портфель на карте рынка"],
            ["s2", "2. Матрица присутствия: 21 бренд x категории"],
            ["s3", "3. Тир 1 — Лидеры (>50M/мес): 6 брендов"],
            ["s4", "4. Тир 2 — Средние (5-50M/мес): 4 бренда"],
            ["s5", "5. Тир 3 — Слабые (<5M/мес): 4 бренда"],
            ["s6", "6. Тир 4 — Без заметных продаж: 5 брендов"],
            ["s7", "7. Тир 5 — Отсутствуют на Kaspi: 2 бренда"],
            ["s8", "8. Deep Dive: Beplain и Skinfood"],
            ["s9", "9. Динамика за 16 месяцев — кто растёт, кто падает"],
            ["s10", "10. Конкурентный анализ — бренды вне портфеля"],
            ["s11", "11. Проблема подделок по брендам портфеля"],
            ["s12", "12. Рекомендации: приоритеты, SKU, сезоны, действия"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", padding: "5px 0", fontSize: 13, color: C.accent, textDecoration: "none" }}>{label}</a>
          ))}
        </div>

        {/* ═══ 1. EXECUTIVE SUMMARY ═══ */}
        <Section id="s1" title="1. Executive Summary">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
            <MetricCard label="Портфель на Kaspi" value="18/21" sub="брендов найдено" color={C.green} />
            <MetricCard label="Суммарная выручка" value="~750M+" sub="KZT/мес (оценка)" color={C.accent} />
            <MetricCard label="Тир 1 (лидеры)" value="6" sub="брендов >50M" color={C.green} />
            <MetricCard label="Не на Kaspi" value="2" sub="Bueno, Healthy" color={C.red} />
          </div>
          <div style={sCard}>
            <h3 style={{ ...sH3, margin: "0 0 12px" }}>Ключевые выводы</h3>
            <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>
              <div>1. <strong style={{ color: C.green }}>6 брендов — лидеры рынка</strong> (Celimax, Dr. Althea, Skin1004, Sen Sulu/The Yeon, Round Lab, AXIS-Y) с суммарной выручкой ~710M/мес</div>
              <div>2. <strong style={{ color: C.blue }}>4 бренда — средний уровень</strong> (Anua, VT Cosmetics, Mommy Care, COSRX) с потенциалом роста до 50M+</div>
              <div>3. <strong style={{ color: C.amber }}>5 брендов присутствуют, но без продаж</strong> (Beplain, Skinfood, Treecell, Moda Moda, Bohicare) — нужна активация</div>
              <div>4. <strong style={{ color: C.red }}>COSRX — главная упущенная возможность</strong>: глобальный #1 K-beauty, на Kaspi = только патчи (8M). Линейки Snail, BHA, AHA отсутствуют.</div>
              <div>5. <strong style={{ color: C.green }}>Treecell — стратегическая возможность</strong>: шампуни 630M, нет сильного лидера-бренда</div>
              <div>6. <strong style={{ color: C.red }}>Подделки</strong> бьют по Dr. Althea (50% негативов), Round Lab (50%), AXIS-Y (50%) из-за цен &lt;2K</div>
            </div>
          </div>
        </Section>

        {/* ═══ 2. MATRIX ═══ */}
        <Section id="s2" title="2. Матрица присутствия: 21 бренд x категории">
          <p style={sP}>Проанализировано присутствие каждого бренда в 26+ leaf-категориях Kaspi через бренд-сплит и SKU-поиск.</p>
          <DataTable headers={["#", "Бренд", "Выручка/мес", "Тир", "Кол-во категорий", "Главная категория"]} rows={[
            ["1", "Celimax", "~239M", "Лидер", "5", "Тоники #1"],
            ["2", "Dr. Althea", "~171M", "Лидер", "5", "Кремы #1"],
            ["3", "Skin1004", "~136M", "Лидер", "5", "Кремы #5, Наборы #4"],
            ["4", "Sen Sulu (The Yeon)", "~135M", "Лидер", "8", "Декор: #1 в 5 нишах"],
            ["5", "Round Lab", "~86M", "Лидер", "4", "Умывание #2"],
            ["6", "AXIS-Y", "~78M", "Лидер", "4", "Кремы #8"],
            ["7", "Anua", "~18M", "Средний", "2", "Кремы (сыворотки)"],
            ["8", "Mommy Care", "~15M", "Средний", "1", "Техника (массажёры)"],
            ["9", "VT Cosmetics", "~14M", "Средний", "1", "Кремы (PDRN)"],
            ["10", "COSRX", "~8M", "Средний", "2", "Патчи #3"],
            ["11", "Mediheal", "~4M", "Слабый", "3", "Патчи, скрабы"],
            ["12", "TFIT", "~2M", "Слабый", "1", "Консилеры"],
            ["13", "Mizon (MIZON)", "~1M", "Слабый", "1", "Наборы"],
            ["14", "Anua (скрабы)", "~1M", "Слабый", "1", "Скрабы"],
            ["15", "Beplain", "<1M", "Без продаж", "1", "Умывание (карточки есть)"],
            ["16", "Skinfood", "<1M", "Без продаж", "2", "Скрабы, кремы (карточки)"],
            ["17", "Treecell", "<1M", "Без продаж", "2", "Шампуни, уход (карточки)"],
            ["18", "Moda Moda", "<1M", "Без продаж", "1", "Шампуни (карточки)"],
            ["19", "Bohicare", "<1M", "Без продаж", "2", "SPF, бальзам (карточки)"],
            ["20", "Bueno", "0", "Не на Kaspi", "0", "—"],
            ["21", "Healthy", "0", "Не на Kaspi", "0", "—"],
          ]} />
          <p style={{ ...sP, fontSize: 12, color: C.dim }}>Примечание: Sen Sulu — казахстанский бренд, продающий продукцию The Yeon. В таблице объединены, т.к. BB-кремы The Yeon продаются под брендом Sen Sulu на Kaspi.</p>
        </Section>

        {/* ═══ 3. TIER 1 ═══ */}
        <Section id="s3" title="3. Тир 1 — Лидеры (>50M/мес)">
          <p style={sP}>6 брендов с суммарной выручкой ~710M KZT/мес. Это ядро портфеля.</p>

          <BrandCard name="Celimax" tier="ЛИДЕР" rev="~239M" growth="+208% YoY" color={C.green}
            categories="Тоники #1 (61M), Кремы #3 (89M), Умывание #3 (35M), Скрабы #1 (13M), Наборы #3 (41M)"
            bestSku="Dual Barrier Toner 150мл" skuPrice="2K" skuRev="32M" reviews="3 411" rating="4.9" negPct="1.6%"
            topComplaint="Тонер оказался подделкой, не берите!" topPraise="Работает с первого применения, восстанавливает и успокаивает кожу, моментально впитывается."
            insight="Абсолютный лидер тоников (21% ниши). Линейка Dual Barrier — системообразующая: покупатели берут тонер → крем → набор. Рост x3.2 за год. Самый быстрорастущий из лидеров."
            recommendation="Расширить Dual Barrier (SPF, маска, эмульсия). Наборы к 8 марта и НГ (27K набор уже = 23M). Целевая цена тонера — поднять до 3-4K для защиты от подделок." />

          <BrandCard name="Dr. Althea" tier="ЛИДЕР" rev="~171M" growth="+133% YoY" color={C.green}
            categories="Кремы #1 (142M), Умывание #8 (15M), Тоники #6 (10M), Скрабы #4 (3M), Снятие макияжа (1M)"
            bestSku="345 Relief Cream 50мл" skuPrice="1K" skuRev="39M" reviews="4 900" rating="4.9" negPct="2.3%"
            topComplaint="Товар оказался подделкой. Упаковка и консистенция отличаются, вызывает раздражение кожи." topPraise="Самый лучший, лёгкий, не вызывает аллергию! Любимый крем, очень нежно увлажняет."
            insight="Сместил Bioderma с #1 в кремах за год. 345 Relief = #1 SKU всего рынка кремов (39M/мес). НО: цена 1K KZT = 50% негативов о подделках. Средний чек падает (7.7K → 4.9K) — демпинг между 67 продавцами."
            recommendation="КРИТИЧНО: поднять цену 345 Relief с 1K до 3-5K. QR-верификация на каждой упаковке. Развить линейку 147 Barrier (5K, 8M — лучше защищена от подделок). Сократить число продавцов до авторизованных." />

          <BrandCard name="Skin1004" tier="ЛИДЕР" rev="~136M" growth="+83% YoY" color={C.green}
            categories="Кремы #5 (55M), Наборы #4 (40M), Умывание #4 (25M), Тоники (10M), Маски #3 (6M)"
            bestSku="Madagascar Centella Set" skuPrice="9K" skuRev="17M" reviews="934" rating="4.8" negPct="6.3%"
            topComplaint="Бағасын көтеріп қояды — цену задирают при оформлении. Іштері ағып — содержимое протекло." topPraise="Гидрофильное масло хорошо очищает, умывалка не стянет, сыворотка не липкая."
            insight="Самый широкий ассортимент из лидеров (89 SKU в кремах). Madagascar Centella — узнаваемая линейка. Наборы = 40M (#4) — сильная позиция для подарочных сезонов. Рейтинг 4.8 — чуть ниже конкурентов."
            recommendation="Усилить наборы Madagascar: Travel Kit (3K), Full Set (9K), Premium Set (15K+). Добавить SPF в линейку (Hyalu-Cica SPF50 = 6M — расширить). Улучшить упаковку (жалобы на протечки)." />

          <BrandCard name="Sen Sulu (The Yeon)" tier="ЛИДЕР" rev="~135M" growth="Стабильный" color={C.green}
            categories="Наборы #1 (127M), Корректоры #1 (30M), Помады #1 (26M), Пудры #1 (24M), Тени #1 (18M), Тональные #7 (18M), Румяна #3 (14M)"
            bestSku="The Yeon Cover Fit BB SPF36" skuPrice="6K" skuRev="10M" reviews="914" rating="4.9" negPct="2.7%"
            topComplaint="Заказала светлый оттенок — получила эффект загара. Слишком рыжий для светлых." topPraise="BB хороший, отличный тон. Классный BB — видно что качественный."
            insight="Доминант декоративки на Kaspi — #1 в 5 из 8 ниш. Казахстанский бренд = быстрая логистика и регистрация. BB-кремы The Yeon = ключевой продукт. Наборы = 127M (#1) — основа выручки."
            recommendation="Расширить палитру BB-кремов (жалобы на оттенки). Добавить 3-4 оттенка (светлый, нейтральный, тёплый, тёмный). Усилить наборы к пикам (8М: 1029M, НГ: 1126M)." />

          <BrandCard name="Round Lab" tier="ЛИДЕР" rev="~86M" growth="+22% YoY" color={C.amber}
            categories="Умывание #2 (36M), Кремы #9 (39M), Тоники #5 (10M), Снятие макияжа (1M)"
            bestSku="1025 Dokdo Cleanser 150мл" skuPrice="1K" skuRev="19M" reviews="7 191" rating="4.8" negPct="5.2%"
            topComplaint="Не оригинал, подделка. Обожгла всё лицо — спас Бепантен." topPraise="Пенка мягкая и нежная. Расходуется экономично — хватает на 10-12 месяцев."
            insight="Рекорд по отзывам (7 191) — самый «отзываемый» SKU. НО: рост замедлился до +22% YoY (был ~40%). Средний чек упал на 27% (3.98K → 2.92K). 376 негативных отзывов = 5.2% — подделки доминируют в негативе."
            recommendation="Борьба с подделками = приоритет #1. QR-верификация. Развить Birch Juice линейку (SPF50 = 9M, крем = 4M — потенциал роста). Поднять цену Dokdo с 1K → 2-3K." />

          <BrandCard name="AXIS-Y" tier="ЛИДЕР" rev="~78M" growth="+27% YoY" color={C.amber}
            categories="Кремы #8 (47M), Тоники #4 (12M), Маски #2 (7M), Наборы #10 (12M)"
            bestSku="Dark Spot Correcting Glow Serum 50мл" skuPrice="1K" skuRev="18M" reviews="6 796" rating="4.8" negPct="4.7%"
            topComplaint="Подделкасын салып жіберген — подделку прислали. Сыворотка никакущая, эффекта — 0." topPraise="Оригинал екен, қатты қуандым — оригинал, очень обрадовалась."
            insight="Dark Spot Serum = хит с 6 796 отзывами. НО: средний чек упал в 2 раза (4.1K → 2.3K) — заказы растут, а выручка стагнирует. Признак демпинга. Подделки = 50% негативов."
            recommendation="Поднять цену Dark Spot Serum с 1K → 3-4K. Развить Mugwort Clarifying линейку (маска = 6M — есть спрос). TXA Brightening Cream (6M, 6K) — лучше защищён по цене." />
        </Section>

        {/* ═══ 4. TIER 2 ═══ */}
        <Section id="s4" title="4. Тир 2 — Средние (5-50M/мес)">
          <p style={sP}>4 бренда с потенциалом кратного роста.</p>

          <BrandCard name="Anua" tier="СРЕДНИЙ" rev="~18M" growth="Растёт" color={C.blue}
            categories="Кремы / сыворотки (16M), Скрабы (1M)"
            bestSku="Azelaic Acid 10 Hyaluron Serum 30мл" skuPrice="5K" skuRev="8M" reviews="319" rating="4.8" negPct="4.7%"
            topComplaint="Подделка болып шықты — вышла подделка." topPraise="Оригинал екен, рахмет — оригинал, спасибо."
            insight="PDRN и Azelaic Acid — трендовые ингредиенты 2025-2026. Средний чек 5-13K — выше большинства конкурентов, что снижает проблему подделок. Широкая линейка: Azelaic, PDRN, Niacinamide."
            recommendation="Масштабировать PDRN Hyaluronic Cream (13K, 4M) — высокий чек, маржинальный. Добавить набор Anua (сыворотка + крем) по 15-18K. Набрать 500+ отзывов для главных SKU." />

          <BrandCard name="VT Cosmetics" tier="СРЕДНИЙ" rev="~14M" growth="Растёт" color={C.blue}
            categories="Кремы / сыворотки (PDRN линейка)"
            bestSku="PDRN Essence 100 (30мл)" skuPrice="14K" skuRev="5M" reviews="70" rating="5.0" negPct="1.4%"
            topComplaint="Лента на товаре была прорезана — вскрытая упаковка." topPraise="Лицо подтягивается, увлажнение, тургор. Супер! Пользуюсь серией, каждый раз удивляют."
            insight="1 негативный из 70 = рейтинг 5.0. PDRN-специализация уникальна на Kaspi. Средний чек 9-14K — премиум-зона с минимумом подделок. Линейка: сыворотка, крем, стик, крем для век."
            recommendation="Масштабировать агрессивно: VT Cosmetics = идеальный кандидат для роста. Высокий чек, отличный рейтинг, трендовый ингредиент. Набрать 300+ отзывов. Создать набор PDRN по 25-30K." />

          <BrandCard name="COSRX" tier="СРЕДНИЙ" rev="~8M" growth="Стагнация" color={C.amber}
            categories="Патчи #3 (4M), Умывание (1M)"
            bestSku="Acne Pimple Master Patch" skuPrice="1-2K" skuRev="2M" reviews="754" rating="4.8" negPct="10.1%"
            topComplaint="Не справляются с задачей. В пачке мало, не вытягивает ничего. Больно снимаются." topPraise="Наносить на сухое лицо сразу после умывания — эффективное средство."
            insight="ГЛАВНАЯ УПУЩЕННАЯ ВОЗМОЖНОСТЬ. COSRX = глобальный #1 K-beauty бренд, но на Kaspi = только патчи (8M). Отсутствуют: Advanced Snail 96 Mucin, BHA Blackhead Power, AHA 7 Whitehead, Low pH Cleanser (полноценная линейка). 10.1% негатива = самый высокий среди портфеля."
            recommendation="ПРИОРИТЕТ #1: завести Snail 96 Mucin Power Essence (глобальный бестселлер), BHA Blackhead Power Liquid, AHA 7 Whitehead Power Liquid. Потенциал: 8M → 50M+ при полной линейке. Поднять цену патчей с 1K → 2-3K." />

          <BrandCard name="Mommy Care" tier="СРЕДНИЙ" rev="~15M" growth="—" color={C.dim}
            categories="Малая косметологическая техника"
            bestSku="Микротоковый массажёр" skuPrice="60K" skuRev="7M" reviews="—" rating="—" negPct="—"
            topComplaint="" topPraise=""
            insight="Mommy Care = техника (массажёры, EMS-аппараты), не косметика. Другой рынок, другая аудитория. Категория «Малая косметологическая техника» = 208M."
            recommendation="Рассматривать отдельно от beauty-портфеля. Не пересекается с уходовой/декоративной косметикой. Фокус на аппаратных процедурах." />
        </Section>

        {/* ═══ 5. TIER 3 ═══ */}
        <Section id="s5" title="5. Тир 3 — Слабые (<5M/мес)">
          <DataTable headers={["Бренд", "Выручка", "Категория", "SKU", "Рейтинг", "Потенциал", "Действие"]} rows={[
            ["Mediheal", "~4M", "Патчи, скрабы, тонер-пэды", "5+", "4.9", "30M+", "Тканевые маски = пустая ниша (122M, #1 = Китай)"],
            ["TFIT", "~2M", "Консилеры", "2", "4.8", "5M", "Нишевый. Расширить палитру оттенков"],
            ["Mizon / MIZON", "~1M", "Наборы (Green Monster)", "1", "—", "5M", "Green Monster набор = 9K. Мало продвижения"],
          ]} />
          <div style={{ borderLeft: `3px solid ${C.blue}`, paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>
            <strong style={{ color: C.blue }}>Инсайт по Mediheal: </strong>Мировой лидер тканевых масок. На Kaspi маски для лица = 122M/мес, #1 — Gegemoon (Китай, 13M). <strong style={{ color: C.green }}>Mediheal может занять эту нишу</strong> — бренд узнаваем, продукт проверен. Нужно 10-15 SKU тканевых масок.
          </div>
        </Section>

        {/* ═══ 6. TIER 4 ═══ */}
        <Section id="s6" title="6. Тир 4 — Без заметных продаж (<1M/мес)">
          <p style={sP}>Карточки товаров на Kaspi существуют, но продажи нулевые или минимальные.</p>
          <DataTable headers={["Бренд", "SKU на Kaspi", "Цена", "Причина отсутствия продаж", "Потенциал"]} rows={[
            ["Beplain", "Mung Bean пенка, масло", "7K", "0 отзывов, нет продвижения", "10M+ (см. Deep Dive)"],
            ["Skinfood", "Carrot тонер, Rice крем", "10-22K", "0 отзывов, нет продвижения", "10M+ (см. Deep Dive)"],
            ["Treecell", "Oil essence, шампунь", "6-9K", "Категория волос, 0 отзывов", "15M+ (шампуни 630M!)"],
            ["Moda Moda", "Оттеночные шампуни", "13-14K", "Нулевые продажи", "5M (краска 161M)"],
            ["Bohicare", "SPF крем, бальзам", "8-9K", "Нулевые продажи", "5M (SPF тренд)"],
          ]} />
          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>
            <strong style={{ color: C.green }}>Ключевой инсайт: </strong>Treecell = стратегическая возможность. Шампуни = 630M/мес (+80% YoY), <strong>нет сильного бренда-лидера</strong> (elline #1 с 103M — аномалия, 1 SKU). Night Collagen Shampoo — уникальное позиционирование, аналогов на Kaspi нет.
          </div>
        </Section>

        {/* ═══ 7. TIER 5 ═══ */}
        <Section id="s7" title="7. Тир 5 — Отсутствуют на Kaspi">
          <DataTable headers={["Бренд", "Статус", "Комментарий"]} rows={[
            ["Bueno", "Не найден на Kaspi.kz", "Ни одной карточки товара. Нужно создавать с нуля."],
            ["Healthy", "Не найден на Kaspi.kz", "Ни одной карточки товара. Нужно создавать с нуля."],
          ]} />
          <p style={sP}>Green Monster — присутствует как суббренд MIZON (набор MIZON Green Monster Premium Collagen). Отдельного бренда «Green Monster» на Kaspi нет.</p>
        </Section>

        {/* ═══ 8. DEEP DIVE ═══ */}
        <Section id="s8" title="8. Deep Dive: Beplain и Skinfood">
          <div style={{ ...sCard, borderTop: `3px solid ${C.purple}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px", color: C.purple }}>Beplain — пошаговый план активации</h3>
            <p style={sP}><strong>Текущий статус:</strong> 2-3 карточки (Mung Bean пенка ~7K, масло ~7K). 0 отзывов. 0 продаж.</p>
            <h3 style={{ ...sH3, fontSize: 14 }}>Почему не продаётся:</h3>
            <div style={{ fontSize: 13, lineHeight: 1.8, color: "#ccc", marginBottom: 16 }}>
              <div>1. <strong>Нет отзывов</strong> — карточки без отзывов не конвертируют на Kaspi. Покупатели не рискуют.</div>
              <div>2. <strong>Нет продвижения</strong> — не участвует в акциях, нет рекламы, нет внешнего трафика.</div>
              <div>3. <strong>Цена 7K без контекста</strong> — дороже Dr. Althea (1K), Round Lab (1K), но без узнаваемости.</div>
              <div>4. <strong>Мало SKU</strong> — 2-3 позиции, нет набора/линейки, нет кросс-продаж.</div>
            </div>
            <h3 style={{ ...sH3, fontSize: 14 }}>План активации:</h3>
            <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>
              <div>1. <strong style={{ color: C.text }}>Создать набор Beplain Mung Bean Set</strong> (пенка + масло + тонер) по 15-18K → вход в нишу наборов (862M)</div>
              <div>2. <strong style={{ color: C.text }}>Набрать 50-100 отзывов</strong> через программу раннего доступа (скидка + бесплатный мини-продукт за отзыв)</div>
              <div>3. <strong style={{ color: C.text }}>Позиционирование:</strong> «премиум-натуральный уход» — Mung Bean = зелёная фасоль = натуральность</div>
              <div>4. <strong style={{ color: C.text }}>Целевая цена:</strong> не ниже 5K за единицу, набор 15-18K</div>
              <div>5. <strong style={{ color: C.text }}>Instagram/TikTok:</strong> коллаборация с 2-3 KZ beauty-блогерами для первичной узнаваемости</div>
            </div>
            <p style={{ ...sP, marginTop: 12, fontSize: 12, color: C.dim }}>Потенциал: 0 → 10M/мес за 3-4 месяца при правильной активации.</p>
          </div>

          <div style={{ ...sCard, borderTop: `3px solid ${C.purple}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px", color: C.purple }}>Skinfood — пошаговый план активации</h3>
            <p style={sP}><strong>Текущий статус:</strong> Carrot Carotene Calming Water Pad (10K), Rice крем (22K). 0 отзывов.</p>
            <h3 style={{ ...sH3, fontSize: 14 }}>Стратегия входа:</h3>
            <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>
              <div>1. <strong style={{ color: C.text }}>Rice линейка = уникальная.</strong> Никто на Kaspi не предлагает «рисовый уход». Позиционирование «осветление» (brightening).</div>
              <div>2. <strong style={{ color: C.text }}>Carrot Carotene</strong> — трендовая линейка, но конкурирует с Skin1004 Madagascar. Фокус на уникальности каротина.</div>
              <div>3. <strong style={{ color: C.text }}>Набор Skinfood Rice Brightening Set</strong> (тонер + крем + маска) по 20-25K.</div>
              <div>4. <strong style={{ color: C.text }}>Целевая цена:</strong> 8-15K за единицу (между масс-маркетом 1K и премиум 15K+).</div>
              <div>5. <strong style={{ color: C.text }}>Бренд-история:</strong> «Основан в 1957 году» — один из старейших beauty-брендов. Использовать в карточке.</div>
            </div>
            <p style={{ ...sP, marginTop: 12, fontSize: 12, color: C.dim }}>Потенциал: 0 → 10M/мес. Rice-линейка может стать уникальным позиционированием на рынке.</p>
          </div>
        </Section>

        {/* ═══ 9. DYNAMICS ═══ */}
        <Section id="s9" title="9. Динамика за 16 месяцев">
          <h3 style={sH3}>Dr. Althea — Кремы и сыворотки (помесячно)</h3>
          <DataTable headers={["Период", "Выручка", "Заказов", "SKU", "Продавцов", "Комментарий"]} rows={[
            ["Нояб 2024", "36M", "4 653", "18", "34", "Стартовая точка"],
            ["Фев 2025", "81M", "9 665", "22", "44", "+125% за 3 мес"],
            ["Май 2025", "77M", "13 003", "28", "45", "Лёгкая коррекция"],
            ["Авг 2025", "131M", "29 244", "32", "57", "Взрыв (+75% за 2 мес)"],
            ["Нояб 2025", "140M", "34 600", "45", "68", "Пик SKU"],
            ["Фев 2026", "142M", "28 901", "62", "67", "Рекорд выручки"],
          ]} />
          <div style={{ borderLeft: `3px solid ${C.amber}`, paddingLeft: 14, margin: "12px 0", fontSize: 13, color: "#ccc" }}>
            <strong style={{ color: C.amber }}>Сигнал: </strong>Средний чек падает: 36M/4653 = 7.7K → 142M/28901 = 4.9K. Это признак ценовой войны между 67 продавцами.
          </div>

          <h3 style={sH3}>Celimax — Тоники (помесячно)</h3>
          <DataTable headers={["Период", "Выручка", "Заказов", "SKU"]} rows={[
            ["Нояб 2024", "19M", "3 383", "6"],
            ["Фев 2025", "37M", "5 478", "10"],
            ["Авг 2025", "43M", "7 776", "17"],
            ["Нояб 2025", "57M", "9 159", "20"],
            ["Фев 2026", "61M", "11 016", "27"],
          ]} />
          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 14, margin: "12px 0", fontSize: 13, color: "#ccc" }}>
            <strong style={{ color: C.green }}>Здоровый рост: </strong>x3.2 за 16 мес. SKU с 6 до 27. Линейка расширяется — Celimax строит экосистему.
          </div>

          <h3 style={sH3}>Round Lab — Умывание (замедление)</h3>
          <DataTable headers={["Период", "Выручка", "Заказов", "Ср. чек"]} rows={[
            ["Нояб 2024", "33M", "8 283", "3 980 KZT"],
            ["Авг 2025", "49M", "14 264", "3 430 KZT"],
            ["Фев 2026", "36M", "12 330", "2 920 KZT"],
          ]} />
          <div style={{ borderLeft: `3px solid ${C.red}`, paddingLeft: 14, margin: "12px 0", fontSize: 13, color: "#ccc" }}>
            <strong style={{ color: C.red }}>Тревога: </strong>Выручка стагнирует (33M → 36M), а средний чек упал на 27%. Заказы растут, но покупатели платят всё меньше. Подделки и демпинг.
          </div>

          <h3 style={sH3}>Лестница брендов: кто двигался за год</h3>
          <DataTable headers={["Позиция", "Год назад", "Сейчас", "Изменение"]} rows={[
            ["#1 кремы", "Bioderma ~320M*", "Dr. Althea 550M*", "Сместил Bioderma"],
            ["#1 тоники", "Celimax 76M*", "Celimax 234M*", "Удержал, x3 рост"],
            ["#2 умывание", "Round Lab ~130M*", "Round Lab 161M*", "Замедляется"],
            ["#1 декор (наборы)", "Sen Sulu", "Sen Sulu", "Стабильный лидер"],
          ]} />
          <p style={{ ...sP, fontSize: 11, color: C.dim }}>* суммарная выручка за 4 мес (нояб-фев)</p>
        </Section>

        {/* ═══ 10. COMPETITORS ═══ */}
        <Section id="s10" title="10. Конкурентный анализ — бренды вне портфеля">
          <p style={sP}>Ключевые конкуренты, которых нет в портфеле клиента:</p>
          <DataTable headers={["Бренд", "Выручка", "Сила", "Ниша", "Угроза для портфеля"]} rows={[
            ["MEDI-PEEL", "~75M", "Peptide 9 линейка, 4-7K", "Кремы #4, Тоники #7", "Конкурирует с Celimax и Skin1004"],
            ["RoRoBell", "~72M", "Bfadation тональный 13K", "Тональные #1", "Нет прямого конкурента в портфеле"],
            ["Bioderma", "~175M+", "Мицеллярная вода, дерматология", "Умывание #1, Кремы #2", "Главный конкурент Round Lab"],
            ["La Roche-Posay", "~100M+", "Аптечная косметика", "Кремы #6, Тело #1", "Конкурирует в SPF и уходе за телом"],
            ["LUXVISAGE", "~80M+", "Бюджетный декор 1-5K", "Тональные #4, Помады #2", "Конкурент Sen Sulu в декоре"],
            ["BIDALLI", "~14M", "Тоники", "Тоники #2", "Прямой конкурент Celimax"],
          ]} />
          <div style={{ borderLeft: `3px solid ${C.blue}`, paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "#ccc" }}>
            <strong style={{ color: C.blue }}>Инсайт: </strong>MEDI-PEEL (75M) — единственный крупный бренд в уходовой косметике, которого нет в портфеле. Рассмотреть добавление или стратегию противодействия. MEDI-PEEL Peptide 9 Emulsion (4K, 19M) — конкурент Celimax Dual Barrier (2K, 32M).
          </div>
        </Section>

        {/* ═══ 11. FAKES ═══ */}
        <Section id="s11" title="11. Проблема подделок по брендам портфеля">
          <DataTable headers={["Бренд", "Топ-SKU", "Цена", "Отзывов", "Негатив %", "Из них подделки"]} rows={[
            ["Dr. Althea", "345 Relief Cream", "1K", "4 900", "2.3%", "~50% негативов"],
            ["Round Lab", "1025 Dokdo Cleanser", "1K", "7 191", "5.2%", "~50% негативов"],
            ["AXIS-Y", "Dark Spot Serum", "1K", "6 796", "4.7%", "~50% негативов"],
            ["Celimax", "Dual Barrier Toner", "2K", "3 411", "1.6%", "~28% негативов"],
            ["Skin1004", "Madagascar Set", "9K", "934", "6.3%", "~17% негативов"],
            ["Anua", "Azelaic Serum", "5K", "319", "4.7%", "~33% негативов"],
            ["VT Cosmetics", "PDRN Essence", "14K", "70", "1.4%", "~0% негативов"],
          ]} />
          <div style={{ ...sCard, borderLeft: `3px solid ${C.red}` }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.red }}>Корреляция: цена → подделки</h3>
            <p style={sP}>Чёткий паттерн: <strong style={{ color: C.text }}>при цене &lt;2K KZT — 50% негативов = подделки</strong>. При 5K+ — подделки падают до 10-15%. При 10K+ — практически исчезают.</p>
            <p style={sP}>Dr. Althea (1K), Round Lab (1K), AXIS-Y (1K) — три лидера по выручке и три главные жертвы подделок. <strong style={{ color: C.red }}>Парадокс: чем популярнее товар по низкой цене, тем больше подделок.</strong></p>
          </div>
        </Section>

        {/* ═══ 12. RECOMMENDATIONS ═══ */}
        <Section id="s12" title="12. Рекомендации: приоритеты, SKU, сезоны, действия">

          <h3 style={sH3}>Приоритет A — Масштабировать (уже работают)</h3>
          <DataTable headers={["Бренд", "Текущая", "Цель 6 мес", "Ключевое действие"]} rows={[
            ["Celimax", "239M", "350M+", "Расширить Dual Barrier (SPF, маска). Наборы к пикам."],
            ["Dr. Althea", "171M", "250M+", "Поднять цену 1K→3-5K. QR-верификация. Линейка 147 Barrier."],
            ["Skin1004", "136M", "200M+", "Madagascar SPF + Premium Set 15K+. Улучшить упаковку."],
            ["Round Lab", "86M", "120M+", "Birch Juice развить. Бороться с подделками. Цена 1K→2-3K."],
            ["AXIS-Y", "78M", "100M+", "Dark Spot цена вверх. Mugwort + TXA линейки развить."],
          ]} />

          <h3 style={sH3}>Приоритет B — Раскрутить (потенциал кратного роста)</h3>
          <DataTable headers={["Бренд", "Текущая", "Цель 6 мес", "Ключевое действие"]} rows={[
            ["COSRX", "8M", "50M+", "Завести Snail 96 + BHA + AHA. Глобальный бестселлер = мгновенный спрос."],
            ["VT Cosmetics", "14M", "40M+", "PDRN тренд. Набор PDRN 25-30K. Набрать 300+ отзывов."],
            ["Mediheal", "4M", "30M+", "10-15 SKU тканевых масок. Ниша 122M, #1 = Китай — забрать."],
            ["Treecell", "<1M", "15M+", "Night Collagen Shampoo. Шампуни 630M без лидера."],
          ]} />

          <h3 style={sH3}>Приоритет C — Активировать (создать с нуля)</h3>
          <DataTable headers={["Бренд", "Цель", "Стратегия"]} rows={[
            ["Beplain", "10M+", "Набор Mung Bean 15-18K. 50+ отзывов. Блогеры. Натуральный премиум."],
            ["Skinfood", "10M+", "Rice Brightening Set 20-25K. Уникальное позиционирование «рис»."],
            ["Moda Moda", "5M+", "Оттеночные шампуни в краску (161M ниша). Контент-маркетинг."],
          ]} />

          <h3 style={sH3}>Сезонный календарь для портфеля</h3>
          <div style={sCard}>
            <div style={{ fontSize: 13, lineHeight: 2.2, color: "#ccc" }}>
              <div><strong style={{ color: C.amber }}>Январь-Февраль:</strong> Закупка наборов к 8 марта. Celimax Set, Skin1004 Set, AXIS-Y Set. Наборы пик = 1029M.</div>
              <div><strong style={{ color: C.red }}>Март (8 марта):</strong> Максимальные продажи наборов и тональных. Sen Sulu наборы = #1.</div>
              <div><strong style={{ color: C.text }}>Апрель-Май:</strong> SPF-сезон: Skin1004 Hyalu-Cica SPF50, Round Lab Birch Juice SPF50. Bohicare SPF — активация.</div>
              <div><strong style={{ color: C.text }}>Июнь-Август:</strong> Лёгкие текстуры: тоники Celimax, умывание Round Lab. Шампуни Treecell.</div>
              <div><strong style={{ color: C.text }}>Сентябрь-Октябрь:</strong> Осенний уход: кремы Dr. Althea, сыворотки Anua, PDRN VT Cosmetics.</div>
              <div><strong style={{ color: C.amber }}>Ноябрь (Kaspi Жума):</strong> Скидки на всё. Ключевые SKU в промо.</div>
              <div><strong style={{ color: C.red }}>Декабрь (НГ):</strong> Наборы ПИКОВЫЙ = 1126M. Подарочные сеты от каждого бренда.</div>
            </div>
          </div>

          <h3 style={sH3}>Топ-10 конкретных действий (ближайшие 30 дней)</h3>
          <div style={sCard}>
            <div style={{ fontSize: 13, lineHeight: 2.2, color: "#ccc" }}>
              {[
                { n: "1", d: "Завести COSRX Snail 96 Mucin + BHA Blackhead на Kaspi — потенциал +30M/мес", p: "critical" },
                { n: "2", d: "Поднять цену Dr. Althea 345 Relief с 1K до 3-5K — отсечь подделки", p: "critical" },
                { n: "3", d: "QR-верификация на Dr. Althea, Round Lab, AXIS-Y — борьба с 50% негативов", p: "critical" },
                { n: "4", d: "Завести Mediheal тканевые маски (10-15 SKU) — ниша 122M без лидера", p: "high" },
                { n: "5", d: "Создать наборы к 8 марта: Celimax Dual Barrier Set, Skin1004 Madagascar Premium", p: "high" },
                { n: "6", d: "Запустить Treecell Night Collagen Shampoo — ниша 630M, 0 лидеров", p: "high" },
                { n: "7", d: "Масштабировать VT Cosmetics PDRN — набор 25-30K, набрать 300+ отзывов", p: "medium" },
                { n: "8", d: "Активировать Beplain: набор Mung Bean 15-18K + 50 отзывов + 2 блогера", p: "medium" },
                { n: "9", d: "Активировать Skinfood: Rice Brightening Set 20-25K + уникальное позиционирование", p: "medium" },
                { n: "10", d: "Сократить число продавцов Dr. Althea до авторизованных — остановить демпинг", p: "medium" },
              ].map((item) => (
                <div key={item.n} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <span style={{ color: item.p === "critical" ? C.red : item.p === "high" ? C.amber : C.blue, fontWeight: 700, minWidth: 24 }}>{item.n}.</span>
                  <span>{item.d}</span>
                  <span style={{ ...sBadge(item.p === "critical" ? C.red : item.p === "high" ? C.amber : C.blue), marginLeft: "auto", flexShrink: 0, fontSize: 9 }}>{item.p === "critical" ? "КРИТИЧНО" : item.p === "high" ? "ВЫСОКИЙ" : "СРЕДНИЙ"}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 24, padding: "20px 24px", background: `${C.accent}08`, borderRadius: 12, border: `1px solid ${C.accent}30` }}>
            <p style={{ ...sP, margin: "0 0 8px", fontSize: 13, color: C.dim }}>
              Проанализировано: <strong style={{ color: C.text }}>73 000+ ниш</strong> &middot; <strong style={{ color: C.text }}>16 месяцев данных</strong> (ноябрь 2024 — февраль 2026) &middot; <strong style={{ color: C.text }}>35 000+ отзывов</strong> покупателей Kaspi.kz &middot; <strong style={{ color: C.text }}>21 бренд</strong> &middot; <strong style={{ color: C.text }}>40+ SKU</strong>
            </p>
            <p style={{ ...sP, margin: 0, fontSize: 13, color: C.dim }}>
              Источник данных: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none", fontWeight: 600 }}>RedStat.kz</a> &middot; Связанный документ: <a href="/reports/kaspi-cosmetics" style={{ color: C.accent, textDecoration: "none" }}>Часть I — Рынок «Красота и здоровье» на Kaspi.kz</a>
            </p>
          </div>
        </Section>

      </div>
    </div>
  );
}
