import { Text } from "@react-navigation/elements";
import { useAppSelector } from "@/hooks/useAppDispatch";
import React, { useState } from "react";
import { Image } from "expo-image";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryPie,
} from "victory-native";
import Header from "@/components/PageHeader";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import calendarEvent from "@/components/ui/calendar";

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
const temperature = [0, 8, 20, 45, 80, 100, 115, 130, 175, 200, 215, 225];

const hData = months.map((m, i) => ({ x: m, y: humidity[i] }));
const tData = months.map((m, i) => ({ x: m, y: temperature[i] }));
export function Graphs() {
  return (
    <Container title="graphs">
      <View>
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
            {calendarEvent()}
            <Text style={styles.datePillText}>Jan 2026 – Dec 2026</Text>
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
    </Container>
  );
}
export function Container({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}
const SIZE = 280;
export function Chart() {
  const Devices = useAppSelector((s) => s.devices);
  const lighting = Devices.devices.find((d) => d.name == "lighting");
  const lightingValue = lighting?.sensorState?.value || 0;
  const soilMoisture = Devices.devices.find((d) => d.name == "soilMoisture");
  const MoistureValue = soilMoisture?.sensorState?.value || 0;
  const [sensor, setsensor] = useState(lighting);
  console.log(soilMoisture);
  const handleChange = () => {
    if (sensor?.name == "lighting") {
      setsensor(soilMoisture);
    } else setsensor(lighting);
  };
  return (
    <Container title="Charts">
      <View>
        <View style={styles.ChartCard}>
          <View style={{ position: "relative" }}>
            <VictoryPie
              data={[
                { x: "value", y: lightingValue },
                { x: "empty", y: 100 - lightingValue },
              ]}
              width={SIZE}
              height={SIZE}
              radius={130}
              innerRadius={120}
              startAngle={-140}
              endAngle={140}
              cornerRadius={6}
              style={{
                parent: { position: "absolute", top: 160, left: 0 }, // ← add this
                data: {
                  fill: ({ datum }) =>
                    datum.x === "value" ? "#1a4a2a" : "#e5e7eb",
                },
              }}
              labels={() => null}
            />
            <VictoryPie
              data={[
                { x: "value", y: MoistureValue },
                { x: "empty", y: 100 - MoistureValue },
              ]}
              width={SIZE}
              height={SIZE}
              radius={100}
              innerRadius={93}
              startAngle={-140}
              endAngle={140}
              cornerRadius={6}
              style={{
                parent: { position: "absolute", top: -120, left: 0 }, // ← already here
                data: {
                  fill: ({ datum }) =>
                    datum.x === "value" ? "#4caf7d" : "#e5e7eb",
                },
              }}
              labels={() => null}
            />
            <TouchableOpacity
              onPress={handleChange}
              style={{
                position: "absolute",
                top: 30,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View className="flex flex-col items-center">
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#111" }}
                >
                  {sensor?.name || "lighting"}
                </Text>
                <Text style={{ fontSize: 14, color: "#4caf7d", marginTop: 2 }}>
                  {sensor?.sensorState?.value || 0}%
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.legend, { marginInline: 10 }]}>
          <View style={[styles.legendRow, { gap: 10 }]}>
            <View style={[styles.dot, { backgroundColor: "#1a4a2a" }]} />
            <Text style={styles.legendText}>
              {lighting?.name || "lighting"}
            </Text>
            <Text style={styles.legendValue}>
              {lighting?.sensorState?.value || 0}%
            </Text>
          </View>
          <View style={styles.Line} />
          <View style={[styles.legendRow, { gap: 10 }]}>
            <View style={[styles.dot, { backgroundColor: "#4caf7d" }]} />
            <Text style={styles.legendText}>
              {soilMoisture?.name || "SoilMoisture"}
            </Text>
            <Text style={styles.legendValue}>
              {soilMoisture?.sensorState?.value || 0}%
            </Text>
          </View>
        </View>
      </View>
    </Container>
  );
}
function ProgressBar({
  label,
  value,
  total,
  hours,
}: {
  label: string;
  value: number;
  total: number;
  hours: number;
}) {
  const percentage = (value / total) * 100;

  return (
    <View style={{ margin: 24 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Text style={{ color: "#888", fontSize: 14 }}>{label}</Text>
        <Text style={{ color: "#888", fontSize: 14 }}>{hours} h</Text>
      </View>
      <View
        style={{
          height: 10,
          backgroundColor: "#1a4a2a",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: "#4caf7d",
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
}
export function DailyUsage() {
  return (
    <Container title="daily usage ">
      <ProgressBar label="Light" value={15} total={24} hours={15} />
      <ProgressBar label="Window" value={20} total={24} hours={20} />
    </Container>
  );
}
export default function Statistics() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Header title="statistics"></Header>
        <Graphs></Graphs>
        <Chart></Chart>
        <DailyUsage></DailyUsage>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
    marginBlock: 20,
  },
  ChartCard: {
    height: 280,
    marginBlock: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginInline: 20,
    fontSize: 17,
    textTransform: "capitalize",
    color: "#000000",
  },
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 2,
    marginTop: 10,
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
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    backgroundColor: "#1a4a2a",
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  legendText: { flex: 1, fontSize: 14, color: "#333" },
  legendValue: { fontSize: 14, fontWeight: "500", color: "#333" },
  scrollContent: {
    paddingBottom: 24,
  },
  Line: { height: 0.5, backgroundColor: "#e5e7eb" },

  datePillText: { color: "#fff", fontSize: 13, fontWeight: "500" },
});
