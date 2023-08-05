import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.sensor.deleteMany();

  console.log('Seeding...');

  const sensors = await prisma.sensor.createMany({
    data: [{
      name: "Sensor 1X12",
      serial_number: "DRNGNT4TIC",
      firmware_version: "1.1.1",
      status: "ONLINE"
    }, {
      name: "Sensor 2VL2",
      serial_number: "RFP4TROL",
      firmware_version: "1.0.0",
      status: "OFFLINE"
    }, {
      name: "Sensor 4XX",
      serial_number: "DRNGNMK4",
      firmware_version: "1.4.1",
      status: "ONLINE"
    }, {
      name: "Sensor 11V2",
      serial_number: "DRNGNMK3",
      firmware_version: "1.1.1",
      status: "OFFLINE"
    }, {
      name: "Sensor Sentry X-12",
      serial_number: "DRNSNTRY",
      firmware_version: "2.1.1",
      status: "ONLINE"
    }, {
      name: "Sensor Mk 2.2",
      serial_number: "RF1MK2",
      firmware_version: "2.1.1",
      status: "ONLINE"
    }, {
      name: "Sensor 11MK22",
      serial_number: "DRNC4NMK2",
      firmware_version: "1.0.1",
      status: "ONLINE"
    }],
  });

  console.log({sensors});
}

main()
  .catch((e) => console.error(e))
  .then(async () => await prisma.$disconnect());