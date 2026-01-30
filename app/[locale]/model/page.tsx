import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Section from "@/components/Section";
import DefinitionCard from "@/components/DefinitionCard";
import ResonanceSimulator from "@/components/ResonanceSimulator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "metadata.model", path: "/model" });
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "model" });

  return (
    <>
      <Section className="pt-12">
        <h1 className="text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {["E", "D", "S", "N"].map((key) => (
            <DefinitionCard
              key={key}
              title={t(`contours.${key}.title`)}
              description={t(`contours.${key}.body`)}
            />
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("patterns.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {[0, 1, 2, 3].map((index) => (
                <div key={index}>• {t(`patterns.items.${index}`)}</div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("antipatterns.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {[0, 1, 2, 3].map((index) => (
                <div key={index}>• {t(`antipatterns.items.${index}`)}</div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="simulator">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold">{t("simulator.title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("simulator.subtitle")}</p>
        </div>
        <ResonanceSimulator />
      </Section>
    </>
  );
}
