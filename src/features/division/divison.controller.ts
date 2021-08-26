import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/gurades/jwt.guard';
import { Distribution } from '../distribution/distribution.schema';
import { LocationIqDto } from '../locationIq/locationIq.dto';
import { DivisonService } from './divison.service';

@UseGuards(JwtAuthGuard)
@Controller('api/divison')
export class DivisonController{
    
    constructor(private divisonService: DivisonService){}

    @Post()
    public async create(@Body() distributons: Distribution[]){
       return await this.divisonService.packages(distributons)
    }
    
    @Post('volunteer')
    public async find(@Body() address: LocationIqDto){
       return await this.divisonService.findClosestVolunteer(address)
    }
}