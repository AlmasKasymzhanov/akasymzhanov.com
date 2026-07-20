"use client";

import { Masthead } from "@/components/canon/masthead";
import { MetaLabel } from "@/components/canon/meta-label";
import { LineChart } from "@/components/charts/line-chart";
import { BarChart } from "@/components/charts/bar-chart";

/* Клиентский отчёт: отбор товарных ниш Wildberries (РФ).
   Канон: моно-редакторская монохромность, Brock UI графики, один тёплый акцент.
   Юнит-экономики намеренно нет — она считается после ответов клиента по налогам,
   тарифу карго и кодам ТН ВЭД. */

const ACCENT = "#f54900";

const MONTHS = [
  "июл 25", "авг 25", "сен 25", "окт 25", "ноя 25", "дек 25",
  "янв 26", "фев 26", "мар 26", "апр 26", "май 26", "июн 26",
];

const fmtMln = (v: number) =>
  v >= 1000
    ? `${(v / 1000).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} млрд ₽`
    : `${v.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} млн ₽`;

const SOURCE = (
  <figcaption className="font-mono text-[11px] text-[var(--color-dim)] mt-4">
    Источник: MPStats<span className="text-[var(--color-border)] mx-1.5">·</span>
    внешняя аналитика Wildberries
  </figcaption>
);

/* ───── Заголовок раздела ───── */
function SectionHead({ n, label, title }: { n: string; label: string; title: React.ReactNode }) {
  return (
    <header className="mt-16 mb-6">
      <MetaLabel items={[`Раздел ${n}`, label]} className="mb-3" />
      <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight leading-[1.2]">{title}</h2>
    </header>
  );
}

