import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('roles')
@Controller('/roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  /* Swagger */
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Ok.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  /* Logic */
  @UseGuards(JwtAuthGuard)
  @Get()
  async get(): Promise<string> {
    throw new HttpException('Ok!', HttpStatus.OK);
  }
}
