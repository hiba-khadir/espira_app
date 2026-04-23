import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  progress: number;
  color: string;
  label: string;
  value: string;
  unit: string;
  badgeLabel: string;
  statusBg: string;
  badgeDot: string;
  badgeText: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 100,
  strokeWidth = 10,
  progress,
  color,
  label,
  value,
  unit,
  badgeLabel,
  statusBg,
  badgeDot,
  badgeText,
}) => {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (progress / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <View style={styles.metricItem}>
      <View style={styles.ringWrap}>
        <View style={{ transform: [{ rotate: "-90deg" }] }}>
          <Svg width={size} height={size}>
            <Circle
              cx={cx}
              cy={cy}
              r={r}
              fill="transparent"
              stroke={colors.surfaceContainerHighest}
              strokeWidth={strokeWidth}
            />
            <Circle
              cx={cx}
              cy={cy}
              r={r}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </Svg>
        </View>
        <View style={[StyleSheet.absoluteFill, styles.progressCenter]}>
          <Text style={styles.metricLabel}>{label.toUpperCase()}</Text>
          <Text style={styles.progressValue}>
            {value} <Text style={styles.progressUnit}>{unit}</Text>
          </Text>
        </View>
      </View>

      <View style={[styles.statusPill, { backgroundColor: statusBg }]}>
        <View style={[styles.statusDot, { backgroundColor: badgeDot }]} />
        <Text style={[styles.statusPillText, { color: badgeText }]}>
          {badgeLabel}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  metricItem: {
    width: "48%",
    alignItems: "center",
  },
  ringWrap: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
  },
  progressCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  metricLabel: {
    color: colors.onSurfaceVariant,
    fontSize: 9,
    fontWeight: "700" as const,
    letterSpacing: 0.2,
  },
  progressValue: {
    fontWeight: "800" as const,
    fontSize: 21,
    lineHeight: 24,
    color: colors.onSurface,
    marginTop: 2,
  },
  progressUnit: {
    color: colors.onSurfaceVariant,
    fontSize: 13,
    fontWeight: "700" as const,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 10,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    marginRight: 6,
  },
  statusPillText: {
    fontSize: 9,
    fontWeight: "800" as const,
    letterSpacing: 0.2,
  },
});
