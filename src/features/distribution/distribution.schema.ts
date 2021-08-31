import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { PkgType } from 'src/core/config/enums'
import { Document } from 'mongoose'
import { v4 as uuid } from 'uuid'

export type DistributionDocument = Distribution & Document

export class Package{
    content: PkgType
    recipientEmail: string
}

@Schema()
export class Distribution{
    
    @Prop({default: uuid()})
    _id: string

    @Prop({required: true})
    volunteerEmail: string

    @Prop({required: true})
    recipientEmail: string
     
    @Prop({required: true})
    adminEmail: string

    @Prop({default: false})
    isDelivered: boolean

    @Prop({type: [{content: {type:PkgType}, recipientEmail: {type:String}}], 
                  required: true})         
    packages: {content: PkgType, recipientEmail: String}[]

    @Prop()
    date: string

    @Prop({type: Object, required: true })
    address: {
        city: string,
        street: string,
        numOfBuilding: number,
        lat: number,
        lon: number
    }


}

export const DistributionSchema = SchemaFactory.createForClass(Distribution)