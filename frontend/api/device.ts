import instance from "./instance";
import { DeviceData } from "@/stores/slices/deviceSlice";
import { UpdateDeviceStateData } from "@/stores/slices/deviceSlice";
// get all user devices
export const getAlldevices = async (): Promise<any> => {
  const { data } = await instance.get("/api/devices");
  return data;
};
// add devices
export const addDevice = async (payload: DeviceData): Promise<any> => {
  const { data } = await instance.post("/api/devices");
  return data;
};
// update single device status
export const updateDeviceStatus = async (
  payload: UpdateDeviceStateData,
  id: number,
): Promise<any> => {
  const data = await instance.put(`/devices/${id}/state`, { payload });
  return data;
};
