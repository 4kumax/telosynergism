import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Section from "@/components/Section";
import DefinitionCard from "@/components/DefinitionCard";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "metadata.twoMin", path: "/2-min" });
}

export default async function TwoMinPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "twoMin" });
  const blocks = t.raw("blocks") as { title: string; body: string }[];

  return (
    <>
      <Section className="pt-12">
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("eyebrow")}
          </div>
          <h1 className="text-4xl font-semibold">{t("title")}</h1>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {blocks.map((block, index) => (
            <DefinitionCard
              key={index}
              title={block.title}
              description={block.body}
            />
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-xl border border-border bg-muted/60 p-6 text-sm text-muted-foreground">
          {t("closing")}
        </div>
      </Section>
    </>
  );
}
