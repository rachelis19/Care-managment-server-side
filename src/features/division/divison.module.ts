import { Module } from '@nestjs/common'
import httpLocationIqInstance from 'src/core/config/httpLocationIqInstance'
import { LocationIqModule } from '../locationIq/locationIq.module'
import { LocationIqService } from '../locationIq/locationIq.service'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { DivisonController } from './divison.controller'
import { DivisonService } from './divison.service'


@Module({
    imports: [UserModule,
              LocationIqModule],

    providers:[UserService,
               DivisonService, 
               LocationIqService,
               httpLocationIqInstance],

    controllers: [DivisonController]
})
export class DivisonModule{}