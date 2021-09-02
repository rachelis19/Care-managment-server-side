import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { ChatService } from './chat.service'
  import { Server } from 'socket.io';

  @WebSocketGateway({ cors: true })
  export class ChatGateway {
    constructor(private chatService: ChatService) {}

    @WebSocketServer() server: Server
  
    @SubscribeMessage('Message')
    async handleNewMessage(@MessageBody() message: string) {
      console.log(message);
      
      this.server.emit('Message', message)
    }
  }