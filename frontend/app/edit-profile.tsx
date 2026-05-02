import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/PageHeader";

const InputField = ({
  label,
  value,
  onChangeText,
  isPassword = false,
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View className="mb-4">
      <Text className="text-[#065A2C] font-semibold text-base mb-2">
        {label}
      </Text>
      <View
        className={`flex-row items-center justify-between border rounded-2xl px-4 py-3 bg-white ${isFocused ? "border-[#4BAE4F]" : "border-gray-200"}`}
      >
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
  const User = useAppSelector((s) => s.auth.user);

  const [name, setName] = useState(User?.name);
  const [address, setAddress] = useState("Esi Alger,Oued Smar, Alger Algérie");
  const [email, setEmail] = useState(User?.email);
  const [phone, setPhone] = useState(User?.phoneNumber);
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
          <Header title="profile"></Header>

          {/* Profile Image & Name */}
          <View className="items-center">
            <Image
              source={{ uri: "https://i.pravatar.cc/712" }}
              style={{
                width: 112,
                height: 112,
                borderRadius: 56,
                marginBottom: 16,
              }}
              contentFit="cover"
            />
            <Text className="text-lg font-bold text-black">{name}</Text>
          </View>
        </View>

        {/* Form Fields */}
        <View className="w-full px-6">
          <InputField label="Name" value={name} onChangeText={setName} />
          <InputField
            label="Address"
            value={address}
            onChangeText={setAddress}
          />
          <InputField label="Email" value={email} onChangeText={setEmail} />
          <InputField
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
          />
          <InputField
            label="Reset Password"
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
