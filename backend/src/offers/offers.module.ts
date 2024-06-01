import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { OfferEntity } from './entities/offer.entity';
import { WishEntity } from '../wishes/entities/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfferEntity, WishEntity])],
  controllers: [OffersController],
  providers: [OffersService],
  exports: [OffersService],
})
export class OffersModule {}
