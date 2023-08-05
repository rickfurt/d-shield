import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { SensorService } from './sensor.service';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [SensorService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return a list of sensors"', async () => {
    const result = await appController.getSensors();
    expect(result.length).toBeGreaterThanOrEqual(7);
    expect(result[0]).toEqual({
      name: 'Drone Gun Tactical',
      serial_number: 'DRNGNT4TIC',
      firmware_version: '1.1.1',
      status: 'ONLINE',
    });
  });

  it('should add a new drone to the list of drones"', async () => {
    const newDrone: Prisma.SensorCreateInput = {
      name: 'Drone Gun Tactical XL',
      serial_number: 'DRNGNT4TICXL',
      firmware_version: '1.5.1',
      status: 'OFFLINE',
    };
    await appController.createSensor(newDrone);
    const result = await appController.getSensors();
    expect(result[result.length - 1]).toEqual(newDrone);
  });
  it('Does not add a new drone with the same serial number', async () => {
    const newDrone: Prisma.SensorCreateInput = {
      name: 'Drone Gun Tactical XL',
      serial_number: 'DRNGNT4TICXL',
      firmware_version: '1.5.1',
      status: 'OFFLINE',
    };
    await appController.createSensor(newDrone);
    const result = await appController.getSensors();
    expect(result[result.length - 1]).toEqual(newDrone);
  });

  it.todo('delete a drone by serial number ');
  it.todo('update a drone by serial number ');
});
