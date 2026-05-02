import { colors } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { SuccessMessage } from "@/api/device";
import { updateDeviceState } from "@/api/device";
interface ToggleCardProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
  iconBg: string;
  iconColor: string;
  enabled: boolean;
  onToggle: (isOn: boolean) => void;
}

export const ToggleCard: React.FC<ToggleCardProps> = ({
  iconName,
  title,
  subtitle,
  iconBg,
  iconColor,
  enabled,
  onToggle,
}) => (
  <View style={styles.toggleCard}>
    <View style={styles.topRow}>
      <View style={styles.toggleLeft}>
        <View style={[styles.toggleIconWrap, { backgroundColor: iconBg }]}>
          <MaterialIcons name={iconName} size={14} color={iconColor} />
        </View>
        <Text style={styles.toggleTitle}>{title}</Text>
      </View>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: "#dfe6e1", true: colors.primary }}
        thumbColor="#ffffff"
        ios_backgroundColor="#dfe6e1"
      />
    </View>
    <Text style={styles.toggleSubtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  toggleCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minHeight: 84,
    shadowColor: "#183326",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  toggleIconWrap: {
    width: 20,
    height: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  toggleTitle: {
    fontWeight: "700" as const,
    fontSize: 12,
    color: colors.onSurface,
    lineHeight: 14,
  },
  toggleSubtitle: {
    fontSize: 6.5,
    fontWeight: "700" as const,
    color: colors.onSurfaceVariant,
    marginTop: 12,
    letterSpacing: 0.7,
  },
});
