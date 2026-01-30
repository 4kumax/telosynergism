import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Section from "@/components/Section";
import TrajectorySimulator from "@/components/TrajectorySimulator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, namespace: "metadata.practice", path: "/practice" });
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "practice" });

  return (
    <>
      <Section className="pt-12">
        <h1 className="text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {(["A", "B", "C"] as const).map((key) => (
            <Card key={key} id={`protocol-${key.toLowerCase()}`}>
              <CardHeader>
                <CardTitle>{t(`protocols.${key}.title`)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>{t(`protocols.${key}.body`)}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t(`protocols.${key}.focusLabel`)}
                </div>
                <div>{t(`protocols.${key}.focus`)}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="trajectory">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold">{t("trajectory.title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("trajectory.subtitle")}</p>
        </div>
        <TrajectorySimulator />
      </Section>
    </>
  );
}
