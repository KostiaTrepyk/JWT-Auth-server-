import { RoleEntity } from 'entities/role.entity';

export interface ITokenData {
  id: number;
  name: string;
  email: string;
  role: RoleEntity;
}
