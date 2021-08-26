import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common'
import { UserService } from './user.service';
import { UserDto } from './user.dto'
import { User } from './user.schema'
import { UserType } from 'src/core/config/enums'
import { JwtAuthGuard } from '../auth/gurades/jwt.guard';

@Controller('api/user')
export class UserController{
    constructor(private userService: UserService){}

    @Post('/register')
    public async create(@Body() user: UserDto): Promise<User>{   
        return await this.userService.create(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/volunteers')
    public async findAllVolunteers(): Promise<User[]> {
        return this.userService.findAll({userType: UserType.Volunteer})
    }
    @UseGuards(JwtAuthGuard)
    @Get('/admins')
    public async findAllAdmins(): Promise<User[]> {
        return this.userService.findAll({userType: UserType.Admin})
    }

    @UseGuards(JwtAuthGuard)
    @Get('/email/:email')
    public async findAdmin(@Param('email') email: string): Promise<User> {
        return await this.userService.find(email)
    }

}