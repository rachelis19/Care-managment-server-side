import { Body, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/gurades/jwt.guard";
import { BlogDto } from "./blog.dto";
import { BlogService } from "./blog.service";

//@UseGuards(JwtAuthGuard)
@Controller('api/blog')
export class BlogController{

    constructor(private blogService: BlogService){}
   
    @Post()
    public async create(@Body() blog: BlogDto){
       return await this.blogService.create(blog)
    }

    @Get('admin/:email')
    public async find(@Param('email') email: string){
        return await this.blogService.blog(email)
    }
}