import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'

export type ChatDocument = Chat & Document

@Schema()
export class Chat{
    
    @Prop({required: true})
    message: string

    @Prop({required: true})
    sender: string

    @Prop({required: true})
    recipient: string
}


export const ChatSchema = SchemaFactory.createForClass(Chat)