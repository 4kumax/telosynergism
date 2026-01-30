"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

type RadarPoint = {
  axis: string;
  value: number;
};

type RadarSVIProps = {
  data: RadarPoint[];
};

export default function RadarSVI({ data }: RadarSVIProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(120, 120, 120, 0.2)" />
          <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12 }} />
          <Radar
            dataKey="value"
            stroke="currentColor"
            fill="currentColor"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
