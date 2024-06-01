import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  login(user: UserEntity) {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload, { expiresIn: '7d' }) };
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    let ifValuesMatched = false;
    await bcrypt.compare(password, user.password).then(isAMatch => {
      if (!isAMatch) return null;
      ifValuesMatched = true;
    });

    if (user && ifValuesMatched) {
      const { ...res } = user;
      return res;
    }
  }

  async signup(createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
}
