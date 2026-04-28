import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationCard } from "../../components/NotificationCard";
import { colors } from "../../constants/colors";

export default function NotificationScreen() {
	const [notifications, setNotifications] = useState([
		{
			id: "1",
			group: "Today",
			iconName: "water-drop" as keyof typeof MaterialIcons.glyphMap,
			title: "Water Filter Replacement",
			description:
				"It's time to replace the water filter in your primary dispenser for optimal quality.",
			time: "10m ago",
			isUnread: true,
		},
		{
			id: "2",
			group: "Today",
			iconName: "energy-savings-leaf" as keyof typeof MaterialIcons.glyphMap,
			title: "Eco Mode Activated",
			description:
				"Your home has successfully switched to Eco Mode to help conserve energy.",
			time: "2h ago",
			isUnread: false,
		},
		{
			id: "3",
			group: "Yesterday",
			iconName: "security" as keyof typeof MaterialIcons.glyphMap,
			title: "Security Update",
			description:
				"A new firmware update was successfully installed on your smart home hub.",
			time: "1d ago",
			isUnread: false,
		},
	]);

	const markAllAsRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
	};

	const markAsRead = (id: string) => {
		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n)),
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
			<View
				style={{
					paddingHorizontal: 20,
					paddingTop: 20,
					paddingBottom: 15,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Text
					style={{ fontSize: 26, fontWeight: "700", color: colors.onSurface }}
				>
					Notifications
				</Text>
				<TouchableOpacity
					onPress={markAllAsRead}
					style={{
						flexDirection: "row",
						alignItems: "center",
						backgroundColor: colors.surfaceContainerLow,
						paddingHorizontal: 10,
						paddingVertical: 6,
						borderRadius: 12,
					}}
				>
					<MaterialIcons
						name="done-all"
						size={16}
						color={colors.primary}
						style={{ marginRight: 4 }}
					/>
					<Text
						style={{ fontSize: 13, fontWeight: "600", color: colors.primary }}
					>
						Mark all read
					</Text>
				</TouchableOpacity>
			</View>

			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingTop: 8,
					paddingBottom: 30,
				}}
			>
				<Text
					style={{
						fontSize: 14,
						fontWeight: "600",
						color: colors.onSurfaceVariant,
						marginBottom: 12,
						marginLeft: 4,
					}}
				>
					Today
				</Text>

				{notifications
					.filter((n) => n.group === "Today")
					.map((item) => (
						<NotificationCard
							key={item.id}
							iconName={item.iconName}
							title={item.title}
							description={item.description}
							time={item.time}
							isUnread={item.isUnread}
							onPress={() => markAsRead(item.id)}
						/>
					))}

				<Text
					style={{
						fontSize: 14,
						fontWeight: "600",
						color: colors.onSurfaceVariant,
						marginTop: 12,
						marginBottom: 12,
						marginLeft: 4,
					}}
				>
					Yesterday
				</Text>

				{notifications
					.filter((n) => n.group === "Yesterday")
					.map((item) => (
						<NotificationCard
							key={item.id}
							iconName={item.iconName}
							title={item.title}
							description={item.description}
							time={item.time}
							isUnread={item.isUnread}
							onPress={() => markAsRead(item.id)}
						/>
					))}
			</ScrollView>
		</SafeAreaView>
	);
}
