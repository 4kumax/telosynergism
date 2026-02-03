export type SVIKey = "T" | "A" | "E" | "R" | "N" | "S" | "H";

export type SVIProfile = Record<SVIKey, number>;

export function computeSVI(answers: Record<SVIKey, number>): SVIProfile {
  const normalize = (value: number) => Math.round((value / 4) * 100);

  // Все оси позитивные: выше = лучше
  // S теперь означает "ясность среды" (не "шум")
  return {
    T: normalize(answers.T),
    A: normalize(answers.A),
    E: normalize(answers.E),
    R: normalize(answers.R),
    N: normalize(answers.N),
    S: normalize(answers.S),
    H: normalize(answers.H),
  };
}

export function computeITFromContours(
  E: number,
  D: number,
  S: number,
  N: number
) {
  const values = [E, D, N, 100 - S];
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance =
    values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  const std = Math.sqrt(variance);

  const alignment = 1 - std / 50;
  const synergy = Math.min(...values) / 100;
  const entropy = S / 100;

  const raw = 0.5 * alignment + 0.3 * synergy - 0.2 * entropy;
  return clamp(raw, 0, 1);
}

export function summarizeProfile(profile: SVIProfile) {
  const keys = Object.keys(profile) as SVIKey[];

  // Все оси 0..100, выше = лучше (включая S, потому что вопрос позитивный)
  // gaps = два минимальных значения = слабые места
  const gaps = [...keys]
    .sort((a, b) => profile[a] - profile[b])
    .slice(0, 2);

  let nextStepsKey: "A" | "B" | "C" = "C";
  if (gaps.includes("E") || gaps.includes("N")) {
    nextStepsKey = "B";
  } else if (gaps.includes("T") || gaps.includes("R")) {
    nextStepsKey = "A";
  }

  return { gaps, nextStepsKey };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
