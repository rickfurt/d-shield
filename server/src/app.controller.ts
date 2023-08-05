import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { Sensor as SensorModel } from '@prisma/client';
import { EventsGateway } from './events/events.gateway';

@Controller()
export class AppController {
  constructor(
    private readonly sensorService: SensorService,
    private readonly eventsService: EventsGateway,
  ) {}

  @Get('sensor')
  async getSensors(): Promise<SensorModel[]> {
    return this.sensorService.sensors();
  }

  @Post('sensor')
  async createSensor(
    @Body()
    sensorData: {
      name: string;
      serial_number: string;
      firmware_version: string;
      status: 'OFFLINE' | 'ONLINE';
    },
  ): Promise<SensorModel> {
    return this.sensorService.createSensor(sensorData);
  }

  @Patch('sensor/:id')
  async updateSensor(@Param() params: { id: string }): Promise<SensorModel> {
    await this.sensorService.toggleSensor(params.id);
    return null;
  }
}
