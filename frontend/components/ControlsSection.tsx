import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ToggleCard } from "./ToggleCard";
import { Device } from "@/types/device";
interface ControlsSectionProps {
  devices: Device[];
  onToggle: (id: number, isOn: boolean) => void;
}
export const ControlsSection: React.FC<ControlsSectionProps> = ({
  devices,
  onToggle,
}) => (
  <View style={styles.sectionWrap}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Cards</Text>
    </View>
    <View style={styles.cardsRow}>
      {devices.map((device) => {
        const isOn = device.actuatorState?.isOn ?? false;
        const isSensor = device.type === "sensor";

        return (
          <View style={styles.cardColumn} key={device.id}>
            <ToggleCard
              iconName={isSensor ? "lightbulb-outline" : "window"}
              title={device.name}
              subtitle={
                device.actuatorState?.lastUpdated ??
                device.sensorState?.lastUpdated ??
                "not known"
              }
              iconBg={
                isSensor ? colors.primaryContainer : colors.secondaryContainer
              }
              iconColor={isSensor ? colors.primary : colors.secondary}
              enabled={isOn}
              onToggle={(value) => onToggle(device.id, value)}
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
