import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { JwtGuard } from '../auth/guard';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  getAllWishlists() {
    return this.wishlistsService.getAllWishlists();
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req: any, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.createWishlist(req.user.id, createWishlistDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.wishlistsService.findOneById(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateWishlistDto: UpdateWishlistDto
  ) {
    return this.wishlistsService.update(req.user, +id, updateWishlistDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.wishlistsService.remove(req.user, +id);
  }
}
