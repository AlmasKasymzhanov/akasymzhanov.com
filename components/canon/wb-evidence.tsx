"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageLightbox, type LightboxItem } from "@/components/canon/image-lightbox";
import { Cite } from "@/components/canon/wb-sources";
import { type Locale } from "@/lib/i18n";

function useLightbox(items: readonly LightboxItem[]) {
  const [index, setIndex] = useState<number | null>(null);
  return {
    openAt: setIndex,
    lightbox: index === null ? null : (
      <ImageLightbox items={items} index={index} onIndexChange={setIndex} onClose={() => setIndex(null)} />
    ),
  };
}

const BULAT_META: Record<Locale, { root: string; subj: string; mpstats: string; source: string; caption: string; alt: string; aria: string }> = {
  ru: {
    root: "«Электрика»",
    subj: "«Приборы для калибровки»",
    mpstats: "«Детекторы дронов»",
    source: "Источник: публичные метаданные карточки Wildberries",
    caption: "Карточка «Булат v.4» на Wildberries, зафиксирована 18.07.2026. Видимый путь интерфейса, публичные метаданные Wildberries и классификатор MPStats относят один артикул к трём разным веткам. Артикул 949889001.",
    alt: "Карточка детектора «Булат v.4» с ценой 132 060 рублей, артикул 949889001, и путём раздела измерительных инструментов",
    aria: "Открыть увеличенный фрагмент карточки «Булат v.4»",
  },
  en: {
    root: "“Electrical”",
    subj: "“Calibration instruments”",
    mpstats: "“Drone detectors”",
    source: "Source: public Wildberries listing metadata",
    caption: "Wildberries listing for “Bulat v.4”, captured 18.07.2026. The interface path, public Wildberries metadata, and MPStats classifier place the same SKU in three different branches. SKU 949889001.",
    alt: "Listing for “Bulat v.4” drone detector priced at 132,060 rubles, SKU 949889001, showing the measuring-instruments category path",
    aria: "Open enlarged fragment of the “Bulat v.4” listing",
  },
};

const BULAT_SRC = "/blog/wb-dual-use/evidence/product-949889001.png";

export function BulatEvidence({ locale = "ru" }: { locale?: Locale }) {
  const t = BULAT_META[locale];
  const items: readonly LightboxItem[] = [{ src: BULAT_SRC, alt: t.alt, caption: t.caption }];
  const { openAt, lightbox } = useLightbox(items);
  return (
    <figure className="my-8 overflow-hidden rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)]">
      <button type="button" onClick={() => openAt(0)} className="block w-full cursor-zoom-in bg-white p-2 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--color-brand)]" aria-label={t.aria}>
        <Image src={BULAT_SRC} alt={t.alt} width={1018} height={488} sizes="(min-width: 680px) 630px, calc(100vw - 50px)" className="h-auto w-full" />
      </button>
      <div className="border-t border-[var(--color-border)] p-4">
        <div className="mb-3 rounded-[2px] border border-[var(--color-border)] bg-[var(--color-bg)] p-3 font-mono text-[10px] leading-relaxed text-[var(--color-dim)]" aria-label="Archived public listing metadata">
          <p><span className="text-[var(--color-text)]">subj_root_name</span> = {t.root}</p>
          <p><span className="text-[var(--color-text)]">subj_name</span> = {t.subj}</p>
          <p><span className="text-[var(--color-text)]">MPStats category</span> = {t.mpstats}</p>
          <p className="mt-2">{t.source}<Cite n={14} locale={locale} /> · verified 19.07.2026</p>
        </div>
        <figcaption className="text-[11px] leading-relaxed text-[var(--color-dim)]">{t.caption}</figcaption>
      </div>
      {lightbox}
    </figure>
  );
}

const GALLERY_META: Record<Locale, { caption: string; alt: string }[]> = {
  ru: [
    { alt: "Карточка детектора «Булат v.4» с ценой 132 060 рублей, артикул 949889001", caption: "«Булат v.4», 132 060 ₽ · 18.07.2026" },
    { alt: "Карточка бронежилета с заявлением продавца о двух плитах Бр5, ценой 17 098 рублей, артикул 879755591", caption: "Бронежилет; продавец заявляет две плиты и Бр5, 17 098 ₽ · 18.07.2026" },
    { alt: "Карточка 10-километровой катушки оптоволокна для дрона с ценой 22 705 рублей, артикул 447850828", caption: "Катушка оптоволокна для дрона, 10 км, 22 705 ₽ · 18.07.2026" },
    { alt: "Карточка аптечки с маркировкой «военная СВО», ценами 6 124 рублей с WB Кошельком и 6 249 рублей без этой скидки, артикул 230725243", caption: "Аптечка с маркировкой «военная СВО», 6 249 ₽ без скидки WB Кошелька · 18.07.2026" },
    { alt: "Карточка километрового оптического кабеля для интернета с ценами 12 947 рублей с WB Кошельком и 13 212 рублей без этой скидки, артикул 972102728", caption: "Оптический кабель для интернета, 1 км, 13 212 ₽ без скидки WB Кошелька · 18.07.2026" },
  ],
  en: [
    { alt: "Listing for “Bulat v.4” drone detector, 132,060 rubles, SKU 949889001", caption: "“Bulat v.4”, 132,060 ₽ · 18.07.2026" },
    { alt: "Body-armor vest listing; seller claims two plates and Br5, 17,098 rubles, SKU 879755591", caption: "Body-armor vest; seller claims two plates and Br5, 17,098 ₽ · 18.07.2026" },
    { alt: "10-kilometer fiber-optic spool listing for drones, 22,705 rubles, SKU 447850828", caption: "Fiber-optic spool for drone, 10 km, 22,705 ₽ · 18.07.2026" },
    { alt: "First-aid kit listing with “military SVO” labeling, 6,124 rubles with WB Wallet and 6,249 without, SKU 230725243", caption: "First-aid kit with “military SVO” label, 6,249 ₽ without WB Wallet discount · 18.07.2026" },
    { alt: "One-kilometer civilian optical cable listing, 12,947 rubles with WB Wallet and 13,212 without, SKU 972102728", caption: "Civilian optical cable, 1 km, 13,212 ₽ without WB Wallet discount · 18.07.2026" },
  ],
};

