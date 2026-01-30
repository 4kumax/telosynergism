export type ITVolumePreset = {
  key: string;
  volume: number;
  it: number;
};

export const itVsVolumePresets: Record<string, ITVolumePreset[]> = {
  person: [
    { key: "focus", volume: 42, it: 68 },
    { key: "burnout", volume: 78, it: 32 },
    { key: "harmonized", volume: 64, it: 76 },
  ],
  team: [
    { key: "rush", volume: 86, it: 40 },
    { key: "alignment", volume: 62, it: 74 },
    { key: "stuck", volume: 48, it: 28 },
    { key: "resonant", volume: 70, it: 82 },
  ],
  city: [
    { key: "expansion", volume: 88, it: 46 },
    { key: "balanced", volume: 66, it: 72 },
    { key: "fragmented", volume: 54, it: 34 },
    { key: "recovery", volume: 58, it: 69 },
  ],
};

export type TrajectoryLine = {
  key: string;
  kpi: number[];
  wellbeing: number[];
  it: number[];
};

export const trajectoryPresets: TrajectoryLine[] = [
  {
    key: "kpi-any-cost",
    kpi: [52, 56, 60, 64, 67, 70, 72, 74, 76, 78, 79, 80],
    wellbeing: [62, 58, 54, 50, 46, 44, 42, 41, 40, 38, 36, 35],
    it: [55, 52, 48, 46, 44, 43, 41, 40, 38, 36, 34, 32],
  },
  {
    key: "restore-energy",
    kpi: [50, 49, 50, 52, 54, 57, 60, 62, 63, 64, 65, 66],
    wellbeing: [46, 50, 56, 62, 66, 70, 73, 75, 77, 78, 79, 80],
    it: [48, 51, 56, 60, 64, 68, 71, 73, 75, 77, 78, 79],
  },
  {
    key: "redesign-resonance",
    kpi: [48, 50, 54, 58, 62, 66, 70, 73, 76, 78, 80, 82],
    wellbeing: [52, 55, 58, 60, 63, 66, 69, 71, 73, 74, 75, 76],
    it: [50, 56, 62, 68, 72, 76, 80, 82, 84, 86, 88, 90],
  },
];
