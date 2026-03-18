"use client";

import Link from "next/link";
import { useState } from "react";

/* ───── design tokens ───── */
const C = {
  bg: "#0a0a0f",
  surface: "#111119",
  border: "#1e1e30",
  accent: "#6c5ce7",
  green: "#00d2a0",
  text: "#e8e8f0",
  dim: "#999",
  faint: "#444",
  red: "#f87171",
  amber: "#f59e0b",
  pink: "#e84393",
};

/* ───── style helpers ───── */
const sSection: React.CSSProperties = { marginBottom: 48 };
const sH2: React.CSSProperties = { fontSize: 22, fontWeight: 700, margin: "0 0 20px", color: C.text, letterSpacing: "-0.01em" };
const sH3: React.CSSProperties = { fontSize: 16, fontWeight: 600, margin: "28px 0 12px", color: C.text };
const sP: React.CSSProperties = { fontSize: 14, lineHeight: 1.7, color: "#ccc", margin: "0 0 12px" };
const sCard: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px 24px", marginBottom: 16 };
const sCode: React.CSSProperties = { background: "rgba(108,92,231,0.12)", color: C.accent, padding: "2px 7px", borderRadius: 4, fontSize: 12, fontFamily: "monospace" };
const sCodeBlock: React.CSSProperties = { background: "#0d0d18", border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 20px", fontSize: 12, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: "#c8c8d8", lineHeight: 1.6, overflowX: "auto", whiteSpace: "pre", marginBottom: 12, position: "relative" };
const sBadge = (color: string): React.CSSProperties => ({ display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: `${color}18`, color, marginRight: 6 });
const sStepNum: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: `${C.accent}22`, color: C.accent, fontSize: 13, fontWeight: 700, marginRight: 10, flexShrink: 0 };

/* ───── CopyBtn ───── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{ position: "absolute", top: 8, right: 8, background: copied ? `${C.green}22` : `${C.accent}22`, color: copied ? C.green : C.accent, border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}
    >
      {copied ? "Скопировано!" : "Копировать"}
    </button>
  );
}

/* ───── Collapsible section ───── */
function Collapsible({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginTop: 8, marginBottom: 12 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 14px", color: C.dim, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
      >
        <span style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>&#9654;</span>
        {title}
      </button>
      {open && <div style={{ marginTop: 8 }}>{children}</div>}
    </div>
  );
}

