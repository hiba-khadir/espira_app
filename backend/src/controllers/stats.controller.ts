import { Request, Response } from 'express';
import { getDevicesStatusCount, getSensorStats } from '../models/stats.model';

const getDevicesStatusCountController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const result = await getDevicesStatusCount(userId);
    const counts = { online: 0, offline: 0, error: 0, unavailable: 0 };
    result.forEach(r => {
      counts[r.connectionStatus] = r._count.connectionStatus;
    });
    res.status(200).json(counts);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const getSensorStatsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id as string);
    const range = req.query.range as string | undefined;
    const result = await getSensorStats(deviceId, userId, range);
    if (!result) { res.status(404).json({ message: 'Device not found' }); return; }
    if ('error' in result) { res.status(400).json({ message: result.error }); return; }
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export { getDevicesStatusCountController, getSensorStatsController };