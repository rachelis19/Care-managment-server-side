import { IsNotEmpty } from "class-validator";

export class AddressDto{
  
    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    street: string

    @IsNotEmpty()
    numOfBuilding: number

}