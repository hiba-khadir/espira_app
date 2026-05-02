import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ToggleCard } from "./ToggleCard";
import { Device } from "@/types/device";
interface ControlsSectionProps {
  devices: Device[];
}

export const ControlsSection: React.FC<ControlsSectionProps> = ({
  devices,
}) => (
  <View style={styles.sectionWrap}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Cards</Text>
    </View>
    <View style={styles.cardsRow}>
      {devices.map((device) => {
        return device.type == "sensor" ? (
          <View style={styles.cardColumn} key={device.id}>
            <ToggleCard
              iconName="lightbulb-outline"
              title={device.name}
              subtitle={device?.sensorState?.lastUpdated || "not known"}
              iconBg={colors.primaryContainer}
              iconColor={colors.primary}
              enabled={true}
              onToggle={() => {}}
            />
          </View>
        ) : (
          <View style={styles.cardColumn}>
            <ToggleCard
              iconName="window"
              title={device.name}
              subtitle={device?.actuatorState?.lastUpdated || "not known"}
              iconBg={colors.primaryContainer}
              iconColor={colors.primary}
              enabled={true}
              onToggle={() => {}}
            />
          </View>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  sectionWrap: {
    marginTop: 18,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: colors.onSurface,
    fontSize: 13,
    fontWeight: "400" as const,
  },
  cardsRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardColumn: {
    width: "48%",
  },
});
