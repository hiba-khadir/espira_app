import { MqttClient } from 'mqtt';
import { PrismaClient, Device, DeviceSubtype } from '../../generated/prisma';

const prisma = new PrismaClient();

type DeviceWithSubtype = Device & { subtype: DeviceSubtype };

// called when actuator publishes {"status":"ok"} back on stateTopic
export async function handleActuatorConfirmation(deviceId: number, message: any) {
  if (message.status !== 'ok') {
    console.warn(`[mqtt] Actuator ${deviceId} returned non-ok status:`, message);
    return;
  }

  // fetch the latest actuator state to know what was confirmed
  const actuatorState = await prisma.actuatorState.findUnique({
    where: { deviceId }
  });
  if (!actuatorState) return;

  // update lastSeen on device
  await prisma.device.update({
    where: { id: deviceId },
    data: {
      lastSeen: new Date(),
      connectionStatus: 'online'
    }
  });

  console.log(`[mqtt] Actuator ${deviceId} confirmed state`);
}

// called when sensor publishes a reading on stateTopic
export async function handleSensorReading(device: DeviceWithSubtype, message: any, client: MqttClient) {
  const value = parseFloat(message.value);
  if (isNaN(value)) {
    console.warn(`[mqtt] Sensor ${device.id} sent invalid value:`, message);
    return;
  }

  await prisma.$transaction([
    // update current sensor state
    prisma.sensorState.update({
      where: { deviceId: device.id },
      data: { value, lastUpdated: new Date() }
    }),
    // write history entry
    prisma.deviceHistory.create({
      data: {
        deviceId: device.id,
        actionType: 'sensor_reading',
        oldValue: null,
        newValue: String(value),
        source: 'system',
      }
    }),
    // update lastSeen
    prisma.device.update({
      where: { id: device.id },
      data: {
        lastSeen: new Date(),
        connectionStatus: 'online'
      }
    })
  ]);

  // publish ACK back to device
  if (device.controlTopic) {
    client.publish(device.controlTopic, JSON.stringify({ status: 'ok' }));
  }

  console.log(`[mqtt] Sensor ${device.id} reading recorded: ${value}`);
}