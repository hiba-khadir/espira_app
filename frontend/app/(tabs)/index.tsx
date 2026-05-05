import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { ControlsSection, HeroCard, MetricsSection } from "@/components/index";
import Illustration from "../../assets/images/illustrations.svg";
import { getAllDevices, updateDeviceState } from "@/api/device";
import { setDevices, updateActuatorState } from "@/stores/slices/deviceSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { AddDevices } from "@/api/device";
import { Predevices } from "@/utils/devices";
import { devicesToMetrics } from "@/utils/metrics";
export default function App() {
  const dispatch = useAppDispatch();
  const handleToggle = async (deviceId: number, isOn: boolean) => {
    dispatch(updateActuatorState({ deviceId, isOn }));
    try {
      console.log(deviceId, isOn);

      await updateDeviceState(deviceId, isOn);
    } catch (error) {
      console.log(error);
      dispatch(updateActuatorState({ deviceId, isOn: !isOn }));
      Alert.alert("Failed to update device state  try again later ");
    }
  };
  const Devices = useAppSelector((s) => s.devices);
  const User = useAppSelector((s) => s.auth.user);
  const metrics = devicesToMetrics(Devices.devices);
  useEffect(() => {
    const handle = async () => {
      try {
        const data = await getAllDevices();
        console.log(data);
        if (data.length === 0) {
          const results = await AddDevices(Predevices);
          const failed = results.filter((r) => r.status === "rejected");
          if (failed.length > 0) {
            console.warn("Some devices failed to create:", failed);
          }

          const seeded = await getAllDevices();
          dispatch(setDevices(seeded));
        } else {
          dispatch(setDevices(data));
        }
      } catch (error) {
        Alert.alert("couldn't create devices at the moments ");
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
          <Header Username={User?.name || "maaa"} />
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
