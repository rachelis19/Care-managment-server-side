import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type BlogDocument = Blog & Document
@Schema()
export class Blog{

    @Prop({required: true})
    title: string

    @Prop({required: true})
    body: string
    
    @Prop({required: true})
    adminEmail: string

}

export const BlogSchema = SchemaFactory.createForClass(Blog)