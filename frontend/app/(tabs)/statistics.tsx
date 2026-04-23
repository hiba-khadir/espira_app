import { Image } from "expo-image";
import { Platform, StyleSheet, View } from "react-native";
import "../index.css";
import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { Text } from "@react-navigation/elements";

export default function Statistics() {
  return (
    <View>
      <Text className="text-red-500 text-xl ">hello with nativewind </Text>
    </View>
  );
}
