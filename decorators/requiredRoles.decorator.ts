import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'types/role.enum';

export const ROLES_KEY = 'roles';
export const RequiredRoles = (role: keyof typeof RoleEnum) => SetMetadata(ROLES_KEY, role);
