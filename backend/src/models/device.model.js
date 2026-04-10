const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();


// GET /api/devices
const getAllDevices = (userId, { status, type, state } = {}) => {
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
const getDeviceById = async (deviceId, userId) => {
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
const createDevice = async (userId, data) => {
  const { name, subtypeId, stateTopic, controlTopic } = data;
  //get subtype to know sensor or actuator
  const subtype = await prisma.deviceSubtype.findUnique({
    where: { id: subtypeId }
  });
  if (!subtype) return null;

  return prisma.device.create({  //create the device entry
    data: {
      name,
      subtypeId,
      stateTopic,
      controlTopic,
      userId,
      //create a corresponding state entry based on type
      ...(subtype.type === 'actuator' && {
        actuatorState: {
          create: {
            isOn: false,
            intensity: 0,
            colorHex: null,
            lastUpdated: new Date()
          }
        }
      }),
      ...(subtype.type === 'sensor' && {
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
const updateDevice = async (deviceId, userId, data) => {
  const { name, stateTopic, controlTopic } = data;
  return prisma.device.updateMany({
    where: { id: deviceId, userId },
    data: { name, stateTopic, controlTopic }
  });
};

// DELETE /api/devices/:id
const deleteDevice = (deviceId, userId) => {
  return prisma.device.deleteMany({
    where: { id: deviceId, userId }
  });
};

// GET /api/devices/:id/state
const getDeviceState = (deviceId, userId) => {
  return prisma.device.findFirst({
    where: { id: deviceId, userId },
    select: {
      actuatorState: true,
      sensorState: true,
    }
  });
};

// PUT /api/devices/:id/state  (actuator only)
// remaining to do : handle state update in db triggered by mqtt service ,
// and pub to mqtt when state is changed
const updateDeviceState = async (deviceId, userId, data) => {
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
}

// GET /api/devices/:id/history
const getDeviceHistory = (deviceId, userId, max) => {
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
const getDeviceSubtype = (deviceId, userId) => {
  return prisma.device.findFirst({
    where: { id: deviceId, userId },
    select: { subtype: true }
  });
};

module.exports = {getAllDevices, getDeviceById, createDevice, updateDevice, deleteDevice, getDeviceState,
  updateDeviceState, getDeviceHistory, getDeviceSubtype,
};