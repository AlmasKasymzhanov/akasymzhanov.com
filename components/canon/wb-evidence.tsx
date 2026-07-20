"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageLightbox, type LightboxItem } from "@/components/canon/image-lightbox";
import { Cite } from "@/components/canon/wb-sources";

function useLightbox(items: readonly LightboxItem[]) {
  const [index, setIndex] = useState<number | null>(null);
  return {
    openAt: setIndex,
    lightbox: index === null ? null : (
      <ImageLightbox items={items} index={index} onIndexChange={setIndex} onClose={() => setIndex(null)} />
    ),
  };
}

const BULAT: readonly LightboxItem[] = [{
  src: "/blog/wb-dual-use/evidence/product-949889001.png",
  alt: "Карточка детектора «Булат v.4» с ценой 132 060 рублей, артикул 949889001, и путём раздела измерительных инструментов",
  caption: "Целевой фрагмент карточки «Булат v.4» на Wildberries, зафиксированной 18.07.2026.",
}];

export function BulatEvidence() {
  const { openAt, lightbox } = useLightbox(BULAT);
  return (
    <figure className="my-8 overflow-hidden rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)]">
      <button type="button" onClick={() => openAt(0)} className="block w-full cursor-zoom-in bg-white p-2 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--color-brand)]" aria-label="Открыть увеличенный фрагмент карточки «Булат v.4»">
        <Image src={BULAT[0].src} alt={BULAT[0].alt} width={1018} height={488} sizes="(min-width: 680px) 630px, calc(100vw - 50px)" className="h-auto w-full" />
      </button>
      <div className="border-t border-[var(--color-border)] p-4">
        <div className="mb-3 rounded-[2px] border border-[var(--color-border)] bg-[var(--color-bg)] p-3 font-mono text-[10px] leading-relaxed text-[var(--color-dim)]" aria-label="Архивные публичные метаданные карточки">
          <p><span className="text-[var(--color-text)]">subj_root_name</span> = «Электрика»</p>
          <p><span className="text-[var(--color-text)]">subj_name</span> = «Приборы для калибровки»</p>
          <p><span className="text-[var(--color-text)]">MPStats category</span> = «Детекторы дронов»</p>
          <p className="mt-2">Источник: публичные метаданные карточки Wildberries<Cite n={14} /> · проверено 19.07.2026</p>
        </div>
        <figcaption className="text-[11px] leading-relaxed text-[var(--color-dim)]">Карточка «Булат v.4» на Wildberries, зафиксирована 18.07.2026. Видимый путь интерфейса, публичные метаданные Wildberries и классификатор MPStats относят один артикул к трём разным веткам. Артикул 949889001.</figcaption>
      </div>
      {lightbox}
    </figure>
  );
}

const CARDS = [
    { preview: "/blog/wb-dual-use/evidence/product-949889001.png", full: "/blog/wb-dual-use/evidence/product-949889001.png", alt: "Карточка детектора «Булат v.4» с ценой 132 060 рублей, артикул 949889001", caption: "«Булат v.4», 132 060 ₽ · 18.07.2026" },
    { preview: "/blog/wb-dual-use/evidence/product-879755591.png", full: "/blog/wb-dual-use/evidence/product-879755591.png", alt: "Карточка бронежилета с заявлением продавца о двух плитах Бр5, ценой 17 098 рублей, артикул 879755591", caption: "Бронежилет; продавец заявляет две плиты и Бр5, 17 098 ₽ · 18.07.2026" },
    { preview: "/blog/wb-dual-use/evidence/product-447850828.png", full: "/blog/wb-dual-use/evidence/product-447850828.png", alt: "Карточка 10-километровой катушки оптоволокна для дрона с ценой 22 705 рублей, артикул 447850828", caption: "Катушка оптоволокна для дрона, 10 км, 22 705 ₽ · 18.07.2026" },
    { preview: "/blog/wb-dual-use/evidence/product-230725243.png", full: "/blog/wb-dual-use/evidence/product-230725243.png", alt: "Карточка аптечки с маркировкой «военная СВО», ценами 6 124 рублей с WB Кошельком и 6 249 рублей без этой скидки, артикул 230725243", caption: "Аптечка с маркировкой «военная СВО», 6 249 ₽ без скидки WB Кошелька · 18.07.2026" },
    { preview: "/blog/wb-dual-use/evidence/product-972102728.png", full: "/blog/wb-dual-use/evidence/product-972102728.png", alt: "Карточка километрового оптического кабеля для интернета с ценами 12 947 рублей с WB Кошельком и 13 212 рублей без этой скидки, артикул 972102728", caption: "Оптический кабель для интернета, 1 км, 13 212 ₽ без скидки WB Кошелька · 18.07.2026" },
] as const;

