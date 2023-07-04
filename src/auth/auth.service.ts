import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { JwtService } from '@nestjs/jwt';
import { ITokenData } from 'types/ITokenData';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createAccessToken(user: ITokenData): Promise<{ accessToken: string }> {
    return { accessToken: this.jwtService.sign(user) };
  }

  async signUp(dto: CreateUserDto): Promise<ITokenData> {
    return await this.usersService.createUser(dto);
  }
}
