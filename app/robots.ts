import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/", "/login", "/en/login", "/i/", "/clients/", "/social/", "/export/", "/canon"],
    },
    sitemap: "https://kasymzhanov.com/sitemap.xml",
    host: "https://kasymzhanov.com",
  };
}
