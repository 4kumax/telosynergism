import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const routes = [
  "",
  "/2-min",
  "/manifest",
  "/model",
  "/metrics",
  "/practice",
  "/applications",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://telosynergism.com";

  return locales.flatMap((locale) =>
    routes.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
    }))
  );
}
