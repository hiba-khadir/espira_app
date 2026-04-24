import { Feather } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const InputField = ({ label, value, onChangeText, isPassword = false }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  
  return (
    <View className="mb-4">
      <Text className="text-[#065A2C] font-semibold text-base mb-2">{label}</Text>
      <View className={`flex-row items-center justify-between border rounded-2xl px-4 py-3 bg-white ${isFocused ? 'border-[#4BAE4F]' : 'border-gray-200'}`}>
        <TextInput
          ref={inputRef}
          className="flex-1 text-[#333] text-base font-medium"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity onPress={() => inputRef.current?.focus()}>
          <Feather name="edit" size={20} color="#4BAE4F" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function EditProfileScreen() {
  const router = useRouter();

  const [name, setName] = useState("Mahmoud Darouiche");
  const [address, setAddress] = useState("Esi Alger,Oued Smar, Alger Algérie");
  const [email, setEmail] = useState("ol_boucenna@gmail.com");
  const [phone, setPhone] = useState("0555667788");
  const [password, setPassword] = useState("••••••••••••••••");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 40 }} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Header Section with Rounded Bottom */}
        <View className="bg-white rounded-b-[40px] shadow-sm pb-8 mb-6">
          <View className="flex-row items-center justify-between px-6 pt-4 mb-8">
            <TouchableOpacity
              className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm"
              onPress={() => router.back()}
            >
              <Feather name="chevron-left" size={20} color="#333" />
            </TouchableOpacity>

            <Text className="text-2xl font-bold text-[#065A2C]">Profile</Text>

            <View className="w-10 h-10 items-center justify-center rounded-full overflow-hidden">
              <Image 
                source={require('@/assets/images/Espira_logo.svg')} 
                style={{ width: 60, height: 60 }} 
                contentFit="contain"
              />
            </View>
          </View>

          {/* Profile Image & Name */}
          <View className="items-center">
            <Image
              source={{ uri: "https://i.pravatar.cc/712" }}
              style={{ width: 112, height: 112, borderRadius: 56, marginBottom: 16 }}
              contentFit="cover"
            />
            <Text className="text-lg font-bold text-black">{name}</Text>
          </View>
        </View>

        {/* Form Fields */}
        <View className="w-full px-6">
          <InputField label="Name" value={name} onChangeText={setName} />
          <InputField label="Address" value={address} onChangeText={setAddress} />
          <InputField label="Email" value={email} onChangeText={setEmail} />
          <InputField label="Phone Number" value={phone} onChangeText={setPhone} />
          <InputField label="Reset Password" value={password} onChangeText={setPassword} isPassword={true} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
