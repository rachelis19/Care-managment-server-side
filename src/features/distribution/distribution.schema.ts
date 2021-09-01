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
    
    @Prop({required: true})
    volunteerEmail: string

    @Prop({required: true})
    adminEmail: string

    @Prop({default: false})
    isDelivered: boolean

    @Prop({type: [{content: {type:PkgType}, recipientEmail: {type:String}}], 
                  required: true})         
    packages: {content: PkgType, recipientEmail: String}[]

    @Prop()
    date: string

}

export const DistributionSchema = SchemaFactory.createForClass(Distribution)