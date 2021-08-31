import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/gurades/jwt.guard';
import { Distribution } from '../distribution/distribution.schema';
import { LocationIqDto } from '../locationIq/locationIq.dto';
import { DivisonDto } from './divison.dto';
import { DivisonService } from './divison.service';

@UseGuards(JwtAuthGuard)
@Controller('api/divison')
export class DivisonController{
    
    constructor(private divisonService: DivisonService){}

    @Post()
    public async create(@Body() divisonRequest: DivisonDto){
      return await this.divisonService.distributions(divisonRequest)
    }
    
    @Post('volunteer')
    public async find(@Body() address: any){
       return await this.divisonService.findClosestVolunteer(address)
    }
}