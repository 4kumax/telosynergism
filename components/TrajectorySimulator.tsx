"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { trajectoryPresets } from "@/content/presets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TrajectorySimulator() {
  const t = useTranslations("practice.trajectory");
  const [activeKey, setActiveKey] = useState(trajectoryPresets[0].key);

  const active = useMemo(
    () => trajectoryPresets.find((item) => item.key === activeKey) ?? trajectoryPresets[0],
    [activeKey]
  );

  const data = useMemo(
    () =>
      active.kpi.map((value, index) => ({
        month: index + 1,
        kpi: value,
        wellbeing: active.wellbeing[index],
        it: active.it[index],
      })),
    [active]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-4">
        {trajectoryPresets.map((preset) => (
          <Card key={preset.key} className={preset.key === activeKey ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="text-base">{t(`scenarios.${preset.key}.title`)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {t(`scenarios.${preset.key}.description`)}
              </p>
              <Button
                size="sm"
                variant={preset.key === activeKey ? "default" : "outline"}
                onClick={() => setActiveKey(preset.key)}
              >
                {t("select")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("chartTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="kpi" stroke="currentColor" strokeWidth={2} />
                <Line type="monotone" dataKey="wellbeing" stroke="#4b5563" strokeWidth={2} />
                <Line type="monotone" dataKey="it" stroke="#0ea5e9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground">
            {t(`scenarios.${active.key}.summary`)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
