import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RecipientModule } from '../recipient/recipient.module'
import { UserModule } from '../user/user.module'
import { DistributionController } from './distribution.controller'
import { Distribution, DistributionSchema } from './distribution.schema'
import { DistributionService } from './distribution.service'



@Module({
   imports:   [MongooseModule.forFeature([{name: Distribution.name, schema: DistributionSchema}]),
               UserModule,
               RecipientModule],
                 
   controllers: [DistributionController],
   providers:   [DistributionService]
})
export class DistributionModule{}