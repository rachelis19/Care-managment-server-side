import {Module } from '@nestjs/common'
import { LocationIqService } from './locationIq.service'
import httpLocationIqInstance from '../../core/config/httpLocationIqInstance'

@Module({
   providers: [LocationIqService, httpLocationIqInstance],
   exports: [LocationIqService]
})
export class LocationIqModule{}