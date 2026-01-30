import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "@/lib/i18n";

export default getRequestConfig(async ({ locale }) => {
  const candidate = locale ?? defaultLocale;
  const safeLocale = locales.includes(candidate as (typeof locales)[number])
    ? candidate
    : defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default,
  };
});
