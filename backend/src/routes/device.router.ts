import {
  getAllDevicesController,createDeviceController,getDeviceByIdController,updateDeviceController,
  deleteDeviceController,getDeviceStateController,updateDeviceStateController,getDeviceHistoryController,
  getDeviceSubtypeController,
} from '../controllers/device.controller.js'

import express from 'express';

const router = express.Router();

router.get('/', getAllDevicesController)
router.post('/',createDeviceController)
router.get('/:id', getDeviceByIdController)
router.put('/:id',  updateDeviceController)
router.delete('/:id', deleteDeviceController)
router.get('/:id/state', getDeviceStateController)
router.put('/:id/state', updateDeviceStateController)
router.get('/:id/history',  getDeviceHistoryController)
router.get('/:id/subtype',  getDeviceSubtypeController)

export default router;