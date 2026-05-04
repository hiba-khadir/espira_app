import { PrismaClient, DeviceType, } from "../generated/prisma";
const prisma = new PrismaClient();
const getAllDevices = (userId, filters = {}) => {
    const { status, type, state } = filters;
    return prisma.device.findMany({
        where: {
            userId,
            ...(status && { connectionStatus: status }),
            ...(type && { type }),
            ...(state === "on" && { actuatorState: { isOn: true } }),
            ...(state === "off" && { actuatorState: { isOn: false } }),
        },
        include: {
            actuatorState: true,
            sensorState: true,
        },
    });
};
const getDeviceById = async (deviceId, userId) => {
    return prisma.device.findFirst({
        where: { id: deviceId, userId },
        include: {
            actuatorState: true,
            sensorState: true,
        },
    });
};
const createDevice = async (userId, data) => {
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
                        lastUpdated: new Date(),
                    },
                },
            }),
            ...(type === DeviceType.sensor && {
                sensorState: {
                    create: {
                        value: 0,
                        lastUpdated: new Date(),
                    },
                },
            }),
        },
        include: {
            actuatorState: true,
            sensorState: true,
        },
    });
};
const updateDevice = async (deviceId, userId, data) => {
    const { name, stateTopic, controlTopic } = data;
    return prisma.device.updateMany({
        where: { id: deviceId, userId },
        data: { name, stateTopic, controlTopic },
    });
};
const deleteDevice = (deviceId, userId) => {
    return prisma.device.deleteMany({
        where: { id: deviceId, userId },
    });
};
const getDeviceState = (deviceId, userId) => {
    return prisma.device.findFirst({
        where: { id: deviceId, userId },
        select: {
            actuatorState: true,
            sensorState: true,
        },
    });
};
const updateDeviceState = async (deviceId, userId, data) => {
    const { isOn, intensity } = data;
    const device = await prisma.device.findFirst({
        where: { id: deviceId, userId },
    });
    if (!device)
        return null;
    await prisma.actuatorState.update({
        where: { deviceId },
        data: { isOn, intensity, lastUpdated: new Date() },
    });
    return device;
};
const getDeviceHistory = (deviceId, userId, max) => {
    return prisma.device.findFirst({
        where: { id: deviceId, userId },
        select: {
            deviceHistories: {
                orderBy: { recordedAt: "desc" },
                take: max ? parseInt(max) : 10,
            },
        },
    });
};
const getDeviceSubtype = (deviceId, userId) => {
    return prisma.device.findFirst({
        where: { id: deviceId, userId },
        select: { type: true, unit: true },
    });
};
const logDeviceHistory = async (deviceId, userId, isOn) => {
    const actuatorState = await prisma.actuatorState.findUnique({
        where: { deviceId },
    });
    return prisma.deviceHistory.create({
        data: {
            deviceId,
            actionType: isOn ? "turned_on" : "turned_off",
            oldValue: String(actuatorState?.isOn ?? false),
            newValue: String(isOn),
        },
    });
};
export const updateConnectionStatus = (deviceId, status) => {
    return prisma.device.update({
        where: { id: deviceId },
        data: { connectionStatus: status },
    });
};
const getAllDeviceTopics = () => {
    return prisma.device.findMany({
        select: { stateTopic: true, controlTopic: true },
    });
};
const getDeviceByTopic = (topic) => {
    return prisma.device.findFirst({
        where: {
            OR: [{ stateTopic: topic }, { controlTopic: topic }],
        },
    });
};
const confirmActuatorState = (deviceId) => {
    return prisma.device.update({
        where: { id: deviceId },
        data: { lastSeen: new Date(), connectionStatus: "online" },
    });
};
const recordSensorReading = async (deviceId, value) => {
    return prisma.$transaction([
        prisma.sensorState.update({
            where: { deviceId },
            data: { value, lastUpdated: new Date() },
        }),
        prisma.deviceHistory.create({
            data: {
                deviceId,
                actionType: "sensor_reading",
                oldValue: null,
                newValue: String(value),
            },
        }),
        prisma.device.update({
            where: { id: deviceId },
            data: { lastSeen: new Date(), connectionStatus: "online" },
        }),
    ]);
};
export { getAllDevices, getDeviceById, createDevice, updateDevice, deleteDevice, getDeviceState, updateDeviceState, getDeviceHistory, getDeviceSubtype, logDeviceHistory, getAllDeviceTopics, getDeviceByTopic, recordSensorReading, confirmActuatorState, };
