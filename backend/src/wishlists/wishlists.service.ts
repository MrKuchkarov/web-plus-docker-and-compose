import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistEntity } from './entities/wishlist.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { WishEntity } from '../wishes/entities/wish.entity';
import { WishesService } from '../wishes/wishes.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UserEntity } from '../users/entities/user.entity';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(WishlistEntity)
    private wishlistRepository: Repository<WishlistEntity>,
    @InjectRepository(WishEntity)
    private wishRepository: Repository<WishEntity>,
    protected readonly wishesService: WishesService
  ) {}

  async createWishlist(userId: number, createWishlistDto: CreateWishlistDto) {
    const { itemsId, ...rest } = createWishlistDto;
    const items = itemsId?.map(id => ({ id }));
    const wishList = this.wishlistRepository.create({
      ...rest,
      items: items,
      owner: { id: userId },
    });
    return this.wishlistRepository.save(wishList);
  }

  findMany(query: FindManyOptions<WishlistEntity>) {
    return this.wishlistRepository.find(query);
  }

  async findOne(
    query: FindOneOptions<WishlistEntity>
  ): Promise<WishlistEntity> {
    return this.wishlistRepository.findOne(query);
  }

  async getAllWishlists() {
    const wishLists = await this.findMany({
      relations: { owner: true, items: true },
    });

    wishLists.forEach(wishList => {
      delete wishList.owner.password;
      delete wishList.owner.email;
    });

    return wishLists;
  }

  async findOneById(id: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        items: true,
      },
    });
    if (!wishlist) {
      throw new NotFoundException(
        'Такого списка желаний, скорее всего, не существует'
      );
    }

    return wishlist;
  }
  async update(
    user: UserEntity,
    id: number,
    updateWishlistDto: UpdateWishlistDto
  ) {
    const wishlist = await this.findOneById(id);
    if (!wishlist) {
      throw new NotFoundException(
        'Такого списка желаний, скорее всего, не существует'
      );
    } else if (wishlist.owner.id !== user.id) {
      throw new ForbiddenException('Вы не можете редактировать чужую запись');
    }
    const wishes = await this.wishesService.findWishlist(
      updateWishlistDto.itemsId
    );
    const { name, image } = updateWishlistDto;
    return await this.wishlistRepository.save({
      ...wishlist,
      name,
      image,
      itemsId: wishes,
    });
  }
  async remove(user: UserEntity, id: number) {
    const wishlist = await this.findOneById(id);
    if (!wishlist) {
      throw new NotFoundException(
        'Такого списка желаний, скорее всего, не существует'
      );
    } else if (wishlist.owner.id !== user.id) {
      throw new ForbiddenException('Вы не можете редактировать чужую запись');
    }

    return await this.wishlistRepository.delete(id);
  }
}
