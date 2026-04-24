import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();
async function main() {
  await prisma.deviceSubtype.createMany({
    skipDuplicates: true,
    data: [
      // actuators
      { name: 'light',    type: 'actuator', supportsIntensity: true,  supportsColor: true,  unit: null },
      { name: 'switch',   type: 'actuator', supportsIntensity: false, supportsColor: false, unit: null },
      { name: 'fan',      type: 'actuator', supportsIntensity: true,  supportsColor: false, unit: null },
      { name: 'window',   type: 'actuator', supportsIntensity: true,  supportsColor: false, unit: null },
      // sensors
      { name: 'temperature', type: 'sensor',   supportsIntensity: false, supportsColor: false, unit: '°C' },
      { name: 'humidity',  type: 'sensor',   supportsIntensity: false, supportsColor: false, unit: '%' },
      { name: 'ultrasonic', type: 'sensor',   supportsIntensity: false, supportsColor: false, unit: '%' },
      { name: 'light', type: 'sensor',   supportsIntensity: false, supportsColor: false, unit: 'lxl' },
      { name: 'soil moisture', type: 'sensor',   supportsIntensity: false, supportsColor: false, unit: '%' },
    ]
  });
  console.log('Subtypes seeded');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());