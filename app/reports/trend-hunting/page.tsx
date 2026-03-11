"use client";

import { useState } from "react";
import Link from "next/link";

/* ───── design tokens ───── */
const C = {
  bg: "#0a0a0f", surface: "#111119", border: "#1e1e30",
  accent: "#6c5ce7", green: "#00d2a0", text: "#e8e8f0",
  dim: "#999", faint: "#444", red: "#f87171", amber: "#f59e0b",
  blue: "#60a5fa", pink: "#f472b6", cyan: "#22d3ee",
};

/* ───── style helpers ───── */
const sSection: React.CSSProperties = { marginBottom: 56 };
const sH2: React.CSSProperties = { fontSize: 22, fontWeight: 700, margin: "0 0 24px", color: C.text, letterSpacing: "-0.01em", borderBottom: `1px solid ${C.border}`, paddingBottom: 12 };
const sH3: React.CSSProperties = { fontSize: 16, fontWeight: 600, margin: "28px 0 12px", color: C.text };
const sP: React.CSSProperties = { fontSize: 14, lineHeight: 1.75, color: "#ccc", margin: "0 0 12px" };
const sCard: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", marginBottom: 16 };

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
            <th key={i} style={{ padding: "10px 12px", textAlign: i === 0 ? "left" : "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 11 }}>{h}</th>
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

/* ───── Tool Card ───── */
function ToolCard({ name, url, type, price, desc, features }: { name: string; url: string; type: string; price: string; desc: string; features: string[] }) {
  return (
    <div style={{ ...sCard, borderLeft: `3px solid ${C.accent}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
        <div>
          <div style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>{name}</div>
          <span style={{ fontSize: 11, color: C.dim }}>{url}</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: `${C.accent}18`, color: C.accent, fontWeight: 600 }}>{type}</span>
          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: `${C.green}18`, color: C.green, fontWeight: 600 }}>{price}</span>
        </div>
      </div>
      <p style={{ ...sP, margin: "0 0 8px" }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {features.map((f, i) => (
          <span key={i} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: `${C.faint}33`, color: C.dim }}>{f}</span>
        ))}
      </div>
    </div>
  );
}

/* ───── Step Card ───── */
function StepCard({ num, title, desc, color, items }: { num: number; title: string; desc: string; color: string; items: string[] }) {
  return (
    <div style={{ ...sCard, borderTop: `2px solid ${color}` }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: `${color}22`, color, fontSize: 15, fontWeight: 700, flexShrink: 0 }}>{num}</span>
        <div>
          <div style={{ fontWeight: 700, color, fontSize: 15 }}>{title}</div>
          <p style={{ ...sP, margin: "4px 0 0" }}>{desc}</p>
        </div>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 6, paddingLeft: 46 }}>
          <span style={{ width: 5, height: 5, borderRadius: 1, background: color, flexShrink: 0, marginTop: 7 }} />
          <span style={{ ...sP, margin: 0 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*                  MAIN PAGE                      */
/* ═══════════════════════════════════════════════ */
export default function TrendHuntingGuide() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ═══ Header ═══ */}
        <div style={{ marginBottom: 16 }}>
          <Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; akasymzhanov.com</Link>
        </div>

        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, background: `${C.accent}18`, color: C.accent, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", marginBottom: 16, textTransform: "uppercase" }}>
            Enterprise Guide
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Поиск трендовых товаров<br />и новинок для маркетплейсов
          </h1>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong> для участников <strong style={{ color: C.text }}>10b.kz</strong>
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim }}>
            <span>Актуально: <strong style={{ color: C.text }}>Март 2026</strong></span>
            <span>Рынки: <strong style={{ color: C.text }}>Amazon, Kaspi, Wildberries</strong></span>
          </div>
        </div>

        {/* ═══ TOC ═══ */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["sec-1", "1. Философия: Как думать о трендах"],
            ["sec-2", "2. Воронка поиска: От идеи до закупки"],
            ["sec-3", "3. Западные рынки: Amazon и Shopify"],
            ["sec-4", "4. Социальные сигналы: TikTok, Reddit, UGC"],
            ["sec-5", "5. Аналитические инструменты: Тренд-радары"],
            ["sec-6", "6. СНГ: Kaspi.kz и Wildberries"],
            ["sec-7", "7. Amazing.com: Практический разбор"],
            ["sec-8", "8. Методы валидации товара"],
            ["sec-9", "9. Сезонность и тайминг"],
            ["sec-10", "10. Чеклист: Пошаговый алгоритм"],
            ["sec-11", "11. Полный стек инструментов"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", fontSize: 13, color: C.accent, textDecoration: "none", padding: "4px 0" }}>{label}</a>
          ))}
        </div>

        {/* ═══ Section 1: Philosophy ═══ */}
        <Section id="sec-1" title="1. Философия: Как думать о трендах">
          <div style={{ ...sCard, borderColor: C.green, borderWidth: 2 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green, fontSize: 18 }}>Главный принцип</h3>
            <p style={sP}>
              <strong style={{ color: C.text }}>Тренд — не угадывание. Тренд — это данные.</strong> Ключ не в интуиции, а в системном подходе: мониторинг западных рынков, валидация через метрики, адаптация на СНГ.
            </p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Откуда приходят тренды</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { stage: "Зарождение", where: "Kickstarter, Indiegogo, ProductHunt", time: "6-12 мес до массового рынка", color: C.cyan },
                { stage: "Ранний рост", where: "Amazon US/EU, TikTok Shop US", time: "3-6 мес до СНГ", color: C.blue },
                { stage: "Вирусный пик", where: "TikTok/Instagram Reels, Reddit", time: "1-3 мес до СНГ", color: C.pink },
                { stage: "Массовый рынок", where: "AliExpress, 1688.com", time: "Готово к закупке", color: C.amber },
                { stage: "Локальная адаптация", where: "Kaspi.kz, Wildberries", time: "Момент входа", color: C.green },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ width: 120, flexShrink: 0 }}>
                    <div style={{ fontWeight: 600, color: s.color, fontSize: 13 }}>{s.stage}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: C.text }}>{s.where}</div>
                    <div style={{ fontSize: 11, color: C.dim }}>{s.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...sCard }}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Два типа трендов</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ padding: 16, borderRadius: 8, background: `${C.green}08`, border: `1px solid ${C.green}22` }}>
                <div style={{ fontWeight: 700, color: C.green, marginBottom: 8, fontSize: 14 }}>Сезонные волны</div>
                <p style={{ ...sP, margin: 0 }}>Повторяются каждый год: летние товары, школьный сезон, Новый год. Предсказуемы через Google Trends и историю продаж. Подготовка за 2-3 месяца до пика.</p>
              </div>
              <div style={{ padding: 16, borderRadius: 8, background: `${C.accent}08`, border: `1px solid ${C.accent}22` }}>
                <div style={{ fontWeight: 700, color: C.accent, marginBottom: 8, fontSize: 14 }}>Новинки и хайпы</div>
                <p style={{ ...sP, margin: 0 }}>Новые продукты, вирусные товары с TikTok, инновации с Amazon. Окно входа — 1-4 месяца. Кто первый на рынке СНГ, тот забирает сливки.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ Section 2: Funnel ═══ */}
        <Section id="sec-2" title="2. Воронка поиска: От идеи до закупки">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <StepCard num={1} title="Генерация идей" desc="Собираем 50-100 потенциальных товаров из разных источников" color={C.cyan} items={[
              "Amazon Best Sellers + Movers & Shakers — ежедневный мониторинг",
              "TikTok #TikTokMadeMeBuyIt + #TikTokShopFinds — вирусные товары",
              "Shopify Spy-инструменты — что продают успешные DTC-бренды",
              "Reddit r/AmazonSeller, r/ecommerce — реальные кейсы продавцов",
              "Exploding Topics / Glimpse — тренды до массового рынка",
              "Google Trends — растущие поисковые запросы",
              "Amazing.com Breakout Radar — AI-предсказание трендов Amazon",
            ]} />
            <StepCard num={2} title="Первичный фильтр" desc="Из 100 идей оставляем 10-15 перспективных" color={C.blue} items={[
              "Есть ли растущий спрос? (Google Trends: линия вверх, не пик и спад)",
              "Средний чек $15-70 (оптимальный диапазон для маржи)",
              "Не слишком сезонный (или вы готовы к сезону заранее)",
              "Можно улучшить? (читаем негативные отзывы на Amazon — 1-3 звезды)",
              "Можно брендировать? (упаковка, дизайн, инструкция на русском/казахском)",
            ]} />
            <StepCard num={3} title="Глубокая валидация" desc="10-15 товаров проверяем по метрикам" color={C.green} items={[
              "Amazon BSR, количество продаж/мес (Jungle Scout / Helium 10 / Amazing)",
              "Конкуренция: количество отзывов у ТОП-10 (< 500 отзывов = вход реален)",
              "Маржа: цена продажи - себестоимость - доставка - комиссия > 30%",
              "Проверка на Kaspi/WB: есть ли уже? Сколько продавцов? Какие цены?",
              "Redstat.kz: выручка ниши, Gini (< 0.7), доля NoBrand",
            ]} />
            <StepCard num={4} title="Тест и закупка" desc="3-5 финалистов: заказываем образцы" color={C.amber} items={[
              "Образцы с Alibaba/1688 — проверка качества",
              "Тестовая партия 50-200 шт — проверка спроса",
              "Фото + карточка товара — профессиональный контент",
              "Запуск на Kaspi/WB — первые продажи и отзывы",
            ]} />
          </div>
        </Section>

        {/* ═══ Section 3: Western Markets ═══ */}
        <Section id="sec-3" title="3. Западные рынки: Amazon и Shopify">

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.amber }}>Amazon — главный источник трендов</h3>
            <p style={sP}>Amazon US — крупнейший ecommerce-рынок мира. Тренды с Amazon приходят на рынки СНГ с задержкой 3-6 месяцев. Это ваше окно.</p>

            <h3 style={sH3}>Где искать на Amazon</h3>
            <DataTable
              headers={["Источник", "URL / метод", "Что даёт"]}
              rows={[
                ["Best Sellers", "amazon.com/bestsellers", "ТОП товаров по категориям — текущий спрос"],
                ["Movers & Shakers", "amazon.com/gp/movers-and-shakers", "Товары с максимальным ростом BSR за 24ч — emerging тренды"],
                ["New Releases", "amazon.com/gp/new-releases", "Новинки с лучшими продажами — свежие продукты"],
                ["Most Wished For", "amazon.com/gp/most-wished-for", "Товары в вишлистах — будущий спрос"],
                ["Gift Ideas", "amazon.com/gp/most-gifted", "Подарочные товары — сезонные возможности"],
              ]}
            />

            <h3 style={sH3}>Метод BSR-анализа</h3>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.dim, lineHeight: 2, background: "#0d0d18", borderRadius: 8, padding: 16 }}>
              <div>1. Открываем <span style={{ color: C.amber }}>Movers & Shakers</span> в интересующей категории</div>
              <div>2. Фильтруем: рост BSR {"> 200%"} за 24ч</div>
              <div>3. Проверяем: это разовый всплеск или устойчивый рост?</div>
              <div>4. Смотрим <span style={{ color: C.amber }}>историю BSR</span> через Keepa / Helium 10 (3-6 мес)</div>
              <div>5. Целимся на товары с BSR <span style={{ color: C.green }}>50-300 в субкатегории</span></div>
              <div>6. {"> 500 отзывов"} у ТОП-5 = сложно конкурировать, {"< 100"} = идеально</div>
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Shopify — DTC-бренды как индикатор</h3>
            <p style={sP}>Shopify-магазины показывают, что работает в direct-to-consumer. Если DTC-бренд растёт — значит, продукт можно адаптировать для маркетплейсов.</p>

            <DataTable
              headers={["Инструмент", "Что делает", "Цена"]}
              rows={[
                ["Niche Scraper", "Сканирует Shopify-магазины, показывает бестселлеры и рекламу", "$13/мес"],
                ["PPSPY", "Анализ 130K+ Shopify-магазинов, AI-оценка продаж (80% точность)", "Freemium"],
                ["ShopHunter", "Отслеживает топовые Shopify-магазины, уведомления о новых товарах", "Freemium"],
                ["SimplyTrends", "Chrome-расширение: технологии, трафик, бестселлеры любого Shopify", "Бесплатно"],
                ["EachSpy", "Каталог трендовых Shopify-магазинов по категориям", "Бесплатно"],
              ]}
            />

            <div style={{ background: `${C.green}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc", marginTop: 12 }}>
              <strong style={{ color: C.green }}>Метод:</strong> Находим растущий DTC-бренд на Shopify → смотрим их рекламу в Facebook Ad Library → проверяем, есть ли аналог на Kaspi/WB → если нет — это ваша возможность.
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Другие западные источники</h3>
            <DataTable
              headers={["Платформа", "Метод", "Для чего"]}
              rows={[
                ["Etsy", "Trending + Best Sellers по категориям", "Handmade и уникальные товары, растущие ниши"],
                ["Kickstarter / Indiegogo", "Кампании с 500%+ финансированием", "Инновации за 6-12 мес до массового рынка"],
                ["ProductHunt", "Ежедневные новинки, фильтр по категории", "Tech-товары и гаджеты раннего этапа"],
                ["Temu / Shein", "Бестселлеры и «Trending Now»", "Что уже массово продаётся из Китая"],
              ]}
            />
          </div>
        </Section>

        {/* ═══ Section 4: Social Signals ═══ */}
        <Section id="sec-4" title="4. Социальные сигналы: TikTok, Reddit, UGC">

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.pink }}>TikTok — самый быстрый индикатор</h3>
            <p style={sP}>TikTok — место, где продуктовые тренды зарождаются раньше, чем в поисковиках. Товар может набрать миллионы просмотров за 48 часов.</p>

            <h3 style={sH3}>Хештеги для мониторинга</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {[
                "#TikTokMadeMeBuyIt", "#TikTokShopFinds", "#ViralTikTokProducts",
                "#AmazonFinds", "#AmazonMustHaves", "#TikTokShop",
                "#ProductReview", "#UnboxingTikTok", "#GadgetsTikTok",
                "#HomeFinds", "#CleanTok", "#BookTok",
              ].map(tag => (
                <span key={tag} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: `${C.pink}15`, color: C.pink, fontWeight: 500 }}>{tag}</span>
              ))}
            </div>

            <h3 style={sH3}>Как анализировать TikTok</h3>
            <DataTable
              headers={["Метод", "Описание"]}
              rows={[
                ["Поисковая строка TikTok", "Вбиваем категорию товара → сортируем по «Популярное» → смотрим просмотры"],
                ["TikTok Shop → Trending", "Раздел Shop показывает реальные продажи, а не просто хайп"],
                ["Helium 10 TikTok Finder", "AI-инструмент: показывает товары с высокими продажами в TikTok Shop в реальном времени"],
                ["Сохраняем в закладки", "Каждый день 5-10 минут скроллинга → сохраняем интересные товары → анализируем через неделю"],
              ]}
            />

            <div style={{ background: `${C.pink}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc" }}>
              <strong style={{ color: C.pink }}>Ценовой сладкий диапазон TikTok:</strong> $10-30. Низкая цена = импульсная покупка. Сотни мелких UGC-креаторов дают больше продаж, чем один крупный блогер.
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.blue }}>Reddit и UGC-комьюнити</h3>
            <p style={sP}>Reddit — золотая жила для поиска реальных проблем и потребностей. Люди пишут честно, без рекламы.</p>

            <DataTable
              headers={["Сабреддит", "Что мониторить"]}
              rows={[
                ["r/AmazonSeller", "Кейсы продавцов: что продают, какие маржи, что работает"],
                ["r/FulfillmentByAmazon", "FBA-специфика: тренды, проблемы, инсайты"],
                ["r/ecommerce", "Общие тренды ecommerce, новые инструменты, стратегии"],
                ["r/dropshipping", "Что сейчас продают дропшипперы — ранний индикатор"],
                ["r/Entrepreneur", "Бизнес-идеи и валидация от реальных предпринимателей"],
                ["r/BuyItForLife", "Товары высокого качества — возможность для premium-сегмента"],
                ["r/shutupandtakemymoney", "Вирусные товары, импульсные покупки"],
              ]}
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>YouTube и блогеры</h3>
            <DataTable
              headers={["Тип контента", "Каналы / поиск", "Применение"]}
              rows={[
                ["Amazon FBA блогеры", "Jungle Scout, Helium 10, Travis Marziani, Tatiana James", "Методология поиска, кейсы, инструменты"],
                ["Product review каналы", "Freakin' Reviews, Project Farm, Technology Connections", "Какие товары набирают просмотры = спрос"],
                ["Unboxing каналы", "Unbox Therapy, iJustine, MKBHD (для гаджетов)", "Раннее обнаружение новинок"],
                ["DTC / ecommerce", "Shopify Masters, My Wife Quit Her Job (Steve Chou)", "Стратегии DTC-брендов, тренды"],
              ]}
            />
          </div>
        </Section>

        {/* ═══ Section 5: Analytics Tools ═══ */}
        <Section id="sec-5" title="5. Аналитические инструменты: Тренд-радары">

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.accent }}>Тренд-детекторы</h3>
            <p style={sP}>Инструменты, которые находят тренды ДО того, как они станут массовыми.</p>
          </div>

          <ToolCard
            name="Google Trends"
            url="trends.google.com"
            type="Тренд-анализ"
            price="Бесплатно"
            desc="Первый шаг для любого товара. Показывает рост/спад интереса, сезонность, географию спроса. 20+ лет исторических данных."
            features={["Сезонность", "География", "Связанные запросы", "Rising queries", "Бесплатно"]}
          />
          <ToolCard
            name="Exploding Topics"
            url="explodingtopics.com"
            type="Тренд-радар"
            price="$39/мес"
            desc="AI находит тренды за 6+ месяцев до массового рынка. Анализирует соцсети, поисковики, медиа. Есть отдельная база трендовых товаров с данными по продажам."
            features={["AI-анализ", "Trending Products", "6 мес вперёд", "Фильтр по категории"]}
          />
          <ToolCard
            name="Glimpse"
            url="meetglimpse.com"
            type="Тренд-аналитика"
            price="Freemium"
            desc="Расширение для Google Trends. Добавляет реальные объёмы поиска, прогнозы, оценку сложности. Также собственный каталог ecommerce-трендов."
            features={["Google Trends+", "Реальные объёмы", "Ecommerce Trends", "Прогнозы"]}
          />
          <ToolCard
            name="Treendly"
            url="treendly.com"
            type="Мульти-источник"
            price="Freemium"
            desc="Агрегирует данные из Google Trends, соцсетей, маркетплейсов. Можно настроить алерты на конкретные категории или товары."
            features={["Мульти-источник", "Алерты", "Категории", "Локация"]}
          />
        </Section>

        {/* ═══ Section 6: CIS Markets ═══ */}
        <Section id="sec-6" title="6. СНГ: Kaspi.kz и Wildberries">

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Kaspi.kz — Redstat.kz</h3>
            <p style={sP}>Redstat — аналитика продаж Kaspi.kz. Показывает выручку, заказы, бренды, монополизацию по каждой нише. ML-прогнозы на 6 месяцев вперёд.</p>

            <h3 style={sH3}>Как использовать Redstat для поиска трендов</h3>
            <DataTable
              headers={["Метод", "Как"]}
              rows={[
                ["Растущие ниши", "Фильтр по росту выручки MoM > 20%. Если ниша растёт 3+ месяца подряд — это тренд, не всплеск"],
                ["Низкая монополизация", "Gini < 0.65 = есть место для новых. Gini > 0.8 = монополия, не входить"],
                ["Высокая доля NoBrand", "NoBrand > 30% выручки = покупатели берут без оглядки на бренд. Возможность для своего бренда"],
                ["Пустые ниши", "Мало SKU (< 200) + высокая выручка/SKU = мало конкурентов, много спроса"],
                ["ML-прогноз", "Predict показывает рост на 6 мес вперёд. Растущий прогноз = подтверждение тренда"],
              ]}
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.amber }}>Wildberries — Инструменты аналитики</h3>
            <DataTable
              headers={["Инструмент", "Что даёт", "Цена"]}
              rows={[
                ["MPStats.io", "Полная аналитика WB: продажи, ниши, бренды, тренды, ABC-анализ", "от 3 990 ₽/мес"],
                ["Shopstat (Chrome)", "Бесплатное расширение: продажи, выручка, остатки прямо на WB", "Бесплатно"],
                ["Moneyplace.io", "Аналитика ниш, трендов, сезонности на WB и Ozon", "от 990 ₽/мес"],
                ["SellMonitor", "Мониторинг продаж и цен, статистика WB", "Freemium"],
                ["Sellego", "Поиск ниш с расчётом unit-экономики, маржинальности", "от 1 990 ₽/мес"],
              ]}
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Kaspi.kz — Дополнительные инструменты</h3>
            <DataTable
              headers={["Инструмент", "Что даёт", "Цена"]}
              rows={[
                ["Redstat.kz", "Аналитика продаж Kaspi: категории, бренды, ниши, ML-прогнозы", "Бесплатно"],
                ["SkyMetric (Chrome)", "Расширение для Kaspi: анализ ниш, динамика рынка", "Freemium"],
                ["AlgaTop.kz", "Аналитика Kaspi-магазина, поиск товаров, мониторинг конкурентов", "от 4 990 ₸/мес"],
              ]}
            />
          </div>

          <div style={{ ...sCard, borderColor: `${C.green}44` }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Стратегия: Запад → СНГ</h3>
            <p style={sP}>
              <strong style={{ color: C.text }}>1.</strong> Находим растущий товар на Amazon US (Movers & Shakers, BSR рост)
            </p>
            <p style={sP}>
              <strong style={{ color: C.text }}>2.</strong> Проверяем на Kaspi через Redstat: есть ли ниша? Какой Gini? Сколько продавцов?
            </p>
            <p style={sP}>
              <strong style={{ color: C.text }}>3.</strong> Если ниша пустая или низкая конкуренция — вы первые на рынке с 3-6 мес преимуществом.
            </p>
            <p style={sP}>
              <strong style={{ color: C.text }}>4.</strong> Даже если есть аналоги — улучшаем: упаковка, описание на казахском, фото, Kaspi Red.
            </p>
          </div>
        </Section>

        {/* ═══ Section 7: Amazing.com ═══ */}
        <Section id="sec-7" title="7. Amazing.com: Практический разбор">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.accent }}>Что такое Amazing.com</h3>
            <p style={sP}>
              Amazing.com (бывший Zon.tools) — AI-платформа для продавцов Amazon. Включает софт для продуктового ресёрча, обучение (Amazing Selling Machine AI) и комьюнити 40K+ селлеров. Заявляют $2B+ суммарных продаж участников.
            </p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Ключевые инструменты Amazing.com</h3>
            <DataTable
              headers={["Инструмент", "Что делает", "Применение для поиска трендов"]}
              rows={[
                ["Breakout Radar", "AI-предсказание трендов до их массового роста", "Главный инструмент: показывает товары, которые скоро взорвутся"],
                ["Detective", "Глубокий продуктовый ресёрч: продажи, маржа, конкуренция", "Валидация товара: реальные продажи, прибыль, количество продавцов"],
                ["AI Analyzer", "Анализ на базе Amazon COSMO модели", "Понимание, почему товар продаётся: ключевые атрибуты спроса"],
                ["Competitor Analyzer", "Reverse ASIN: разбор конкурентов", "Какие ключевые слова, какие продажи, какая стратегия"],
                ["Keyword Finder", "Поиск ключевых слов с объёмами", "Растущие запросы = растущий спрос на товар"],
                ["Chrome Extension", "Данные прямо на странице Amazon", "Быстрая оценка: BSR, продажи, выручка без выхода со страницы"],
              ]}
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Стоимость и доступ</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ textAlign: "center", padding: 16, borderRadius: 8, background: `${C.accent}10` }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>Подписка</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.accent }}>$97/мес</div>
                <div style={{ fontSize: 12, color: C.dim }}>Был $197 — сейчас скидка</div>
              </div>
              <div style={{ textAlign: "center", padding: 16, borderRadius: 8, background: `${C.green}10` }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>Пробный период</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.green }}>14 дней</div>
                <div style={{ fontSize: 12, color: C.dim }}>Бесплатный доступ ко всему</div>
              </div>
            </div>
          </div>

          <div style={{ ...sCard, borderColor: `${C.amber}44` }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.amber }}>Практический workflow с Amazing</h3>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.dim, lineHeight: 2, background: "#0d0d18", borderRadius: 8, padding: 16 }}>
              <div>1. <span style={{ color: C.amber }}>Breakout Radar</span> → список товаров с прогнозом роста</div>
              <div>2. Фильтруем: рост {">"} 100%, продажи {">"} 300 шт/мес</div>
              <div>3. <span style={{ color: C.amber }}>Detective</span> → глубокий анализ каждого кандидата</div>
              <div>4. <span style={{ color: C.amber }}>Chrome Extension</span> → на Amazon проверяем BSR и продажи</div>
              <div>5. <span style={{ color: C.green }}>Redstat.kz</span> → проверяем аналогичную нишу на Kaspi</div>
              <div>6. Если пусто или мало конкурентов → <span style={{ color: C.green }}>GO</span></div>
            </div>
          </div>
        </Section>

        {/* ═══ Section 8: Validation ═══ */}
        <Section id="sec-8" title="8. Методы валидации товара">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Чеклист валидации: 10 критериев</h3>
            <DataTable
              headers={["#", "Критерий", "Хорошо", "Плохо"]}
              rows={[
                ["1", "Google Trends", "Линия вверх 6+ мес", "Пик и спад (хайп прошёл)"],
                ["2", "Amazon BSR", "50-300 в субкатегории", "> 5000 (мало продаж)"],
                ["3", "Отзывы ТОП-10", "< 500 у лидеров", "> 2000 (высокий барьер)"],
                ["4", "Средний чек", "$15-70", "< $10 (нет маржи)"],
                ["5", "Маржа после всех расходов", "> 30%", "< 20% (не выжить)"],
                ["6", "Вес/габариты", "< 2 кг, компактный", "> 5 кг (дорогая доставка)"],
                ["7", "Негативные отзывы", "Решаемые проблемы (упаковка, инструкция)", "Фундаментальные дефекты"],
                ["8", "Касpi: Gini ниши", "< 0.65 (есть место)", "> 0.8 (монополия)"],
                ["9", "Касpi: NoBrand доля", "> 25% (можно с брендом)", "< 5% (бренды доминируют)"],
                ["10", "Сезонность", "Круглый год или вы к сезону", "Узкий пик, опоздали"],
              ]}
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.red }}>Красные флаги: Когда НЕ входить</h3>
            {[
              "Товар уже на спаде в Google Trends (пик был 3+ мес назад)",
              "ТОП-3 на Amazon имеют 10K+ отзывов (доминируют гиганты)",
              "Gini на Kaspi > 0.8 — один продавец забирает всё",
              "Маржа < 20% после комиссий, доставки и возвратов",
              "Товар запрещён/ограничен на маркетплейсе (сертификаты, лицензии)",
              "Слишком тяжёлый (> 5 кг) — доставка съедает маржу",
              "Нельзя брендировать или улучшить — будете конкурировать только ценой",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: 1, background: C.red, flexShrink: 0, marginTop: 6 }} />
                <span style={{ ...sP, margin: 0 }}>{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══ Section 9: Seasonality ═══ */}
        <Section id="sec-9" title="9. Сезонность и тайминг">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Календарь сезонных возможностей</h3>
            <DataTable
              headers={["Период", "Категории", "Когда готовиться"]}
              rows={[
                ["Январь-Февраль", "Спортивные товары, ЗОЖ (новогодние цели), зимняя одежда", "Ноябрь"],
                ["Март", "8 Марта: подарки, косметика, аксессуары", "Январь"],
                ["Апрель-Май", "Сад, дача, outdoor, велосипеды, самокаты", "Февраль"],
                ["Июнь-Август", "Пляжные товары, солнцезащита, кемпинг, путешествия", "Апрель"],
                ["Сентябрь", "Школа: канцелярия, рюкзаки, форма, электроника", "Июль"],
                ["Октябрь-Ноябрь", "Осенняя одежда, home-декор, умные устройства", "Август"],
                ["Декабрь", "Подарки, игрушки, гаджеты, сладости, украшения", "Октябрь"],
              ]}
            />

            <div style={{ background: `${C.amber}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc", marginTop: 12 }}>
              <strong style={{ color: C.amber }}>Правило:</strong> Готовиться к сезону минимум за 2 месяца. Закупка + доставка + фото + карточка = 4-6 недель. Опоздать = потерять 70% сезонного спроса.
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Как использовать Google Trends для сезонности</h3>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.dim, lineHeight: 2, background: "#0d0d18", borderRadius: 8, padding: 16 }}>
              <div>1. Вводим товар в <span style={{ color: C.accent }}>Google Trends</span></div>
              <div>2. Период: <span style={{ color: C.accent }}>5 лет</span> (видим повторяющиеся паттерны)</div>
              <div>3. География: Казахстан / Россия / Worldwide</div>
              <div>4. Если пик повторяется каждый год в одно время — это <span style={{ color: C.green }}>сезонный товар</span></div>
              <div>5. Если линия стабильно вверх — это <span style={{ color: C.green }}>растущий тренд</span></div>
              <div>6. Если пик был один раз — это <span style={{ color: C.red }}>хайп (не входить)</span></div>
            </div>
          </div>
        </Section>

        {/* ═══ Section 10: Checklist ═══ */}
        <Section id="sec-10" title="10. Чеклист: Пошаговый алгоритм">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.accent, fontSize: 18 }}>Ежедневный ритуал продуктового ресёрча (30 мин)</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { time: "5 мин", task: "Amazon Movers & Shakers — 3 категории", color: C.amber },
                { time: "5 мин", task: "TikTok: скролл #TikTokMadeMeBuyIt, сохраняем интересное", color: C.pink },
                { time: "5 мин", task: "Google Trends: проверяем вчерашние находки", color: C.blue },
                { time: "5 мин", task: "Reddit: r/AmazonSeller + r/ecommerce — новые посты", color: C.cyan },
                { time: "5 мин", task: "Exploding Topics / Glimpse — новые тренды", color: C.green },
                { time: "5 мин", task: "Redstat.kz / MPStats — проверяем кандидатов на Kaspi/WB", color: C.accent },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ width: 50, fontSize: 12, fontWeight: 600, color: C.dim, flexShrink: 0, fontFamily: "monospace" }}>{s.time}</div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ fontSize: 13, color: C.text }}>{s.task}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, fontSize: 18 }}>Еженедельная глубокая сессия (2 часа)</h3>
            {[
              "Из накопленных за неделю идей отобрать ТОП-5",
              "Каждый проверить через Google Trends (5 лет + 12 мес)",
              "Проверить через Amazing.com Detective / Jungle Scout / Helium 10",
              "Оценить маржу: цена продажи - себестоимость (1688/Alibaba) - доставка - комиссия",
              "Проверить на Kaspi через Redstat: ниша, Gini, NoBrand, выручка",
              "По 2-3 лучшим — написать поставщикам за ценой и MOQ",
              "Обновить Google Sheets / Notion с кандидатами",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: "50%", background: `${C.accent}22`, color: C.accent, fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <span style={{ ...sP, margin: 0 }}>{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══ Section 11: Full Tool Stack ═══ */}
        <Section id="sec-11" title="11. Полный стек инструментов">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Amazon-инструменты</h3>
            <DataTable
              headers={["Инструмент", "Тип", "Цена", "Ключевая фича"]}
              rows={[
                ["Amazing.com", "Полная платформа", "$97/мес", "Breakout Radar — AI-предсказание трендов"],
                ["Jungle Scout", "Продуктовый ресёрч", "от $49/мес", "Product Database + точность 84%"],
                ["Helium 10", "Полная платформа", "от $39/мес", "Black Box + 30+ инструментов"],
                ["Keepa", "История цен/BSR", "от $19/мес", "График BSR за всю историю товара"],
                ["AMZScout", "Chrome + SaaS", "от $45/мес", "PRO Extension — данные на странице Amazon"],
                ["ZonGuru", "Продуктовый ресёрч", "от $49/мес", "Niche Finder + Sales Spy"],
                ["SellerSprite", "Аналитика Amazon", "от $39/мес", "Keyword Mining + BSR трекер"],
              ]}
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Shopify / DTC Spy</h3>
            <DataTable
              headers={["Инструмент", "Тип", "Цена", "Ключевая фича"]}
              rows={[
                ["Niche Scraper", "Shopify Spy", "$13/мес", "Сканер магазинов + реклама"],
                ["PPSPY", "Shopify анализ", "Freemium", "AI-оценка продаж 130K+ магазинов"],
                ["ShopHunter", "Трекер магазинов", "Freemium", "Алерты по новым товарам"],
                ["SimplyTrends", "Chrome", "Бесплатно", "Технологии + бестселлеры любого Shopify"],
                ["Ecomhunt", "Winning Products", "от $29/мес", "Ручной отбор + рекламные креативы"],
                ["Sell The Trend", "AI Nexus", "от $40/мес", "ML-алгоритм трендовых товаров"],
              ]}
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Тренд-детекторы и аналитика</h3>
            <DataTable
              headers={["Инструмент", "Тип", "Цена", "Ключевая фича"]}
              rows={[
                ["Google Trends", "Поисковые тренды", "Бесплатно", "20+ лет данных, сезонность"],
                ["Exploding Topics", "AI тренд-радар", "$39/мес", "Тренды за 6 мес до массового рынка"],
                ["Glimpse", "Google Trends+", "Freemium", "Реальные объёмы поиска + прогнозы"],
                ["Treendly", "Мульти-источник", "Freemium", "Алерты по категориям"],
              ]}
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>СНГ / Kaspi / Wildberries</h3>
            <DataTable
              headers={["Инструмент", "Рынок", "Цена", "Ключевая фича"]}
              rows={[
                ["Redstat.kz", "Kaspi.kz", "Бесплатно", "Выручка, Gini, NoBrand, ML-прогнозы"],
                ["SkyMetric", "Kaspi.kz", "Freemium", "Chrome-расширение, динамика рынка"],
                ["AlgaTop.kz", "Kaspi.kz", "от 4 990 ₸/мес", "Аналитика магазина, мониторинг"],
                ["MPStats.io", "Wildberries", "от 3 990 ₽/мес", "Полная аналитика WB"],
                ["Shopstat", "Wildberries", "Бесплатно", "Chrome-расширение для WB"],
                ["Moneyplace.io", "WB + Ozon", "от 990 ₽/мес", "Ниши, тренды, сезонность"],
              ]}
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Социальные платформы</h3>
            <DataTable
              headers={["Платформа", "Что мониторить", "Частота"]}
              rows={[
                ["TikTok", "#TikTokMadeMeBuyIt, TikTok Shop Trending", "Ежедневно"],
                ["Reddit", "r/AmazonSeller, r/ecommerce, r/dropshipping", "Ежедневно"],
                ["YouTube", "Product review каналы, FBA блогеры", "2-3 раза в неделю"],
                ["Instagram", "Reels с товарами, DTC-бренды", "Ежедневно"],
                ["Pinterest", "Trending Pins по категориям", "Еженедельно"],
                ["Facebook Ad Library", "Реклама конкурентов и DTC-брендов", "Еженедельно"],
              ]}
            />
          </div>
        </Section>

        {/* ═══ Footer ═══ */}
        <div style={{ paddingTop: 32, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
          <p style={{ ...sP, fontSize: 12, color: C.faint }}>
            Подготовил Алмас Касымжанов | <Link href="/" style={{ color: C.accent, textDecoration: "none" }}>akasymzhanov.com</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
