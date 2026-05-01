import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface DeviceData {
  id: number;
  name: string;
  subtypeId: number;
  stateTopic: string;
  controlTopic?: string;
}
export interface UpdateDeviceData {
  id?: number;
  name?: string;
  stateTopic?: string;
  controlTopic?: string;
}
export interface UpdateDeviceStateData {
  isOn: boolean;
}
export interface DevicesState {
  Devices: DeviceData[] | null;
  isLoading: boolean;
  error: string | null;
}
const initialState: DevicesState = {
  Devices: null,
  isLoading: false,
  error: null,
};
const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevices(state, action: PayloadAction<DeviceData[]>) {
      state.Devices = action.payload;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setDevices, setLoading, setError } = deviceSlice.actions;
export default deviceSlice.reducer;
