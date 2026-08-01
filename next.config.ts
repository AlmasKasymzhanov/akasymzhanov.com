import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure the bundled «Выбор ниши» snapshot ships with the web-analyzer
  // serverless function so it can read it at runtime (used as a data fallback
  // while the live MPStats API is unavailable).
  outputFileTracingIncludes: {
    "/api/web-analyzer/niches": ["./app/api/web-analyzer/snapshot.csv"],
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/latest", permanent: true },
      { source: "/data", destination: "/latest", permanent: true },
      { source: "/en/data", destination: "/en/latest", permanent: true },
      { source: "/subscribe", destination: "/newsletter", permanent: true },
      // Короткая клиентская ссылка: kasymzhanov.com/elki → отчёт для клиента.
      { source: "/elki", destination: "/clients/elki", permanent: false },
      // Кириллический алиас на отчёт по нишам WB. Основной адрес — латиница:
      // её проще копировать в переписку (кириллица превращается в %D0%B0%D0%BD…).
      { source: "/анализ", destination: "/analiz", permanent: false },
    ];
  },
};

export default nextConfig;
