import { Module } from '@nestjs/common'
import httpLocationIqInstance from 'src/core/config/httpLocationIqInstance'
import { LocationIqModule } from '../locationIq/locationIq.module'
import { LocationIqService } from '../locationIq/locationIq.service'
import { RecipientModule } from '../recipient/recipient.module'
import { RecipientService } from '../recipient/recipient.service'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { DivisonController } from './divison.controller'
import { DivisonService } from './divison.service'


@Module({
    imports: [UserModule,
             RecipientModule,
             LocationIqModule],

    providers:[UserService,
               RecipientService,
               DivisonService, 
               LocationIqService,
               httpLocationIqInstance],

    controllers: [DivisonController]
})
export class DivisonModule{}