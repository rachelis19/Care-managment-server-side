import { IsEnum, IsNotEmpty } from "class-validator"
import { PkgType } from "src/core/config/enums"
import { Package } from "./distribution.schema"

export class DistributionDto{

    //default false
    isDelivered: boolean

    @IsNotEmpty()
    volunteerEmail: string
     
    @IsNotEmpty()
    adminEmail: string

    @IsNotEmpty()
    packages: Package[]

}