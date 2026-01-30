import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

export async function buildMetadata({
  locale,
  namespace,
  path,
}: {
  locale: Locale;
  namespace: string;
  path: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  const canonical = `/${locale}${path}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        ru: `/ru${path}`,
        en: `/en${path}`,
      },
    },
  };
}
