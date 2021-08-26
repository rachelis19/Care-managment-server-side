import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { DistributionDto } from './distribution.dto'
import { Distribution } from './distribution.schema'
import { DistributionService } from './distribution.service'

@Controller('api/distribution')
export class DistributionController{
    constructor(private distributionService: DistributionService){}

    @Post()
    public async create(@Body() distribution: DistributionDto): Promise<Distribution>{   
        return await this.distributionService.create(distribution)
    }

    @Get()
    public async findAll(): Promise<Distribution[]>{
        return await this.distributionService.findAll()
    }

    @Get('/id/:id')
    public async find(@Param('id') id: string){
        return await this.distributionService.find(id)
    }

    @Put('id/:id')
    public async update(@Param('id') id: string, @Body() distribution){
        return await this.distributionService.update(id, distribution)
    }
}