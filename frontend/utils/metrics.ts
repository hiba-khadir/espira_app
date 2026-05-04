import { Device } from "@/types/device";
import { thresholds } from "@/types/metrics";
import { MetricThreshold } from "@/types/metrics";
const getMetricStatus = (name: string, value: number) => {
  const threshold = thresholds[name];
  const isOptimal = threshold
    ? value >= threshold.optimal[0] && value <= threshold.optimal[1]
    : true;

  return isOptimal
    ? {
        color: "#1f7a52",
        badgeLabel: "OPTIMAL",
        statusBg: "#d6eec4",
        badgeDot: "#1f7a52",
        badgeText: "#1f7a52",
      }
    : {
        color: "#d65a5a",
        badgeLabel: "DANGER ZONE",
        statusBg: "#f9dbdb",
        badgeDot: "#d65a5a",
        badgeText: "#b14a4a",
      };
};

export const devicesToMetrics = (devices: Device[]) => {
  return devices
    .filter((d) => d.type === "sensor" && d.sensorState !== null)
    .map((d) => {
      const value = d.sensorState!.value;
      const maxValue = thresholds[d.name]?.optimal[1] ?? 100;
      const status = getMetricStatus(d.name, value);

      return {
        label: d.name,
        value: String(value),
        unit: d.unit ?? "",
        progress: Math.min((value / maxValue) * 100, 100), // 0-100
        ...status,
      };
    });
};
// time
export const msToReadable = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(ms / 3600000);
  const days = Math.floor(ms / 86400000);

  if (days > 0) return ` updated ${days}d ago`;
  if (hours > 0) return ` updated  ${hours}h ago`;
  if (minutes > 0) return ` updated  ${minutes}min ago`;
  return "just now";
};
