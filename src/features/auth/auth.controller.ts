import { Controller, Post, UseGuards, Body } from '@nestjs/common'
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './gurades/local.guard';

@Controller('api/auth')
export class AuthController {

  constructor(private authService: AuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body) {
    return await this.authService.login(body)
  }
}