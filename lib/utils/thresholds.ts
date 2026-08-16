export type AlertStatus = "low" | "high" | "normal" | null;

export function getAlertStatus(
  value: number,
  minMgdl: number | null | undefined,
  maxMgdl: number | null | undefined,
): AlertStatus {
  if (minMgdl == null || maxMgdl == null) return null;
  if (value < minMgdl) return "low";
  if (value > maxMgdl) return "high";
  return "normal";
}
