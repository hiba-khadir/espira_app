import { Tabs } from 'expo-router';
import React from 'react';

import { CustomTabBar } from '@/components/NavBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="statistics" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="notification" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
