// get all devices
import { Device } from "@/types/device";
import instance from "./instance";
import { DeviceType } from "@/types/device";
import { DeviceHistory } from "@/types/device";
export interface createPayload {
  name: string;
  type: DeviceType;
  stateTopic: string | null;
  controlTopic: string | null;
}
export const getAllDevices = async (): Promise<Device[]> => {
  const { data } = await instance.get<Device[]>("/api/devices");
  return data;
};
export const CreateDevices = async (
  payload: createPayload,
): Promise<Device> => {
  const { data } = await instance.post<Device>("/api/devices");
  return data;
};
export interface SuccessMessage {
  message: string;
}
export const updateDeviceState = async (
  id: number,
  isOn: boolean,
): Promise<SuccessMessage> => {
  const { data } = await instance.put<SuccessMessage>(
    `/api/devices/${id}/state`,
    {
      isOn,
    },
  );
  return data;
};
export const getDeviceHistory = async (id: string): Promise<DeviceHistory> => {
  const { data } = await instance.get<DeviceHistory>(
    `/api/devices/${id}/history`,
  );
  return data;
};
// add devices after logging in automatically (user can't )
export const AddDevices = async (
  devices: createPayload[],
): Promise<PromiseSettledResult<Device>[]> => {
  const devicePromises = devices.map(
    async (device) => await CreateDevices(device),
  );

  return Promise.allSettled(devicePromises);
};
