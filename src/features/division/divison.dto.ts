import { IsNotEmpty } from "class-validator";
import { Package } from "../distribution/distribution.schema";

export class DivisonDto{

    @IsNotEmpty()
    packages: Package[]

    @IsNotEmpty()
    adminEmail: string

    @IsNotEmpty()
    date: string
    
}