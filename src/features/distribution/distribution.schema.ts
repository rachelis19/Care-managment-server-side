import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { PkgType } from 'src/core/config/enums'
import { Document } from 'mongoose'
import { v4 as uuid } from 'uuid'

export type DistributionDocument = Distribution & Document

@Schema()
export class Distribution{
    
    @Prop({default: uuid()})
    id: string

    @Prop({required: true})
    volunteerEmail: string

    @Prop({required: true})
    recipientEmail: string
     
    @Prop({required: true})
    adminEmail: string

    @Prop({required: true})
    recipientPhone: string

    @Prop({default: false})
    isDelivered: boolean

    @Prop({type: [String], 
           enum: Object.values(PkgType), 
          required: true})         
    package

    @Prop({default: new Date().toLocaleString()})
    date: string

    @Prop({type: Object, required: true })
    address: {
        city: string,
        street: string,
        numOfBuilding: number
    }


}

export const DistributionSchema = SchemaFactory.createForClass(Distribution)