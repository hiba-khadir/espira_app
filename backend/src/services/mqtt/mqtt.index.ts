// initial configuration of mqtt : init at startup 
//subscribe and publish to mqtt topics
import mqtt, { MqttClient } from 'mqtt';
import 'dotenv/config';
import { EventEmitter } from 'events';
import { getAllDeviceTopics, getDeviceByTopic } from '../../models/device.model';
import { handleActuatorConfirmation, handleSensorReading } from './mqtt.handlers';

export const mqttEvents = new EventEmitter();
let client: MqttClient;

// src/services/mqtt/index.ts
let mqttStatus: 'connected' | 'disconnected' | 'error' = 'disconnected';
let mqttError: string | null = null;

function getMqttStatus() {
  return { status: mqttStatus, error: mqttError };
}

//connect to mqtt broker and report connexion status
function connectMqtt() {
  //conexion to mqtt broker as a client
  client = mqtt.connect(process.env.MQTT_BROKER_URL as string, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
  });

  client.on('connect', async () => {
    mqttStatus = 'connected';
    mqttError = null;
    console.log('[mqtt] Connected to broker');
    //subscribe to state topic of all existing devices
    await subscribeToAllDevices();
  });

  //handle connexion errors
  client.on('error', (err) => {
    mqttStatus = 'error';
    mqttError = err.message;
    console.error('[mqtt] Error:', err.message);
  });
  //disconnect 
  client.on('disconnect', () => {
    mqttStatus = 'disconnected';
    console.log('[mqtt] Disconnected');
  });
  // handling messages arrival 
  client.on('message', async (topic, payload) => {
    console.log(`[mqtt] Message received on topic: ${topic}`, payload.toString());
    
    const message = JSON.parse(payload.toString());
    const device = await getDeviceByTopic(topic);
    if (!device) return;

    if (device.type === 'actuator' && topic === device.stateTopic) {
      await handleActuatorConfirmation(device.id, message);
    }

    if (device.type === 'sensor' && topic === device.stateTopic) {
      await handleSensorReading(device, message, client);
    }
  });
}

async function subscribeToAllDevices() {
  const devices = await getAllDeviceTopics();
  for (const device of devices) subscribeToDevice(device);
  console.log(`[mqtt] Subscribed to ${devices.length} devices`);
}

function subscribeToDevice(device: { stateTopic: string; controlTopic?: string | null }) {
  //subscribing to state topics
  console.log(`[mqtt] Subscribing to: ${device.stateTopic}`);
  client.subscribe(device.stateTopic);
}

// map of deviceId : { resolve, reject }  commands waiting for confirmation
const pendingCommands = new Map<number, { resolve: () => void; reject: (err: Error) => void }>();

function publishCommandAndWait(deviceId: number, topic: string, payload: object): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      console.log(`[mqtt] TIMEOUT for device ${deviceId}`);
      pendingCommands.delete(deviceId);
      reject(new Error('Device did not respond in time'));
    }, 20000);

    pendingCommands.set(deviceId, {
      resolve: () => { clearTimeout(timeout); console.log(`[mqtt] RESOLVED for device ${deviceId}`); resolve(); },
      reject:  (err) => { clearTimeout(timeout); console.log(`[mqtt] REJECTED for device ${deviceId}:`, err.message); reject(err); }
    });

    console.log(`[mqtt] Publishing to ${topic}:`, payload);
    client.publish(topic, JSON.stringify(payload));
  });
}
// called from handlers when confirmation arrives
function resolveCommand(deviceId: number, success: boolean) {
  const pending = pendingCommands.get(deviceId);
  if (!pending) return;
  pendingCommands.delete(deviceId);
  if (success) {
    pending.resolve();
  } else {
    pending.reject(new Error('Device returned error status'));
  }
}



export{resolveCommand,publishCommandAndWait,connectMqtt,getMqttStatus}