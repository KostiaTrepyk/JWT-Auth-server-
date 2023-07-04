import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RoleEnum } from 'types/role.enum';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './role.guard';

export const ROLES_KEY = 'roles';
export function AuthGuard(roles: keyof typeof RoleEnum) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
