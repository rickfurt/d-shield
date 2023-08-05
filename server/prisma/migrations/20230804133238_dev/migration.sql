-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateTable
CREATE TABLE "Sensor" (
    "serial_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firmware_version" TEXT NOT NULL,
    "status" "Status" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Sensor_serial_number_key" ON "Sensor"("serial_number");
