// ready devices to add
import { createPayload } from "@/api/device";
export const Predevices: createPayload[] = [
  {
    name: "fan",
    type: "actuator",
    stateTopic: "greenhouse/esp32/actuators/fan/state",
    controlTopic: "greenhouse/esp32/actuators/fan/control",
  },
  {
    name: "light",
    type: "actuator",
    stateTopic: "greenhouse/esp32/actuators/led/state",
    controlTopic: "greenhouse/esp32/actuators/led/control",
  },
  {
    name: "lighting",
    type: "sensor",
    stateTopic: "greenhouse/sensors/led/state",
    controlTopic: null,
  },
  {
    name: "humidity",
    type: "sensor",
    stateTopic: "greenhouse/sensors/humidity/state",
    controlTopic: null,
  },
  {
    name: "soilMoisture",
    type: "sensor",
    stateTopic: "greenhouse/sensors/soilMoisture/state",
    controlTopic: null,
  },
  {
    name: "temperature",
    type: "sensor",
    stateTopic: "greenhouse/sensors/temperature/state",
    controlTopic: null,
  },
];
