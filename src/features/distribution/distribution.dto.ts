import { IsEnum, IsNotEmpty } from "class-validator"
import { PkgType } from "src/core/config/enums"

export class DistributionDto{

    //default false
    isDelivered: boolean

    @IsNotEmpty()
    volunteerEmail: string

    @IsNotEmpty()
    recipientEmail: string
     
    @IsNotEmpty()
    adminEmail: string

    @IsNotEmpty()
    recipientPhone: string

    @IsNotEmpty()
    @IsEnum(PkgType, {each: true})
    package: PkgType[]

    @IsNotEmpty()
    address: {
        city: string,
        street: string,
        numOfBuilding: number
    }

}