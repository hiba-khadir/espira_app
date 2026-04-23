// initial configuration of mqtt : init at startup 
//subscribe and publish to mqtt topics
import mqtt, { MqttClient } from 'mqtt';
import 'dotenv/config';
import { EventEmitter } from 'events';
import { PrismaClient } from '../../generated/prisma';
import { handleActuatorConfirmation, handleSensorReading } from './mqtt.handlers';

const prisma = new PrismaClient();
export const mqttEvents = new EventEmitter();
//server as an mqtt client
let client: MqttClient;

export function connectMqtt() {
  client = mqtt.connect(process.env.MQTT_BROKER_URL as string); //currently local broker
  //on server startup connect to mqtt broker and sub to all topics
  client.on('connect', async () => {
    console.log('[mqtt] Connected to broker');
    await subscribeToAllDevices();
  });

  client.on('message', async (topic, payload) => {
    const message = JSON.parse(payload.toString());
    const device = await prisma.device.findFirst({
      where: {
        OR: [
          { stateTopic: topic },
          { controlTopic: topic }
        ]
      },
      include: { subtype: true }
    });

    if (!device) return;

    if (device.subtype.type === 'actuator' && topic === device.stateTopic) {
      await handleActuatorConfirmation(device.id, message);
    }

    if (device.subtype.type === 'sensor' && topic === device.stateTopic) {
      await handleSensorReading(device, message, client);
    }
  });

  client.on('error', (err) => {
    console.error('[mqtt] Error:', err.message);
  });

  client.on('disconnect', () => {
    console.log('[mqtt] Disconnected from broker');
  });

  // when a new device is added by user subscribe to its topics
  mqttEvents.on('device:created', (device) => {
    subscribeToDevice(device);
  });
}

async function subscribeToAllDevices() {
  const devices = await prisma.device.findMany({
    select: { stateTopic: true, controlTopic: true }
  });

  for (const device of devices) {
    subscribeToDevice(device);
  }
  console.log(`[mqtt] Subscribed to ${devices.length} devices`);
}

function subscribeToDevice(device: { stateTopic: string; controlTopic?: string | null }) {
  client.subscribe(device.stateTopic);
  if (device.controlTopic) {
    client.subscribe(device.controlTopic);
  }
}

export function publishCommand(topic: string, payload: object) {
  client.publish(topic, JSON.stringify(payload));
}