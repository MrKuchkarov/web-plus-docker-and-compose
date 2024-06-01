import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }
}
