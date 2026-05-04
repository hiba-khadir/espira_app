import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();
const getSensorStats = async (deviceId, userId, range) => {
    const device = await prisma.device.findFirst({
        where: { id: deviceId, userId },
    });
    if (!device)
        return null;
    if (device.type !== 'sensor')
        return { error: 'Device is not a sensor' };
    let days;
    if (range) {
        days = parseInt(range.replace('d', ''));
        if (isNaN(days) || days < 1)
            return { error: 'Invalid range format, use: 7d, 30d ..' };
    }
    const from = days ? new Date(Date.now() - days * 24 * 60 * 60 * 1000) : undefined;
    const readings = await prisma.deviceHistory.findMany({
        where: {
            deviceId,
            actionType: 'sensor_reading',
            ...(from && { recordedAt: { gte: from } }) // only filter if range was provided
        },
        select: { newValue: true }
    });
    if (readings.length === 0)
        return { max: null, min: null, average: null };
    const values = readings
        .map(r => parseFloat(r.newValue ?? ''))
        .filter(v => !isNaN(v));
    const max = Math.max(...values);
    const min = Math.min(...values);
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    return { max, min, average, range: range ?? 'all', readings: readings.length };
};
// GET /api/stats/devices/status
const getDevicesStatusCount = (userId) => {
    return prisma.device.groupBy({
        by: ['connectionStatus'],
        where: { userId },
        _count: { connectionStatus: true }
    });
};
export { getDevicesStatusCount, getSensorStats };
