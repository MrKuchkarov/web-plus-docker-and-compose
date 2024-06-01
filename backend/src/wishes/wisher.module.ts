import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishEntity } from './entities/wish.entity';
import { OfferEntity } from '../offers/entities/offer.entity';
import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';

@Module({
  imports: [TypeOrmModule.forFeature([WishEntity, OfferEntity])],
  controllers: [WishesController],
  providers: [WishesService],
  exports: [WishesService],
})
export class WishesModule {}
