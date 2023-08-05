import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Sensor } from '@prisma/client';

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaService) {}

  async sensor(serial_number: string): Promise<Sensor> {
    return this.prisma.sensor.findUnique({
      where: {
        serial_number,
      },
    });
  }

  async sensors(): Promise<Sensor[]> {
    return this.prisma.sensor.findMany();
  }

  async createSensor(data: Prisma.SensorCreateInput): Promise<Sensor> {
    try {
      return await this.prisma.sensor.create({
        data,
      });
    } catch (e) {
      return { ...e, status: 'error' };
    }
  }

  async toggleSensor(id: string) {
    console.log('TOGGLE STATUS FOR SENSOR -> ', id);
    try {
      const sensorToUpdate = await this.prisma.sensor.findUnique({
        where: {
          serial_number: id,
        },
      });

      const newStatus: 'ONLINE' | 'OFFLINE' =
        sensorToUpdate?.status === 'ONLINE' ? 'OFFLINE' : 'ONLINE';

      return await this.prisma.sensor.update({
        where: {
          serial_number: id,
        },
        data: {
          status: newStatus,
        },
      });
    } catch (e) {
      return { ...e, status: 'error' };
    }
  }
}
