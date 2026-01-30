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
  return buildMetadata({
    locale,
    namespace: "metadata.applications",
    path: "/applications",
  });
}

export default async function ApplicationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "applications" });

  const domains = ["person", "team", "product", "education", "city"] as const;

  return (
    <>
      <Section className="pt-12">
        <h1 className="text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {domains.map((domain) => (
            <Card key={domain}>
              <CardHeader>
                <CardTitle>{t(`domains.${domain}.title`)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <span className="text-foreground">{t("labels.problem")}:</span>{" "}
                  {t(`domains.${domain}.problem`)}
                </div>
                <div>
                  <span className="text-foreground">{t("labels.gap")}:</span>{" "}
                  {t(`domains.${domain}.gap`)}
                </div>
                <div>
                  <span className="text-foreground">{t("labels.protocol")}:</span>{" "}
                  {t(`domains.${domain}.protocol`)}
                </div>
                <div>
                  <span className="text-foreground">{t("labels.metrics")}:</span>{" "}
                  {t(`domains.${domain}.metrics`)}
                </div>
                <div>
                  <span className="text-foreground">{t("labels.example")}:</span>{" "}
                  {t(`domains.${domain}.example`)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
