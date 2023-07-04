import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'entities/role.entity';
import { Repository } from 'typeorm';
import { RoleEnum } from 'types/role.enum';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  findOne(roleName: keyof typeof RoleEnum): Promise<RoleEntity> {
    return this.roleRepository.findOne({ where: { name: roleName } });
  }
}
