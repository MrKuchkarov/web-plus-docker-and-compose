import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { UpdateUserDto } from './dto/update-user.dto';
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  findMe(@Req() req: any) {
    return this.usersService.findOne(req.user.id);
  }

  @Get('me/wishes')
  findMysWishes(@Req() req: any) {
    return this.usersService.findUserWishes(req.user.id);
  }

  @Patch('/me')
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+req.user.id, updateUserDto);
  }
  @Get(':username')
  findUserByUsername(@Param('username') username: string) {
    return this.usersService.findUserByUsername(username);
  }

  @Get(':username/wishes')
  getOtherUserWishes(@Param('username') username: string) {
    return this.usersService.findWishesOfOthers(username);
  }

  @Post('find')
  findUsers(@Body('query') query: string) {
    return this.usersService.findUserByUserInfo(query);
  }
}
