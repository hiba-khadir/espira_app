import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ToggleCard } from "./ToggleCard";
import { Device } from "@/types/device";
import { msToReadable } from "@/utils/metrics";
interface ControlsSectionProps {
  devices: Device[];
  onToggle: (id: number, isOn: boolean) => void;
}
const now = new Date();
export const ControlsSection: React.FC<ControlsSectionProps> = ({
  devices,
  onToggle,
}) => (
  <View style={styles.sectionWrap}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Cards</Text>
    </View>
    <View style={styles.cardsRow}>
      {devices.length == 0 ? (
        <Text className="text-center w-full  text-lime-600 capitalize">
          no devices added yet
        </Text>
      ) : (
        devices.map((device) => {
          const isActuator = device.type == "actuator";
          const lastUpdated =
            isActuator && device.actuatorState?.lastUpdated
              ? msToReadable(
                  now.getTime() -
                    new Date(device.actuatorState?.lastUpdated).getTime(),
                )
              : "not updated yet";
          const isOn = device.actuatorState?.isOn ?? false;

          const islight = device.name == "light";
          return isActuator == true ? (
            <View style={styles.cardColumn} key={device.id}>
              <ToggleCard
                iconName={islight ? "lightbulb-outline" : "window"}
                title={device.name}
                subtitle={`${lastUpdated}` || "not known"}
                iconBg={
                  islight ? colors.primaryContainer : colors.secondaryContainer
                }
                iconColor={islight ? colors.primary : colors.secondary}
                enabled={isOn}
                onToggle={(value) => onToggle(device.id, value)}
              />
            </View>
          ) : (
            ""
          );
        })
      )}
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
