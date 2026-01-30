import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "@/lib/i18n";

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locales.includes(locale as typeof locales[number])
    ? locale
    : defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default,
  };
});
