import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException('Для продолжения нужно авторизоваться');
    }
    return user;
  }
}
