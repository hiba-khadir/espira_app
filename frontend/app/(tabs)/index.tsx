import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { ControlsSection, HeroCard, MetricsSection } from "@/components/index";
import Illustration from "../../assets/images/illustrations.svg";
import { getAllDevices } from "@/api/device";
export default function App() {
  const [lightEnabled, setLightEnabled] = useState(true);
  const [windowEnabled, setWindowEnabled] = useState(true);

  const metrics = [
    {
      label: "Temperature",
      value: "80",
      unit: "°C",
      progress: 78,
      color: "#1f7a52",
      badgeLabel: "OPTIMAL SPECTRUM",
      statusBg: "#d6eec4",
      badgeDot: "#1f7a52",
      badgeText: "#1f7a52",
    },
    {
      label: "Humidity",
      value: "12",
      unit: "%",
      progress: 14,
      color: "#d65a5a",
      badgeLabel: "DANGER ZONE",
      statusBg: "#f9dbdb",
      badgeDot: "#d65a5a",
      badgeText: "#b14a4a",
    },
    {
      label: "Lighting",
      value: "12",
      unit: "%",
      progress: 14,
      color: "#d65a5a",
      badgeLabel: "DANGER ZONE",
      statusBg: "#f9dbdb",
      badgeDot: "#d65a5a",
      badgeText: "#b14a4a",
    },
    {
      label: "Humidity",
      value: "12",
      unit: "%",
      progress: 14,
      color: "#d65a5a",
      badgeLabel: "DANGER ZONE",
      statusBg: "#f9dbdb",
      badgeDot: "#d65a5a",
      badgeText: "#b14a4a",
    },
  ];
  useEffect(() => {
    const handle = async () => {
      try {
        const respone = await getAllDevices();
        console.log(respone);
      } catch (error) {
        console.log(error);
      }
    };
    handle();
  }, []);
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.page}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Header />
          <HeroCard Illustration={Illustration} />
          <MetricsSection metrics={metrics} />
          <ControlsSection
            lightOn={lightEnabled}
            windowOn={windowEnabled}
            onLightToggle={setLightEnabled}
            onWindowToggle={setWindowEnabled}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  page: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
