import {Module } from '@nestjs/common'
import { AddressService } from './address.service'
import httpLocationIqInstance from '../../core/config/httpLocationIqInstance'

@Module({
   providers: [AddressService, httpLocationIqInstance],
   exports: [AddressService]
})
export class AddressModule{}