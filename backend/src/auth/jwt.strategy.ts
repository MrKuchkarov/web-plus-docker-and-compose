import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import config from '../config/config';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config().secretKey,
      ignoreExpiration: false,
    });
  }
  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException(
        'Для получения этой информации нужно авторизоваться'
      );
    }
    return { id: payload.sub, username: payload.username };
  }
}
