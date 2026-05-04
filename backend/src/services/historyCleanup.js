import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();
const HISTORY_RETENTION_DAYS = 30;
export async function runHistoryCleanup() {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - HISTORY_RETENTION_DAYS);
    const result = await prisma.deviceHistory.deleteMany({
        where: {
            recordedAt: { lt: cutoff }
        }
    });
    console.log(`[cleanup] Deleted ${result.count} old history entries at ${new Date().toISOString()}`);
}
