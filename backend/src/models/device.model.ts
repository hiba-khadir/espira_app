import { PrismaClient, ConnectionStatus, DeviceType } from '../generated/prisma';
import { UpdateDeviceData, UpdateDeviceStateData, DeviceFilters, CreateDeviceData } from '../types/custom'

const prisma = new PrismaClient();

const getAllDevices = (userId: string, filters: DeviceFilters = {}) => {
  const { status, type, state } = filters;
  return prisma.device.findMany({
    where: {
      userId,
      ...(status && { connectionStatus: status }),
      ...(type && { type }),
      ...(state === 'on' && { actuatorState: { isOn: true } }),
      ...(state === 'off' && { actuatorState: { isOn: false } }),
    },
    include: {
      actuatorState: true,
      sensorState: true,
    }
  });
};

const getDeviceById = async (deviceId: number, userId: string) => {
  return prisma.device.findFirst({
    where: { id: deviceId, userId },
    include: {
      actuatorState: true,
      sensorState: true,
    }
  });
};

const createDevice = async (userId: string, data: CreateDeviceData) => {
  const { name, type, unit, stateTopic, controlTopic } = data;

  return prisma.device.create({
    data: {
      name,
      type,
      unit,
      stateTopic,
      controlTopic,
      userId,
      ...(type === DeviceType.actuator && {
        actuatorState: {
          create: {
            isOn: false,
            intensity: 0,
            lastUpdated: new Date()
          }
        }
      }),
      ...(type === DeviceType.sensor && {
        sensorState: {
          create: {
            value: 0,
            lastUpdated: new Date()
          }
        }
      }),
    },
    include: {
      actuatorState: true,
      sensorState: true,
    }
  });
};

const updateDevice = async (deviceId: number, userId: string, data: UpdateDeviceData) => {
  const { name, stateTopic, controlTopic } = data;
  return prisma.device.updateMany({
    where: { id: deviceId, userId },
    data: { name, stateTopic, controlTopic }
  });
};

const deleteDevice = (deviceId: number, userId: string) => {
  return prisma.device.deleteMany({
    where: { id: deviceId, userId }
  });
};

const getDeviceState = (deviceId: number, userId: string) => {
  return prisma.device.findFirst({
    where: { id: deviceId, userId },
    select: {
      actuatorState: true,
      sensorState: true,
    }
  });
};

const updateDeviceState = async (deviceId: number, userId: string, data: UpdateDeviceStateData) => {
  const { isOn, intensity } = data;
  const device = await prisma.device.findFirst({
    where: { id: deviceId, userId }
  });
  if (!device) return null;

  await prisma.actuatorState.update({
    where: { deviceId },
    data: { isOn, intensity, lastUpdated: new Date() }
  });
  return device;
};

const getDeviceHistory = (deviceId: number, userId: string, max?: string) => {
  return prisma.device.findFirst({
    where: { id: deviceId, userId },
    select: {
      deviceHistories: {
        orderBy: { recordedAt: 'desc' },
        take: max ? parseInt(max) : 10,
      }
    }
  });
};

const getDeviceSubtype = (deviceId: number, userId: string) => {
  return prisma.device.findFirst({
    where: { id: deviceId, userId },
    select: { type: true, unit: true }
  });
};

const logDeviceHistory = async (deviceId: number, userId: string, isOn: boolean) => {
  const actuatorState = await prisma.actuatorState.findUnique({ where: { deviceId } });

  return prisma.deviceHistory.create({
    data: {
      deviceId,
      actionType: isOn ? 'turned_on' : 'turned_off',
      oldValue: String(actuatorState?.isOn ?? false),
      newValue: String(isOn),
    }
  });
};

export const updateConnectionStatus = (deviceId: number, status: ConnectionStatus) => {
  return prisma.device.update({
    where: { id: deviceId },
    data: { connectionStatus: status }
  });
};

const getAllDeviceTopics = () => {
  return prisma.device.findMany({
    select: { stateTopic: true, controlTopic: true }
  });
};

const getDeviceByTopic = (topic: string) => {
  return prisma.device.findFirst({
    where: {
      OR: [
        { stateTopic: topic },
        { controlTopic: topic }
      ]
    }
  });
};

const confirmActuatorState = (deviceId: number) => {
  return prisma.device.update({
    where: { id: deviceId },
    data: { lastSeen: new Date(), connectionStatus: 'online' }
  });
};

const recordSensorReading = async (deviceId: number, value: number) => {
  return prisma.$transaction([
    prisma.sensorState.update({
      where: { deviceId },
      data: { value, lastUpdated: new Date() }
    }),
    prisma.deviceHistory.create({
      data: {
        deviceId,
        actionType: 'sensor_reading',
        oldValue: null,
        newValue: String(value),
      }
    }),
    prisma.device.update({
      where: { id: deviceId },
      data: { lastSeen: new Date(), connectionStatus: 'online' }
    })
  ]);
};

export {
  getAllDevices, getDeviceById, createDevice, updateDevice, deleteDevice,
  getDeviceState, updateDeviceState, getDeviceHistory, getDeviceSubtype, logDeviceHistory,
  getAllDeviceTopics, getDeviceByTopic, recordSensorReading, confirmActuatorState
};