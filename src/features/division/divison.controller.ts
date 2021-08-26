import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Distribution } from '../distribution/distribution.schema';
import { DivisonService } from './divison.service';

@UseGuards(JwtAuthGuard)
@Controller('api/divison')
export class DivisonController{
    
    constructor(private divisonService: DivisonService){}

    @Post()
    public async create(@Body() distributons: Distribution[]){
       return await this.divisonService.packages(distributons)
    }
}