"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { computeSVI, summarizeProfile, type SVIKey } from "@/lib/scoring";
import RadarSVI from "@/components/RadarSVI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Callout from "@/components/Callout";

const questionKeys: SVIKey[] = ["T", "A", "E", "R", "N", "S", "H"];

export default function SVITest({ locale }: { locale: string }) {
  const t = useTranslations("metrics.sviTest");
  const [answers, setAnswers] = useState<Record<SVIKey, number>>({
    T: 2,
    A: 2,
    E: 2,
    R: 2,
    N: 2,
    S: 2,
    H: 2,
  });

  const profile = useMemo(() => computeSVI(answers), [answers]);
  const summary = useMemo(() => summarizeProfile(profile), [profile]);

  const radarData = questionKeys.map((key) => ({
    axis: t(`axes.${key}`),
    value: profile[key],
  }));

  const gapLabels = summary.gaps.map((key) => t(`axes.${key}`)).join(", ");

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {questionKeys.map((key, index) => (
            <div key={key} className="space-y-2 rounded-lg border border-border p-4">
              <div className="text-sm font-medium">
                {t(`questions.${key}`)}
              </div>
              <div className="grid grid-cols-5 gap-2 text-xs">
                {[0, 1, 2, 3, 4].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [key]: value }))}
                    className={`rounded-md border px-2 py-2 text-center transition ${answers[key] === value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-muted"
                      }`}
                  >
                    {t(`scale.${value}`)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t("resultTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <RadarSVI data={radarData} />
            <div className="text-sm text-muted-foreground">
              {t("gaps")}: <span className="text-foreground">{gapLabels}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{t("nextStep")}</div>
              <Button asChild size="sm">
                <Link href={`/${locale}/practice#protocol-${summary.nextStepsKey.toLowerCase()}`}>
                  {t(`nextSteps.${summary.nextStepsKey}`)}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Callout title={t("disclaimerTitle")}>{t("disclaimer")}</Callout>
      </div>
    </div>
  );
}
