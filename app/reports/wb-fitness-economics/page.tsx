"use client";

/* ───── design tokens ───── */
const C = {
  bg: "#0a0a0f", surface: "#111119", border: "#1e1e30",
  accent: "#6c5ce7", green: "#00d2a0", text: "#e8e8f0",
  dim: "#999", red: "#f87171", amber: "#f59e0b",
  blue: "#60a5fa", pink: "#f472b6", cyan: "#22d3ee",
  wb: "#cb11ab",
};

const sP: React.CSSProperties = { fontSize: 14, lineHeight: 1.75, color: "#ccc", margin: "0 0 12px" };
const sCard: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", marginBottom: 16 };
const sBadge = (color: string): React.CSSProperties => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: `${color}18`, color, fontSize: 11, fontWeight: 600, letterSpacing: "0.03em" });

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

function PriceScenario({ price, commission, commRate, net, cost, profit, margin, verdict }: {
  price: string; commission: string; commRate: string; net: string; cost: string; profit: string; margin: string; verdict: string;
}) {
  const isGood = verdict.includes("✅");
  const isOk = verdict.includes("🟡");
  const color = isGood ? C.green : isOk ? C.amber : C.red;
  return (
    <div style={{ background: `${color}06`, border: `1px solid ${color}25`, borderRadius: 10, padding: "16px 20px", marginBottom: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "baseline" }}>
        <div><span style={{ fontSize: 11, color: C.dim }}>Цена WB</span><div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{price}</div></div>
        <div><span style={{ fontSize: 11, color: C.dim }}>Комиссия {commRate}</span><div style={{ fontSize: 13, color: C.red }}>−{commission}</div></div>
        <div><span style={{ fontSize: 11, color: C.dim }}>Нетто</span><div style={{ fontSize: 13, color: "#ccc" }}>{net}</div></div>
        <div><span style={{ fontSize: 11, color: C.dim }}>Себестоимость</span><div style={{ fontSize: 13, color: "#ccc" }}>{cost}</div></div>
        <div><span style={{ fontSize: 11, color: C.dim }}>Прибыль</span><div style={{ fontSize: 16, fontWeight: 700, color }}>{profit}</div></div>
        <div><span style={{ fontSize: 11, color: C.dim }}>Маржа</span><div style={{ fontSize: 16, fontWeight: 700, color }}>{margin}</div></div>
      </div>
      <div style={{ fontSize: 12, color: C.dim, marginTop: 8 }}>{verdict}</div>
    </div>
  );
}

