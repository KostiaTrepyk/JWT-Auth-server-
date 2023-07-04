import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEnum } from 'types/role.enum';

type Role = keyof typeof RoleEnum;
@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryColumn({ default: 'USER' })
  name: Role;

  @Column({ default: 1 })
  value: number;

  @OneToMany(() => UserEntity, (user) => user.role)
  user: UserEntity;
}
