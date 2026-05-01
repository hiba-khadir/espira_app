import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HelpScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <View className="flex-row items-center px-6 pt-4 mb-6">
        <TouchableOpacity
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm"
          onPress={() => router.back()}
        >
          <Feather name="chevron-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-[#065A2C] ml-6">Help & Support</Text>
      </View>

      <ScrollView className="px-6 flex-1" showsVerticalScrollIndicator={false}>
        <Text className="text-[#065A2C] font-bold text-lg mb-2">Frequently Asked Questions</Text>
        
        <View className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
          <Text className="font-semibold text-base mb-1 text-black">How do I edit my profile?</Text>
          <Text className="text-gray-600">Go to Settings, tap on 'Edit profile' under Account Setting, and modify your details.</Text>
        </View>

        <View className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
          <Text className="font-semibold text-base mb-1 text-black">How to connect to Home Assistant?</Text>
          <Text className="text-gray-600">Navigate to the Home Assistant section in Settings and click 'Open Dashboard' to log into your local instance.</Text>
        </View>

        <View className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-8">
          <Text className="font-semibold text-base mb-1 text-black">I forgot my password</Text>
          <Text className="text-gray-600">You can reset your password from the login screen by tapping on 'Forgot Password'.</Text>
        </View>

        <Text className="text-[#065A2C] font-bold text-lg mb-2">Contact Us</Text>
        <Text className="text-gray-700 text-base mb-1">Email: support@espira.app</Text>
        <Text className="text-gray-700 text-base mb-4">Phone: +213 555 667 788</Text>

      </ScrollView>
    </SafeAreaView>
  );
}
