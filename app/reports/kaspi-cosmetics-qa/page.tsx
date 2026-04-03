"use client";

import Link from "next/link";

const C = {
  bg: "#0a0a0f", surface: "#111119", border: "#1e1e30",
  accent: "#e8729a", green: "#00d2a0", text: "#e8e8f0",
  dim: "#999", red: "#f87171", amber: "#f59e0b",
  blue: "#60a5fa", pink: "#f472b6", cyan: "#22d3ee",
};

const sP: React.CSSProperties = { fontSize: 14, lineHeight: 1.75, color: "#ccc", margin: "0 0 12px" };
const sCard: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", marginBottom: 16 };
const sBadge = (color: string): React.CSSProperties => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: `${color}18`, color, fontSize: 11, fontWeight: 600 });

function DataTable({ headers, rows, highlight }: { headers: string[]; rows: (string | number)[][]; highlight?: number }) {
  return (<div style={{ overflowX: "auto", marginBottom: 16 }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}><thead><tr>{headers.map((h, i) => (<th key={i} style={{ padding: "10px 12px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 11 }}>{h}</th>))}</tr></thead><tbody>{rows.map((row, ri) => (<tr key={ri} style={{ background: highlight !== undefined && ri === highlight ? `${C.accent}12` : "transparent" }}>{row.map((cell, ci) => (<td key={ci} style={{ padding: "10px 12px", textAlign: "left", color: ci === 0 ? C.text : "#ccc", borderBottom: `1px solid ${C.border}20`, fontWeight: ci === 0 ? 500 : 400 }}>{cell}</td>))}</tr>))}</tbody></table></div>);
}

export default function CosmeticsQA() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ marginBottom: 16 }}><Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; akasymzhanov.com</Link></div>

        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={sBadge(C.accent)}><span style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>Q&A — Ответы на вопросы</span></div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "16px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Ответы на вопросы<br />по аналитике рынка
          </h1>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong>
          </p>
          <p style={{ ...sP, marginTop: 12, fontSize: 13, color: C.dim }}>Детальные ответы с верифицированными данными на каждый вопрос. Все цифры перепроверены напрямую через аналитическую систему на момент подготовки ответов (апрель 2026).</p>
        </div>

        {/* ═══ ВОПРОС 1 ═══ */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ ...sCard, borderLeft: `4px solid ${C.amber}`, background: `${C.amber}08` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={sBadge(C.amber)}>Вопрос 1</span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: 0, lineHeight: 1.7 }}>
              «Я пока покидаю голосовые, возможно, вы где-то расписали, но я пока не дошла. Но пока не забыла, что озвучу, вдруг, если где-то не сделано. Вот смотрите, рынок косметики растёт, уходовый в том числе. Что именно прям в лидерах? Это пенка, это тонер или что конкретно? И какого конкретно бренда?»
            </p>
          </div>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.green}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={sBadge(C.green)}>Ответ</span>
            </div>

            <div style={{ ...sCard, background: `${C.blue}08`, border: `1px solid ${C.blue}30`, padding: "14px 18px", marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: C.blue, fontWeight: 600, marginBottom: 4 }}>Период данных</div>
              <div style={{ fontSize: 13, color: "#ccc" }}>Все цифры ниже — за <strong style={{ color: C.text }}>февраль 2026</strong> (последний полный месяц в аналитической системе). Источник: RedStat.kz. Данные верифицированы повторно в апреле 2026.</div>
            </div>
            <p style={sP}>Уходовая косметика на Kaspi.kz — это 6 основных ниш. Ниже — по каждой: что это за продукт, какой объём рынка, кто лидер и какой конкретный товар продаётся больше всего.</p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.accent, margin: "24px 0 16px" }}>1. Кремы и сыворотки — крупнейшая ниша (1 712M KZT в феврале 2026)</h3>
            <p style={sP}>Это <strong style={{ color: C.text }}>59% всего уходового рынка</strong>. Сюда входят: увлажняющие кремы, антивозрастные кремы, сыворотки (серумы), SPF-кремы, ночные кремы.</p>
            <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "SKU", "Заказов (фев 2026)", "Продавцов"]} rows={[
              ["1", "Dr. Althea", "142M KZT", "62", "28 901", "67"],
              ["2", "Bioderma", "96M", "60", "11 523", "31"],
              ["3", "Celimax", "89M", "74", "20 542", "68"],
              ["4", "MEDI-PEEL", "63M", "82", "11 701", "44"],
              ["5", "Skin1004", "55M", "89", "15 177", "66"],
            ]} highlight={0} />
            <div style={{ ...sCard, background: `${C.surface}`, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Бестселлер ниши: Dr. Althea 345 Relief Cream 50мл</div>
              <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.8 }}>
                <div>Цена: <strong style={{ color: C.text }}>898 KZT</strong></div>
                <div>Выручка: <strong style={{ color: C.green }}>38.5M KZT/мес</strong> (один SKU = 2.2% всей ниши кремов)</div>
                <div>Продажи: <strong style={{ color: C.text }}>7 966 шт/мес</strong></div>
                <div>Отзывы: <strong style={{ color: C.text }}>4 642</strong> | Рейтинг: <strong style={{ color: C.text }}>4.9</strong></div>
              </div>
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.accent, margin: "28px 0 16px" }}>2. Средства для умывания — #2 ниша (517M KZT в феврале 2026)</h3>
            <p style={sP}>Пенки для умывания, гели, мицеллярная вода, гидрофильные масла.</p>
            <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "Заказов (фев 2026)"]} rows={[
              ["1", "Bioderma", "49M", "7 030"],
              ["2", "Round Lab", "36M", "12 330"],
              ["3", "Celimax", "35M", "8 876"],
              ["4", "Skin1004", "25M", "10 077"],
              ["5", "La Roche-Posay", "21M", "1 894"],
            ]} highlight={1} />
            <div style={{ ...sCard, background: `${C.surface}`, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Бестселлер ниши: Round Lab 1025 Dokdo Cleanser 150мл (пенка)</div>
              <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.8 }}>
                <div>Цена: <strong style={{ color: C.text }}>1 188 KZT</strong></div>
                <div>Выручка: <strong style={{ color: C.green }}>19M KZT/мес</strong></div>
                <div>Продажи: <strong style={{ color: C.text }}>7 711 шт/мес</strong></div>
                <div>Отзывы: <strong style={{ color: C.text }}>6 918</strong> (рекорд среди всех K-beauty SKU) | Рейтинг: <strong style={{ color: C.text }}>4.8</strong></div>
              </div>
              <p style={{ ...sP, fontSize: 12, marginTop: 8, color: C.dim }}>Примечание: Bioderma (#1 по выручке в умывании) лидирует за счёт мицеллярной воды, а не пенки. Round Lab (#2) — лидер именно среди пенок.</p>
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.accent, margin: "28px 0 16px" }}>3. Тоники и тонеры — #3 ниша (290M KZT в феврале 2026)</h3>
            <p style={sP}>Тоники, тонеры, термальная вода, эссенции.</p>
            <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "Доля ниши", "Заказов (фев 2026)"]} rows={[
              ["1", "Celimax", "61M", "21%", "11 016"],
              ["2", "BIDALLI", "14M", "5%", "1 265"],
              ["3", "Paula's Choice", "12M", "4%", "959"],
              ["4", "AXIS-Y", "12M", "4%", "4 799"],
              ["5", "Round Lab", "10M", "3%", "2 425"],
            ]} highlight={0} />
            <div style={{ ...sCard, background: `${C.surface}`, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Бестселлер ниши: Celimax Dual Barrier Toner 150мл</div>
              <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.8 }}>
                <div>Цена: <strong style={{ color: C.text }}>1 977 KZT</strong></div>
                <div>Выручка: <strong style={{ color: C.green }}>31.4M KZT/мес</strong> (10.8% всей ниши тоников!)</div>
                <div>Продажи: <strong style={{ color: C.text }}>5 742 шт/мес</strong></div>
                <div>Отзывы: <strong style={{ color: C.text }}>3 243</strong> | Рейтинг: <strong style={{ color: C.text }}>4.9</strong></div>
              </div>
              <p style={{ ...sP, fontSize: 12, marginTop: 8, color: C.dim }}>Celimax владеет 21% ниши тоников — больше, чем #2 + #3 + #4 вместе взятые.</p>
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.accent, margin: "28px 0 16px" }}>4. Маски для лица — #4 ниша (122M KZT в феврале 2026)</h3>
            <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "Заказов (фев 2026)"]} rows={[
              ["1", "Gegemoon", "13M", "12 950"],
              ["2", "AXIS-Y", "7M", "1 137"],
              ["3", "Skin1004", "6M", "2 488"],
            ]} />
            <p style={sP}>В масках #1 = Gegemoon (китайский бренд). Из портфеля клиента: AXIS-Y (#2) и Skin1004 (#3).</p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.accent, margin: "28px 0 16px" }}>5. Скрабы и пилинги — #5 ниша (64M KZT в феврале 2026)</h3>
            <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "Заказов (фев 2026)"]} rows={[
              ["1", "Celimax", "13M", "2 698"],
              ["2", "Sugarlife", "4M", "1 731"],
              ["3", "MANYO", "4M", "967"],
            ]} />
            <p style={sP}>Celimax лидирует и в скрабах/пилингах.</p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.accent, margin: "28px 0 16px" }}>6. Патчи — самая быстрорастущая ниша (45M KZT в феврале 2026, +114% YoY)</h3>
            <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "Заказов (фев 2026)"]} rows={[
              ["1", "SADOER", "6M", "7 306"],
              ["2", "MeyRim", "4M", "3 216"],
              ["3", "COSRX", "4M", "2 337"],
            ]} />
            <p style={sP}>Патчи = самый быстрый рост (+114% за год). Ниша маленькая (45M), но растёт быстрее всех. COSRX = #3.</p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.green, margin: "32px 0 16px", borderTop: `1px solid ${C.border}`, paddingTop: 24 }}>Итого: что конкретно в лидерах</h3>

            <DataTable headers={["Что", "Выручка ниши (фев 2026)", "Лидер-бренд", "Бестселлер-SKU", "Выручка SKU (фев 2026)", "Отзывы"]} rows={[
              ["Кремы и сыворотки", "1 712M", "Dr. Althea", "345 Relief Cream 50мл", "38.5M/мес", "4 642"],
              ["Пенки для умывания", "517M", "Bioderma / Round Lab", "1025 Dokdo Cleanser 150мл", "19M/мес", "6 918"],
              ["Тоники и тонеры", "290M", "Celimax", "Dual Barrier Toner 150мл", "31.4M/мес", "3 243"],
              ["Маски для лица", "122M", "Gegemoon / AXIS-Y", "—", "—", "—"],
              ["Скрабы и пилинги", "64M", "Celimax", "—", "—", "—"],
              ["Патчи (+114% YoY)", "45M", "SADOER / COSRX", "—", "—", "—"],
            ]} />

            <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 14, margin: "16px 0", fontSize: 14, color: "#ccc", lineHeight: 1.6 }}>
              <strong style={{ color: C.green }}>Короткий ответ: </strong>
              В абсолютных лидерах — <strong style={{ color: C.text }}>кремы</strong> (Dr. Althea, 142M/мес), <strong style={{ color: C.text }}>тоники</strong> (Celimax, 61M/мес), <strong style={{ color: C.text }}>пенки для умывания</strong> (Round Lab, 36M/мес). Конкретные бестселлеры: Dr. Althea 345 Relief (38.5M), Celimax Dual Barrier Toner (31.4M), Round Lab 1025 Dokdo (19M).
            </div>
          </div>
        </div>

        {/* ═══ ВОПРОС 2 ═══ */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ ...sCard, borderLeft: `4px solid ${C.amber}`, background: `${C.amber}08` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={sBadge(C.amber)}>Вопрос 2</span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: 0, lineHeight: 1.7 }}>
              «Также по декоративной косметике. Рынок, например, прирост есть, вот вы мне цифры там есть, что вот, например, там сколько-то тысячи заказов. А из декоративки, например, что именно прям вот в пике, это тушь, то тогда какого именно бренда? Или, например, румяна, то тут какого именно бренда?»
            </p>
          </div>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.green}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={sBadge(C.green)}>Ответ</span>
            </div>

            <div style={{ ...sCard, background: `${C.blue}08`, border: `1px solid ${C.blue}30`, padding: "14px 18px", marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: C.blue, fontWeight: 600, marginBottom: 4 }}>Период данных</div>
              <div style={{ fontSize: 13, color: "#ccc" }}>Выручка и заказы — за <strong style={{ color: C.text }}>февраль 2026</strong>. YoY рост — сравнение суммы за <strong style={{ color: C.text }}>ноябрь 2024 — февраль 2025</strong> vs <strong style={{ color: C.text }}>ноябрь 2025 — февраль 2026</strong> (4 пересекающихся месяца). Источник: RedStat.kz.</div>
            </div>
            <p style={sP}>Декоративная косметика на Kaspi = <strong style={{ color: C.text }}>1 716M KZT/мес</strong> (759 тысяч заказов в феврале 2026). Состоит из 9 ниш. Ниже — каждая ниша с лидером-брендом, ростом YoY и конкретной разбивкой.</p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.accent, margin: "24px 0 16px" }}>Полная картина: 9 ниш декоративной косметики</h3>

            <DataTable headers={["#", "Ниша", "Выручка (фев 2026)", "Заказов (фев 2026)", "YoY (нояб-фев)", "#1 бренд", "Выручка #1"]} rows={[
              ["1", "Тональные средства", "536M", "124 525", "+5%", "RoRoBell", "72M"],
              ["2", "Помады, блески, контуры", "209M", "143 228", "+26%", "Sen Sulu", "26M"],
              ["3", "Румяна, бронзеры", "203M", "56 530", "+66%", "HOURGLASS", "30M"],
              ["4", "Тушь", "149M", "—", "+7%*", "Loreal Paris", "23M"],
              ["5", "Пудры", "116M", "—", "+51%", "Sen Sulu", "24M"],
              ["6", "Тени для век", "97M", "—", "+33%", "Sen Sulu", "18M"],
              ["7", "Корректоры, консилеры", "95M", "—", "+114%", "Sen Sulu", "30M"],
              ["8", "Основы, фиксаторы", "82M", "—", "+56%", "LUXVISAGE", "10M"],
              ["9", "Контур для глаз", "65M", "—", "+66%", "Vivienne Sabo", "7M"],
            ]} highlight={6} />
            <p style={{ ...sP, fontSize: 11, color: C.dim }}>YoY = сравнение суммы за нояб-фев 2024/25 vs 2025/26. *Тушь: данные за ноя 2024 включают аномалию (184M), поэтому рост занижен.</p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.pink, margin: "28px 0 16px" }}>Что растёт быстрее всего</h3>

            <div style={{ ...sCard, borderLeft: `3px solid ${C.green}`, padding: "16px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.green, marginBottom: 8 }}>1. Корректоры и консилеры — +114% YoY (самый быстрый рост!)</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
                <div>Выручка: <strong style={{ color: C.text }}>95M KZT/мес</strong> (было 44M год назад → выросли в 2.1 раза)</div>
                <div>Лидер: <strong style={{ color: C.text }}>Sen Sulu — 30M/мес</strong> (32% ниши!), 7 481 заказ</div>
                <div>#2: Eveline Cosmetics — 10M | #3: Influence — 9M | #4: LUXVISAGE — 6M</div>
              </div>
            </div>

            <div style={{ ...sCard, borderLeft: `3px solid ${C.green}`, padding: "16px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.green, marginBottom: 8 }}>2. Румяна и бронзеры — +66% YoY</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
                <div>Выручка: <strong style={{ color: C.text }}>203M KZT/мес</strong> (было 130M → выросли в 1.6 раза)</div>
                <div>Лидер: <strong style={{ color: C.text }}>HOURGLASS — 30M/мес</strong>, но всего 404 заказа (премиум: ср. чек ~74K!)</div>
                <div>#2: Catrice — 15M (4 806 заказов) | #3: Sen Sulu — 14M | #4: Belor design — 13M</div>
                <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>По количеству заказов лидирует «Без бренда» (12 761) и Belor design (5 395) — масс-маркет.</div>
              </div>
            </div>

            <div style={{ ...sCard, borderLeft: `3px solid ${C.green}`, padding: "16px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.green, marginBottom: 8 }}>3. Контур для глаз — +66% YoY</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
                <div>Выручка: <strong style={{ color: C.text }}>65M KZT/мес</strong></div>
                <div>Лидер: <strong style={{ color: C.text }}>Vivienne Sabo — 7M/мес</strong> (6 369 заказов)</div>
                <div>#2: Sen Sulu — 5M | #3: «Без бренда» — 3M | #4: LUXVISAGE — 3M</div>
              </div>
            </div>

            <div style={{ ...sCard, borderLeft: `3px solid ${C.blue}`, padding: "16px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.blue, marginBottom: 8 }}>4. Пудры — +51% YoY</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
                <div>Выручка: <strong style={{ color: C.text }}>116M KZT/мес</strong></div>
                <div>Лидер: <strong style={{ color: C.text }}>Sen Sulu — 24M/мес</strong> (6 660 заказов)</div>
                <div>#2: RELOUIS — 19M (7 514 заказов) | #3: Ponds — 10M | #4: PUPA — 9M</div>
              </div>
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.accent, margin: "28px 0 16px" }}>Крупнейшие ниши по объёму</h3>

            <div style={{ ...sCard, borderLeft: `3px solid ${C.pink}`, padding: "16px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.pink, marginBottom: 8 }}>Тональные средства — крупнейшая ниша декора (536M), но рост замедлился (+5%)</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
                <div>Лидер: <strong style={{ color: C.text }}>RoRoBell — 72M/мес</strong> (5 102 заказа). Bfadation тональный крем — 3 оттенка по 13-16K KZT.</div>
                <div>#2: PRE MORE — 51M | #3: Eveline Cosmetics — 36M | #4: LUXVISAGE — 31M (15 331 заказ — #1 по объёму!) | #5: Estee Lauder — 28M</div>
                <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>Рост всего +5% YoY — рынок тональных близок к насыщению. По количеству заказов лидирует LUXVISAGE (масс-маркет), по выручке — RoRoBell (премиум).</div>
              </div>
            </div>

            <div style={{ ...sCard, borderLeft: `3px solid ${C.pink}`, padding: "16px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.pink, marginBottom: 8 }}>Помады и блески — #2 по объёму (209M), рост +26%</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
                <div>Лидер: <strong style={{ color: C.text }}>Sen Sulu — 26M/мес</strong> (7 627 заказов)</div>
                <div>#2: LUXVISAGE — 24M (15 291!) | #3: Vivienne Sabo — 19M (15 380!) | #4: Romand — 8M | #5: Maybelline — 8M</div>
                <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>По заказам лидируют Vivienne Sabo и LUXVISAGE (по 15K+ каждый) — масс-маркет. Sen Sulu лидирует по выручке за счёт более высокого чека.</div>
              </div>
            </div>

            <div style={{ ...sCard, borderLeft: `3px solid ${C.pink}`, padding: "16px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.pink, marginBottom: 8 }}>Тушь — 149M, рост умеренный (+7%)</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
                <div>Лидер: <strong style={{ color: C.text }}>Loreal Paris — 23M/мес</strong> (4 287 заказов)</div>
                <div>#2: Herra — 20M (4 965) | #3: LUXVISAGE — 12M (6 460) | #4: RELOUIS — 11M (7 296) | #5: Vivienne Sabo — 11M (8 029)</div>
                <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>По заказам #1 — Vivienne Sabo (8 029). Рынок туши = территория СНГ-брендов и Loreal.</div>
              </div>
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.green, margin: "32px 0 16px", borderTop: `1px solid ${C.border}`, paddingTop: 24 }}>Итого: кто доминирует в декоративке</h3>

            <DataTable headers={["Бренд", "В каких нишах #1", "Суммарная выручка (декор)", "Позиционирование"]} rows={[
              ["Sen Sulu", "Помады, Пудры, Тени, Корректоры", "~135M/мес", "Локальный КЗ, средний чек"],
              ["LUXVISAGE", "Основы/фиксаторы", "~90M/мес (по заказам — #1 в 3 нишах)", "Масс-маркет, СНГ"],
              ["RoRoBell", "Тональные", "~72M/мес", "Премиум тональные"],
              ["Vivienne Sabo", "Контур для глаз", "~50M/мес (по заказам — #1 в 2 нишах)", "Масс-маркет, СНГ"],
              ["HOURGLASS", "Румяна", "~30M/мес", "Ультра-премиум (ср.чек ~74K)"],
              ["Loreal Paris", "Тушь", "~23M/мес", "Глобальный масс-маркет"],
            ]} />

            <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 14, margin: "16px 0", fontSize: 14, color: "#ccc", lineHeight: 1.6 }}>
              <strong style={{ color: C.green }}>Короткий ответ: </strong>
              Самый быстрый рост — <strong style={{ color: C.text }}>корректоры +114%</strong> (Sen Sulu #1), <strong style={{ color: C.text }}>румяна +66%</strong> (HOURGLASS #1 по выручке, Catrice #1 по объёму), <strong style={{ color: C.text }}>пудры +51%</strong> (Sen Sulu #1). Крупнейшая ниша — <strong style={{ color: C.text }}>тональные (536M)</strong>, но рост замедлился до +5%. Тушь = Loreal Paris #1 (23M), рост +7%. Доминант всей декоративки — <strong style={{ color: C.text }}>Sen Sulu</strong> (#1 в 4 из 9 ниш, ~135M суммарно).
            </div>
          </div>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div style={{ padding: "20px 24px", background: `${C.accent}08`, borderRadius: 12, border: `1px solid ${C.accent}30` }}>
          <p style={{ ...sP, margin: "0 0 8px", fontSize: 13, color: C.dim }}>
            Все цифры верифицированы напрямую через аналитическую систему. Данные: <strong style={{ color: C.text }}>февраль 2026</strong>.
          </p>
          <p style={{ ...sP, margin: 0, fontSize: 13, color: C.dim }}>
            Источник данных: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none", fontWeight: 600 }}>RedStat.kz</a>
          </p>
        </div>

      </div>
    </div>
  );
}
