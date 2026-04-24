import { colors } from "@/constants/colors";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

const { width } = Dimensions.get("window");

type PlantIllustrationProps = {
  Illustration?: React.FC<SvgProps>;
};

function PlantIllustration({ Illustration }: PlantIllustrationProps) {
  return (
    <View style={styles.illustrationWrap}>
      {Illustration ? (
        <Illustration width="100%" height="100%" />
      ) : (
        <View style={styles.placeholderWrap}>
          <Text style={styles.placeholderText}>Set your SVG component</Text>
        </View>
      )}
    </View>
  );
}

type HeroCardProps = {
  Illustration?: React.FC<SvgProps>;
};

export const HeroCard: React.FC<HeroCardProps> = ({ Illustration }) => (
  <View style={styles.heroSection}>
    <Text style={styles.heroTitle}>Control Your{"\n"}Greenhouse.</Text>
    <PlantIllustration Illustration={Illustration} />
  </View>
);

const styles = StyleSheet.create({
  heroSection: {
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 18,
  },
  heroTitle: {
    textAlign: "center",
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "800" as const,
    color: colors.onSurface,
    letterSpacing: -0.4,
    marginTop: 4,
    marginBottom: 2,
  },
  illustrationWrap: {
    width: Math.min(width - 48, 300),
    height: 190,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  placeholderWrap: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  placeholderText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: "600" as const,
    textAlign: "center",
  },
});
