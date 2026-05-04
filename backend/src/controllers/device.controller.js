import { getAllDevices, getDeviceById, createDevice, updateDevice, updateConnectionStatus, deleteDevice, getDeviceState, updateDeviceState, getDeviceHistory, logDeviceHistory, } from "../models/device.model";
import { mqttEvents } from "../services/mqtt/mqtt.index";
// GET /api/devices
const getAllDevicesController = async (req, res) => {
    try {
        const { status, type, state } = req.query;
        const userId = req.user.id;
        const devices = await getAllDevices(userId, { status, type, state });
        res.status(200).json(devices);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// GET /api/devices/:id
const getDeviceByIdController = async (req, res) => {
    try {
        const userId = req.user.id;
        const deviceId = parseInt(req.params.id);
        const device = await getDeviceById(deviceId, userId);
        if (!device) {
            res.status(404).json({ message: "Device not found" });
            return;
        }
        res.status(200).json(device);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// POST /api/devices
const createDeviceController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, type, unit, stateTopic, controlTopic } = req.body;
        if (!name || !type || !stateTopic) {
            res
                .status(400)
                .json({ message: "name, type and stateTopic are required" });
            return;
        }
        const device = await createDevice(userId, {
            name,
            type,
            unit,
            stateTopic,
            controlTopic,
        });
        if (!device) {
            res.status(400).json({ message: "Invalid device type" });
            return;
        }
        // notify MQTT service to subscribe to this device's topics
        mqttEvents.emit("device:created", device);
        res.status(201).json(device);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// PUT /api/devices/:id
const updateDeviceController = async (req, res) => {
    try {
        const userId = req.user.id;
        const deviceId = parseInt(req.params.id);
        const { name, stateTopic, controlTopic } = req.body;
        const result = await updateDevice(deviceId, userId, {
            name,
            stateTopic,
            controlTopic,
        });
        if (result.count === 0) {
            res.status(404).json({ message: "Device not found" });
            return;
        }
        res.status(200).json({ message: "Device updated" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// DELETE /api/devices/:id
const deleteDeviceController = async (req, res) => {
    try {
        const userId = req.user.id;
        const deviceId = parseInt(req.params.id);
        const result = await deleteDevice(deviceId, userId);
        if (result.count === 0) {
            res.status(404).json({ message: "Device not found" });
            return;
        }
        res.status(200).json({ message: "Device deleted" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// GET /api/devices/:id/state
const getDeviceStateController = async (req, res) => {
    try {
        const userId = req.user.id;
        const deviceId = parseInt(req.params.id);
        const state = await getDeviceState(deviceId, userId);
        if (!state) {
            res.status(404).json({ message: "Device not found" });
            return;
        }
        res.status(200).json(state);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// PUT /api/devices/:id/state (actuator only)
const updateDeviceStateController = async (req, res) => {
    //params
    const userId = req.user.id;
    const deviceId = parseInt(req.params.id);
    const { isOn, intensity } = req.body;
    try {
        if (isOn === undefined) {
            res.status(400).json({ message: "isOn is required" });
            return;
        }
        //get the device and control topic
        const device = await getDeviceById(deviceId, userId);
        if (!device) {
            res.status(404).json({ message: "Device not found" });
            return;
        }
        if (!device.controlTopic) {
            res.status(400).json({ message: "Device has no control topic" });
            return;
        }
        // await publishCommandAndWait(deviceId, device.controlTopic, { isOn, intensity});
        await updateDeviceState(deviceId, userId, { isOn, intensity });
        await logDeviceHistory(deviceId, userId, isOn);
        res.status(200).json({ message: "State updated" });
    }
    catch (err) {
        //if timeout or device error mark as unavailable
        await updateConnectionStatus(deviceId, "error").catch(() => { });
        res.status(504).json({ message: err.message });
    }
};
// GET /api/devices/:id/history
const getDeviceHistoryController = async (req, res) => {
    try {
        const userId = req.user.id;
        const deviceId = parseInt(req.params.id);
        const max = req.query.max;
        const history = await getDeviceHistory(deviceId, userId, max);
        if (!history) {
            res.status(404).json({ message: "Device not found" });
            return;
        }
        res.status(200).json(history.deviceHistories);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export { getAllDevicesController, getDeviceByIdController, createDeviceController, updateDeviceController, deleteDeviceController, getDeviceStateController, updateDeviceStateController, getDeviceHistoryController, };
