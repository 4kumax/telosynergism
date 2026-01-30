import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Section from "@/components/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "metadata.faq", path: "/faq" });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faq" });

  return (
    <>
      <Section className="pt-12">
        <h1 className="text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      </Section>

      <Section>
        <Accordion type="single" collapsible>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{t(`items.${index}.q`)}</AccordionTrigger>
              <AccordionContent>{t(`items.${index}.a`)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <Section>
        <Card>
          <CardHeader>
            <CardTitle>{t("glossary.title")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            {["telos", "synergy", "entropy", "resonance", "protocol", "metric"].map(
              (key) => (
                <div key={key}>
                  <div className="text-foreground">{t(`glossary.items.${key}.term`)}</div>
                  <div>{t(`glossary.items.${key}.definition`)}</div>
                </div>
              )
            )}
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
