import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecipientDto {
    
  @IsEmail()
  email: string

  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  phoneNumber: string

  @IsNotEmpty()
    address: {
        city: string,
        street: string,
        numOfBuilding: number,
        lat: number,
        lon: number
    }
  
}