const GALLERY_SRCS = [
  "/blog/wb-dual-use/evidence/product-949889001.png",
  "/blog/wb-dual-use/evidence/product-879755591.png",
  "/blog/wb-dual-use/evidence/product-447850828.png",
  "/blog/wb-dual-use/evidence/product-230725243.png",
  "/blog/wb-dual-use/evidence/product-972102728.png",
] as const;

const GALLERY_FIGCAPTION: Record<Locale, string> = {
  ru: "Архивные снимки публичных карточек Wildberries · 18.07.2026. Красная цена аптечки и гражданского кабеля показана со скидкой WB Кошелька; подписи и текст статьи используют расположенную рядом цену без этой скидки.",
  en: "Archived screenshots of public Wildberries listings · 18.07.2026. The red prices for the first-aid kit and civilian cable show the WB Wallet discount; captions and article text use the adjacent non-discounted price.",
};

export function ProductCardGallery({ locale = "ru" }: { locale?: Locale }) {
  const meta = GALLERY_META[locale];
  const items: readonly LightboxItem[] = GALLERY_SRCS.map((src, i) => ({ src, alt: meta[i].alt, caption: meta[i].caption }));
  const { openAt, lightbox } = useLightbox(items);
  return (
    <figure className="relative left-1/2 my-8 w-[calc(100vw-2rem)] max-w-[900px] -translate-x-1/2">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_SRCS.map((src, index) => (
          <button key={src} type="button" onClick={() => openAt(index)} className="overflow-hidden rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)] text-left cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]">
            <span className="block bg-white">
              <Image src={src} alt={meta[index].alt} width={1018} height={488} sizes="(min-width: 1024px) 290px, (min-width: 640px) 45vw, calc(100vw - 48px)" className="h-auto w-full" />
            </span>
            <span className="block border-t border-[var(--color-border)] p-3 text-[11px] leading-relaxed text-[var(--color-dim)]">{meta[index].caption}</span>
          </button>
        ))}
      </div>
      <figcaption className="mt-3 font-mono text-[10px] leading-relaxed text-[var(--color-dim)]">{GALLERY_FIGCAPTION[locale]}</figcaption>
      {lightbox}
    </figure>
  );
}

const CABLE_META: Record<Locale, { caption: string; aria: string }> = {
  ru: {
    caption: "Слева показан гражданский километровый кабель для подключения здания к интернету. Справа показана 10-километровая катушка G.657A2, которую продавец позиционирует для FPV-дрона. Схемы подключения в lightbox опубликованы продавцом в другой проверенной карточке, артикул 971841998. Общий класс волокна не делает изделия одинаковыми: отличаются длина, масса, конструкция, размотка и подключение.",
    aria: "Открыть: {alt}",
  },
  en: {
    caption: "Left: a civilian one-kilometer cable for building internet access. Right: a 10-kilometer G.657A2 spool that the seller markets for FPV drones. Connection diagrams in the lightbox were published by the seller in another verified listing, SKU 971841998. The shared fiber class does not make the products identical: length, weight, construction, unwinding, and connection differ.",
    aria: "Open: {alt}",
  },
};

const CABLES: readonly LightboxItem[] = [
  { src: "/blog/wb-dual-use/evidence/civilian-cable.webp", alt: "Civilian one-kilometer optical cable for outdoor and indoor use", caption: "Civilian one-kilometer cable for building internet access." },
  { src: "/blog/wb-dual-use/evidence/fpv-spool.webp", alt: "10-kilometer G.657A2 fiber spool marketed by the seller for FPV drones", caption: "10-kilometer G.657A2 spool that the seller markets for FPV drones." },
  { src: "/blog/wb-dual-use/evidence/fpv-connection-video.webp", alt: "Seller diagram from SKU 971841998: connection to video module and receiver", caption: "Seller image from SKU 971841998: connection to video module and receiver." },
  { src: "/blog/wb-dual-use/evidence/fpv-connection-controller.webp", alt: "Seller diagram from SKU 971841998: connection to flight controller", caption: "Seller image from SKU 971841998: connection to flight controller." },
];

export function CableComparison({ locale = "ru" }: { locale?: Locale }) {
  const t = CABLE_META[locale];
  const { openAt, lightbox } = useLightbox(CABLES);
  return (
    <figure className="my-8 overflow-hidden rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="grid grid-cols-2 gap-px bg-[var(--color-border)]">
        {CABLES.slice(0, 2).map((item, index) => (
          <button key={item.src} type="button" onClick={() => openAt(index)} className="relative aspect-[3/4] cursor-zoom-in bg-white focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--color-brand)]" aria-label={t.aria.replace("{alt}", item.alt)}>
            <Image src={item.src} alt={item.alt} fill sizes="(min-width: 680px) 315px, 45vw" className="object-contain" />
          </button>
        ))}
      </div>
      <figcaption className="border-t border-[var(--color-border)] p-4 text-[11px] leading-relaxed text-[var(--color-dim)]">{t.caption}</figcaption>
      {lightbox}
    </figure>
  );
}
