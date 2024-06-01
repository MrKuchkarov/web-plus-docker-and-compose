import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { WishEntity } from '../wishes/entities/wish.entity';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { WishesService } from '../wishes/wishes.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import config from '../config/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, WishEntity]),
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: config().secretKey,
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
    UsersService,
    WishesService,
  ],
})
export class AuthModule {}
