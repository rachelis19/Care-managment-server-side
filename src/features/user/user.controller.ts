import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'
import { UserService } from './user.service';
import { UserDto } from './user.dto'
import { User } from './user.schema'
import { UserType } from 'src/core/config/enums'

@Controller('api/user')
export class UserController{
    constructor(private userService: UserService){}

    @Post()
    public async create(@Body() user: UserDto): Promise<User>{   
        return await this.userService.create(user)
    }

    @Get('/volunteers')
    public async findAllVolunteers(): Promise<User[]> {
        return this.userService.findAll({userType: UserType.Volunteer})
    }

    @Get('/admins')
    public async findAllAdmins(): Promise<User[]> {
        return this.userService.findAll({userType: UserType.Admin})
    }

    @Get('/admin/email/:email')
    public async findAdmin(@Param('email') email: string): Promise<User> {
        return await this.userService.find(email, UserType.Admin)
    }

    @Get('/volunteer/email/:email')
    public async findVolunteer(@Param('email') email: string): Promise<User>{
        return await this.userService.find(email, UserType.Volunteer)
    }
}