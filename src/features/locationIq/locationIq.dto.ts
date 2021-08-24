import { IsNotEmpty } from 'class-validator'

export class LocationIqDto{
  
    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    street: string

    @IsNotEmpty()
    numOfBuilding: number

}