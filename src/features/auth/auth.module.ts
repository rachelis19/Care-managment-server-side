import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { LocalStrategy } from './auth-local.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import keys from '../../core/config/keys'
import { JwtStrategy } from './auth-jwt.strategy'

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: keys.jwtSecret,
      signOptions: { expiresIn: '60h'},
    }),
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})

export class AuthModule {}
