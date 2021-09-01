import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chat, ChatDocument } from "./chat.schema";


@Injectable()
export class ChatService{
    
    private readonly logger = new Logger(ChatService.name)
    constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>){}

    public async getChats(): Promise<Chat[]>{
      return await this.chatModel.find()
    }

    public async saveChat(chat: Chat): Promise<Chat>{
        const createdChat = new this.chatModel(chat)
        return await createdChat.save()
    }
}