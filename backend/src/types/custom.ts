import { ConnectionStatus, DeviceType } from '../generated/prisma';

interface DeviceFilters {
  status?: ConnectionStatus;
  type?: DeviceType;
  state?: 'on' | 'off';
}

interface CreateDeviceData {
  name: string;
  type: DeviceType;
  unit?: string;
  stateTopic: string;
  controlTopic?: string;
}

interface UpdateDeviceData {
  name?: string;
  stateTopic?: string;
  controlTopic?: string;
}

interface UpdateDeviceStateData {
  isOn: boolean;
  intensity?: number;
}

export { UpdateDeviceData, UpdateDeviceStateData, DeviceFilters, CreateDeviceData }