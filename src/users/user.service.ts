import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { RolesService } from 'src/roles/roles.service';
import { ITokenData } from 'types/ITokenData';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private rolesService: RolesService,
  ) {}

  async getAllRoute(
    page: number,
    limit: number = 10,
  ): Promise<{ users: UserEntity[]; lastPage: boolean; count: number }> {
    if (page < 0)
      throw new HttpException('Page is not valid!', HttpStatus.BAD_REQUEST);
    if (limit <= 0)
      throw new HttpException('Limit is not valid!', HttpStatus.BAD_REQUEST);

    const [users, count] = await this.userRepository.findAndCount({
      order: { name: 'ASC' },
      skip: page * limit,
      take: limit,
      relations: {
        role: true,
      },
    });

    const isLastPage = Math.ceil(count / limit) <= page + 1;

    return { users: users, lastPage: isLastPage, count };
  }

  async getOneRoute(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: { role: true },
    });
  }

  async createUser(dto: CreateUserDto): Promise<ITokenData> {
    const exists = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if (exists)
      throw new HttpException(
        `User with email: '${dto.email}' exists!`,
        HttpStatus.NOT_ACCEPTABLE,
      );

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const role = await this.rolesService.findOne('USER');

    const newUser = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: role,
    });

    try {
      const user = await this.userRepository.save(newUser);
      const { password, ...rest } = user;
      return rest;
    } catch (error) {
      throw new HttpException(
        'Server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      relations: {
        role: true,
      },
    });
  }
}
