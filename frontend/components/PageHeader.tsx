import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ARROW_ICON = require("../assets/images/Arrowicon.png");
const LOGO_ICON = require("../assets/images/Espira logo.png");

type HeaderProps = {
  title: string;
  onBackPress?: () => void;
};

export default function Header({ title, onBackPress }: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
        <Image
          source={ARROW_ICON}
          style={styles.arrowIcon}
          contentFit="contain"
        />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.iconButton}>
        <Image
          source={LOGO_ICON}
          style={styles.logoIcon}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderBottomColor: "#f3f4f6",
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  arrowIcon: {
    width: 36,
    height: 36,
  },
  title: {
    fontSize: 25,
    textTransform: "capitalize",
    fontWeight: "800",
    color: "#111827",
    letterSpacing: 0.5,
  },
  logoIcon: {
    width: 50,
    height: 50,
  },
});