const CARD_LIGHTBOX: readonly LightboxItem[] = CARDS.map((card) => ({ src: card.full, alt: card.alt, caption: card.caption }));

export function ProductCardGallery() {
  const { openAt, lightbox } = useLightbox(CARD_LIGHTBOX);
  return (
    <figure className="relative left-1/2 my-8 w-[calc(100vw-2rem)] max-w-[900px] -translate-x-1/2">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card, index) => (
          <button key={card.preview} type="button" onClick={() => openAt(index)} className="overflow-hidden rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)] text-left cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]">
            <span className="block bg-white">
              <Image src={card.preview} alt={card.alt} width={1018} height={488} sizes="(min-width: 1024px) 290px, (min-width: 640px) 45vw, calc(100vw - 48px)" className="h-auto w-full" />
            </span>
            <span className="block border-t border-[var(--color-border)] p-3 text-[11px] leading-relaxed text-[var(--color-dim)]">{card.caption}</span>
          </button>
        ))}
      </div>
      <figcaption className="mt-3 font-mono text-[10px] leading-relaxed text-[var(--color-dim)]">Архивные снимки публичных карточек Wildberries · 18.07.2026. Красная цена аптечки и гражданского кабеля показана со скидкой WB Кошелька; подписи и текст статьи используют расположенную рядом цену без этой скидки.</figcaption>
      {lightbox}
    </figure>
  );
}

const CABLES: readonly LightboxItem[] = [
  { src: "/blog/wb-dual-use/evidence/civilian-cable.webp", alt: "Изображение гражданского километрового оптического кабеля для улицы и помещений", caption: "Гражданский километровый кабель для подключения здания к интернету." },
  { src: "/blog/wb-dual-use/evidence/fpv-spool.webp", alt: "Изображение 10-километровой катушки оптоволокна G.657A2, позиционируемой продавцом для FPV-дрона", caption: "10-километровая катушка G.657A2, которую продавец позиционирует для FPV-дрона." },
    { src: "/blog/wb-dual-use/evidence/fpv-connection-video.webp", alt: "Схема подключения оптоволоконного модуля из карточки 10-километровой FPV-катушки, артикул 971841998, к видеомодулю и приёмнику", caption: "Изображение продавца из карточки, артикул 971841998: подключение к видеомодулю и приёмнику." },
    { src: "/blog/wb-dual-use/evidence/fpv-connection-controller.webp", alt: "Схема подключения оптоволоконного модуля из карточки 10-километровой FPV-катушки, артикул 971841998, к полётному контроллеру", caption: "Изображение продавца из карточки, артикул 971841998: подключение к полётному контроллеру." },
];

export function CableComparison() {
  const { openAt, lightbox } = useLightbox(CABLES);
  return (
    <figure className="my-8 overflow-hidden rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="grid grid-cols-2 gap-px bg-[var(--color-border)]">
        {CABLES.slice(0, 2).map((item, index) => (
          <button key={item.src} type="button" onClick={() => openAt(index)} className="relative aspect-[3/4] cursor-zoom-in bg-white focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--color-brand)]" aria-label={`Открыть: ${item.alt}`}>
            <Image src={item.src} alt={item.alt} fill sizes="(min-width: 680px) 315px, 45vw" className="object-contain" />
          </button>
        ))}
      </div>
      <figcaption className="border-t border-[var(--color-border)] p-4 text-[11px] leading-relaxed text-[var(--color-dim)]">Слева показан гражданский километровый кабель для подключения здания к интернету. Справа показана 10-километровая катушка G.657A2, которую продавец позиционирует для FPV-дрона. Схемы подключения в lightbox опубликованы продавцом в другой проверенной карточке, артикул 971841998. Общий класс волокна не делает изделия одинаковыми: отличаются длина, масса, конструкция, размотка и подключение.</figcaption>
      {lightbox}
    </figure>
  );
}
