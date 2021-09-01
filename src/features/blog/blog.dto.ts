import { IsEmail, IsNotEmpty } from "class-validator";

export class BlogDto{

    @IsNotEmpty()
    @IsEmail()
    adminEmail: string
    
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    body: string

}