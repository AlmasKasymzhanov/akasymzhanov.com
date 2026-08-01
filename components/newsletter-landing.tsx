import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/canon/site-chrome";
import { SubscribeForm } from "@/components/subscribe-form";
import { type Locale } from "@/lib/i18n";

export function NewsletterLanding({ locale }: { locale: Locale }) {
  const copy = locale === "en"
    ? {
        eyebrow: "The newsletter",
        title: "The signal behind the headline",
        deck: "A concise letter about digital markets, technology, and Central Asia — built from reporting and data, not a daily link dump.",
        bullets: ["New investigations and data stories", "The method and limitations behind the numbers", "Practical findings that do not fit into the article"],
        cadence: "Sent when there is something worth opening. No daily noise.",
        privacy: "By subscribing you agree to the privacy policy. Unsubscribe at any time.",
      }
    : {
        eyebrow: "Рассылка",
        title: "Сигнал за пределами заголовка",
        deck: "Короткое письмо о цифровых рынках, технологиях и Центральной Азии — на основе репортинга и данных, а не ежедневной подборки ссылок.",
        bullets: ["Новые расследования и дата-разборы", "Методика и ограничения цифр", "Практические находки, не вошедшие в материал"],
        cadence: "Письмо приходит, когда есть что открыть. Без ежедневного шума.",
        privacy: "Подписываясь, вы соглашаетесь с политикой конфиденциальности. Отписаться можно в любой момент.",
      };
  return (
    <div className="font-body text-[var(--color-text)]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col border-x border-[var(--color-border)]">
        <SiteHeader locale={locale} />
        <main id="main-content" className="flex-1">
          <section className="grid min-h-[640px] lg:grid-cols-[1.25fr_0.75fr]">
            <div className="flex flex-col justify-center border-b border-[var(--color-border)] p-6 md:p-12 lg:border-b-0 lg:border-r lg:p-16">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">{copy.eyebrow}</p>
              <h1 className="mt-5 max-w-[850px] font-heading text-[48px] font-bold leading-[0.94] tracking-[-0.045em] sm:text-[64px] lg:text-[78px]">{copy.title}</h1>
              <p className="mt-7 max-w-[720px] text-[18px] leading-relaxed text-[var(--color-dim)] md:text-[21px]">{copy.deck}</p>
            </div>
            <div className="flex flex-col justify-center bg-[var(--color-surface)] p-6 md:p-12 lg:p-10">
              <ol className="space-y-5">
                {copy.bullets.map((item, index) => (
                  <li key={item} className="grid grid-cols-[32px_1fr] gap-3 border-t border-[var(--color-border)] pt-4">
                    <span className="font-mono text-[10px] text-[var(--color-brand)]">0{index + 1}</span>
                    <span className="text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-10"><SubscribeForm source={locale === "en" ? "newsletter-en" : "newsletter"} /></div>
              <p className="mt-4 text-[12px] leading-relaxed text-[var(--color-dim)]">{copy.cadence}</p>
              <p className="mt-2 text-[10px] leading-relaxed text-[var(--color-dim)]">{copy.privacy} <Link href="/privacy" className="underline underline-offset-2">{locale === "en" ? "Read it" : "Подробнее"}</Link></p>
            </div>
          </section>
        </main>
        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
