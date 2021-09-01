import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { Chat, ChatSchema } from './chat.schema'
import { ChatService } from './chat.service'
import { ChatGateway } from 'src/chat.gateway'


@Module({
    imports: [MongooseModule.forFeature([{name: Chat.name, schema: ChatSchema}])],
    providers: [ChatService, ChatGateway]
})
export class ChatModule{}