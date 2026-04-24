import { colors } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Header: React.FC = () => (
  <View style={styles.header}>
    <View>
      <Text style={styles.headerTitle}>Hi Mahmoud</Text>
      <Text style={styles.headerDate}>Monday 18, 2023</Text>
    </View>
    <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
      <MaterialIcons name="person-outline" size={20} color={colors.onSurface} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: "#183326",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 6,
  },
  headerTitle: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: "800" as const,
    letterSpacing: -0.2,
  },
  headerDate: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    marginTop: 4,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
});
