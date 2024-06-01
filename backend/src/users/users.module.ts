import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { WishEntity } from '../wishes/entities/wish.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { WishesService } from '../wishes/wishes.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WishEntity])],
  controllers: [UsersController],
  providers: [UsersService, WishesService],
})
export class UsersModule {}
