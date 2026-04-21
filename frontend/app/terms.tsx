import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TermsScreen() {
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
        <Text className="text-2xl font-bold text-[#065A2C] ml-6">Terms & Conditions</Text>
      </View>

      <ScrollView className="px-6 flex-1" showsVerticalScrollIndicator={false}>
        <Text className="text-gray-700 text-base leading-relaxed">
          Welcome to our Terms and Conditions page. By using our application, you accept these terms and conditions in full. Do not continue to use the app if you do not accept all of the terms and conditions stated on this page.
          {"\n\n"}
          1. License to Use
          {"\n"}
          Unless otherwise stated, we or our licensors own the intellectual property rights in the app and material on the app. All intellectual property rights are reserved.
          {"\n\n"}
          2. User Content
          {"\n"}
          In these terms and conditions, "your user content" means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to our app.
          {"\n\n"}
          3. Privacy
          {"\n"}
          Please refer to our Privacy Policy for details on how we collect, use, and disclose information about our users.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
