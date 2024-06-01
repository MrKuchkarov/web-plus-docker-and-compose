import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, IsUrl, Length } from 'class-validator';
import { WishEntity } from '../../wishes/entities/wish.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'wishlist' })
export class WishlistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 250)
  @IsString()
  name: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => WishEntity)
  @JoinTable()
  items: WishEntity[];

  @ManyToOne(() => UserEntity, user => user.wishlists)
  owner: UserEntity;
}
