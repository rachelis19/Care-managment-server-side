import { Body, Controller, Post } from '@nestjs/common'
import { Distribution } from '../distribution/distribution.schema';
import { DivisonService } from './divison.service';

@Controller('api/divison')
export class DivisonController{
    
    constructor(private divisonService: DivisonService){}

    @Post()
    public async create(@Body() distributons: Distribution[]){
       return this.divisonService.packages(distributons)
    }
}