import { EntityDefault } from '../../utils/utils.entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsBoolean, IsNumber } from 'class-validator';
import { UserEntity } from '../../users/entities/user.entity';
import { WishEntity } from '../../wishes/entities/wish.entity';

@Entity({ name: 'offer' })
export class OfferEntity extends EntityDefault {
  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @Column({
    default: false,
  })
  @IsBoolean()
  hidden: boolean;

  @ManyToOne(() => UserEntity, user => user.offers)
  user: UserEntity;

  @ManyToOne(() => WishEntity, wish => wish.offers)
  item: WishEntity;
}
