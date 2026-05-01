import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { ControlsSection, HeroCard, MetricsSection } from "@/components/index";
import Illustration from "../../assets/images/illustrations.svg";
import { getAlldevices } from "@/api/device";
import { DeviceData, setDevices } from "@/stores/slices/deviceSlice";
export default function App() {
  const dispatch = useAppDispatch();
  const [lightEnabled, setLightEnabled] = useState(true);
  const [windowEnabled, setWindowEnabled] = useState(true);
  const user = useAppSelector((state) => state.auth.user);
  const devices = useAppSelector((state) => state.devices.Devices);
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
    const load = async () => {
      try {
        const raw = await getAlldevices();
        dispatch(setDevices(raw));
        const windowDevice = devices?.find((d) => d.name == "window");
        const lightDevice = devices?.find((d) => d.name == "light");
        //since they're predifined
        console.log("after----------");
        console.log("window", windowDevice);
        console.log("light", lightDevice);
      } catch (e: any) {
        console.log(e);
      }
    };

    load();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.page}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Header fullname={user?.fullName || "mahmoud"}></Header>
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
