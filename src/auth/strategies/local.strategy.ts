import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';
import { ITokenData } from 'types/ITokenData';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<ITokenData> {
    const user: ITokenData = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async validateUser(email: string, password: string): Promise<ITokenData> {
    const user = await this.usersService.findOne(email);
    if (!user)
      throw new HttpException(
        `User with email: '${email}' does not exist!`,
        HttpStatus.BAD_REQUEST,
      );

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
