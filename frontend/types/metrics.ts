export type MetricThreshold = {
  optimal: [number, number];
  label: string;
};

export const thresholds: Record<string, MetricThreshold> = {
  Temperature: { optimal: [18, 28], label: "°C" },
  Humidity: { optimal: [40, 70], label: "%" },
  Lighting: { optimal: [300, 800], label: "lux" },
};
