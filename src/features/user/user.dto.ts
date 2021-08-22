import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { UserType } from '../../core/constns/enums';

export class UserDto {
    
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  phoneNumber: string
 
  @IsNotEmpty()
  @IsEnum(UserType)
   userType: UserType

  @IsNotEmpty()
    address: {
        city: string,
        street: string,
        numOfBuilding: number
    }

}