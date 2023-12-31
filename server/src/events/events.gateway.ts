import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { SensorService } from '../sensor.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly sensorService: SensorService) {}

  @WebSocketServer()
  server: Server;

  // This method will be executed when the WebSocket server is initialized
  afterInit() {
    console.log('WebSocket server initialized');
  }
  // This method will be executed when a new client connects to the WebSocket server
  handleConnection(client: any) {
    this.server.emit('testing', { do: 'stuff' });
    console.log(`Client connected: ${client.id}`);
  }

  // This method will be executed when a client disconnects from the WebSocket server
  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('onMessage')
  async handleMessage(): Promise<any> {
    const data = await this.sensorService.sensors();
    this.server.emit('message', data);
    return data;
  }
}