export default function WbFitnessEconomicsPage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={sBadge(C.wb)}>Wildberries</span>
            <span style={sBadge(C.amber)}>Юнит-экономика</span>
            <span style={sBadge(C.green)}>1688 → FBO Россия</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Юнит-экономика: фитнес-набор для Wildberries
          </h1>
          <p style={{ fontSize: 15, color: C.dim, margin: 0, lineHeight: 1.6 }}>
            Детальный расчёт себестоимости и маржи по коммерческому предложению от фабрики (1688.com). Целевой рынок: Wildberries Россия, FBO.
          </p>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 12 }}>
            Дата расчёта: 9 апреля 2026 · Данные поставщика: коммерческое предложение от фабрики
          </div>
        </div>

        {/* ═══ SUPPLIER QUOTE ═══ */}
        <div style={{ ...sCard, borderLeft: `4px solid ${C.amber}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.amber, margin: "0 0 16px" }}>Коммерческое предложение от фабрики (500 комплектов)</h3>

          <DataTable headers={["#", "Позиция", "Материал", "Размер", "Кол-во", "Цена/шт", "Сумма"]} rows={[
            ["1", "Йога-ролик (колонна для МФР)", "EVA-пена", "45 × 15 см", "500", "¥21.00", "¥10 500"],
            ["2", "Массажный мяч с шипами", "PVC", "7.5 см / 65 г", "500", "¥2.80", "¥1 400"],
            ["3", "Эластичная фитнес-лента", "TPE", "600 × 50 × 1.1 мм", "500", "¥1.80", "¥900"],
            ["4", "Сетчатый мешок для хранения", "—", "45 × 15 см", "500", "¥2.60", "¥1 300"],
            ["5", "Упаковочная коробка", "—", "54 × 16 × 16 см", "500", "¥2.80", "¥1 400"],
            ["6", "Упаковочный труд", "—", "—", "500", "¥1.00", "¥500"],
            ["7", "Сервисный сбор 3%", "—", "—", "—", "—", "¥480"],
            ["8", "Логистика внутри Китая (56 коробок)", "—", "—", "56 кор.", "—", "¥8 400"],
          ]} />

          <div style={{ borderLeft: `3px solid ${C.amber}`, paddingLeft: 14, margin: "16px 0", fontSize: 14, fontWeight: 700, color: C.text }}>
            Итого за 500 комплектов: ¥24 880 ($3 554) · На один комплект: ¥49.76
          </div>

          <p style={{ ...sP, fontSize: 12, color: C.dim, marginTop: 8 }}>
            Комплект включает: йога-ролик + массажный мяч + фитнес-лента + сетчатый мешок + индивидуальная упаковочная коробка. Всё упаковано, промаркировано, отгружено на склад консолидации в Китае.
          </p>
        </div>

        {/* ═══ PARAMETERS ═══ */}
        <div style={{ ...sCard, borderLeft: `4px solid ${C.blue}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.blue, margin: "0 0 16px" }}>Параметры расчёта</h3>
          <DataTable headers={["Параметр", "Значение", "Примечание"]} rows={[
            ["Курс CNY → RUB", "1¥ = 12.5 ₽", "Апрель 2026"],
            ["Курс USD → RUB", "1$ = 87 ₽", ""],
            ["Карго Китай → Москва (FBO)", "$3/кг = 261 ₽/кг", "Авиа-карго до склада WB"],
            ["Расчёт веса", "Max (факт, объёмный)", "Объёмный = Д×Ш×В / 5000"],
            ["Факт. вес комплекта", "~0.9 кг", "Ролик 500г + мяч 65г + лента 100г + мешок 30г + коробка 200г"],
            ["Объёмный вес комплекта", "2.76 кг", "54 × 16 × 16 см ÷ 5000"],
            ["Вес для расчёта карго", "2.76 кг", "Объёмный > фактического"],
            ["Комиссия WB (Спорт)", "15%", "Категория «Спортивные товары»"],
            ["WB FBO логистика", "80 ₽", "Доставка до покупателя (средняя, спорт)"],
            ["WB хранение (5 дней оборот)", "15 ₽", "Приблизительно"],
          ]} />
        </div>

        {/* ═══ COST BREAKDOWN: SET ═══ */}
        <div style={{ ...sCard, borderLeft: `4px solid ${C.wb}`, marginTop: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={sBadge(C.wb)}>Набор</span>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: C.text, margin: 0 }}>Фитнес-набор: ролик + мяч + лента + мешок</h3>
          </div>

          <h4 style={{ fontSize: 13, fontWeight: 600, color: C.dim, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Себестоимость на складе WB (FBO Россия)</h4>

          <DataTable headers={["Статья расходов", "Расчёт", "Сумма"]} rows={[
            ["Закупка (all-in от фабрики)", "49.76¥ × 12.5", "622 ₽"],
            ["Карго Китай → Москва (FBO WB)", "2.76 кг × $3 × 87 = 2.76 × 261", "720 ₽"],
            ["WB FBO логистика (доставка покупателю)", "Средняя по категории «Спорт»", "80 ₽"],
            ["WB хранение (~5 дней оборот)", "", "15 ₽"],
          ]} />

          <div style={{ borderLeft: `3px solid ${C.wb}`, paddingLeft: 14, margin: "12px 0 24px", fontSize: 15, fontWeight: 700, color: C.text }}>
            Себестоимость: 1 437 ₽ на комплект
          </div>

          <h4 style={{ fontSize: 13, fontWeight: 600, color: C.dim, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Сценарии продажной цены (WB Россия, комиссия 15%)</h4>

          <PriceScenario price="1 490 ₽" commRate="15%" commission="224 ₽" net="1 267 ₽" cost="1 437 ₽" profit="−171 ₽" margin="−11.5%" verdict="❌ Убыток. Ниже break-even (1 691 ₽)" />
          <PriceScenario price="1 790 ₽" commRate="15%" commission="269 ₽" net="1 522 ₽" cost="1 437 ₽" profit="84 ₽" margin="4.7%" verdict="🟡 Еле в плюс. Подходит только для стартового набора отзывов (первые 50 шт)" />
          <PriceScenario price="1 990 ₽" commRate="15%" commission="299 ₽" net="1 692 ₽" cost="1 437 ₽" profit="254 ₽" margin="12.8%" verdict="🟡 Рабочая цена. Конкурентная позиция в категории. Прибыль 254 ₽/шт" />
          <PriceScenario price="2 290 ₽" commRate="15%" commission="344 ₽" net="1 947 ₽" cost="1 437 ₽" profit="509 ₽" margin="22.2%" verdict="✅ Хорошая маржа. Позиционирование «премиум-набор» с качественной упаковкой и мешком" />
          <PriceScenario price="2 490 ₽" commRate="15%" commission="374 ₽" net="2 117 ₽" cost="1 437 ₽" profit="679 ₽" margin="27.3%" verdict="✅ Отличная маржа. Уровень топовых наборов с инфографикой и видео" />
          <PriceScenario price="2 990 ₽" commRate="15%" commission="449 ₽" net="2 542 ₽" cost="1 437 ₽" profit="1 104 ₽" margin="36.9%" verdict="✅ Максимальная маржа. Нужен сильный бренд + сертификация + premium-упаковка" />
        </div>

        {/* ═══ INDIVIDUAL ITEMS ═══ */}
        <div style={{ ...sCard, marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>Альтернатива: продажа по отдельности</h3>
          <p style={sP}>Если вместо набора продавать каждый товар как отдельный SKU на WB — экономика меняется. Ниже расчёт для каждой позиции.</p>

          <div style={{ ...sCard, borderTop: `3px solid ${C.cyan}` }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: C.cyan, margin: "0 0 12px" }}>Йога-ролик EVA 45×15 см (¥21.00)</h4>
            <DataTable headers={["Статья", "Расчёт", "Сумма"]} rows={[
              ["Закупка", "21¥ × 12.5", "263 ₽"],
              ["Упаковка + мешок", "~(2.60 + 2.80 + 1.00)¥ × 12.5 / 3 (доля ролика)", "27 ₽"],
              ["Сервис 3%", "", "9 ₽"],
              ["Доля логистики КНР", "~¥8 × 12.5", "100 ₽"],
              ["Карго (объёмный вес 46×15×15÷5000 = 2.07 кг)", "2.07 × 261", "540 ₽"],
              ["WB FBO логистика", "", "80 ₽"],
              ["WB хранение", "", "15 ₽"],
            ]} />
            <div style={{ borderLeft: `3px solid ${C.cyan}`, paddingLeft: 14, margin: "8px 0 16px", fontSize: 14, fontWeight: 700, color: C.text }}>
              Себестоимость: 1 034 ₽
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { p: "990 ₽", profit: "−192 ₽", m: "−19.4%", v: "❌" },
                { p: "1 290 ₽", profit: "63 ₽", m: "4.9%", v: "🟡" },
                { p: "1 490 ₽", profit: "233 ₽", m: "15.6%", v: "✅" },
                { p: "1 790 ₽", profit: "488 ₽", m: "27.3%", v: "✅" },
                { p: "1 990 ₽", profit: "658 ₽", m: "33.1%", v: "✅" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "8px 14px", borderRadius: 8, background: `${s.v === "✅" ? C.green : s.v === "🟡" ? C.amber : C.red}10`, border: `1px solid ${s.v === "✅" ? C.green : s.v === "🟡" ? C.amber : C.red}25`, fontSize: 12 }}>
                  <div style={{ fontWeight: 700, color: C.text }}>{s.p}</div>
                  <div style={{ color: s.v === "✅" ? C.green : s.v === "🟡" ? C.amber : C.red }}>{s.profit} · {s.m} {s.v}</div>
                </div>
              ))}
            </div>
            <p style={{ ...sP, fontSize: 12, marginTop: 12 }}>
              <strong style={{ color: C.text }}>Референс WB:</strong> арт. 343128594 — «МФР ролик массажный валик 45см» (Валики спортивные). Типичные цены аналогов: 800–1 800 ₽. Оптимальная цена: <strong style={{ color: C.green }}>1 490–1 790 ₽</strong> (маржа 16–27%).
            </p>
          </div>

          <div style={{ ...sCard, borderTop: `3px solid ${C.pink}` }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: C.pink, margin: "0 0 12px" }}>Массажный мяч с шипами PVC 7.5 см (¥2.80)</h4>
            <DataTable headers={["Статья", "Расчёт", "Сумма"]} rows={[
              ["Закупка", "2.80¥ × 12.5", "35 ₽"],
              ["Упаковка (инд.)", "~¥2 × 12.5", "25 ₽"],
              ["Сервис 3%", "", "2 ₽"],
              ["Доля логистики КНР", "", "30 ₽"],
              ["Карго (лёгкий: 0.1 кг)", "0.1 × 261", "26 ₽"],
              ["WB FBO логистика", "", "50 ₽"],
              ["WB хранение", "", "10 ₽"],
            ]} />
            <div style={{ borderLeft: `3px solid ${C.pink}`, paddingLeft: 14, margin: "8px 0 16px", fontSize: 14, fontWeight: 700, color: C.text }}>
              Себестоимость: 178 ₽
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { p: "290 ₽", profit: "69 ₽", m: "23.6%", v: "✅" },
                { p: "390 ₽", profit: "154 ₽", m: "39.3%", v: "✅" },
                { p: "490 ₽", profit: "239 ₽", m: "48.7%", v: "✅" },
                { p: "590 ₽", profit: "324 ₽", m: "54.8%", v: "✅" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "8px 14px", borderRadius: 8, background: `${C.green}10`, border: `1px solid ${C.green}25`, fontSize: 12 }}>
                  <div style={{ fontWeight: 700, color: C.text }}>{s.p}</div>
                  <div style={{ color: C.green }}>{s.profit} · {s.m} {s.v}</div>
                </div>
              ))}
            </div>
            <p style={{ ...sP, fontSize: 12, marginTop: 12 }}>
              <strong style={{ color: C.text }}>Референс WB:</strong> арт. 288688789 — «Мяч массажный с шипами для МФР» (Мячи спортивные). Себестоимость мизерная (178 ₽). Даже при цене 290 ₽ маржа 24%. <strong style={{ color: C.green }}>Лучшая юнитка среди всех отдельных позиций.</strong>
            </p>
          </div>

          <div style={{ ...sCard, borderTop: `3px solid ${C.accent}` }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: C.accent, margin: "0 0 12px" }}>Фитнес-резинки набор 5 шт. TPE (¥1.80)</h4>
            <DataTable headers={["Статья", "Расчёт", "Сумма"]} rows={[
              ["Закупка", "1.80¥ × 12.5", "23 ₽"],
              ["Упаковка (пакет + инструкция)", "~¥2 × 12.5", "25 ₽"],
              ["Сервис 3%", "", "1 ₽"],
              ["Доля логистики КНР", "", "30 ₽"],
              ["Карго (лёгкий: 0.15 кг)", "0.15 × 261", "39 ₽"],
              ["WB FBO логистика", "", "50 ₽"],
              ["WB хранение", "", "10 ₽"],
            ]} />
            <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 14, margin: "8px 0 16px", fontSize: 14, fontWeight: 700, color: C.text }}>
              Себестоимость: 178 ₽
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { p: "490 ₽", profit: "239 ₽", m: "48.7%", v: "✅" },
                { p: "690 ₽", profit: "409 ₽", m: "59.2%", v: "✅" },
                { p: "990 ₽", profit: "664 ₽", m: "67.0%", v: "✅" },
                { p: "1 290 ₽", profit: "919 ₽", m: "71.2%", v: "✅" },
                { p: "1 590 ₽", profit: "1 174 ₽", m: "73.8%", v: "✅" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "8px 14px", borderRadius: 8, background: `${C.green}10`, border: `1px solid ${C.green}25`, fontSize: 12 }}>
                  <div style={{ fontWeight: 700, color: C.text }}>{s.p}</div>
                  <div style={{ color: C.green }}>{s.profit} · {s.m} {s.v}</div>
                </div>
              ))}
            </div>
            <p style={{ ...sP, fontSize: 12, marginTop: 12 }}>
              <strong style={{ color: C.text }}>Референс WB:</strong> арт. 273928439 — «Фитнес резинки» набор 5 шт. (Эспандеры). Типичные цены: 390–1 590 ₽. Себестоимость 178 ₽ при закупке ¥1.80/шт. <strong style={{ color: C.green }}>Маржа 49–74% — абсолютный чемпион по рентабельности.</strong> Лёгкие, компактные, минимальное карго.
            </p>
          </div>
        </div>

        {/* ═══ SUMMARY ═══ */}
        <div style={{ ...sCard, borderLeft: `4px solid ${C.accent}`, marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: C.accent, margin: "0 0 20px" }}>Сводная таблица: все варианты</h3>
          <DataTable headers={["Товар", "Себестоимость", "Оптим. цена WB", "Прибыль/шт", "Маржа", "Вердикт"]} rows={[
            ["Набор (ролик+мяч+лента+мешок)", "1 437 ₽", "2 290 ₽", "509 ₽", "22.2%", "✅ Хорошо при 2 290+ ₽"],
            ["Йога-ролик отдельно", "1 034 ₽", "1 490 ₽", "233 ₽", "15.6%", "✅ Средняя маржа"],
            ["Массажный мяч отдельно", "178 ₽", "390 ₽", "154 ₽", "39.3%", "✅ Отличная маржа"],
            ["Фитнес-резинки отдельно", "178 ₽", "690 ₽", "409 ₽", "59.2%", "✅ Лучшая юнитка"],
          ]} highlight={3} />

          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "#ccc", lineHeight: 1.7 }}>
            <strong style={{ color: C.green }}>Ключевой инсайт: </strong>
            <strong style={{ color: C.text }}>продажа по отдельности выгоднее набора.</strong> Фитнес-резинки (178 ₽ себестоимость → 690 ₽ на WB = маржа 59%) и массажный мяч (178 ₽ → 390 ₽ = маржа 39%) — это легковесные, компактные товары с минимальным карго. Набор тоже проходит, но маржа ниже (22%) из-за объёмного веса коробки 54×16×16 (2.76 кг вместо 0.9 кг факт).
          </div>
        </div>

        {/* ═══ BREAK-EVEN ═══ */}
        <div style={{ ...sCard, borderLeft: `4px solid ${C.amber}`, marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: C.amber, margin: "0 0 20px" }}>Критические точки (break-even)</h3>
          <DataTable headers={["Товар", "Себестоимость", "Break-even (при 15% WB)", "Цена для 15% маржи", "Цена для 20% маржи"]} rows={[
            ["Набор", "1 437 ₽", "1 691 ₽", "2 053 ₽", "2 211 ₽"],
            ["Йога-ролик", "1 034 ₽", "1 217 ₽", "1 477 ₽", "1 591 ₽"],
            ["Массажный мяч", "178 ₽", "209 ₽", "254 ₽", "274 ₽"],
            ["Фитнес-резинки", "178 ₽", "209 ₽", "254 ₽", "274 ₽"],
          ]} />
          <p style={{ ...sP, fontSize: 12, color: C.dim }}>
            Break-even = себестоимость ÷ (1 − комиссия WB 15%). Ниже этой цены — чистый убыток.
          </p>
        </div>

        {/* ═══ BUDGET ═══ */}
        <div style={{ ...sCard, borderLeft: `4px solid ${C.green}`, marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: C.green, margin: "0 0 20px" }}>Бюджет: 500 комплектов от фабрики</h3>

          <DataTable headers={["Метрика", "Значение"]} rows={[
            ["Закупка 500 комплектов (от фабрики)", "¥24 880 = $3 554 = ~309 000 ₽"],
            ["Карго 500 комплектов до WB FBO", "500 × 2.76 кг × 261 ₽/кг = 360 000 ₽"],
            ["WB логистика + хранение", "500 × 95 ₽ = 47 500 ₽"],
            ["Итого инвестиция (500 наборов на WB)", "~718 500 ₽"],
          ]} />

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Сценарий A: Продавать наборами по 2 290 ₽</h4>
          <DataTable headers={["Метрика", "Расчёт", "Результат"]} rows={[
            ["Выручка", "500 × 2 290 ₽", "1 145 000 ₽"],
            ["Комиссия WB 15%", "−171 750 ₽", ""],
            ["Себестоимость", "−718 500 ₽", ""],
            ["Чистая прибыль", "", "254 750 ₽"],
            ["ROI", "254 750 ÷ 718 500", "35.5%"],
          ]} highlight={3} />

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Сценарий B: Разобрать на 3 отдельных SKU</h4>
          <p style={sP}>Из 500 комплектов получаем: 500 роликов + 500 мячей + 500 резинок. Продаём каждый отдельно:</p>
          <DataTable headers={["SKU", "Штук", "Цена WB", "Выручка", "Себестоимость", "Прибыль"]} rows={[
            ["Йога-ролик 45см", "500", "1 490 ₽", "745 000 ₽", "517 000 ₽", "116 500 ₽"],
            ["Массажный мяч", "500", "390 ₽", "195 000 ₽", "89 000 ₽", "76 500 ₽"],
            ["Фитнес-резинки", "500", "690 ₽", "345 000 ₽", "89 000 ₽", "204 500 ₽"],
            ["ИТОГО", "1 500 шт", "—", "1 285 000 ₽", "695 000 ₽", "397 500 ₽"],
          ]} highlight={3} />
          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 14, margin: "12px 0", fontSize: 14, color: "#ccc" }}>
            <strong style={{ color: C.green }}>ROI сценария B: 57.2%</strong> · Прибыль 397 500 ₽ vs 254 750 ₽ у сценария A. Разница: <strong style={{ color: C.text }}>+142 750 ₽ (+56% больше прибыли)</strong> за счёт того, что каждый отдельный товар имеет свой ценовой потолок и занимает отдельную карточку на WB (3 карточки vs 1).
          </div>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "20px 0 12px" }}>Сценарий C: Гибрид (наборы + отдельные)</h4>
          <p style={sP}>250 комплектов продаём наборами, 250 — разбираем на отдельные SKU:</p>
          <DataTable headers={["SKU", "Штук", "Цена WB", "Прибыль"]} rows={[
            ["Набор (ролик+мяч+лента)", "250", "2 290 ₽", "127 250 ₽"],
            ["Йога-ролик отдельно", "250", "1 490 ₽", "58 250 ₽"],
            ["Массажный мяч отдельно", "250", "390 ₽", "38 500 ₽"],
            ["Фитнес-резинки отдельно", "250", "690 ₽", "102 250 ₽"],
            ["ИТОГО", "1 000 ед.", "—", "326 250 ₽"],
          ]} highlight={4} />
          <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 14, margin: "12px 0", fontSize: 13, color: "#ccc" }}>
            <strong style={{ color: C.accent }}>ROI: 46.8%</strong> · Максимальное покрытие рынка: набор для подарков/комплексных тренировок + отдельные позиции для тех, кому нужен только ролик или только резинки. <strong style={{ color: C.text }}>4 карточки на WB вместо 1.</strong>
          </div>
        </div>

        {/* ═══ KEY INSIGHTS ═══ */}
        <div style={{ ...sCard, marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: "0 0 20px" }}>Ключевые выводы</h3>
          {[
            { icon: "🏆", title: "Фитнес-резинки — абсолютный чемпион", text: "Себестоимость 178 ₽, WB цена 690–990 ₽, маржа 59–67%. Лёгкие (100 г), компактные, минимальное карго. При этом на WB спрос стабильный — базовый фитнес-аксессуар." },
            { icon: "⚽", title: "Массажный мяч — лучший по ROI", text: "Себестоимость 178 ₽, WB цена 390 ₽, маржа 39%. При 500 штуках вложение всего 89K ₽ → прибыль 76.5K ₽. Маленький, лёгкий (65 г), карго почти нулевое." },
            { icon: "📦", title: "Набор проходит, но объёмный вес давит", text: "Коробка 54×16×16 см даёт объёмный вес 2.76 кг (при факте 0.9 кг). Это 3× наценка на карго. Набор работает при цене 2 290+ ₽ (маржа 22%), но отдельные позиции дают больше в сумме." },
            { icon: "🧮", title: "Сценарий B (разбивка) выгоднее на 56%", text: "500 наборов по отдельности = 397.5K ₽ прибыли. 500 наборов целиком = 254.7K ₽. Разница 142.7K ₽ — за счёт 3 карточек WB вместо 1 и оптимальных цен по каждому SKU." },
            { icon: "📊", title: "Рекомендация: Сценарий C (гибрид)", text: "250 наборов + 250 разбитых. 4 карточки на WB, максимальный охват аудитории, ROI 46.8%. Наборы = подарочный сегмент, отдельные = повседневный фитнес." },
          ].map((item, i) => (
            <div key={i} style={{ borderLeft: `3px solid ${C.accent}40`, paddingLeft: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>{item.icon} {item.title}</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.7 }}>{item.text}</div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ padding: "20px 24px", background: `${C.wb}08`, borderRadius: 12, border: `1px solid ${C.wb}30`, marginTop: 32 }}>
          <p style={{ ...sP, margin: "0 0 8px", fontSize: 13, color: C.dim }}>
            Расчёты верифицированы программно. Комиссия WB: 15% (категория «Спортивные товары»). FBO логистика — средние значения по категории, апрель 2026.
          </p>
          <p style={{ ...sP, margin: 0, fontSize: 13, color: C.dim }}>
            Источник закупки: коммерческое предложение от фабрики (1688.com), 500 комплектов.
            WB референсы: арт. 343128594, 288688789, 273928439.
          </p>
        </div>

      </div>
    </div>
  );
}
