import { PrismaClient, ConnectionStatus, DeviceType } from '../generated/prisma';
import {UpdateDeviceData , UpdateDeviceStateData , DeviceFilters, CreateDeviceData} from '../types/custom'

const prisma = new PrismaClient();
// GET /api/devices
const getAllDevices = (userId: string, filters: DeviceFilters = {}) => {
  const { status, type, state } = filters;
  return prisma.device.findMany({
    where: {
      userId,
      ...(status && { connectionStatus: status }),
      ...(type && { subtype: { type } }),
      ...(state === 'on' && { actuatorState: { isOn: true } }),
      ...(state === 'off' && { actuatorState: { isOn: false } }),
    },
    include: {
      subtype: true,
      actuatorState: true,
      sensorState: true,
    }
  });
};

// GET /api/devices/:id
const getDeviceById = async (deviceId: number, userId: string) => {
  return prisma.device.findFirst({
    where: { id: deviceId, userId },
    include: {
      subtype: true,
      actuatorState: true,
      sensorState: true,
    }
  });
};

// POST /api/devices
const createDevice = async (userId: string, data: CreateDeviceData) => {
  const { name, subtypeId, stateTopic, controlTopic } = data;
  const subtype = await prisma.deviceSubtype.findUnique({
    where: { id: subtypeId }
  });
  if (!subtype) return null;

  return prisma.device.create({
    data: {
      name,
      subtypeId,
      stateTopic,
      controlTopic,
      userId,
      ...(subtype.type === DeviceType.actuator && {
        actuatorState: {
          create: {
            isOn: false,
            intensity: 0,
            colorHex: null,
            lastUpdated: new Date()
          }
        }
      }),
      ...(subtype.type === DeviceType.sensor && {
        sensorState: {
          create: {
            value: 0,
            unit: subtype.unit,
            lastUpdated: new Date()
          }
        }
      }),
    },
    include: {
      subtype: true,
      actuatorState: true,
      sensorState: true,
    }
  });
};

// PUT /api/devices/:id
const updateDevice = async (deviceId: number, userId: string, data: UpdateDeviceData) => {
  const { name, stateTopic, controlTopic } = data;
  return prisma.device.updateMany({
    where: { id: deviceId, userId },
    data: { name, stateTopic, controlTopic }
  });
};

// DELETE /api/devices/:id
const deleteDevice = (deviceId: number, userId: string) => {
  return prisma.device.deleteMany({
    where: { id: deviceId, userId }
  });
};

// GET /api/devices/:id/state
const getDeviceState = (deviceId: number, userId: string) => {
  return prisma.device.findFirst({
    where: { id: deviceId, userId },
    select: {
      actuatorState: true,
      sensorState: true,
    }
  });
};

// PUT /api/devices/:id/state (actuator only)
const updateDeviceState = async (deviceId: number, userId: string, data: UpdateDeviceStateData) => {
  const { isOn, intensity, colorHex } = data;
  const device = await prisma.device.findFirst({
    where: { id: deviceId, userId }
  });
  if (!device) return null;

  await prisma.actuatorState.update({
    where: { deviceId },
    data: { isOn, intensity, colorHex, lastUpdated: new Date() }
  });
  return device;
};

// GET /api/devices/:id/history
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

// GET /api/devices/:id/subtype
const getDeviceSubtype = (deviceId: number, userId: string) => {
  return prisma.device.findFirst({
    where: { id: deviceId, userId },
    select: { subtype: true }
  });
};

export {
  getAllDevices, getDeviceById, createDevice, updateDevice, deleteDevice,
  getDeviceState, updateDeviceState, getDeviceHistory, getDeviceSubtype,
};