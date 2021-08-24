import { Module } from '@nestjs/common'
import httpLocationIqInstance from 'src/core/config/httpLocationIqInstance'
import { AddressModule } from '../address/address.module'
import { AddressService } from '../address/address.service'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { DivisonController } from './divison.controller'
import { DivisonService } from './divison.service'


@Module({
    imports: [UserModule,
              AddressModule],

    providers:[UserService,
               DivisonService, 
               AddressService,
               httpLocationIqInstance],

    controllers: [DivisonController]
})
export class DivisonModule{}