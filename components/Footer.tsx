import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { type Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
};

export default async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-muted-foreground md:px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="text-foreground">{t("title")}</div>
          <div>{t("subtitle")}</div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href={`/${locale}/manifest`} className="hover:text-foreground">
            {t("links.manifest")}
          </Link>
          <Link href={`/${locale}/metrics`} className="hover:text-foreground">
            {t("links.metrics")}
          </Link>
          <Link href={`/${locale}/practice`} className="hover:text-foreground">
            {t("links.practice")}
          </Link>
          <Link href={`/${locale}/applications`} className="hover:text-foreground">
            {t("links.applications")}
          </Link>
        </div>
        <div className="rounded-lg border border-border bg-muted/60 p-3 text-xs">
          {t("disclaimer")}
        </div>
        <div className="text-xs">{t("copyright")}</div>
      </div>
    </footer>
  );
}
