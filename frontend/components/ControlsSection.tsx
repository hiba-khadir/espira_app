import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ToggleCard } from "./ToggleCard";

interface ControlsSectionProps {
  lightOn: boolean;
  windowOn: boolean;
  onLightToggle: (value: boolean) => void;
  onWindowToggle: (value: boolean) => void;
}

export const ControlsSection: React.FC<ControlsSectionProps> = ({
  lightOn,
  windowOn,
  onLightToggle,
  onWindowToggle,
}) => (
  <View style={styles.sectionWrap}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Cards</Text>
    </View>
    <View style={styles.cardsRow}>
      <View style={styles.cardColumn}>
        <ToggleCard
          iconName="lightbulb-outline"
          title="Light"
          subtitle="UPDATED 3MIN AGO"
          iconBg={colors.primaryContainer}
          iconColor={colors.primary}
          enabled={lightOn}
          onToggle={onLightToggle}
        />
      </View>
      <View style={styles.cardColumn}>
        <ToggleCard
          iconName="window"
          title="Window"
          subtitle="UPDATED 2 DAYS AGO"
          iconBg={colors.secondaryContainer}
          iconColor={colors.secondary}
          enabled={windowOn}
          onToggle={onWindowToggle}
        />
      </View>
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
    justifyContent: "space-between",
  },
  cardColumn: {
    width: "48%",
  },
});
