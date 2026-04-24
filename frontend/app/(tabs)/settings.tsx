import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
	Image,
	Linking,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function SettingsScreen() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex-1 bg-[#FAFAFA]">
			<ScrollView
				contentContainerStyle={{ paddingBottom: 100 }}
				className="px-6 pt-8"
			>
				{/* Header */}
				<View className="flex-row items-center justify-between mb-8">
					<TouchableOpacity
						className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm"
						onPress={() => router.back()}
					>
						<Feather name="chevron-left" size={20} color="#333" />
					</TouchableOpacity>

					<View className="items-center pb-1">
						<Text className="text-2xl font-bold text-[#065A2C]">Settings</Text>
					</View>

					<View className="w-10 h-10 items-center justify-center rounded-full overflow-hidden">
						<Image
							source={require("@/assets/images/Espira_logo.svg")}
							style={{ width: 60, height: 60, resizeMode: "contain" }}
						/>
					</View>
				</View>

				{/* Account Setting */}
				<Text className="text-xl font-bold text-[#065A2C] mb-4">
					Account Setting
				</Text>
				<View className="space-y-3 mb-8">
					<TouchableOpacity
						className="flex-row items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
						onPress={() => router.push("/edit-profile")}
					>
						<View className="flex-row items-center">
							<Feather name="user" size={20} color="#333" />
							<Text className="text-base text-[#065A2C] font-semibold ml-3">
								Edit profile
							</Text>
						</View>
						<Feather name="chevron-right" size={20} color="#333" />
					</TouchableOpacity>

					<TouchableOpacity
						className="flex-row items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
						onPress={() => router.push("/home-assistant")}
					>
						<View className="flex-row items-center">
							<Feather name="home" size={20} color="#333" />
							<Text className="text-base text-[#065A2C] font-semibold ml-3">
								Home assistant
							</Text>
						</View>
						<Feather name="chevron-right" size={20} color="#333" />
					</TouchableOpacity>
				</View>

				{/* Legal */}
				<Text className="text-xl font-bold text-[#065A2C] mb-4">Legal</Text>
				<View className="space-y-3 mb-10">
					<TouchableOpacity
						className="flex-row items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
						onPress={() => router.push("/terms")}
					>
						<View className="flex-row items-center">
							<Ionicons
								name="document-text-outline"
								size={20}
								color="#065A2C"
							/>
							<Text className="text-base text-[#065A2C] font-semibold ml-3">
								Terms and Condition
							</Text>
						</View>
						<Feather name="external-link" size={18} color="#333" />
					</TouchableOpacity>

					<TouchableOpacity
						className="flex-row items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
						onPress={() => router.push("/privacy-policy")}
					>
						<View className="flex-row items-center">
							<Ionicons
								name="shield-checkmark-outline"
								size={20}
								color="#065A2C"
							/>
							<Text className="text-base text-[#065A2C] font-semibold ml-3">
								Privacy policy
							</Text>
						</View>
						<Feather name="external-link" size={18} color="#333" />
					</TouchableOpacity>

					<TouchableOpacity
						className="flex-row items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
						onPress={() => router.push("/help")}
					>
						<View className="flex-row items-center">
							<Feather name="alert-circle" size={20} color="#065A2C" />
							<Text className="text-base text-[#065A2C] font-semibold ml-3">
								Help
							</Text>
						</View>
						<Feather name="external-link" size={18} color="#333" />
					</TouchableOpacity>
				</View>

				{/* Logout */}
				<TouchableOpacity className="w-full bg-[#4BAE4F] py-4 rounded-3xl items-center shadow-sm mt-4">
					<Text className="text-white font-bold text-lg">Logout</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}
