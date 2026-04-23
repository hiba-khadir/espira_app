import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { CircularProgress } from "./CircularProgress";

interface Metric {
  label: string;
  value: string;
  progress: number;
  color: string;
  unit: string;
  badgeLabel: string;
  statusBg: string;
  badgeDot: string;
  badgeText: string;
}

interface MetricsSectionProps {
  metrics: Metric[];
}

export const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics }) => (
  <View style={styles.metricsCard}>
    <View style={styles.metricsGrid}>
      {metrics.map((m, index) => (
        <CircularProgress
          key={`${m.label}-${index}`}
          size={96}
          strokeWidth={7}
          progress={m.progress}
          color={m.color}
          label={m.label}
          value={m.value}
          unit={m.unit}
          badgeLabel={m.badgeLabel}
          statusBg={m.statusBg}
          badgeDot={m.badgeDot}
          badgeText={m.badgeText}
        />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  metricsCard: {
    marginTop: 14,
    marginHorizontal: 14,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "#e8ecea",
    paddingVertical: 18,
    paddingHorizontal: 14,
    shadowColor: "#183326",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    rowGap: 16,
  },
});
