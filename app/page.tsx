import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const SOCIAL_LINKS = [
  { label: "telegram", href: "https://t.me/almaskasymzhanov" },
  { label: "instagram", href: "https://www.instagram.com/almas_kasymzhanov/" },
  { label: "github", href: "https://github.com/AlmasKasymzhanov" },
  { label: "email", href: "mailto:almaskasymzhanov@gmail.com" },
];

const POSTS = [
  { title: "Блеск и нищета Lick Beauty", date: "Март 2026", href: "/blog/why-blogger-brands-fail" },
];

const PROJECTS = [
  {
    name: "redstat.kz",
    description: "ML-аналитика Kaspi маркетплейса. Выручка, тренды, прогнозы, конкуренция — всё по нишам.",
    years: "2025",
    href: "https://redstat.kz",
    external: true,
  },
  {
    name: "10b.kz",
    description: "Аналитика тендеров и госзакупок Казахстана. Поиск, разбор, оценка контрактов.",
    years: "2025",
    href: "https://10b.kz",
    external: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[980px] mx-auto px-6 py-16 md:py-24">
        {/* Theme toggle */}
        <div className="flex justify-end mb-8">
          <ThemeToggle />
        </div>
        <div className="flex flex-col md:flex-row gap-12 mb-20">
          {/* Left — Avatar + Bio + Social */}
          <div className="md:w-[260px] shrink-0">
            <Image
              src="/avatar/almas.webp"
              alt="Almas Kasymzhanov"
              width={80}
              height={80}
              className="rounded-full mb-5 grayscale hover:grayscale-0 transition-all duration-500"
            />
            <h1 className="font-mono text-[15px] font-bold text-[var(--color-text)] mb-2 tracking-tight">
              almas kasymzhanov
            </h1>
            <p className="text-[13px] text-dim leading-relaxed mb-5">
              Продавал БАДы в Перу. Трусы в России. Ложки в Казахстане. Разработал{" "}
              <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text)] hover:text-dim transition-colors no-underline font-mono font-bold">redstat.kz</a>
              {" "}и{" "}
              <a href="https://10b.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text)] hover:text-dim transition-colors no-underline font-mono font-bold">10b.kz</a>
              {" "}— чтобы другие не торговали вслепую. Иногда ошибаюсь — тоже пишу об этом.
            </p>

            {/* Social */}
            <div className="flex flex-col gap-0.5">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="text-[13px] text-dim hover:text-[var(--color-text)] transition-colors py-1 no-underline font-mono inline-flex items-center gap-1.5"
                >
                  {item.label}
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40">
                    <path d="M3.5 1.5h7m0 0v7m0-7L2 10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Posts + Projects */}
          <div className="flex-1 min-w-0 flex flex-col md:flex-row gap-12">
            {/* Posts */}
            <div className="flex-1 min-w-0">
              <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-dim mb-6">
                Посты
              </h2>
              <div>
                {POSTS.map((post) => (
                  <Link key={post.title} href={post.href} className="block no-underline group mb-4">
                    <span className="text-[14px] text-[var(--color-text)] group-hover:text-dim transition-colors font-medium">
                      {post.title}
                    </span>
                    <br />
                    <span className="font-mono text-[11px] text-dim/60">{post.date}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="md:w-[300px] shrink-0">
              <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-dim mb-6">
                Проекты
              </h2>
              <div className="flex flex-col gap-6">
                {PROJECTS.map((project) => (
                  <div key={project.name} className="group">
                    <div className="flex items-start justify-between gap-2">
                      {project.external ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[14px] font-bold text-[var(--color-text)] no-underline hover:text-dim transition-colors inline-flex items-center gap-1.5"
                        >
                          {project.name}
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40">
                            <path d="M3.5 1.5h7m0 0v7m0-7L2 10" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      ) : (
                        <Link href={project.href} className="font-mono text-[14px] font-bold text-[var(--color-text)] no-underline hover:text-dim transition-colors">
                          {project.name}
                        </Link>
                      )}
                    </div>
                    <p className="text-[12px] text-dim leading-relaxed mt-1.5 mb-2">
                      {project.description}
                    </p>
                    <div className="flex gap-2">
                      {project.years.split(" — ").map((y) => (
                        <span key={y} className="font-mono text-[10px] text-dim/70 border border-border rounded px-1.5 py-0.5">
                          {y}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--color-border)] pt-6 pb-8">
          <p className="font-mono text-[11px] text-dim/50">
            © 2026 akasymzhanov.com
          </p>
        </footer>
      </div>
    </div>
  );
}
