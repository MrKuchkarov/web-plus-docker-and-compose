import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @MinLength(2, {
    message: 'Необходимо минимум 2 символа',
  })
  @MaxLength(30, {
    message: 'Необходимо максимум 30 символов',
  })
  username: string;

  @IsOptional()
  @IsString()
  @MinLength(2, {
    message: 'Необходимо минимум 2 символа',
  })
  @MaxLength(30, {
    message: 'Необходимо максимум 30 символов',
  })
  about: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
}
