import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { UserType } from '../../core/config/enums'

export type UserDocument = User & Document

@Schema()
export class User{

    @Prop({ required: true })
    firstName: string

    @Prop({ required: true })
    lastName: string

    @Prop({ required: true })
    phoneNumber: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({type: Object, required: true })
    address: {
        city: string,
        street: string,
        numOfBuilding: number,
        lon: number,
        lat: number
    }

    @Prop({type: UserType})
    userType
}

export const UserSchema = SchemaFactory.createForClass(User)

