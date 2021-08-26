import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import keys from '../../core/config/keys'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      ignoreExpiration: true,
      secretOrKey: keys.jwtSecret,
    })
  }

  async validate(payload: any) {
    return { exp: payload.exp, email: payload.username }
  }
}