import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishEntity } from '../wishes/entities/wish.entity';
import { WishlistEntity } from './entities/wishlist.entity';
import { WishesModule } from '../wishes/wisher.module';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WishlistEntity, WishEntity]),
    WishesModule,
  ],
  controllers: [WishlistsController],
  providers: [WishlistsService],
  exports: [WishlistsService],
})
export class WishlistsModule {}
