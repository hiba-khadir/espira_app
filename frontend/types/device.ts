export type DeviceType = "sensor" | "actuator";
export type ConnectionStatus = "online" | "offline" | "error" | "unavailable";

export interface ActuatorState {
  deviceId: number;
  isOn: boolean;
  intensity: number | null;
  lastUpdated: string;
}

export interface SensorState {
  deviceId: number;
  value: number;
  lastUpdated: string;
}

export interface Device {
  id: number;
  name: string;
  type: DeviceType;
  unit: string | null;
  stateTopic: string;
  controlTopic: string | null;
  connectionStatus: ConnectionStatus;
  lastSeen: string | null;
  userId: string | null;
  actuatorState: ActuatorState | null;
  sensorState: SensorState | null;
}
