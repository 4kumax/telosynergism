import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "metadata.manifest", path: "/manifest" });
}

export default async function ManifestPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "manifest" });

  return (
    <>
      <Section className="pt-12">
        <h1 className="text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("principles.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index}>• {t(`principles.items.${index}`)}</div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("not.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {[0, 1, 2, 3].map((index) => (
                <div key={index}>• {t(`not.items.${index}`)}</div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <Card>
          <CardHeader>
            <CardTitle>{t("ethics.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {[0, 1, 2, 3].map((index) => (
              <div key={index}>• {t(`ethics.items.${index}`)}</div>
            ))}
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
