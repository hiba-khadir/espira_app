import React, { useState } from "react";
import { Image } from "expo-image";
import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Text } from "@react-navigation/elements";
import Header from "@/components/header";
import {
  VictoryScatter,
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryArea,
} from "victory-native";
import { SafeAreaView } from "react-native-safe-area-context";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const humidity = [28, 32, 25, 30, 45, 60, 90, 150, 145, 110, 80, 120];
const temperature = [5, 8, 20, 45, 80, 100, 115, 130, 175, 200, 215, 225];

const hData = months.map((m, i) => ({ x: m, y: humidity[i] }));
const tData = months.map((m, i) => ({ x: m, y: temperature[i] }));
export function Graphs() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#5ec4e6" }]} />
            <Text style={styles.legendLabel}>Humidity</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#4caf7d" }]} />
            <Text style={styles.legendLabel}>Temperature</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.datePill}>
          <Text style={styles.datePillText}>🗓 Jan 2026 – Dec 2026 ⌄</Text>
        </TouchableOpacity>
      </View>

      <VictoryChart
        height={280}
        padding={{ top: 16, bottom: 40, left: 44, right: 24 }}
        domain={{ y: [0, 260] }}
      >
        <VictoryAxis
          tickValues={months}
          tickFormat={(t) => t}
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: {
              fontSize: 10,
              fill: "#a0b8a8",
              fontFamily: "System",
            },
            grid: { stroke: "transparent" },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[0, 50, 100, 150, 200, 250]}
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: {
              fontSize: 10,
              fill: "#a0b8a8",
              fontFamily: "System",
            },
            grid: { stroke: "rgba(0,0,0,0.07)", strokeDasharray: "0" },
          }}
        />

        <VictoryArea
          data={hData}
          interpolation="catmullRom"
          style={{
            data: {
              fill: "rgba(94,196,230,0.15)",
              stroke: "#5ec4e6",
              strokeWidth: 2.5,
            },
          }}
        />

        <VictoryArea
          data={tData}
          interpolation="catmullRom"
          style={{
            data: {
              fill: "rgba(76,175,125,0.15)",
              stroke: "#3d8f5e",
              strokeWidth: 2.5,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
}
export default function Statistics() {
  return (
    <SafeAreaView style={styles.screen}>
      <Graphs></Graphs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 2,
    marginTop: 100,
    marginInline: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  header: {
    margin: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  legend: { gap: 6 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  dot: { width: 9, height: 9, borderRadius: 5 },
  legendLabel: { fontSize: 13, color: "#7a9a8a", fontWeight: "500" },
  datePill: {
    backgroundColor: "#1a4a2a",
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  datePillText: { color: "#fff", fontSize: 13, fontWeight: "500" },
});
