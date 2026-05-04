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
      }>,
    ) {
      const device = state.devices.find(
        (d) => d.id === action.payload.deviceId,
      );
      if (device?.actuatorState) {
        device.actuatorState.isOn = action.payload.isOn;
        device.actuatorState.lastUpdated = new Date().toISOString();
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

export const { setDevices, updateActuatorState, updateConnectionStatus } =
  deviceSlice.actions;
export default deviceSlice.reducer;
