import { Logger } from '@nestjs/common';
import {MessageBody, 
        SubscribeMessage, 
        OnGatewayInit, 
        OnGatewayConnection,
        OnGatewayDisconnect,
        WebSocketGateway, 
        WebSocketServer } from '@nestjs/websockets'
import { Socket } from 'socket.io'

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  logger = new Logger(ChatGateway.name)

  afterInit(server: any) {
    this.logger.log('Initialized')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client with id ${client.id} has been disconnected`)
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client with id ${client.id} has been connected`)
  }
  
  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string): void {
    client.emit('message', )
  }

//   @SubscribeMessage('end-chat')
//   handleEndCHat(@MessageBody() message: string): void {
//     this.server.emit('end', message);
//   }
}