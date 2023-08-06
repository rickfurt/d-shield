import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors();
  await app.listen(3001);
}

bootstrap();
