import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddDevices, getAllDevices, updateDeviceState } from "@/api/device";
import Header from "@/components/header";
import { ControlsSection, HeroCard, MetricsSection } from "@/components/index";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { setDevices, updateActuatorState } from "@/stores/slices/deviceSlice";
import { Predevices } from "@/utils/devices";
import { devicesToMetrics } from "@/utils/metrics";
import Illustration from "../../assets/images/illustrations.svg";
export default function App() {
	const dispatch = useAppDispatch();
	const handleToggle = async (deviceId: number, isOn: boolean) => {
		dispatch(updateActuatorState({ deviceId, isOn }));
		try {
			await updateDeviceState(deviceId, isOn);
		} catch {
			dispatch(updateActuatorState({ deviceId, isOn: !isOn }));
			Alert.alert("Failed to update device state try again later ");
		}
	};
	const Devices = useAppSelector((s) => s.devices);
	const User = useAppSelector((s) => s.auth.user);
	const metrics = devicesToMetrics(Devices.devices);
	useEffect(() => {
		const handle = async () => {
			try {
				const data = await getAllDevices();

				if (data.length === 0) {
					await AddDevices(Predevices);

					const seeded = await getAllDevices();
					dispatch(setDevices(seeded));
				} else {
					dispatch(setDevices(data));
				}
			} catch {}
		};

		handle();
	}, [dispatch]);

	return (
		<SafeAreaView style={styles.screen}>
			<StatusBar style="dark" />
			<View style={styles.page}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scrollContent}
				>
					<Header Username={User?.name || "m"} />
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
