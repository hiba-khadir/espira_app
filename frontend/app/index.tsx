import React, { useState, useEffect } from "react";
import { Image } from "expo-image";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter, Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Let's Grow",
    image: require("@/assets/images/start.png"),
    description: "Greenhouses of the Future are built,\nnot bought.",
    isStart: true,
  },
  {
    title: "Vision",
    image: require("@/assets/images/vision.png"),
    description:
      "Espira is a smart greenhouse management app designed to make remote and effortless plant care a reality. Developed by a passionate young team of six computer science students, Espira allows users to monitor and control their greenhouse environment from anywhere  Espira simplifies sustainable gardening by combining intuitive design with intelligent automation.",
    isStart: false,
  },
  {
    title: "Mission",
    image: require("@/assets/images/mission.png"),
    description:
      "Our goal is to remove the guesswork from plant care, helping users save time, reduce resource waste, and grow healthier plants — all while learning from real-time data and alerts. With Espira, managing a green space becomes not just easier, but smarter and more enjoyable and eco friendly.",
    isStart: false,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      // TODO: Remove the next line after testing onboarding — it forces onboarding to show every time
      await AsyncStorage.removeItem("alreadyLaunched");

      const value = await AsyncStorage.getItem("alreadyLaunched");
      if (value === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#065A2C" />
      </View>
    );
  }

  if (!isFirstLaunch) {
    return <Redirect href="/(auth)/login" />;
  }

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("alreadyLaunched", "true");
    router.replace("/(auth)/login");
  };

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      completeOnboarding();
    }
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6 pt-10 pb-6 items-center">
          {/* Title */}
          <Text className="text-3xl font-extrabold text-[#065A2C] mt-8 mb-6">
            {currentSlide.title}
          </Text>

          {/* Image */}
          <Image
            source={currentSlide.image}
            style={{ width: width * 0.8, height: width * 0.8 }}
            contentFit="contain"
          />

          {/* Description */}
          <View className="mt-8 mb-auto w-full items-center">
            <Text className="text-center text-gray-700 text-base font-medium leading-relaxed px-2">
              {currentSlide.description}
            </Text>
          </View>

          {/* Buttons */}
          <View className="w-full flex-row justify-center items-center mt-6 mb-8 px-4">
            {currentSlide.isStart ? (
              <TouchableOpacity
                onPress={nextSlide}
                className="bg-[#1C5125] py-4 px-12 rounded-xl items-center justify-center shadow-sm"
              >
                <Text className="text-white font-bold text-lg">
                  Get Started
                </Text>
              </TouchableOpacity>
            ) : (
              <View className="flex-row justify-between w-full">
                <TouchableOpacity
                  onPress={completeOnboarding}
                  className="bg-[#C4C4C4] py-3 w-[45%] rounded-xl items-center justify-center shadow-sm"
                >
                  <Text className="text-white font-bold text-lg">Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={nextSlide}
                  className="bg-[#1C5125] py-3 w-[45%] rounded-xl items-center justify-center shadow-sm"
                >
                  <Text className="text-white font-bold text-lg">Next</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Indicators */}
          <View className="flex-row justify-center space-x-3 mb-10">
            {slides.map((_, index) => (
              <View
                key={index}
                className={`w-3 h-3 rounded-full border border-[#1C5125] ${
                  currentSlideIndex === index
                    ? "bg-[#1C5125]"
                    : "bg-transparent"
                }`}
                style={{ marginHorizontal: 4 }}
              />
            ))}
          </View>

          {/* Bottom Logo */}
          <View className="flex-row items-center justify-center mb-4">
            <Text className="text-3xl font-bold text-[#1C5125] mr-2">
              Espira
            </Text>
            <Image
              source={require("@/assets/images/Espira logo.png")}
              style={{ width: 32, height: 32 }}
              contentFit="contain"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
