import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
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
