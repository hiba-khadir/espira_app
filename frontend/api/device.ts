// get all devices
import { Device } from "@/types/device";
import instance from "./instance";

export const getAllDevices = async (): Promise<Device[]> => {
  const { data } = await instance.get<Device[]>("/api/devices");
  return data;
};
