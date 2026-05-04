import { confirmActuatorState, recordSensorReading, updateConnectionStatus } from '../../models/device.model';
import { resolveCommand } from './mqtt.index';
// handles confirmation or error msg from esp32
async function handleActuatorConfirmation(deviceId, message) {
    const success = message.status === 'ok';
    if (!success) {
        await updateConnectionStatus(deviceId, 'error');
        resolveCommand(deviceId, false);
        return;
    }
    await confirmActuatorState(deviceId);
    resolveCommand(deviceId, true);
    await updateConnectionStatus(deviceId, 'online'); //update status if it was unavailable before and now it's working
}
//parse sensor value 
async function handleSensorReading(device, message, client) {
    const value = parseFloat(message.value);
    if (isNaN(value)) {
        console.warn(`[mqtt] Sensor ${device.id} sent invalid value:`, message);
        await updateConnectionStatus(device.id, 'error');
        return;
    }
    await recordSensorReading(device.id, value);
    if (device.controlTopic) {
        client.publish(device.controlTopic, JSON.stringify({ status: 'ok' }));
    }
    console.log(`[mqtt] Sensor ${device.id} reading recorded: ${value}`);
    await updateConnectionStatus(device.id, 'online');
}
export { handleActuatorConfirmation, handleSensorReading };
