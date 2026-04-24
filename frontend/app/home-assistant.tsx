import React from 'react';
import { View, Text, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeAssistantScreen() {
  const router = useRouter();

  const openDashboard = () => {
    Linking.openURL('http://homeassistant.local:8123').catch(() => {
        alert("Couldn't open dashboard URL. Make sure you have a browser installed or the URL is correct.");
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-4 mb-8">
        <TouchableOpacity
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm"
          onPress={() => router.back()}
        >
          <Feather name="chevron-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-[#065A2C] ml-6">Home Assistant</Text>
      </View>

      <View className="flex-1 items-center justify-center px-6 pb-20">
        <Ionicons name="home-outline" size={80} color="#4BAE4F" style={{ marginBottom: 24 }} />
        <Text className="text-xl text-center text-gray-700 mb-8 font-medium">
          Connect and manage your smart home devices through the Home Assistant dashboard.
        </Text>
        <TouchableOpacity 
          className="w-full bg-[#4BAE4F] py-4 rounded-3xl items-center shadow-sm flex-row justify-center"
          onPress={openDashboard}
        >
          <Text className="text-white font-bold text-lg mr-2">Open Dashboard</Text>
          <Feather name="external-link" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
