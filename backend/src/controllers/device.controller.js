const {
  getAllDevices, getDeviceById, createDevice, updateDevice,
  deleteDevice, getDeviceState, updateDeviceState, getDeviceHistory, getDeviceSubtype
} = require('../models/device.model.js');
const { publishCommand } = require('../services/mqtt');

// GET /api/devices
const getAllDevicesController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, type, state } = req.query;
    const devices = await getAllDevices(userId, { status, type, state });
    res.status(200).json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/devices/:id
const getDeviceByIdController = async (req, res) => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id);
    const device = await getDeviceById(deviceId, userId);
    if (!device) return res.status(404).json({ message: 'Device not found' });
    res.status(200).json(device);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/devices
const createDeviceController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, subtypeId, stateTopic, controlTopic } = req.body;
    if (!name || !subtypeId || !stateTopic) {
      return res.status(400).json({ message: 'name, subtypeId and stateTopic are required' });
    }
    const device = await createDevice(userId, { name, subtypeId, stateTopic, controlTopic });
    if (!device) return res.status(400).json({ message: 'Invalid subtypeId' });
    res.status(201).json(device);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/devices/:id
const updateDeviceController = async (req, res) => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id);
    const { name, stateTopic, controlTopic } = req.body;
    const result = await updateDevice(deviceId, userId, { name, stateTopic, controlTopic });
    if (result.count === 0) return res.status(404).json({ message: 'Device not found' });
    res.status(200).json({ message: 'Device updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/devices/:id
const deleteDeviceController = async (req, res) => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id);
    const result = await deleteDevice(deviceId, userId);
    if (result.count === 0) return res.status(404).json({ message: 'Device not found' });
    res.status(200).json({ message: 'Device deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/devices/:id/state
const getDeviceStateController = async (req, res) => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id);
    const state = await getDeviceState(deviceId, userId);
    if (!state) return res.status(404).json({ message: 'Device not found' });
    res.status(200).json(state);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/devices/:id/state  (actuator only, also publishes to mqtt)
// i need to fix this to wait for mqtt success code to update db not before
// this should also add an entry in device_history table
const updateDeviceStateController = async (req, res) => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id);
    const { isOn, intensity, colorHex } = req.body;
    if (isOn === undefined) {
      return res.status(400).json({ message: 'isOn is required' });
    }
    const device = await updateDeviceState(deviceId, userId, { isOn, intensity, colorHex });
    if (!device) return res.status(404).json({ message: 'Device not found' });
    if (device.error) return res.status(400).json({ message: device.error });
    if (device.controlTopic) {
        // to implement 
      //publishCommand(device.controlTopic, { isOn, intensity, colorHex }); 
    }
    res.status(200).json({ message: 'State updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/devices/:id/history
const getDeviceHistoryController = async (req, res) => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id);
    const max = req.query.max;
    const history = await getDeviceHistory(deviceId, userId, max);
    if (!history) return res.status(404).json({ message: 'Device not found' });
    res.status(200).json(history.deviceHistories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/devices/:id/subtype
const getDeviceSubtypeController = async (req, res) => {
  try {
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id);
    const result = await getDeviceSubtype(deviceId, userId);
    if (!result) return res.status(404).json({ message: 'Device not found' });
    res.status(200).json(result.subtype);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllDevicesController, getDeviceByIdController, createDeviceController,
  updateDeviceController, deleteDeviceController, getDeviceStateController,
  updateDeviceStateController, getDeviceHistoryController, getDeviceSubtypeController
};