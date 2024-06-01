import { InjectRepository } from '@nestjs/typeorm';
import { WishEntity } from './entities/wish.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateWishDto } from './dto/update-wish.dto';

export class WishesService {
  constructor(
    @InjectRepository(WishEntity)
    private wishRepository: Repository<WishEntity>
  ) {}

  async createWish(user: UserEntity, createWishDto: CreateWishDto) {
    const newWish = this.wishRepository.create({
      ...createWishDto,
      owner: user,
      raised: 0,
    });
    return this.wishRepository.save(newWish);
  }

  findManyWishes(query: FindManyOptions<WishEntity>) {
    return this.wishRepository.find(query);
  }

  findAll() {
    return this.wishRepository.find();
  }

  findWishById(id: number) {
    const requestedWish = this.wishRepository.findOne({
      where: { id: id },
      relations: { owner: true, offers: true },
    });
    if (!requestedWish) {
      throw new NotFoundException('Такого пожелания не существует');
    }
    return requestedWish;
  }

  async findLastWishes() {
    return this.wishRepository.find({
      order: { createdAt: 'desc' },
      take: 40,
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  async findTopWishes() {
    return this.wishRepository.find({
      order: { copied: 'desc' },
      take: 20,
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  async copyWish(id: number, user: UserEntity) {
    const requestedWish = await this.findWishById(id);
    if (!requestedWish) {
      throw new NotFoundException('Такого желания не существует');
    }
    if (user.id === requestedWish.owner.id)
      throw new ForbiddenException('Нельзя cкопировать свои желания');

    const { copied } = requestedWish;
    await this.wishRepository.update(id, { copied: copied + 1 });
    await this.createWish(user, { ...requestedWish, raised: 0 });
  }

  async update(id: number, userId: number, updateWishDto: UpdateWishDto) {
    const requiredWish = await this.findWishById(id);
    if (!requiredWish) {
      throw new NotFoundException('Такого желания не существует');
    } else if (requiredWish.owner.id !== userId) {
      throw new UnauthorizedException('Вы не можете изменять чужое желание');
    }
    if (requiredWish.raised !== 0) {
      throw new ForbiddenException(
        'Нельзя менять стоимость подарка, если уже есть желающие его поддержать'
      );
    }
    return this.wishRepository.update(id, updateWishDto);
  }

  async remove(id: number, user: UserEntity) {
    const requiredWish = await this.findWishById(id);
    if (!requiredWish) {
      throw new NotFoundException('Такого желания не существует');
    } else if (requiredWish.owner.id !== user.id) {
      throw new UnauthorizedException('Нельзя удалять чужое желание');
    }
    return this.wishRepository.delete(id);
  }

  async findWishlist(list: any): Promise<WishEntity[]> {
    return await this.wishRepository.findBy(list);
  }

  public findWishesById(id: number) {
    return this.wishRepository.find({
      where: { owner: { id: id } },
    });
  }
}
