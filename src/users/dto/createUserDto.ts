import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Igor' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @IsAlpha()
  name: string;

  @ApiProperty({ example: 'igor@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'igor123' })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  @IsAlphanumeric()
  password: string;
}
