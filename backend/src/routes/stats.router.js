import { getDevicesStatusCountController, getSensorStatsController } from '../controllers/stats.controller.js';
import express from 'express';
const router = express.Router();
router.get('/devices/status', getDevicesStatusCountController);
router.post('/devices/:id', getSensorStatsController);
export default router;
