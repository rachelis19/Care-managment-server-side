import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { UserType } from 'src/core/config/enums'


@Injectable()
export class AuthService {
  constructor(private userService: UserService, 
              private jwtService: JwtService) {}

  public async validateUser(username: string, type: UserType, password: string): Promise<any> {
    const user = await this.userService.find(username, type)

    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }
}