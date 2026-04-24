import { Image } from "expo-image";
import React from "react";
import {
	ImageSourcePropType,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

// Hardcoded static assets
const ARROW_ICON = require("../assets/images/Arrowicon.png");
const LOGO_ICON = require("../assets/images/Espira logo.png");

type HeaderProps = {
	title: string;
	onBackPress?: () => void;
};

export default function Header({ title, onBackPress }: HeaderProps) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
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
		backgroundColor: "#ffffff",
		borderBottomWidth: 1,
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
		fontSize: 16,
		fontWeight: "800",
		color: "#111827",
		letterSpacing: 0.5,
	},
	logoIcon: {
		width: 50,
		height: 50,
	},
});
