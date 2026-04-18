import {
  getAllDevices, getDeviceById, createDevice, updateDevice,
  deleteDevice, getDeviceState, updateDeviceState, getDeviceHistory, getDeviceSubtype
} from '../models/device.model';
import { Request, Response } from 'express';
import { ConnectionStatus, DeviceType } from '../generated/prisma';

// GET /api/devices
const getAllDevicesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, type, state } = req.query as { 
      status?: ConnectionStatus; 
      type?: DeviceType; 
      state?: 'on' | 'off' 
    };
    const userId = req.user.id;
    const devices = await getAllDevices(userId, { status, type, state });
    res.status(200).json(devices);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/devices/:id
const getDeviceByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id as string);
    const device = await getDeviceById(deviceId, userId);
    if (!device) { res.status(404).json({ message: 'Device not found' }); return; }
    res.status(200).json(device);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/devices
const createDeviceController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const { name, subtypeId, stateTopic, controlTopic } = req.body;
    if (!name || !subtypeId || !stateTopic) {
      res.status(400).json({ message: 'name, subtypeId and stateTopic are required' }); return;
    }
    const device = await createDevice(userId, { name, subtypeId, stateTopic, controlTopic });
    if (!device) { res.status(400).json({ message: 'Invalid subtypeId' }); return; }
    res.status(201).json(device);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/devices/:id
const updateDeviceController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id as string);
    const { name, stateTopic, controlTopic } = req.body;
    const result = await updateDevice(deviceId, userId, { name, stateTopic, controlTopic });
    if (result.count === 0) { res.status(404).json({ message: 'Device not found' }); return; }
    res.status(200).json({ message: 'Device updated' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/devices/:id
const deleteDeviceController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id as string);
    const result = await deleteDevice(deviceId, userId);
    if (result.count === 0) { res.status(404).json({ message: 'Device not found' }); return; }
    res.status(200).json({ message: 'Device deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/devices/:id/state
const getDeviceStateController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id as string);
    const state = await getDeviceState(deviceId, userId);
    if (!state) { res.status(404).json({ message: 'Device not found' }); return; }
    res.status(200).json(state);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/devices/:id/state (actuator only)
const updateDeviceStateController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id as string);
    const { isOn, intensity, colorHex } = req.body;
    if (isOn === undefined) {
      res.status(400).json({ message: 'isOn is required' }); return;
    }
    const device = await updateDeviceState(deviceId, userId, { isOn, intensity, colorHex });
    if (!device) { res.status(404).json({ message: 'Device not found' }); return; }
    if ('error' in device) { res.status(400).json({ message: device.error }); return; }
    if (device.controlTopic) {
      // publishCommand(device.controlTopic, { isOn, intensity, colorHex });
    }
    res.status(200).json({ message: 'State updated' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/devices/:id/history
const getDeviceHistoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id as string);
    const max = req.query.max as string | undefined;
    const history = await getDeviceHistory(deviceId, userId, max);
    if (!history) { res.status(404).json({ message: 'Device not found' }); return; }
    res.status(200).json(history.deviceHistories);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/devices/:id/subtype
const getDeviceSubtypeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id as string);
    const result = await getDeviceSubtype(deviceId, userId);
    if (!result) { res.status(404).json({ message: 'Device not found' }); return; }
    res.status(200).json(result.subtype);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getAllDevicesController, getDeviceByIdController, createDeviceController,
  updateDeviceController, deleteDeviceController, getDeviceStateController,
  updateDeviceStateController, getDeviceHistoryController, getDeviceSubtypeController
};