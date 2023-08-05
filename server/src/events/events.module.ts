import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { SensorService } from '../sensor.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [EventsGateway, SensorService, PrismaService],
})
export class EventsModule {}
