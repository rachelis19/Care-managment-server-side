import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common'
import { RecipientService } from './recipient.service'
import { RecipientDto } from './recipient.dto'
import { Recipient } from './recipient.schema'
import { JwtAuthGuard } from '../auth/gurades/jwt.guard'

@UseGuards(JwtAuthGuard)
@Controller('api/recipient')
export class RecipientController{
    constructor(private recipientService: RecipientService){}

    @Post()
    public async create(@Body() recipient: RecipientDto): Promise<Recipient>{   
        return await this.recipientService.create(recipient)
    }

    @Get()
    public async findAll(): Promise<Recipient[]>{
        return this.recipientService.findAll()
    }

    // @Get('city/:city')
    // public async findByCity(@Param('city') city: string){
    //     return this.recipientService.findAll()
    // }

    @Get('/email/:email')
    public async find(@Param('email') email: string){
        return this.recipientService.find(email)
    }
}