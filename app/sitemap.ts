import type { MetadataRoute } from "next";

const BASE_URL = "https://akasymzhanov.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/blog/why-blogger-brands-fail",
    "/analytics",
    "/tools",
    "/tools/wb-analyzer",
    "/tools/wb-analyzer/guide",
    "/tools/mpstats-api",
    "/tools/ai-seller-guide",
    "/contacts",
    "/reports/zbody",
    "/reports/kaspi-clothing",
    "/reports/bg-optic",
    "/reports/optics-guide",
    "/reports/trend-hunting",
  ];

  return staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/blog" ? 0.9 : 0.7,
  }));
}
