import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PrivacyPolicyScreen() {
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
        <Text className="text-2xl font-bold text-[#065A2C] ml-6">Privacy Policy</Text>
      </View>

      <ScrollView className="px-6 flex-1" showsVerticalScrollIndicator={false}>
        <Text className="text-gray-700 text-base leading-relaxed">
          Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our application.
          {"\n\n"}
          Information We Collect
          {"\n"}
          We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.
          {"\n\n"}
          Data Storage
          {"\n"}
          We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
          {"\n\n"}
          Third-Party Access
          {"\n"}
          We don't share any personally identifying information publicly or with third-parties, except when required to by law.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
