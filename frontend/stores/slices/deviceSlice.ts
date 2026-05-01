import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device } from "@/types/device";

interface DeviceState {
  devices: Device[];
}

const initialState: DeviceState = {
  devices: [],
};

const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    setDevices(state, action: PayloadAction<Device[]>) {
      state.devices = action.payload;
    },
    updateActuatorState(
      state,
      action: PayloadAction<{
        deviceId: number;
        isOn: boolean;
        intensity?: number;
      }>,
    ) {
      const device = state.devices.find(
        (d) => d.id === action.payload.deviceId,
      );
      if (device?.actuatorState) {
        device.actuatorState.isOn = action.payload.isOn;
        if (action.payload.intensity !== undefined) {
          device.actuatorState.intensity = action.payload.intensity;
        }
        device.actuatorState.lastUpdated = new Date().toISOString();
      }
    },
    updateSensorState(
      state,
      action: PayloadAction<{ deviceId: number; value: number }>,
    ) {
      const device = state.devices.find(
        (d) => d.id === action.payload.deviceId,
      );
      if (device?.sensorState) {
        device.sensorState.value = action.payload.value;
        device.sensorState.lastUpdated = new Date().toISOString();
      }
    },
    updateConnectionStatus(
      state,
      action: PayloadAction<{
        deviceId: number;
        status: Device["connectionStatus"];
      }>,
    ) {
      const device = state.devices.find(
        (d) => d.id === action.payload.deviceId,
      );
      if (device) {
        device.connectionStatus = action.payload.status;
      }
    },
  },
});

export const {
  setDevices,
  updateActuatorState,
  updateSensorState,
  updateConnectionStatus,
} = deviceSlice.actions;
export default deviceSlice.reducer;
