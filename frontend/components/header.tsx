import { colors } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date();
  const router = useRouter();
  return (
    <View style={styles.header} className="p-8">
      <View>
        <Text style={styles.headerTitle}>Hi Mahmoud</Text>
        <Text style={styles.headerDate}>
          {new Intl.DateTimeFormat("en-US", options).format(date)}
        </Text>
      </View>
      <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
        <MaterialIcons
          onPress={() => {
            router.push("/edit-profile");
          }}
          name="person-outline"
          size={30}
          color={colors.onSurface}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
