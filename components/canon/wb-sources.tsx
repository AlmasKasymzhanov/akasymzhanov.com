"use client";

import { Fn } from "@/components/canon/term";

type SourceLink = {
  label: string;
  href: string;
};

type SourceReference = {
  n: number;
  publication: string;
  date: string;
  claim: string;
  links: readonly SourceLink[];
};

const SOURCES: readonly SourceReference[] = [
  {
    n: 1,
    publication: "Российская газета",
    date: "18.07.2026",
    claim: "Данные региональных властей о семи погибших и 25 раненых в Котовске.",
    links: [{ label: "Материал «Российской газеты»", href: "https://rg.ru/2026/07/18/reg-cfo/posle-naleta-dronov-s-porazhaiushchimi-elementami-na-sklade-wb-nachalsia-pozhar.html" }],
  },
  {
    n: 2,
    publication: "Meduza",
    date: "18.07.2026",
    claim: "Первоначальное сообщение о 24 пострадавших на территории комплекса в Электростали.",
    links: [{ label: "Материал Meduza", href: "https://meduza.io/news/2026/07/18/ukrainskie-drony-atakovali-sklady-wildberries-v-dvuh-regionah-rossii-v-tambovskoy-oblasti-pogibli-sem-sotrudnikov-kompanii" }],
  },
  {
    n: 3,
    publication: "РБК",
    date: "18.07.2026",
    claim: "Вечерняя сводка губернатора: 57 пострадавших в Электростали, четыре в Ногинске и один погибший.",
    links: [{ label: "Материал РБК", href: "https://amp.rbc.ru/rbcnews/politics/18/07/2026/6a5baf919a79476912a7ba85" }],
  },
  {
    n: 4,
    publication: "RWB",
    date: "18.07.2026",
    claim: "Подтверждение атаки комплексов в Котовске и Электростали.",
    links: [{ label: "Сообщение RWB", href: "https://t.me/rwb_press_service/1619" }],
  },
  {
    n: 5,
    publication: "Associated Press",
    date: "18.07.2026",
    claim: "Сводный международный обзор событий 18 июля.",
    links: [{ label: "Материал AP", href: "https://apnews.com/article/c2d0d713643288b81dbbea714d5db5ac" }],
  },
  {
    n: 6,
    publication: "Татьяна Ким",
    date: "18.07.2026",
    claim: "Объявленные размеры поддержки семьям погибших и тяжело пострадавшим.",
    links: [{ label: "Публичное сообщение", href: "https://t.me/kimtatyana2024/777" }],
  },
  {
    n: 7,
    publication: "Татьяна Ким",
    date: "18.07.2026",
    claim: "Заявление об оценке потерь продавцов и первых логистических льготах.",
    links: [{ label: "Публичное сообщение", href: "https://t.me/kimtatyana2024/778" }],
  },
  {
    n: 8,
    publication: "RWB",
    date: "19.07.2026",
    claim: "Объявленные WB Банком меры поддержки пострадавших продавцов.",
    links: [{ label: "Сообщение RWB", href: "https://t.me/rwb_press_service/1626" }],
  },
  {
    n: 9,
    publication: "Интерфакс-Украина",
    date: "18.07.2026",
    claim: "Заявление украинской стороны о назначении поражённых объектов.",
    links: [{ label: "Материал Интерфакс-Украина", href: "https://ru.interfax.com.ua/news/general/1186123.html" }],
  },
  {
    n: 10,
    publication: "Фонарь",
    date: "06.03.2023",
    claim: "Описание волонтёрских списков WB/Ozon и доставки заказов в указанный ПВЗ.",
    links: [{ label: "Материал «Фонаря»", href: "https://fonar.tv/article/2023/03/06/plechom-k-plechu-kak-v-belgorodskoy-oblasti-pomogayut-voennym-i-bezhencam" }],
  },
  {
    n: 11,
    publication: "Морпехи Севастополя",
    date: "проверено 19.07.2026",
    claim: "Публично предложенный список товаров и заказ через ПВЗ для 810-й бригады.",
    links: [{ label: "Точный Telegram-пост", href: "https://t.me/morpeh_810/9404" }],
  },
  {
    n: 12,
    publication: "ICRC",
    date: "08.06.1977",
    claim: "Статья 52: тест военной цели и презумпция гражданского назначения при сомнении.",
    links: [{ label: "Дополнительный протокол I, статья 52", href: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-52" }],
  },
  {
    n: 13,
    publication: "MPStats",
    date: "проверено 19.07.2026",
    claim: "Описание метода получения внешних оценочных данных.",
    links: [{ label: "Документация MPStats", href: "https://mpstats.io/integrations/docs/description/" }],
  },
  {
    n: 14,
    publication: "Wildberries",
    date: "18–19.07.2026",
    claim: "Карточка детектора «Булат v.4» и отдельный публичный файл метаданных классификатора.",
    links: [
      { label: "Карточка SKU 949889001", href: "https://www.wildberries.ru/catalog/949889001/detail.aspx" },
      { label: "Публичные метаданные карточки", href: "https://basket-40.wbbasket.ru/vol9498/part949889/949889001/info/ru/card.json" },
    ],
  },
  {
    n: 15,
    publication: "Wildberries",
    date: "18.07.2026",
    claim: "Карточка бронежилета и заявления продавца о комплектации.",
    links: [{ label: "Карточка SKU 879755591", href: "https://www.wildberries.ru/catalog/879755591/detail.aspx" }],
  },
  {
    n: 16,
    publication: "Wildberries",
    date: "18.07.2026",
    claim: "Карточка катушки SKU 447850828 с заявленным назначением для дрона и отдельная проверенная карточка SKU 971841998 со схемами подключения.",
    links: [
      { label: "Катушка SKU 447850828", href: "https://www.wildberries.ru/catalog/447850828/detail.aspx" },
      { label: "Схемы подключения, SKU 971841998", href: "https://www.wildberries.ru/catalog/971841998/detail.aspx" },
    ],
  },
  {
    n: 17,
    publication: "Wildberries",
    date: "18.07.2026",
    claim: "Карточка аптечки с военной маркировкой.",
    links: [{ label: "Карточка SKU 230725243", href: "https://www.wildberries.ru/catalog/230725243/detail.aspx" }],
  },
  {
    n: 18,
    publication: "Wildberries",
    date: "18.07.2026",
    claim: "Карточка гражданского километрового оптического кабеля.",
    links: [{ label: "Карточка SKU 972102728", href: "https://www.wildberries.ru/catalog/972102728/detail.aspx" }],
  },
  {
    n: 19,
    publication: "ITU",
    date: "01.08.2024",
    claim: "Характеристики семейства одномодового волокна G.657.",
    links: [{ label: "Рекомендация ITU-T G.657", href: "https://www.itu.int/epublications/publication/itu-t-g-657-2024-08-characteristics-of-a-bending-loss-insensitive-single-mode-optical-fibre-and-cable" }],
  },
  {
    n: 20,
    publication: "US Army",
    date: "проверено 19.07.2026",
    claim: "Возможности и физические ограничения оптоволоконного управления БПЛА.",
    links: [{ label: "Материал US Army", href: "https://www.army.mil/article-amp/287737/fiber_optic_drones_posing_a_significant_c_uas_challenge" }],
  },
  {
    n: 21,
    publication: "NATO ACT",
    date: "проверено 19.07.2026",
    claim: "Оптоволоконные БПЛА и ограничения традиционного радиочастотного подавления.",
    links: [{ label: "Материал NATO ACT", href: "https://www.act.nato.int/article/innovation-challenge-fibre-optic-drones/" }],
  },
  {
    n: 22,
    publication: "Wildberries Data Centers",
    date: "проверено 19.07.2026",
    claim: "Параметры дата-центра внутри распределительного центра Wildberries.",
    links: [{ label: "Сайт Wildberries Data Centers", href: "https://datacenters.wb.ru/en/" }],
  },
] as const;

function getSource(n: number) {
  const source = SOURCES.find((item) => item.n === n);
  if (!source) throw new Error(`Unknown source reference: ${n}`);
  return source;
}

export function Cite({ n }: { n: number }) {
  const source = getSource(n);
  return (
    <Fn
      n={n}
      tip={
        <>
          <span className="font-bold text-[var(--color-text)]">{source.publication}</span>
          {` · ${source.date}. ${source.claim}`}
          <span className="mt-1 block text-[10px]">Кликабельная ссылка находится в разделе «Источники».</span>
        </>
      }
    />
  );
}

export function SourcesList() {
  return (
    <section className="mb-12" aria-labelledby="article-sources-heading">
      <h2 id="article-sources-heading" className="mb-6 text-[20px] font-bold tracking-tight text-[var(--color-text)]">
        Источники
      </h2>
      <ol className="list-decimal space-y-3 pl-5 text-[12px] leading-relaxed text-[var(--color-dim)] marker:font-mono marker:text-[var(--color-text)]">
        {SOURCES.map((source) => (
          <li key={source.n} id={`source-${source.n}`}>
            <span className="font-bold text-[var(--color-text)]">{source.publication}</span>
            {` · ${source.date}. ${source.claim} `}
            {source.links.map((link, index) => (
              <span key={link.href}>
                {index > 0 && " · "}
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="underline decoration-solid underline-offset-2 hover:text-[var(--color-text)]">
                  {link.label}
                </a>
              </span>
            ))}
          </li>
        ))}
      </ol>
    </section>
  );
}
