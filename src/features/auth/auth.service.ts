import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/core/config/enums';
import { UserService } from '../user/user.service'
import * as  bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

  logger = new Logger(AuthService.name)

  constructor(private usersService: UserService,
              private jwtService: JwtService) {}

  public async validateUser(email: string, password: string): Promise<any> {
    this.logger.log(`Recivied request authentication with ${email} email`)

    const user = await this.usersService.find(email)
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  public async login(user: any) {
    this.logger.log('User is successfully authenticated')

    const payload = { username: user.email, sub: user.password }

    return {
      access_token: this.jwtService.sign(payload),
    }

  }
}

  