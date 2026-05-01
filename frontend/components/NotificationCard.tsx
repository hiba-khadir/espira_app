import { colors } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface NotificationCardProps {
	iconName: keyof typeof MaterialIcons.glyphMap;
	title: string;
	description: string;
	time: string;
	isUnread?: boolean;
	onPress?: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
	iconName,
	title,
	description,
	time,
	isUnread = false,
	onPress,
}) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={onPress}
			style={{
				backgroundColor: colors.surfaceContainerLowest,
				borderRadius: 16,
				padding: 16,
				marginBottom: 12,
				flexDirection: "row",
				alignItems: "flex-start",
				shadowColor: "#183326",
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 0.05,
				shadowRadius: 10,
				elevation: 3,
				borderWidth: 1.5,
				borderColor: isUnread ? colors.primaryContainer : "transparent",
			}}
		>
			<View
				style={{
					width: 48,
					height: 48,
					borderRadius: 24,
					alignItems: "center",
					justifyContent: "center",
					marginRight: 14,
					backgroundColor: isUnread
						? colors.primaryContainer
						: colors.surfaceContainerLow,
				}}
			>
				<MaterialIcons
					name={iconName}
					size={24}
					color={isUnread ? colors.primary : colors.onSurfaceVariant}
				/>
			</View>

			<View style={{ flex: 1, paddingRight: 6 }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 4,
					}}
				>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "600",
							color: colors.onSurface,
							flex: 1,
							marginRight: 8,
						}}
					>
						{title}
					</Text>
					<Text
						style={{ fontSize: 12, fontWeight: "500", color: colors.outline }}
					>
						{time}
					</Text>
				</View>
				<Text
					style={{
						fontSize: 13,
						color: colors.onSurfaceVariant,
						lineHeight: 18,
					}}
					numberOfLines={2}
				>
					{description}
				</Text>
			</View>

			{isUnread && (
				<View
					style={{
						width: 10,
						height: 10,
						borderRadius: 5,
						backgroundColor: colors.primary,
						position: "absolute",
						top: 16,
						right: 16,
					}}
				/>
			)}
		</TouchableOpacity>
	);
};
