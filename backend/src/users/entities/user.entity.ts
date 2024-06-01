import { EntityDefault } from '../../utils/utils.entities';
import { Column, Entity, OneToMany } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { OfferEntity } from '../../offers/entities/offer.entity';
import { WishlistEntity } from '../../wishlists/entities/wishlist.entity';
import { WishEntity } from '../../wishes/entities/wish.entity';

@Entity({ name: 'user' })
export class UserEntity extends EntityDefault {
  @Column()
  @IsString()
  @MinLength(2, {
    message: 'Необходимо минимум 2 символа',
  })
  @MaxLength(30, {
    message: 'Необходимо максимум 30 символов',
  })
  @IsNotEmpty()
  username: string;

  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @IsString()
  @MinLength(2, {
    message: 'Необходимо минимум 2 символа',
  })
  @MaxLength(200, {
    message: 'Необходимо максимум 200 символов',
  })
  @IsNotEmpty()
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @OneToMany(() => WishEntity, wish => wish.owner)
  wishes: WishEntity[];

  @OneToMany(() => WishlistEntity, wishlist => wishlist.owner)
  wishlists: WishlistEntity[];

  @OneToMany(() => OfferEntity, offer => offer.user)
  offers: OfferEntity[];
}
