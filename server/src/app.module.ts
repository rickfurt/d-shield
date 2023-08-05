import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SensorService } from './sensor.service';
import { PrismaService } from './prisma.service';
import { EventsModule } from './events/events.module';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [EventsModule],
  controllers: [AppController],
  providers: [SensorService, PrismaService, EventsGateway],
})
export class AppModule {}
