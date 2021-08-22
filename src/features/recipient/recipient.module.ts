import { MongooseModule } from '@nestjs/mongoose'
import { Recipient, RecipientSchema } from './recipient.schema'
import { Module } from '@nestjs/common'
import { RecipientController } from './recipient.controller'
import { RecipientService } from './recipient.service'


@Module({
    imports: [MongooseModule.forFeature([{name: Recipient.name, schema: RecipientSchema}])],
    controllers: [RecipientController],
    providers: [RecipientService],
    exports: [RecipientService]
})
export class RecipientModule{}