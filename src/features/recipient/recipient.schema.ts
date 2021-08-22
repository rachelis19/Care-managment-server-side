import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type RecipientDocument = Recipient & Document

@Schema()
export class Recipient{

    @Prop({ required: true })
    firstName: string

    @Prop({ required: true })
    lastName: string

    @Prop({ required: true })
    phoneNumber: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({type: Object, required: true })
    address: {
        city: string,
        street: string,
        numOfBuilding: number
    }
}

export const RecipientSchema = SchemaFactory.createForClass(Recipient)