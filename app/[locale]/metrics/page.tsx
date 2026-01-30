import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Section from "@/components/Section";
import Callout from "@/components/Callout";
import SVITest from "@/components/SVITest";
import ITvsVolume from "@/components/ITvsVolume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "metadata.metrics", path: "/metrics" });
}

export default async function MetricsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "metrics" });

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
              <CardTitle>{t("svi.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {[0, 1, 2].map((index) => (
                <div key={index}>• {t(`svi.items.${index}`)}</div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("it.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {[0, 1, 2].map((index) => (
                <div key={index}>• {t(`it.items.${index}`)}</div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="svi-test">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold">{t("sviTestTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("sviTestSubtitle")}</p>
        </div>
        <SVITest locale={locale} />
      </Section>

      <Section id="it-vs-volume">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold">{t("itVsVolumeTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("itVsVolumeSubtitle")}</p>
        </div>
        <ITvsVolume />
      </Section>

      <Section>
        <Callout title={t("disclaimerTitle")}>{t("disclaimer")}</Callout>
      </Section>
    </>
  );
}
