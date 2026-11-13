import type { MetadataRoute } from "next";

const siteUrl = "https://verifypeps.com";

const publicRoutes = [
  "",
  "/verify",
  "/login",
  "/help",
  "/privacy",
  "/terms",
  "/research-use-only",
  "/lab-partner-disclosure",
  "/endotoxin-testing",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
