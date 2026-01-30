import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Section from "@/components/Section";
import DefinitionCard from "@/components/DefinitionCard";
import Callout from "@/components/Callout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ClientOnly from "@/components/ClientOnly";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, namespace: "metadata.home", path: "" });
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });

  const contourCards = ["E", "D", "S", "N"].map((key) => ({
    title: t(`contours.${key}.title`),
    description: t(`contours.${key}.description`),
  }));

  return (
    <>
      <Section className="pt-12 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("eyebrow")}
            </div>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/${locale}/2-min`}>{t("cta.primary")}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/${locale}/metrics#svi-test`}>{t("cta.svi")}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/${locale}/model#simulator`}>{t("cta.simulator")}</Link>
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t("heroCard.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{t("heroCard.body")}</p>
              <Callout>{t("heroCard.callout")}</Callout>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <DefinitionCard
              key={index}
              title={t(`problems.${index}.title`)}
              description={t(`problems.${index}.description`)}
            />
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-8">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t("contoursEyebrow")}
              </div>
              <h2 className="text-3xl font-semibold">{t("contoursTitle")}</h2>
            </div>
            <Button variant="outline" asChild>
              <Link href={`/${locale}/model`}>{t("contoursCta")}</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contourCards.map((card) => (
              <DefinitionCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <Card>
          <CardHeader>
            <CardTitle>{t("meaning.title")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t("meaning.body")}
          </CardContent>
        </Card>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>{t("svi.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{t("svi.body")}</p>
              <Button asChild size="sm">
                <Link href={`/${locale}/metrics`}>{t("svi.cta")}</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("applications.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {["1", "2", "3", "4", "5"].map((key) => (
                <div key={key}>• {t(`applications.items.${key}`)}</div>
              ))}
              <Button variant="outline" asChild size="sm">
                <Link href={`/${locale}/applications`}>{t("applications.cta")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <Card>
            <CardHeader>
              <CardTitle>{t("manifestMini.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {t("manifestMini.lines").split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("roadmap.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="rounded-lg border border-border p-4">
                  <div className="text-foreground">{t(`roadmap.items.${index}.title`)}</div>
                  <div>{t(`roadmap.items.${index}.description`)}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <Card>
          <CardHeader>
            <CardTitle>{t("ctaSection.title")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>{t("ctaSection.body")}</p>
            <ClientOnly
              fallback={<Button>{t("ctaSection.button")}</Button>}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button>{t("ctaSection.button")}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("ctaSection.dialogTitle")}</DialogTitle>
                    <DialogDescription>{t("ctaSection.dialogBody")}</DialogDescription>
                  </DialogHeader>
                  <Button asChild>
                    <Link href="mailto:hello@telosynergism.com">
                      hello@telosynergism.com
                    </Link>
                  </Button>
                </DialogContent>
              </Dialog>
            </ClientOnly>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
