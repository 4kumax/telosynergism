"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { itVsVolumePresets } from "@/content/presets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricCard from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tabKeys = ["person", "team", "city"] as const;

export default function ITvsVolume() {
  const t = useTranslations("metrics.itVsVolume");
  const [tab, setTab] = useState<(typeof tabKeys)[number]>("person");
  const [presetKey, setPresetKey] = useState(itVsVolumePresets.person[0].key);

  const presets = itVsVolumePresets[tab];
  const activePreset = useMemo(
    () => presets.find((preset) => preset.key === presetKey) ?? presets[0],
    [presets, presetKey]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs
          value={tab}
          onValueChange={(value) => {
            const nextTab = value as (typeof tabKeys)[number];
            setTab(nextTab);
            setPresetKey(itVsVolumePresets[nextTab][0].key);
          }}
        >
          <TabsList>
            {tabKeys.map((key) => (
              <TabsTrigger key={key} value={key}>
                {t(`tabs.${key}`)}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabKeys.map((key) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <label className="text-xs text-muted-foreground">
                {t("presetLabel")}
              </label>
              <select
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                value={tab === key ? presetKey : itVsVolumePresets[key][0].key}
                onChange={(event) => setPresetKey(event.target.value)}
              >
                {itVsVolumePresets[key].map((preset) => (
                  <option key={preset.key} value={preset.key}>
                    {t(`presets.${key}.${preset.key}`)}
                  </option>
                ))}
              </select>
            </TabsContent>
          ))}
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2">
          <MetricCard
            title={t("volume")}
            value={`${activePreset.volume}`}
            description={t("volumeHint")}
          />
          <MetricCard
            title={t("it")}
            value={`${activePreset.it}`}
            description={t("itHint")}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {t(`interpretations.${tab}`)}
        </p>
      </CardContent>
    </Card>
  );
}
