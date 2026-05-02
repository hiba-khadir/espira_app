// ready devices to add
import { createPayload } from "@/api/device";
export const Predevices: createPayload[] = [
  {
    name: "window",
    type: "actuator",
    stateTopic: null,
    controlTopic: "device/1/state",
  },
  {
    name: "light",
    type: "actuator",
    stateTopic: null,
    controlTopic: "device/2/state",
  },
  {
    name: "lighting",
    type: "sensor",
    stateTopic: "device/3/state",
    controlTopic: "device/1/state",
  },
  {
    name: "humidity",
    type: "sensor",
    stateTopic: "device/1/state",
    controlTopic: null,
  },
  {
    name: "soilMoisture",
    type: "sensor",
    stateTopic: "device/4/state",
    controlTopic: null,
  },
  {
    name: "temperature",
    type: "sensor",
    stateTopic: "device/5/state",
    controlTopic: null,
  },
];
