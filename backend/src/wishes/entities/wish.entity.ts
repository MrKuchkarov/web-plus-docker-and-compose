import { EntityDefault } from '../../utils/utils.entities';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserEntity } from '../../users/entities/user.entity';
import { OfferEntity } from '../../offers/entities/offer.entity';

@Entity({ name: 'wish' })
export class WishEntity extends EntityDefault {
  @Column()
  @IsString()
  @MinLength(2, {
    message: 'Необходимо минимум 2 символа',
  })
  @MaxLength(30, {
    message: 'Необходимо максимум 30 символов',
  })
  @IsNotEmpty()
  name: string;

  @Column()
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @Column()
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  raised: number;

  @Column()
  @IsString()
  @MinLength(1, {
    message: 'Необходим минимум 1 символ',
  })
  @MaxLength(1024, {
    message: 'Необходимо максимум 1024 символа',
  })
  description?: string;

  @Column({ default: 0 })
  copied: number;

  @ManyToOne(() => UserEntity, user => user.wishes)
  owner: UserEntity;

  @OneToMany(() => OfferEntity, offer => offer.item)
  offers: OfferEntity[];
}
