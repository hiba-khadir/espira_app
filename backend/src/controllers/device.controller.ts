import {
  getAllDevices, getDeviceById, createDevice, updateDevice,updateConnectionStatus,
  deleteDevice, getDeviceState, updateDeviceState, getDeviceHistory, getDeviceSubtype ,logDeviceHistory
} from '../models/device.model';
import { Request, Response } from 'express';
import { ConnectionStatus, DeviceType } from '../generated/prisma';
import { mqttEvents } from '../services/mqtt/mqtt.index';
import { publishCommandAndWait } from '../services/mqtt/mqtt.index';


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
    // notify MQTT service to subscribe to this device's topics
    mqttEvents.emit('device:created', device);
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
  //params
  const userId = req.user.id;
  const deviceId = parseInt(req.params.id as string);
  const { isOn, intensity, colorHex } = req.body;
  try {
    if (isOn === undefined) {
      res.status(400).json({ message: 'isOn is required' }); 
      return;
    }
    //get the device and control topic
    const device = await getDeviceById(deviceId, userId);
    if (!device) { 
      res.status(404).json({ message: 'Device not found' }); 
      return; 
    }

    if (!device.controlTopic){ 
      res.status(400).json({ message: 'Device has no control topic' }); 
      return; 
    }

    await publishCommandAndWait(deviceId, device.controlTopic, { isOn, intensity, colorHex });

    await updateDeviceState(deviceId, userId, { isOn, intensity, colorHex });
    await logDeviceHistory(deviceId, userId, isOn);

    res.status(200).json({ message: 'State updated' });
  } catch (err: any) {
    //if timeout or device error mark as unavailable
    await updateConnectionStatus(deviceId, 'error').catch(() => {});
    res.status(504).json({ message: err.message });
  }
};

// GET /api/devices/:id/history
const getDeviceHistoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id as string);
    const max = req.query.max as string | undefined;
    const history = await getDeviceHistory(deviceId, userId, max);
    if (!history) {
      res.status(404).json({ message: 'Device not found' }); 
      return;
    }
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