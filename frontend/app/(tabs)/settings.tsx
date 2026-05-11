import Header from "@/components/PageHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { clearUser } from "@/stores/slices/authSlice";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function SettingsScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const User = useAppSelector((s) => s.auth.user);
  const handleLogout = () => {
    dispatch(clearUser());
    router.push("/(auth)/login");
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="">
        {/* Header */}
        <Header title="settings"></Header>

        <View className="px-3 mt-3">
          {/* Account Setting */}
          <Text className="text-xl  font-bold text-[#065A2C] mb-4">
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
          <TouchableOpacity
            onPress={handleLogout}
            className="w-full bg-[#065A2C] py-4 rounded-3xl items-center shadow-sm mt-4"
          >
            <Text className="text-white font-bold text-lg">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
