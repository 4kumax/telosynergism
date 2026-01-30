"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { computeITFromContours } from "@/lib/scoring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/MetricCard";
import RadarSVI from "@/components/RadarSVI";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ContourKey = "E" | "D" | "S" | "N";

const initialState = { E: 70, D: 60, S: 45, N: 65 };

export default function ResonanceSimulator() {
  const t = useTranslations("model.simulator");
  const [values, setValues] = useState(initialState);

  const itDemo = useMemo(
    () => computeITFromContours(values.E, values.D, values.S, values.N),
    [values]
  );

  const category =
    itDemo < 0.4 ? t("categories.low") : itDemo < 0.7 ? t("categories.mid") : t("categories.high");

  const weakest = (Object.entries(values) as [ContourKey, number][])
    .filter(([key]) => key !== "S")
    .sort((a, b) => a[1] - b[1])[0]?.[0];

  const hint =
    values.S >= 70
      ? t("hints.noise")
      : weakest
        ? t(`hints.${weakest}`)
        : t("hints.default");

  const radarData = [
    { axis: t("axes.E"), value: values.E },
    { axis: t("axes.D"), value: values.D },
    { axis: t("axes.N"), value: values.N },
    { axis: t("axes.S"), value: 100 - values.S },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t("title")}</CardTitle>
          <Badge variant="outline">{t("badge")}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {(["E", "D", "S", "N"] as ContourKey[]).map((key) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">{t(`labels.${key}`)}</div>
                <div className="text-muted-foreground">{values[key]}</div>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={values[key]}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    [key]: Number(event.target.value),
                  }))
                }
                className="w-full"
              />
            </div>
          ))}
          <div className="text-xs text-muted-foreground">{t("hint")}</div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <MetricCard
          title={t("itTitle")}
          value={`${Math.round(itDemo * 100)}%`}
          badge={category}
          description={hint}
        />
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm">{t("radarTitle")}</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-xs text-muted-foreground">
                  {t("tooltip.label")}
                </TooltipTrigger>
                <TooltipContent>{t("tooltip.body")}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <RadarSVI data={radarData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