/* ───── Comparison table ───── */
function CompareTable({ rows }: { rows: { feature: string; claude: string; notebook: string; combo: string }[] }) {
  const th: React.CSSProperties = { padding: "8px 12px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: C.dim, borderBottom: `1px solid ${C.border}`, textAlign: "left" };
  const td: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#ccc", borderBottom: `1px solid ${C.border}08` };
  return (
    <div style={{ overflowX: "auto", marginBottom: 16 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", background: C.surface, borderRadius: 10, overflow: "hidden" }}>
        <thead>
          <tr>
            <th style={th}>Критерий</th>
            <th style={{ ...th, color: C.accent }}>Claude</th>
            <th style={{ ...th, color: C.green }}>NotebookLM</th>
            <th style={{ ...th, color: C.pink }}>Связка</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ ...td, fontWeight: 500, color: C.text }}>{r.feature}</td>
              <td style={td}>{r.claude}</td>
              <td style={td}>{r.notebook}</td>
              <td style={{ ...td, color: C.green, fontWeight: 500 }}>{r.combo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════ */
/*                 PAGE                    */
/* ═══════════════════════════════════════ */

export default function AiSellerGuidePage() {

  const mcpConfig = `{
  "mcpServers": {
    "notebooklm": {
      "command": "npx",
      "args": ["notebooklm-mcp@latest"]
    }
  }
}`;

  const promptNiche = `Я загружаю JSON со всеми товарами одной ниши Wildberries из MPStats API (эндпоинт /wb/get/category).

Ты — аналитик маркетплейсов. Дай полный разбор ниши так, чтобы я мог принять решение: заходить или нет.

### 1. ОБЗОР НИШИ (таблица)
| Метрика | Значение |
|---------|---------|
| Общая выручка за период | ... |
| Общее кол-во продаж | ... |
| Кол-во товаров (всего) | ... |
| Кол-во товаров с продажами | ... (и % от общего) |
| Средний чек | ... |
| Медианная цена | ... |
| Средний рейтинг ниши | ... |
| Среднее кол-во отзывов | ... |

### 2. МОНОПОЛИЗАЦИЯ
- Какой % выручки забирает ТОП-10 товаров?
- Какой % забирает ТОП-1?
- Есть ли шанс новичку пробиться или рынок «закрыт»?
- Вердикт: Низкая / Средняя / Высокая монополизация

### 3. БРЕНДЫ
- Топ-5 брендов по выручке (таблица: бренд | выручка | доля | кол-во SKU)
- Есть ли товары без бренда с хорошими продажами? (возможность для NoBrand)

### 4. ЦЕНОВЫЕ СЕГМЕНТЫ
Разбей все товары на сегменты по цене и покажи:
| Сегмент | Кол-во товаров | Выручка | Продажи | Ср.рейтинг |
В каком ценовом сегменте лучшее соотношение спроса и конкуренции?

### 5. СЛАБЫЕ ИГРОКИ (возможности)
Найди товары с высокими продажами, но низким рейтингом (ниже 4.5) — это прямые возможности для входа с лучшим качеством. Таблица ТОП-5.

### 6. СИЛЬНЫЕ ИГРОКИ (ориентиры)
ТОП-5 товаров по выручке — на кого равняться.

### 7. ФИНАЛЬНЫЙ ВЕРДИКТ
ЗАХОДИТЬ / ЗАХОДИТЬ С ОСТОРОЖНОСТЬЮ / НЕ ЗАХОДИТЬ
Причины (3 пункта), рекомендуемая стратегия входа, ценовой сегмент, минимальный бюджет, главный риск, главное преимущество новичка.`;

  const promptSubcats = `Я загружаю JSON с подкатегориями Wildberries из MPStats API (эндпоинт /wb/get/category/subcategories).

Проанализируй все подкатегории и составь рейтинг ТОП-10 самых перспективных для выхода нового продавца. Для каждой подкатегории оцени:

1. Объём рынка (выручка, продажи)
2. Конкуренция (количество товаров, % товаров с продажами)
3. Средний чек и маржинальность
4. Рейтинг — есть ли проблемы с качеством (низкий рейтинг = возможность)

Выведи результат в таблице с колонками: Подкатегория | Выручка | Продажи | Товаров | % с продажами | Ср.цена | Рейтинг | Вердикт

В конце дай ТОП-3 рекомендации: в какую подкатегорию лучше всего зайти и почему.`;

  const claudeSheetsFormula = `=CLAUDE("Ты финансовый аналитик маркетплейсов. Вот данные по SKU: " & A2 & ", выручка: " & B2 & " ₸, продажи: " & C2 & ", рекл.расходы: " & D2 & " ₸, себестоимость единицы: " & E2 & " ₸. Рассчитай: чистую маржу, ROI, рекомендацию (масштабировать / оптимизировать / убрать из ассортимента). Ответ в 2-3 строки.")`;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px 80px" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 40 }}>
          <Link href="/tools" style={{ color: C.dim, fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
            &larr; Все инструменты
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={sBadge(C.pink)}>Занятие 5</span>
            <span style={sBadge(C.green)}>AI</span>
            <span style={sBadge(C.accent)}>Гайд</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "12px 0 8px", letterSpacing: "-0.02em" }}>
            AI для селлеров маркетплейсов
          </h1>
          <p style={{ color: C.dim, fontSize: 15, margin: 0, lineHeight: 1.6 }}>
            NotebookLM + Claude: связка, которая заменяет аналитика.<br />
            База знаний без лимитов + мозг для глубокого анализа.
          </p>
        </div>

        {/* ═══════════════════════════════════════ */}
        {/*  SECTION 1 — Зачем это нужно           */}
        {/* ═══════════════════════════════════════ */}
        <section style={sSection}>
          <h2 style={sH2}>1. Проблема: почему одного инструмента недостаточно</h2>

          <p style={sP}>
            Вы уже работали с <strong style={{ color: C.accent }}>Claude</strong> — создавали проекты, загружали файлы, писали промты.
            Это мощный инструмент, но у него есть фундаментальное ограничение:
          </p>

          <div style={{ ...sCard, borderColor: C.red }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.red, marginBottom: 8 }}>Ограничение Claude</div>
            <p style={{ ...sP, margin: 0 }}>
              <strong>Контекстное окно</strong> — это объём данных, который Claude может «держать в голове» за один разговор.
              Даже самый большой контекст (200K токенов ~ 500 страниц) — это потолок. Загрузить годовую аналитику,
              все выгрузки из MPSTATS, отзывы конкурентов, прайсы поставщиков — одновременно нельзя.
            </p>
          </div>

          <div style={{ ...sCard, borderColor: C.amber }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.amber, marginBottom: 8 }}>Ограничение NotebookLM</div>
            <p style={{ ...sP, margin: 0 }}>
              <strong>Google NotebookLM</strong> хранит данные без жёсткого лимита (до 50 источников на notebook),
              строго отвечает по загруженным данным и не «выдумывает». Но его аналитические способности
              слабее — он не даст глубокую стратегию входа в нишу или детальный финансовый анализ.
            </p>
          </div>

          <div style={{ ...sCard, borderColor: C.green }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.green, marginBottom: 8 }}>Решение: связка</div>
            <p style={{ ...sP, margin: 0 }}>
              <strong>NotebookLM</strong> = ваша персональная база данных. Загружаете ВСЁ: выгрузки, отчёты, CSV, PDF.<br />
              <strong>Claude</strong> = мозг-аналитик. Подключается к базе через MCP и анализирует данные.<br /><br />
              Это как нанять аналитика, который прочитал <em>все</em> ваши документы и может ответить на любой вопрос.
            </p>
          </div>

          <CompareTable rows={[
            { feature: "Объём данных", claude: "~500 стр. (контекст)", notebook: "До 50 источников без лимита", combo: "Безлимитная база + AI-анализ" },
            { feature: "Глубина анализа", claude: "Отличная", notebook: "Базовая", combo: "Отличная по всем данным" },
            { feature: "Галлюцинации", claude: "Может дополнять своими знаниями", notebook: "Строго по документам", combo: "Факты из базы + аналитика Claude" },
            { feature: "Цитирование", claude: "Слабое", notebook: "Точные ссылки на пассажи", combo: "Факты с источниками" },
            { feature: "Аудио-обзор", claude: "Нет", notebook: "Подкаст по данным", combo: "Подкаст + глубокий разбор" },
            { feature: "Таблицы", claude: "Генерирует в чате", notebook: "Data Tables + экспорт в Sheets", combo: "Структура + анализ" },
            { feature: "API-интеграция", claude: "Claude for Sheets, Claude API", notebook: "MCP-сервер", combo: "Полная автоматизация" },
          ]} />
        </section>

        {/* ═══════════════════════════════════════ */}
        {/*  SECTION 2 — NotebookLM                */}
        {/* ═══════════════════════════════════════ */}
        <section style={sSection}>
          <h2 style={sH2}>2. NotebookLM — ваша персональная база знаний</h2>

          <p style={sP}>
            <strong style={{ color: C.green }}>Google NotebookLM</strong> — это бесплатный AI-инструмент,
            который работает только с вашими данными. Загружаете документы — он отвечает строго по ним.
          </p>

          <h3 style={sH3}>Что загружать селлеру</h3>
          <div style={sCard}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { icon: "📊", label: "CSV-выгрузки MPSTATS", desc: "Подкатегории, товары, бренды, продавцы" },
                { icon: "📋", label: "Отчёты и исследования", desc: "PwC, аналитика рынка, тренды (PDF)" },
                { icon: "💬", label: "Отзывы конкурентов", desc: "Выгрузка комментариев через API" },
                { icon: "📦", label: "Прайсы поставщиков", desc: "Для анализа маржинальности" },
                { icon: "🔗", label: "Ссылки и статьи", desc: "Вставляете URL — NotebookLM парсит" },
                { icon: "🎥", label: "YouTube-видео", desc: "Вставляете ссылку — анализ транскрипта" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0" }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: C.dim }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h3 style={sH3}>Как начать работу (2 минуты)</h3>

          <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
            <span style={sStepNum}>1</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Откройте NotebookLM</div>
              <p style={{ ...sP, margin: "4px 0 0" }}>
                Перейдите на{" "}
                <a href="https://notebooklm.google.com" target="_blank" rel="noopener" style={{ color: C.green, textDecoration: "none", borderBottom: `1px solid ${C.green}44` }}>
                  notebooklm.google.com
                </a>
                {" "}и войдите через Google-аккаунт. Скачивать ничего не нужно — всё в браузере.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
            <span style={sStepNum}>2</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Создайте notebook</div>
              <p style={{ ...sP, margin: "4px 0 0" }}>
                Нажмите <strong>«Create new»</strong>. Дайте название — например, «Анализ ниши: Пакеты для вакууматора».
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
            <span style={sStepNum}>3</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Загрузите источники</div>
              <p style={{ ...sP, margin: "4px 0 0" }}>
                Нажмите <strong>«Add source»</strong> &rarr; выберите файл (CSV, PDF, Google Doc) или вставьте ссылку (URL, YouTube).
                Можно загрузить до 50 источников в один notebook.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
            <span style={sStepNum}>4</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Задавайте вопросы</div>
              <p style={{ ...sP, margin: "4px 0 0" }}>
                NotebookLM сам создаст саммари. Далее спрашивайте: «Какие ниши с выручкой больше 10 млн?»,
                «Найди товары с рейтингом ниже 4.5 и продажами больше 100», «Сравни топ-5 брендов».
              </p>
            </div>
          </div>

          <h3 style={sH3}>Фишки NotebookLM</h3>

          <div style={{ ...sCard, borderColor: C.green }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.green, marginBottom: 6 }}>Audio Overview (подкаст)</div>
            <p style={{ ...sP, margin: 0 }}>
              NotebookLM может сгенерировать аудио-обсуждение ваших данных — два AI-ведущих обсуждают
              ваш отчёт в формате подкаста. Удобно для обзора данных на ходу.
            </p>
          </div>

          <div style={{ ...sCard, borderColor: C.green }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.green, marginBottom: 6 }}>Data Tables (новинка 2025)</div>
            <p style={{ ...sP, margin: 0 }}>
              NotebookLM сам структурирует разрозненные данные из ваших источников в таблицы.
              Таблицы можно экспортировать в Google Sheets для дальнейшей работы.
            </p>
          </div>

          <div style={{ ...sCard, borderColor: C.green }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.green, marginBottom: 6 }}>Строгое цитирование</div>
            <p style={{ ...sP, margin: 0 }}>
              Каждый ответ содержит номерованные ссылки на конкретные места в загруженных документах.
              Можно кликнуть и проверить источник — никаких галлюцинаций.
            </p>
          </div>

          <div style={{ background: `${C.amber}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc", marginTop: 12 }}>
            <strong style={{ color: C.amber }}>Важно:</strong>{" "}
            NotebookLM не принимает .xlsx напрямую. Экспортируйте Excel в CSV или PDF перед загрузкой.
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/*  SECTION 3 — Связка через MCP           */}
        {/* ═══════════════════════════════════════ */}
        <section style={sSection}>
          <h2 style={sH2}>3. Связка NotebookLM + Claude через MCP</h2>

          <p style={sP}>
            <strong style={{ color: C.pink }}>MCP (Model Context Protocol)</strong> — это протокол от Anthropic,
            который позволяет Claude Desktop подключаться к внешним источникам данных. В нашем случае — к NotebookLM.
          </p>

          <div style={{ ...sCard, borderColor: C.pink, padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <div style={{ textAlign: "center", padding: "12px 20px", background: `${C.green}15`, borderRadius: 10, minWidth: 160 }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>📚</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.green }}>NotebookLM</div>
                <div style={{ fontSize: 11, color: C.dim }}>База знаний</div>
                <div style={{ fontSize: 11, color: C.dim }}>CSV, PDF, отчёты</div>
                <div style={{ fontSize: 11, color: C.dim }}>Без лимита</div>
              </div>
              <div style={{ fontSize: 24, color: C.pink }}>&#8596;</div>
              <div style={{ textAlign: "center", padding: "12px 20px", background: `${C.pink}15`, borderRadius: 10, minWidth: 100 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.pink }}>MCP</div>
                <div style={{ fontSize: 11, color: C.dim }}>протокол</div>
              </div>
              <div style={{ fontSize: 24, color: C.pink }}>&#8596;</div>
              <div style={{ textAlign: "center", padding: "12px 20px", background: `${C.accent}15`, borderRadius: 10, minWidth: 160 }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>🧠</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>Claude Desktop</div>
                <div style={{ fontSize: 11, color: C.dim }}>Мозг-аналитик</div>
                <div style={{ fontSize: 11, color: C.dim }}>Глубокий анализ</div>
                <div style={{ fontSize: 11, color: C.dim }}>Стратегия</div>
              </div>
            </div>
          </div>

          <p style={sP}>
            Claude спрашивает у NotebookLM факты из вашей базы, а сам формирует глубокий аналитический ответ.
            Лучшее из двух миров.
          </p>

          <h3 style={sH3}>Пошаговая установка</h3>

          {/* ══════ ШАГ 1: Node.js ══════ */}
          <div style={{ ...sCard, borderColor: C.green, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ ...sStepNum, background: `${C.green}22`, color: C.green, width: 36, height: 36, fontSize: 16 }}>1</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.green }}>Установите Node.js</div>
                <div style={{ fontSize: 12, color: C.dim }}>Время: 2 минуты</div>
              </div>
            </div>

            <div style={{ background: `${C.green}08`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#ccc", marginBottom: 16, lineHeight: 1.7 }}>
              <strong style={{ color: C.green }}>Что такое Node.js и зачем он нужен?</strong><br />
              Node.js — это программа, которая позволяет запускать код на вашем компьютере.
              Сам по себе он ничего не делает — он нужен как «движок» для работы MCP-плагина,
              который связывает Claude с NotebookLM. Установили один раз — забыли, он работает в фоне.
            </div>

            <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2 }}>
              <strong style={{ color: C.text }}>1.</strong> Откройте сайт{" "}
              <a href="https://nodejs.org" target="_blank" rel="noopener" style={{ color: C.green, textDecoration: "none", borderBottom: `1px solid ${C.green}44` }}>nodejs.org</a><br />
              <strong style={{ color: C.text }}>2.</strong> Нажмите большую зелёную кнопку <strong>«LTS»</strong> (это стабильная версия) — скачается файл<br />
              <strong style={{ color: C.text }}>3.</strong> Откройте скачанный файл<br />
              <strong style={{ color: C.text }}>4.</strong> Нажимайте <strong>«Next»</strong> на каждом экране, ничего не меняя<br />
              <strong style={{ color: C.text }}>5.</strong> Когда появится экран <em>«Tools for Native Modules»</em> с галочкой — <strong style={{ color: C.amber }}>НЕ ставьте галочку</strong>, просто «Next»<br />
              <strong style={{ color: C.text }}>6.</strong> Нажмите <strong>«Install»</strong>, затем <strong>«Finish»</strong>
            </div>

            <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 16, paddingTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Как проверить, что Node.js установился:</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2, marginBottom: 8 }}>
                <strong style={{ color: C.text }}>Windows:</strong><br />
                <div style={{ paddingLeft: 16 }}>
                  1. На клавиатуре нажмите одновременно клавиши <span style={sCode}>Win</span> + <span style={sCode}>R</span> (клавиша Win — с логотипом Windows, внизу слева)<br />
                  2. Появится маленькое окошко «Выполнить». Напишите в нём: <span style={sCode}>cmd</span><br />
                  3. Нажмите Enter — откроется чёрное окно (это терминал / командная строка)<br />
                  4. Напишите команду и нажмите Enter:
                </div>
              </div>
              <div style={{ ...sCodeBlock, marginBottom: 4 }}>
                <CopyBtn text="node --version" />
                {`node --version`}
              </div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2 }}>
                <strong style={{ color: C.text }}>Mac:</strong><br />
                <div style={{ paddingLeft: 16 }}>
                  1. Нажмите <span style={sCode}>Cmd</span> + <span style={sCode}>Пробел</span> (откроется поиск Spotlight)<br />
                  2. Напишите <span style={sCode}>Terminal</span> и нажмите Enter<br />
                  3. В открывшемся окне введите ту же команду: <span style={sCode}>node --version</span>
                </div>
              </div>
              <div style={{ background: `${C.green}10`, borderRadius: 6, padding: "8px 12px", fontSize: 12, color: C.dim, marginTop: 8 }}>
                Если видите что-то вроде <span style={sCode}>v22.14.0</span> — Node.js установлен. Если ошибка «не распознана команда» — повторите установку.
              </div>
            </div>
          </div>

          {/* ══════ ШАГ 2: Claude Desktop ══════ */}
          <div style={{ ...sCard, borderColor: C.accent, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ ...sStepNum, background: `${C.accent}22`, color: C.accent, width: 36, height: 36, fontSize: 16 }}>2</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.accent }}>Установите Claude Desktop</div>
                <div style={{ fontSize: 12, color: C.dim }}>Время: 2 минуты</div>
              </div>
            </div>

            <div style={{ background: `${C.accent}08`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#ccc", marginBottom: 16, lineHeight: 1.7 }}>
              <strong style={{ color: C.accent }}>Зачем нужно приложение, если есть сайт claude.ai?</strong><br />
              Сайт claude.ai в браузере — это обычный чат. А десктоп-приложение поддерживает MCP —
              протокол подключения к внешним данным (NotebookLM, файлам, базам данных).
              Без приложения связка не работает.
            </div>

            <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2 }}>
              <strong style={{ color: C.text }}>1.</strong> Откройте{" "}
              <a href="https://claude.ai/download" target="_blank" rel="noopener" style={{ color: C.accent, textDecoration: "none", borderBottom: `1px solid ${C.accent}44` }}>claude.ai/download</a><br />
              <strong style={{ color: C.text }}>2.</strong> Нажмите <strong>«Download for Windows»</strong> (или «Download for Mac»)<br />
              <strong style={{ color: C.text }}>3.</strong> Откройте скачанный файл и установите<br />
              <strong style={{ color: C.text }}>4.</strong> Запустите Claude Desktop и войдите в аккаунт<br />
              <strong style={{ color: C.text }}>5.</strong> Если Claude запросит доступ к камере — <strong>откажите</strong>, камера не нужна
            </div>
          </div>

          {/* ══════ ШАГ 3: Текстовый редактор ══════ */}
          <div style={{ ...sCard, borderColor: C.amber, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ ...sStepNum, background: `${C.amber}22`, color: C.amber, width: 36, height: 36, fontSize: 16 }}>3</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.amber }}>Выберите текстовый редактор</div>
                <div style={{ fontSize: 12, color: C.dim }}>Нужен для одного действия — вставить настройку в файл</div>
              </div>
            </div>

            <div style={{ background: `${C.amber}08`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#ccc", marginBottom: 16, lineHeight: 1.7 }}>
              <strong style={{ color: C.amber }}>Что такое текстовый редактор?</strong><br />
              Это программа для редактирования текстовых файлов (не путать с Word — нам нужен именно чистый текст без форматирования).
              Нам нужно открыть один файл настроек Claude, вставить туда текст и сохранить. Всё.
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ background: `${C.green}10`, border: `1px solid ${C.green}22`, borderRadius: 8, padding: "14px 16px", flex: 1, minWidth: 220 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 6 }}>Вариант А: Блокнот / TextEdit</div>
                <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
                  <strong style={{ color: "#ccc" }}>Ничего ставить не нужно</strong> — уже есть на компьютере.<br /><br />
                  <strong style={{ color: "#ccc" }}>Windows:</strong> программа «Блокнот» (Notepad)<br />
                  <strong style={{ color: "#ccc" }}>Mac:</strong> программа «TextEdit»<br /><br />
                  <span style={{ color: C.amber }}>Минус:</span> не подсвечивает ошибки. Если случайно удалите запятую или кавычку — не увидите.
                </div>
              </div>
              <div style={{ background: `${C.accent}10`, border: `1px solid ${C.accent}22`, borderRadius: 8, padding: "14px 16px", flex: 1, minWidth: 220 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.accent, marginBottom: 6 }}>Вариант Б: VS Code (рекомендуем)</div>
                <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
                  <strong style={{ color: "#ccc" }}>Бесплатный редактор кода от Microsoft.</strong><br /><br />
                  Скачать:{" "}
                  <a href="https://code.visualstudio.com" target="_blank" rel="noopener" style={{ color: C.accent, textDecoration: "none", borderBottom: `1px solid ${C.accent}44` }}>code.visualstudio.com</a><br /><br />
                  <span style={{ color: C.green }}>Плюс:</span> подсвечивает ошибки красным — сразу видно, если что-то не так.
                  Также пригодится позже для API-скриптов.
                </div>
              </div>
            </div>
          </div>

          {/* ══════ ШАГ 4: Найти файл настроек ══════ */}
          <div style={{ ...sCard, borderColor: C.pink, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ ...sStepNum, background: `${C.pink}22`, color: C.pink, width: 36, height: 36, fontSize: 16 }}>4</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.pink }}>Найдите файл настроек Claude</div>
                <div style={{ fontSize: 12, color: C.dim }}>Время: 1 минута</div>
              </div>
            </div>

            <div style={{ background: `${C.pink}08`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#ccc", marginBottom: 16, lineHeight: 1.7 }}>
              <strong style={{ color: C.pink }}>Что это за файл?</strong><br />
              У Claude Desktop есть файл настроек — <span style={sCode}>claude_desktop_config.json</span>.
              Это текстовый файл в формате JSON, в котором записано, к каким внешним сервисам Claude может подключаться.
              Сейчас мы добавим туда подключение к NotebookLM.
            </div>

            {/* Windows */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 18px", marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.green, marginBottom: 12 }}>Windows — пошагово:</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2.2 }}>
                <strong style={{ color: C.text }}>1.</strong> На клавиатуре нажмите одновременно <span style={sCode}>Win</span> + <span style={sCode}>R</span><br />
                <div style={{ paddingLeft: 24, fontSize: 12, color: C.dim }}>Появится маленькое окошко «Выполнить» в левом нижнем углу экрана</div>
                <strong style={{ color: C.text }}>2.</strong> Скопируйте этот текст и вставьте в окошко:
              </div>
              <div style={{ ...sCodeBlock, margin: "8px 0" }}>
                <CopyBtn text="%APPDATA%\Claude" />
                {`%APPDATA%\\Claude`}
              </div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2.2 }}>
                <strong style={{ color: C.text }}>3.</strong> Нажмите Enter — откроется папка<br />
                <strong style={{ color: C.text }}>4.</strong> Посмотрите — есть ли в папке файл <span style={sCode}>claude_desktop_config.json</span>?<br />
                <br />
                <strong style={{ color: C.green }}>Если файл ЕСТЬ:</strong><br />
                <div style={{ paddingLeft: 24, fontSize: 12, color: C.dim, lineHeight: 2 }}>
                  Нажмите по нему правой кнопкой мыши &rarr; «Открыть с помощью» &rarr; выберите «Блокнот» или «Visual Studio Code»
                </div>
                <strong style={{ color: C.amber }}>Если файла НЕТ — создайте его:</strong><br />
                <div style={{ paddingLeft: 24, fontSize: 12, color: C.dim, lineHeight: 2 }}>
                  1. Нажмите правой кнопкой мыши на пустом месте в папке<br />
                  2. Выберите «Создать» &rarr; «Текстовый документ»<br />
                  3. Появится файл «Новый текстовый документ.txt»<br />
                  4. Переименуйте его в: <span style={sCode}>claude_desktop_config.json</span><br />
                  5. Windows спросит «Изменить расширение?» — нажмите <strong>«Да»</strong><br />
                  6. Откройте его (правая кнопка &rarr; «Открыть с помощью» &rarr; Блокнот или VS Code)
                </div>
              </div>
              <div style={{ background: `${C.amber}10`, borderRadius: 6, padding: "8px 12px", fontSize: 12, color: C.dim, marginTop: 8 }}>
                <strong style={{ color: C.amber }}>Не видите расширения файлов (.json, .txt)?</strong>{" "}
                В Проводнике нажмите «Вид» (сверху) &rarr; поставьте галочку «Расширения имен файлов».
                Теперь вы увидите полные имена файлов и сможете переименовать правильно.
              </div>

              {/* Troubleshooting — Windows */}
              <div style={{ background: `${C.red}08`, border: `1px solid ${C.red}18`, borderRadius: 8, padding: "14px 16px", marginTop: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.red, marginBottom: 10 }}>Не получается открыть папку? Три запасных способа:</div>

                <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2.2, marginBottom: 12 }}>
                  <strong style={{ color: C.amber }}>Способ 1:</strong> Убедитесь, что Claude Desktop был запущен хотя бы один раз.<br />
                  <div style={{ paddingLeft: 24, fontSize: 12, color: C.dim }}>
                    Папка Claude создаётся автоматически при первом запуске приложения.
                    Запустите Claude Desktop &rarr; войдите в аккаунт &rarr; закройте &rarr; попробуйте снова.
                  </div>
                </div>

                <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2.2, marginBottom: 12 }}>
                  <strong style={{ color: C.amber }}>Способ 2: Ручной путь через Проводник</strong><br />
                  <div style={{ paddingLeft: 24, fontSize: 12, color: C.dim, lineHeight: 2 }}>
                    1. Откройте Проводник (иконка папки на панели задач)<br />
                    2. В адресной строке сверху вставьте:
                  </div>
                </div>
                <div style={{ ...sCodeBlock, margin: "0 0 8px 24px", fontSize: 11 }}>
                  <CopyBtn text="C:\Users\ВАШ_ЛОГИН\AppData\Roaming\Claude" />
                  {`C:\\Users\\ВАШ_ЛОГИН\\AppData\\Roaming\\Claude`}
                </div>
                <div style={{ paddingLeft: 24, fontSize: 12, color: C.dim, lineHeight: 2, marginBottom: 12 }}>
                  Замените <span style={sCode}>ВАШ_ЛОГИН</span> на ваше имя пользователя Windows
                  (например, <span style={sCode}>Almas</span>, <span style={sCode}>Arman</span>, <span style={sCode}>User</span>).<br />
                  <strong style={{ color: C.amber }}>Папка AppData скрыта!</strong> Чтобы её увидеть:
                  Проводник &rarr; «Вид» &rarr; галочка «Скрытые элементы».
                </div>

                <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2.2 }}>
                  <strong style={{ color: C.amber }}>Способ 3: Создать папку и файл вручную</strong><br />
                  <div style={{ paddingLeft: 24, fontSize: 12, color: C.dim, lineHeight: 2 }}>
                    Если папки Claude нет совсем — создайте её сами:<br />
                    1. Нажмите <span style={sCode}>Win + R</span> &rarr; вставьте <span style={sCode}>%APPDATA%</span> &rarr; Enter<br />
                    2. Откроется папка Roaming. Нажмите правой кнопкой &rarr; «Создать» &rarr; «Папку»<br />
                    3. Назовите её <span style={sCode}>Claude</span> (с большой буквы)<br />
                    4. Зайдите в неё и создайте файл <span style={sCode}>claude_desktop_config.json</span><br />
                    (правая кнопка &rarr; «Создать» &rarr; «Текстовый документ» &rarr; переименуйте с расширением .json)
                  </div>
                </div>
              </div>
            </div>

            {/* Mac */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 18px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.accent, marginBottom: 12 }}>Mac — пошагово:</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2.2 }}>
                <strong style={{ color: C.text }}>1.</strong> Откройте Finder (иконка с улыбающимся лицом в Dock внизу экрана)<br />
                <strong style={{ color: C.text }}>2.</strong> Нажмите одновременно <span style={sCode}>Cmd</span> + <span style={sCode}>Shift</span> + <span style={sCode}>G</span><br />
                <div style={{ paddingLeft: 24, fontSize: 12, color: C.dim }}>Появится строка «Переход к папке»</div>
                <strong style={{ color: C.text }}>3.</strong> Скопируйте и вставьте:
              </div>
              <div style={{ ...sCodeBlock, margin: "8px 0" }}>
                <CopyBtn text="~/Library/Application Support/Claude" />
                {`~/Library/Application Support/Claude`}
              </div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2.2 }}>
                <strong style={{ color: C.text }}>4.</strong> Нажмите Enter — откроется папка Claude<br />
                <strong style={{ color: C.text }}>5.</strong> Ищите файл <span style={sCode}>claude_desktop_config.json</span><br />
                <br />
                <strong style={{ color: C.green }}>Если файл ЕСТЬ:</strong> двойной клик, чтобы открыть в TextEdit (или правая кнопка &rarr; VS Code)<br />
                <br />
                <strong style={{ color: C.amber }}>Если файла НЕТ:</strong><br />
                <div style={{ paddingLeft: 24, fontSize: 12, color: C.dim, lineHeight: 2 }}>
                  1. Откройте Terminal (<span style={sCode}>Cmd + Пробел</span> &rarr; напишите «Terminal» &rarr; Enter)<br />
                  2. Скопируйте и вставьте эту команду:
                </div>
              </div>
              <div style={{ ...sCodeBlock, margin: "8px 0" }}>
                <CopyBtn text={'touch ~/Library/Application\\ Support/Claude/claude_desktop_config.json'} />
                {`touch ~/Library/Application\\ Support/Claude/claude_desktop_config.json`}
              </div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2.2 }}>
                <div style={{ paddingLeft: 24, fontSize: 12, color: C.dim }}>
                  3. Нажмите Enter — файл создан. Вернитесь в Finder и откройте его.
                </div>
              </div>

              {/* Troubleshooting — Mac */}
              <div style={{ background: `${C.red}08`, border: `1px solid ${C.red}18`, borderRadius: 8, padding: "14px 16px", marginTop: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.red, marginBottom: 8 }}>Не получается найти папку?</div>
                <div style={{ fontSize: 12, color: C.dim, lineHeight: 2 }}>
                  <strong style={{ color: C.amber }}>1.</strong> Убедитесь, что Claude Desktop был запущен хотя бы раз (папка создаётся при первом запуске).<br />
                  <strong style={{ color: C.amber }}>2.</strong> Папка Library скрыта. В Finder нажмите <span style={sCode}>Cmd + Shift + .</span> (точка) — скрытые папки станут видны.<br />
                  <strong style={{ color: C.amber }}>3.</strong> Создайте папку и файл через Terminal:
                </div>
                <div style={{ ...sCodeBlock, margin: "8px 0", fontSize: 11 }}>
                  <CopyBtn text={'mkdir -p ~/Library/Application\\ Support/Claude && touch ~/Library/Application\\ Support/Claude/claude_desktop_config.json'} />
                  {`mkdir -p ~/Library/Application\\ Support/Claude && touch ~/Library/Application\\ Support/Claude/claude_desktop_config.json`}
                </div>
              </div>
            </div>
          </div>

          {/* ══════ ШАГ 5: Вставить конфигурацию ══════ */}
          <div style={{ ...sCard, borderColor: C.pink, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ ...sStepNum, background: `${C.pink}22`, color: C.pink, width: 36, height: 36, fontSize: 16 }}>5</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.pink }}>Вставьте настройку в файл</div>
                <div style={{ fontSize: 12, color: C.dim }}>Самый важный шаг — копируем текст в файл</div>
              </div>
            </div>

            <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2, marginBottom: 12 }}>
              Файл <span style={sCode}>claude_desktop_config.json</span> сейчас открыт в текстовом редакторе.
              Он может быть пустым или содержать какой-то текст.
            </div>

            <div style={{ background: `${C.green}10`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#ccc", marginBottom: 12, lineHeight: 1.7 }}>
              <strong style={{ color: C.green }}>Если файл пустой</strong> — просто скопируйте весь текст ниже и вставьте в файл:
            </div>

            <div style={sCodeBlock}>
              <CopyBtn text={mcpConfig} />
              {mcpConfig}
            </div>

            <div style={{ background: `${C.amber}10`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#ccc", marginTop: 12, marginBottom: 12, lineHeight: 1.7 }}>
              <strong style={{ color: C.amber }}>Если в файле уже что-то есть</strong> — найдите строку{" "}
              <span style={sCode}>{`"mcpServers": {`}</span> и добавьте внутрь неё блок <span style={sCode}>notebooklm</span>.
              Если не уверены — удалите всё и вставьте текст выше целиком.
            </div>

            <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 16, paddingTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.red, marginBottom: 8 }}>Частые ошибки (проверьте себя):</div>
              <div style={{ fontSize: 12, color: C.dim, lineHeight: 2 }}>
                <strong style={{ color: "#ccc" }}>1. Лишняя запятая.</strong> После последнего элемента запятой быть не должно. JSON это не прощает.<br />
                <strong style={{ color: "#ccc" }}>2. Неправильные кавычки.</strong> Нужны обычные прямые кавычки <span style={sCode}>{`""`}</span>, а не «ёлочки» и не "кавычки из Word".<br />
                <strong style={{ color: "#ccc" }}>3. Файл сохранён как .json.txt.</strong> Расширение должно быть именно <span style={sCode}>.json</span>.<br />
                <strong style={{ color: "#ccc" }}>4. При сохранении в Блокноте</strong> — выберите тип файла «Все файлы (*.*)», а не «Текстовые документы (*.txt)».
              </div>
              <div style={{ background: `${C.accent}10`, borderRadius: 6, padding: "8px 12px", fontSize: 12, color: C.dim, marginTop: 8 }}>
                <strong style={{ color: C.accent }}>Совет:</strong> Самый надёжный способ — просто нажать кнопку «Копировать» выше, вставить в пустой файл и сохранить.
                Не редактируйте текст руками, если не уверены.
              </div>
            </div>
          </div>

          {/* ══════ ШАГ 6: Перезапустить ══════ */}
          <div style={{ ...sCard, borderColor: C.green, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ ...sStepNum, background: `${C.green}22`, color: C.green, width: 36, height: 36, fontSize: 16 }}>6</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.green }}>Сохраните и перезапустите Claude</div>
                <div style={{ fontSize: 12, color: C.dim }}>Последний шаг — 30 секунд</div>
              </div>
            </div>

            <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2.2 }}>
              <strong style={{ color: C.text }}>1.</strong> Сохраните файл:<br />
              <div style={{ paddingLeft: 24, fontSize: 12, color: C.dim }}>
                Windows: <span style={sCode}>Ctrl + S</span> &nbsp;|&nbsp; Mac: <span style={sCode}>Cmd + S</span>
              </div>
              <strong style={{ color: C.text }}>2.</strong> <strong>Полностью</strong> закройте Claude Desktop (не просто свернуть!):<br />
              <div style={{ paddingLeft: 24, fontSize: 12, color: C.dim, lineHeight: 2 }}>
                <strong>Windows:</strong> найдите иконку Claude внизу справа в трее (рядом с часами) &rarr; правая кнопка &rarr; «Quit»<br />
                <strong>Mac:</strong> нажмите <span style={sCode}>Cmd + Q</span> в окне Claude, или правая кнопка по иконке в Dock &rarr; «Quit»
              </div>
              <strong style={{ color: C.text }}>3.</strong> Откройте Claude Desktop заново<br />
              <strong style={{ color: C.text }}>4.</strong> Готово! Claude теперь подключён к NotebookLM
            </div>
          </div>

          <div style={{ background: `${C.green}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc", marginTop: 16 }}>
            <strong style={{ color: C.green }}>Готово!</strong>{" "}
            Теперь Claude может обращаться к вашей базе знаний в NotebookLM. Задавайте вопросы как обычно —
            Claude сам найдёт нужные данные в вашей базе и проанализирует их.
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/*  SECTION 4 — Claude for Sheets          */}
        {/* ═══════════════════════════════════════ */}
        <section style={sSection}>
          <h2 style={sH2}>4. Claude for Sheets — AI прямо в Google Таблицах</h2>

          <p style={sP}>
            <strong style={{ color: C.accent }}>Claude for Sheets</strong> — официальное расширение от Anthropic.
            Формула <span style={sCode}>=CLAUDE()</span> прямо в ячейке Google Sheets. Бесплатное расширение, оплата только за API.
          </p>

          <h3 style={sH3}>Что можно делать</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[
              { title: "Массовый анализ товаров", desc: "1000 товаров из выгрузки → Claude оценивает каждый в соседней колонке" },
              { title: "Генерация описаний", desc: "Загрузили название + характеристики → Claude пишет описание для карточки" },
              { title: "Финансовый анализ по SKU", desc: "Выручка + расходы + себестоимость → Claude считает маржу и даёт рекомендацию" },
              { title: "Классификация отзывов", desc: "Загрузили отзывы → Claude сортирует: качество / доставка / цена / упаковка" },
            ].map((item, i) => (
              <div key={i} style={sCard}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.accent, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <h3 style={sH3}>Установка (3 минуты)</h3>

          <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
            <span style={sStepNum}>1</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Установите расширение</div>
              <p style={{ ...sP, margin: "4px 0 0" }}>
                Перейдите в{" "}
                <a href="https://workspace.google.com/marketplace/app/claude_for_sheets/909417792257" target="_blank" rel="noopener" style={{ color: C.accent, textDecoration: "none", borderBottom: `1px solid ${C.accent}44` }}>
                  Google Workspace Marketplace
                </a>
                {" "}&rarr; установите «Claude for Sheets».
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
            <span style={sStepNum}>2</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Получите API-ключ</div>
              <p style={{ ...sP, margin: "4px 0 0" }}>
                Перейдите на{" "}
                <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener" style={{ color: C.accent, textDecoration: "none", borderBottom: `1px solid ${C.accent}44` }}>
                  console.anthropic.com
                </a>
                {" "}&rarr; создайте API-ключ (начинается с <span style={sCode}>sk-ant-...</span>).
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
            <span style={sStepNum}>3</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Вставьте ключ в Google Sheets</div>
              <p style={{ ...sP, margin: "4px 0 0" }}>
                Откройте Google Sheets &rarr; <strong>Расширения</strong> &rarr; <strong>Claude for Sheets</strong> &rarr; <strong>Enter API Key</strong> &rarr; вставьте ключ.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
            <span style={sStepNum}>4</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Используйте формулу</div>
              <p style={{ ...sP, margin: "4px 0 8px" }}>
                В любой ячейке введите:
              </p>
              <div style={sCodeBlock}>
                <CopyBtn text={claudeSheetsFormula} />
                {claudeSheetsFormula}
              </div>
            </div>
          </div>

          <div style={{ background: `${C.accent}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc", marginTop: 12 }}>
            <strong style={{ color: C.accent }}>Стоимость:</strong>{" "}
            Расширение бесплатное. Платите только за API: ~$0.25/млн токенов (Haiku) или ~$3/млн токенов (Sonnet).
            Анализ 1000 товаров обойдётся примерно в $0.50–2.00.
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/*  SECTION 5 — API + Claude               */}
        {/* ═══════════════════════════════════════ */}
        <section style={sSection}>
          <h2 style={sH2}>5. API маркетплейсов + Claude: автоматизация</h2>

          <p style={sP}>
            Следующий уровень — подключить API маркетплейса напрямую. Данные обновляются автоматически,
            без ручных выгрузок.
          </p>

          <div style={{ ...sCard, borderColor: C.accent }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.accent, marginBottom: 8 }}>Схема работы</div>
            <div style={sCodeBlock}>
              <CopyBtn text={`API маркетплейса (WB/Kaspi/MPSTATS)\n  ↓ API-токен селлера\nGoogle Apps Script (автоматически тянет данные)\n  ↓ заполняет Google Sheets\nClaude for Sheets (анализирует каждую строку)\n  ↓ формула =CLAUDE()\nРезультат: маржа, ROI, рекомендации по каждому SKU`} />
{`API маркетплейса (WB/Kaspi/MPSTATS)
  ↓ API-токен селлера
Google Apps Script (автоматически тянет данные)
  ↓ заполняет Google Sheets
Claude for Sheets (анализирует каждую строку)
  ↓ формула =CLAUDE()
Результат: маржа, ROI, рекомендации по каждому SKU`}
            </div>
          </div>

          <h3 style={sH3}>MPSTATS API (уже готово)</h3>
          <p style={sP}>
            Полный гайд по работе с API MPStats —{" "}
            <Link href="/tools/mpstats-api" style={{ color: C.green, textDecoration: "none", borderBottom: `1px solid ${C.green}44` }}>
              открыть гайд
            </Link>.
            11 эндпоинтов, готовая коллекция для Hoppscotch, промты для Claude.
          </p>

          <h3 style={sH3}>Что можно вытащить через API</h3>
          <div style={{ overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: C.surface, borderRadius: 10, overflow: "hidden" }}>
              <thead>
                <tr>
                  {["API", "Что получаем", "Для чего"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: C.dim, borderBottom: `1px solid ${C.border}`, textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { api: "MPSTATS", data: "Выручка, продажи, бренды, продавцы по нише", use: "Анализ конкурентов, выбор ниши" },
                  { api: "WB API (селлер)", data: "Свои продажи, остатки, заказы, рекламные расходы", use: "P&L анализ, управление запасами" },
                  { api: "Kaspi API (селлер)", data: "Заказы, товары, статусы доставки", use: "Аналитика продаж на Kaspi" },
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={{ padding: "8px 12px", fontSize: 13, color: C.accent, fontWeight: 600, borderBottom: `1px solid ${C.border}08` }}>{r.api}</td>
                    <td style={{ padding: "8px 12px", fontSize: 13, color: "#ccc", borderBottom: `1px solid ${C.border}08` }}>{r.data}</td>
                    <td style={{ padding: "8px 12px", fontSize: 13, color: "#ccc", borderBottom: `1px solid ${C.border}08` }}>{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background: `${C.amber}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc" }}>
            <strong style={{ color: C.amber }}>Себестоимость:</strong>{" "}
            Единственное, что API маркетплейса не знает — это ваша себестоимость товара. Её нужно вносить вручную
            (или подтягивать из своей учётной системы). Остальное — автоматически.
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/*  SECTION 6 — Готовые промты              */}
        {/* ═══════════════════════════════════════ */}
        <section style={sSection}>
          <h2 style={sH2}>6. Готовые промты для анализа</h2>

          <p style={sP}>
            Два промта для работы с данными MPSTATS API + Claude. Скачайте JSON из Hoppscotch, загрузите в Claude и вставьте промт.
          </p>

          <h3 style={sH3}>Промт 1: Анализ нескольких подкатегорий</h3>
          <p style={{ fontSize: 12, color: C.dim, marginBottom: 8 }}>
            Используйте с эндпоинтом <span style={sCode}>/wb/get/category/subcategories</span>. Выявляет топ-10 перспективных ниш.
          </p>
          <Collapsible title="Открыть промт" defaultOpen={false}>
            <div style={{ ...sCodeBlock, whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.6 }}>
              <CopyBtn text={promptSubcats} />
              {promptSubcats}
            </div>
          </Collapsible>

          <h3 style={sH3}>Промт 2: Глубокий анализ одной ниши</h3>
          <p style={{ fontSize: 12, color: C.dim, marginBottom: 8 }}>
            Используйте с эндпоинтом <span style={sCode}>/wb/get/category</span>. Полный аналитический отчёт для принятия решения.
          </p>
          <Collapsible title="Открыть промт" defaultOpen={false}>
            <div style={{ ...sCodeBlock, whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.6 }}>
              <CopyBtn text={promptNiche} />
              {promptNiche}
            </div>
          </Collapsible>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/*  SECTION 7 — Мировой опыт               */}
        {/* ═══════════════════════════════════════ */}
        <section style={sSection}>
          <h2 style={sH2}>7. Как AI используют селлеры в мире</h2>

          <div style={sCard}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={sBadge(C.amber)}>Amazon</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Amazon FBA/FBM селлеры</span>
            </div>
            <ul style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
              <li><strong>Review Mining</strong> — загружают 1000+ отзывов конкурентов в Claude, выявляют боли покупателей, делают лучший продукт</li>
              <li><strong>Листинг-оптимизация</strong> — AI генерирует SEO-заголовки, буллеты, backend-ключевики</li>
              <li><strong>PPC-оптимизация</strong> — AI анализирует рекламные кампании и предлагает корректировки ставок</li>
              <li><strong>Vibe Coding</strong> — в 2026 селлеры используют Claude Code для написания скриптов автоматизации</li>
            </ul>
          </div>

          <div style={sCard}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={sBadge(C.green)}>Shopify</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Shopify-мерчанты</span>
            </div>
            <ul style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
              <li><strong>Shopify Magic</strong> — бесплатный AI: генерация описаний, email-маркетинг, ответы клиентам</li>
              <li><strong>Sidekick AI</strong> — AI-ассистент внутри Shopify: анализ продаж, создание автоматизаций голосом</li>
              <li><strong>AI-генерация фото</strong> — создание продуктовых фото без фотосессии</li>
              <li><strong>Shopify Flow + AI</strong> — автоматизации без кода: уведомления, сегментация, запасы</li>
            </ul>
          </div>

          <div style={sCard}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={sBadge(C.pink)}>Wildberries</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>WB-селлеры</span>
            </div>
            <ul style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
              <li><strong>Jam Analytics</strong> — аналитика WB с AI: аудитория, воронка, сезонность</li>
              <li><strong>AI-фото на модели</strong> — нейросеть WB генерирует фото одежды на виртуальной модели</li>
              <li><strong>MPSTATS + Claude</strong> — выгрузка данных через API + анализ в Claude (наш подход)</li>
              <li><strong>AI-прогноз спроса</strong> — WB алгоритмы прогнозируют продажи с учётом погоды и сезонности</li>
            </ul>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/*  SECTION 8 — Итоги                      */}
        {/* ═══════════════════════════════════════ */}
        <section style={sSection}>
          <h2 style={sH2}>8. Ваш AI-стек селлера</h2>

          <p style={sP}>
            Итоговая карта инструментов — от простого к продвинутому:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 16 }}>
            {[
              { level: "1", color: C.green, title: "NotebookLM", desc: "База знаний — загружаете всё, задаёте вопросы", link: "notebooklm.google.com" },
              { level: "2", color: C.accent, title: "Claude Projects", desc: "Глубокий анализ конкретной задачи (нише, товара)", link: "claude.ai" },
              { level: "3", color: C.pink, title: "NotebookLM + Claude MCP", desc: "База знаний + мозг-аналитик через протокол", link: "" },
              { level: "4", color: C.amber, title: "Claude for Sheets", desc: "AI-формулы в таблицах для массового анализа", link: "" },
              { level: "5", color: C.red, title: "API + Claude", desc: "Автоматическая подгрузка данных с маркетплейса", link: "/tools/mpstats-api" },
            ].map((item) => (
              <div key={item.level} style={{ ...sCard, borderLeft: `3px solid ${item.color}`, display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
                <div style={{ ...sStepNum, background: `${item.color}22`, color: item.color, width: 32, height: 32, fontSize: 14 }}>{item.level}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: item.color }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: C.dim }}>{item.desc}</div>
                </div>
                {item.link && (
                  <a href={item.link.startsWith("/") ? item.link : `https://${item.link}`} target={item.link.startsWith("/") ? undefined : "_blank"} rel="noopener" style={{ fontSize: 11, color: item.color, textDecoration: "none", opacity: 0.7 }}>
                    &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>

          <div style={{ ...sCard, borderColor: C.green, background: `${C.green}08` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.green, marginBottom: 8 }}>Главная мысль</div>
            <p style={{ ...sP, margin: 0, fontSize: 15 }}>
              Данные без анализа — бесполезны. Анализ без данных — галлюцинации.<br />
              <strong style={{ color: C.text }}>NotebookLM даёт данные. Claude даёт анализ. Вместе — конкурентное преимущество.</strong>
            </p>
          </div>
        </section>

        {/* ── Footer nav ── */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/tools/mpstats-api" style={{ color: C.dim, fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
            &larr; MPStats API Гайд
          </Link>
          <Link href="/tools" style={{ color: C.dim, fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
            Все инструменты &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