/* ───── Таблица на тонких линейках ───── */
function MonoTable({
  head,
  rows,
  numeric = [],
}: {
  head: string[];
  rows: (string | React.ReactNode)[][];
  numeric?: number[];
}) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full font-mono text-[12.5px] leading-relaxed border-collapse">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th
                key={i}
                className={`border-b border-[var(--color-text)] pb-2 pr-4 text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-dim)] font-normal ${
                  numeric.includes(i) ? "text-right pr-0 pl-4" : "text-left"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td
                  key={ci}
                  className={`border-b border-[var(--color-border)] py-2 pr-4 align-top ${
                    numeric.includes(ci) ? "text-right pr-0 pl-4 tabular-nums" : ""
                  }`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───── Полоса ключевых чисел ───── */
function StatStrip() {
  const stats = [
    { k: "Проанализировано ниш", num: "7 545", unit: "", d: "весь каталог Wildberries" },
    { k: "Прошли отбор", num: "7", unit: "ниш", d: "после 6 фильтров" },
    { k: "Лидер по росту", num: "×18", unit: "", d: "тенты автомобильные, в штуках" },
    { k: "Период данных", num: "12", unit: "мес", d: "июль 2025 — июнь 2026" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--color-border)] my-8 sm:my-10">
      {stats.map((s) => (
        <div key={s.k} className="border-r border-b border-[var(--color-border)] p-3 sm:p-4">
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[var(--color-dim)] mb-2 leading-snug text-balance">
            {s.k}
          </p>
          <p className="font-mono text-[16px] sm:text-[18px] md:text-[19px] font-bold tabular-nums leading-tight">
            <span className="whitespace-nowrap">{s.num}</span>
            {s.unit && <span className="whitespace-nowrap"> {s.unit}</span>}
          </p>
          <p className="font-mono text-[10px] sm:text-[11px] text-[var(--color-dim)] mt-1.5 sm:mt-2 leading-snug">
            {s.d}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ───── Врезка ───── */
function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-[var(--color-text)] pl-4 my-6">
      <p className="text-[13px] leading-relaxed text-[var(--color-dim)]">
        <b className="text-[var(--color-text)]">{title}</b> {children}
      </p>
    </div>
  );
}

/* ───── Графики ───── */
function TentsChart() {
  return (
    <figure className="my-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[3px] p-3 sm:p-5">
      <LineChart
        height={260}
        accent={ACCENT}
        curve="linear"
        markers="auto"
        lastValueDot
        xScale="point"
        header={{
          title: "Девять месяцев непрерывного роста",
          subtitle: "Тенты автомобильные, выручка в месяц",
        }}
        x={MONTHS}
        data={[
          {
            name: "Тенты автомобильные",
            data: [232, 184, 150, 875, 1345, 2624, 1801, 2010, 3160, 5873, 7495, 5518],
            color: ACCENT,
            emphasis: true,
          },
        ]}
        formatValue={fmtMln}
        yAxisFormat={(v: number) =>
          v >= 1000 ? `${(v / 1000).toLocaleString("ru-RU")} млрд` : `${v} млн`
        }
      />
      {SOURCE}
    </figure>
  );
}

function VfdChart() {
  return (
    <figure className="my-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[3px] p-3 sm:p-5">
      <LineChart
        height={260}
        accent={ACCENT}
        curve="linear"
        markers="auto"
        lastValueDot
        xScale="point"
        header={{
          title: "Полгода плато, затем ступенька в январе",
          subtitle: "Частотные преобразователи, выручка в месяц",
        }}
        x={MONTHS}
        data={[
          {
            name: "Частотные преобразователи",
            data: [117, 150, 116, 131, 123, 161, 421, 1470, 1349, 1610, 1059, 1047],
            color: ACCENT,
            emphasis: true,
          },
        ]}
        formatValue={fmtMln}
        yAxisFormat={(v: number) =>
          v >= 1000 ? `${(v / 1000).toLocaleString("ru-RU")} млрд` : `${v} млн`
        }
      />
      {SOURCE}
    </figure>
  );
}

function GrowthBarChart() {
  return (
    <figure className="my-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[3px] p-3 sm:p-5">
      <BarChart
        accent={ACCENT}
        barRadius={2}
        labelWidth={212}
        barThickness={20}
        gap={10}
        header={{
          title: "Рост спроса в штуках, а не в рублях",
          subtitle: "Во сколько раз выросли продажи в единицах, июль 2025 → июнь 2026",
        }}
        slots={{ tooltip: () => null }}
        data={[
          { label: "Тенты автомобильные", value: 18.2, highlight: true },
          { label: "Частотные преобразователи", value: 6.5, highlight: true },
          { label: "Баки расширительные", value: 2.9 },
          { label: "Молотки отбойные", value: 1.6 },
          { label: "Насосы для ГСМ", value: 1.6 },
          { label: "Стабилизаторы напряжения", value: 1.2 },
          { label: "Тенты для бассейнов", value: 1.2 },
        ]}
        formatValue={(v: number) => `×${v.toLocaleString("ru-RU", { maximumFractionDigits: 1 })}`}
      />
      {SOURCE}
    </figure>
  );
}

export default function NicheReport() {
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        {/* Узкая клиентская шапка: только masthead, без навигации сайта */}
        <header className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-[var(--color-border)]">
          <Masthead />
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[var(--color-dim)] text-right shrink-0">
            Отбор ниш<span className="hidden sm:inline"> · Wildberries РФ</span>
          </p>
        </header>

        <article className="w-full max-w-[680px] mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 flex-1">
          <MetaLabel items={["Июль 2026", "Клиентский отчёт", "Wildberries РФ"]} className="mb-5" />
          <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight leading-[1.15] mb-5">
            Отбор ниш для Wildberries: 7 из 7 545
          </h1>
          <p className="text-[14px] md:text-[15px] text-[var(--color-dim)] leading-relaxed">
            Какие товарные ниши на Wildberries растут по-настоящему — по количеству проданных
            штук, а не по инфляции среднего чека. Разбор 7 545 ниш за 12 сопоставимых месяцев,
            от объёма спроса до плотности конкуренции и замороженного капитала.
          </p>

          <Callout title="Юнит-экономики здесь нет — намеренно.">
            Расчёт прибыли считается после того, как подтверждены налоговый режим, тариф карго,
            коды ТН ВЭД и стоимость растаможки. Без этих цифр любой расчёт маржи был бы гаданием.
            В этом отчёте — только рынок: что растёт, насколько плотно занято и где подводные камни.
          </Callout>

          <StatStrip />

          {/* ── 01 ── */}
          <SectionHead n="01" label="Методика" title="Как из 7 545 ниш осталось семь" />
          <p className="text-[14px] leading-relaxed mb-4">
            Отбор шёл в шесть шагов. Каждый следующий фильтр отсекал то, что выглядит красиво
            в таблице, но не работает на практике: размерные сетки, подбор по маркам авто,
            лицензионный контент, объёмный груз.
          </p>
          <MonoTable
            head={["Шаг", "Осталось", "Что отсекли"]}
            numeric={[1]}
            rows={[
              ["Все ниши Wildberries", "7 545", "—"],
              ["Убрали размерные и вариативные", "5 042", "одежда, обувь, бельё, аксессуары, ювелирка"],
              ["Убрали сложную совместимость", "↓", "автозапчасти, мото — подбор по маркам"],
              ["Убрали регулируемое и с правами", "↓", "фарма, алкоголь, книги, живые растения"],
              ["Рост спроса + масштаб + выкуп", "22", "см. критерии ниже"],
              ["Пригодность к импорту из Китая", "7", "габаритные, батарейные"],
            ]}
          />
          <p className="text-[14px] leading-relaxed mb-4">
            Критерии прохождения: рост в штуках не менее 1,2× за год и рост доли рынка не менее
            1,5×; выручка от 50 млн ₽ в месяц; не менее 30 активных продавцов; медианная цена
            от 800 ₽; выкуп с учётом возвратов от 55%; оборачиваемость до 120 дней.
          </p>

          <Callout title="Важная оговорка о данных.">
            Мы не измеряли рост в рублях. За год средний чек по всему рынку вырос на 52%
            (1 385 → 2 103 ₽), а количество проданных штук упало на 43%. Такое расхождение —
            признак пересчёта методики, а не движения рынка, и оно завышает рублёвый рост
            у всех ниш одинаково. Поэтому рост считался в штуках и в доле рынка. Практический
            эффект: садовые триммеры выросли в рублях в 2,7 раза, а в штуках — упали. Это
            ценовая инфляция, а не спрос, и в список они не попали.
          </Callout>

          <GrowthBarChart />

          {/* ── 02 ── */}
          <SectionHead n="02" label="Результат" title="Семь ниш, прошедших все фильтры" />
          <MonoTable
            head={["Ниша", "Выручка/мес", "Рост шт", "Медиана", "Выкуп", "Комиссия", "Оборот"]}
            numeric={[1, 2, 3, 4, 5, 6]}
            rows={[
              ["Тенты автомобильные", "5 518 млн", "×18,2", "3 725 ₽", "80,9%", "26,5%", "75 дн"],
              ["Частотные преобразователи", "1 047 млн", "×6,5", "16 408 ₽", "78,6%", "28,5%", "62 дн"],
              ["Баки расширительные", "276 млн", "×2,9", "3 158 ₽", "84,0%", "27,5%", "53 дн"],
              ["Молотки отбойные", "292 млн", "×1,6", "7 917 ₽", "80,8%", "31,5%", "95 дн"],
              ["Насосы для ГСМ", "515 млн", "×1,6", "1 584 ₽", "87,5%", "26,5%", "118 дн"],
              ["Стабилизаторы напряжения", "1 819 млн", "×1,2", "6 578 ₽", "89,1%", "19,5%", "64 дн"],
              ["Тенты для бассейнов", "295 млн", "×1,2", "1 784 ₽", "85,2%", "28,5%", "98 дн"],
            ]}
          />

          {/* ── 03 ── */}
          <SectionHead n="03" label="Кандидат №1" title="Тенты автомобильные: рост, которого нет больше нигде" />
          <p className="text-[14px] leading-relaxed mb-4">
            Чехлы-накидки на автомобиль от солнца, града и снега. Категория выросла с 232 млн
            до 5,5 млрд ₽ в месяц — девять месяцев непрерывного роста. В штуках рост{" "}
            <b>×18,2</b>, доля рынка в штуках <b>×31,9</b>. Такой профиль в выборке из 7 545 ниш
            встретился ровно один раз.
          </p>
          <TentsChart />
          <p className="text-[14px] leading-relaxed mb-4">
            <b>Непокрытый спрос — главный аргумент.</b> Упущенная выручка 40,9%, это{" "}
            <b>3,8 млрд ₽ в месяц</b>: продавцы не успевают держать остатки, рынок растёт быстрее,
            чем они завозят. Конкуренция при этом уже плотная — 2 836 продавцов, но продают
            только 878 (31%), выручка на активного продавца 6,29 млн ₽ в месяц.
          </p>
          <MonoTable
            head={["Показатель", "Значение", "Комментарий"]}
            numeric={[1]}
            rows={[
              ["Продано за месяц", "1 373 099 шт", "конверсия в заказ 15,3%"],
              ["Цены (мин / медиана / макс)", "145 / 3 725 / 129 197 ₽", "медиана ≈ средней, рынок однородный"],
              ["Товаров всего / с продажами", "105 677 / 40 643", "продаются 38,5%"],
              ["Новинок за месяц", "18 583", "заходят активно — окно не вечное"],
              ["Рейтинг конкурентов", "4,47", "самый низкий в списке — качество можно перебить"],
              ["Заморожено остатков", "62%", "сезонность 2 из 3"],
            ]}
          />
          <Callout title="На что смотреть.">
            Размеры S/M/L/XL по габаритам машины. Это не сетка одежды, но 3–4 варианта держать
            придётся. Плюс 18,5 тысячи новинок в месяц — конкуренты заходят быстро.
          </Callout>

          {/* ── 04 ── */}
          <SectionHead n="04" label="Кандидат №2" title="Частотные преобразователи: рост при почти пустом рынке" />
          <p className="text-[14px] leading-relaxed mb-4">
            Промышленные регуляторы оборотов электродвигателей — для насосов, вентиляторов,
            станков. Полгода плато 117–161 млн ₽, затем ступенька в январе-феврале и новое
            плато около 1,0–1,6 млрд. Рост в штуках <b>×6,5</b>, доля рынка <b>×11,4</b>.
          </p>
          <VfdChart />
          <p className="text-[14px] leading-relaxed mb-4">
            <b>Главный аргумент — свободный рынок.</b> Всего <b>117 активных продавцов</b> на
            миллиард выручки. Товаров 4 736, продаются только 796 — это 16,8%. Новинок за
            месяц — <b>126</b> против 18 583 у тентов. Выручка на активного продавца{" "}
            <b>8,95 млн ₽</b>, лучший показатель в списке.
          </p>
          <MonoTable
            head={["Показатель", "Значение", "Комментарий"]}
            numeric={[1]}
            rows={[
              ["Цены (медиана / средняя)", "16 408 / 25 708 ₽", "рынок расслоён по мощности"],
              ["Упущенная выручка", "33,1% · 516 млн ₽", "спрос не покрыт"],
              ["Рейтинг конкурентов", "4,85", "покупатель разбирается и придирчив"],
              ["Конверсии (корзина / заказ)", "3,2% / 6,7%", "выбирают долго и осознанно"],
              ["Заморожено остатков", "77%", "оборачиваемость 62 дня"],
            ]}
          />
          <Callout title="Это техника, а не ширпотреб.">
            Сертификация обязательна — электрооборудование, ТР ТС; закладывайте время и деньги.
            Нужна техническая экспертиза: мощность, тип управления, совместимость с двигателем.
            Спрос ближе к B2B — сервис, гарантия и консультация важнее красивой карточки.
          </Callout>

          {/* ── 05 ── */}
          <SectionHead n="05" label="Остальные пять" title="Что ещё прошло отбор" />
          <p className="text-[14px] leading-relaxed mb-4">
            Эти ниши слабее по росту, но у каждой есть своя сильная сторона — и свой недостаток,
            который нужно взвесить.
          </p>
          <MonoTable
            head={["Ниша", "Сильная сторона", "Что взвесить"]}
            rows={[
              [
                "Баки расширительные",
                "оборачиваемость 53 дня — лучшая; активны 43% продавцов",
                "объём всего 276 млн — низкий потолок по деньгам",
              ],
              [
                "Молотки отбойные",
                "48,5% товаров с продажами — самый живой ассортимент",
                "комиссия 31,5% (максимум), заморожено 84%, вес 10–20 кг",
              ],
              [
                "Насосы для ГСМ",
                "выкуп 87,5%, конверсия в заказ 15,2%",
                "оборот 118 дней, заморожено 90%, чек всего 1 584 ₽",
              ],
              [
                "Стабилизаторы напряжения",
                "комиссия 19,5% и выкуп 89,1% — лучшие в списке; объём 1,8 млрд",
                "рост скромный: ниша стабильная, а не растущая",
              ],
              [
                "Тенты для бассейнов",
                "лучшие конверсии: корзина 7,5%, заказ 20,8%",
                "сезонность 3 из 3 — сезон уже уходит, реально это весна 2027",
              ],
            ]}
          />

          {/* ── 06 ── */}
          <SectionHead n="06" label="Отсев" title="Что не прошло и почему" />
          <p className="text-[14px] leading-relaxed mb-4">
            Отсев объясняет, почему список короткий. Это не осторожность ради осторожности —
            каждая причина проверяемая.
          </p>
          <MonoTable
            head={["Причина отсева", "Ниши"]}
            rows={[
              [
                "Габариты: при плотности ниже 100 кг/м³ карго считает по кубу, логистика съедает маржу",
                "кухонные гарнитуры, корпусная мебель, кресла, столешницы, каркасные бассейны, плиты с духовкой, плитка",
              ],
              [
                "Право и регулирование",
                "виниловые пластинки (авторские права), инвалидные коляски (медизделие), комнатные растения (фитосанитария), учебники (права издательств)",
              ],
              [
                "Подбор по маркам авто",
                "амортизаторы, полуоси и ШРУС, тормозные колодки",
              ],
              [
                "Ограничения перевозки батарей",
                "источники бесперебойного питания",
              ],
              [
                "Рост только в рублях — спрос в штуках не рос",
                "садовые триммеры (×0,9), погружные насосы (×1,0), кухонные мойки (×1,1)",
              ],
            ]}
          />

          {/* ── 07 ── */}
          <SectionHead n="07" label="Наблюдение" title="Две вещи, общие для всего рынка" />
          <p className="text-[14px] leading-relaxed mb-4">
            Во <b>всех</b> отобранных нишах два показателя выглядят одинаково — и это
            характеристика текущего Wildberries, а не дефект выборки.
          </p>
          <MonoTable
            head={["Показатель", "Диапазон", "Что это значит"]}
            numeric={[1]}
            rows={[
              [
                "Упущенная выручка",
                "25–41%",
                "четверть-треть спроса не закрывается: продавцы не держат остатки. Для входящего — возможность, но закупку сложно прогнозировать",
              ],
              [
                "Заморожено остатков",
                "62–90%",
                "капитал в товаре стоит долго. Партия окупается не за месяц — это надо закладывать в оборотку",
              ],
            ]}
          />

          {/* ── 08 ── */}
          <SectionHead n="08" label="Дальше" title="Что нужно, чтобы посчитать прибыль" />
          <ol className="text-[14px] leading-relaxed space-y-2 my-6 pl-5 list-decimal marker:text-[var(--color-dim)] marker:font-mono">
            <li>Ответы по налоговому режиму, тарифу карго, кодам ТН ВЭД и стоимости растаможки</li>
            <li>Расчёт потолка закупочной цены по каждой нише — при какой цене на 1688 сходится целевая маржа</li>
            <li>Поиск поставщиков под этот потолок: рейтинг, повторные закупки, объём продаж, MOQ</li>
            <li>Итог — 2–3 ниши с конкретными поставщиками, ценами и расчётом партии</li>
          </ol>

          {/* Оговорки */}
          <div className="mt-14 pt-6 border-t border-[var(--color-border)]">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-dim)] mb-3">
              Оговорки к данным
            </p>
            <ul className="font-mono text-[11.5px] leading-relaxed text-[var(--color-dim)] space-y-1.5">
              <li>— Показатели рынка — оценка MPStats по внешней аналитике, не официальные данные Wildberries</li>
              <li>— Период: 12 сопоставимых 30-дневных окон, последнее закрыто 30.06.2026</li>
              <li>— Рост измерен в штуках и доле рынка; рублёвый рост не использовался из-за дрейфа среднего чека по всему массиву</li>
              <li>— Концентрация топ-5 продавцов по этим нишам пока не считалась</li>
              <li>— Вес и габариты товаров не приводятся: их нужно брать у конкретного поставщика, оценки вводили бы в заблуждение</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
