import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { ControlsSection, HeroCard, MetricsSection } from "@/components/index";
import Illustration from "../../assets/images/illustrations.svg";
import { getAllDevices, updateDeviceState } from "@/api/device";
import { setDevices, updateActuatorState } from "@/stores/slices/deviceSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { devicesToMetrics } from "@/utils/metrics";
export default function App() {
  const dispatch = useAppDispatch();
  const handleToggle = async (deviceId: number, isOn: boolean) => {
    dispatch(updateActuatorState({ deviceId, isOn }));
    try {
      console.log(deviceId, isOn);

      await updateDeviceState(deviceId, isOn);
    } catch (error) {
      dispatch(updateActuatorState({ deviceId, isOn: !isOn }));
      console.log("Failed to update device state:", error);
    }
  };
  const Devices = useAppSelector((s) => s.devices);
  const metrics = devicesToMetrics(Devices.devices);

  useEffect(() => {
    const handle = async () => {
      try {
        const data = await getAllDevices();
        dispatch(setDevices(data));
      } catch (error) {
        console.log(error);
      }
    };
    handle();
  }, [Devices.devices.length]);
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
          <ControlsSection devices={Devices.devices} onToggle={handleToggle} />
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
