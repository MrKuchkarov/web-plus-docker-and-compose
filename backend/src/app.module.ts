import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { WishEntity } from './wishes/entities/wish.entity';
import { OfferEntity } from './offers/entities/offer.entity';
import { WishlistEntity } from './wishlists/entities/wishlist.entity';
import config from './config/config';
import 'dotenv/config';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wisher.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().db.host,
      username: config().db.username,
      password: config().db.password,
      database: config().db.name,
      entities: [UserEntity, WishEntity, WishlistEntity, OfferEntity],
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({
      envFilePath: ['.env.testing', '.env.development', '.env'],
    }),
    WinstonModule.forRoot({
      levels: {
        critical_error: 0,
        error: 1,
        special_warning: 2,
        another_log_level: 3,
        info: 4,
      },
      transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
    }),
    forwardRef(() => AuthModule),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
  ],
  providers: [],
})
export class AppModule {}
