import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { Chat, ChatSchema } from './chat.schema'
import { ChatService } from './chat.service'
import { ChatGateway } from './chat.gateway'


@Module({
    imports: [MongooseModule.forFeature([{name: Chat.name, schema: ChatSchema}])],
    providers: [ChatService, ChatGateway],
    exports: [ChatGateway, ChatService, MongooseModule.forFeature([{name: Chat.name, schema: ChatSchema}])]
})
export class ChatModule{}