import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={{ backgroundColor: "#FFFFFF" }}>
      <View
        className="w-full flex-row justify-around items-center bg-white pt-4 pb-8 rounded-t-3xl border-t border-gray-100"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 20,
          backgroundColor: "#FFFFFF",
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          // Only show specific tabs for the UI match
          if (["index", "statistics", "notification", "settings"].indexOf(route.name) === -1) {
            return null;
          }

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName: keyof typeof Feather.glyphMap = "home";
          let displayName = "Home";

          if (route.name === "index") {
            iconName = "home";
            displayName = "Home";
          } else if (route.name === "statistics") {
            iconName = "bar-chart-2";
            displayName = "Statistics";
          } else if (route.name === "notification") {
            iconName = "bell";
            displayName = "Notification";
          } else if (route.name === "settings") {
            iconName = "settings";
            displayName = "Settings";
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              className="flex-1 items-center justify-center"
            >
              <Feather
                name={iconName}
                size={24}
                color={isFocused ? "#4BAE4F" : "#A0A0A0"}
                style={{ marginBottom: 4 }}
              />
              <Text
                style={{ color: isFocused ? "#4BAE4F" : "#A0A0A0", fontSize: 12, fontWeight: "500" }}
              >
                {displayName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
