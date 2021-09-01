import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BlogDto } from "./blog.dto";
import { Blog, BlogDocument } from "./blog.schema";


@Injectable()
export class BlogService{

    constructor(@InjectModel(Blog.name) private blogModle: Model<BlogDocument>){}

    public async create(blog: BlogDto){
        const createdBlog =  new this.blogModle(blog)
        return await createdBlog.save()
    }


    public async blog(adminEmail: string){
        return await this.blogModle.find({adminEmail})
    }
}