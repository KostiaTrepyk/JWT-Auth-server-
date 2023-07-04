import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from 'guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /* Swagger */
  @ApiBearerAuth()
  @ApiQuery({ name: 'limit', example: 10, required: true })
  @ApiQuery({ name: 'page', example: 0, required: true })
  @ApiOkResponse({ description: 'Ok.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  /* Logic */
  @AuthGuard('MODERATOR')
  @Get('getAll')
  async getAll(@Query() query: { page: number; limit: number }) {
    const res = await this.usersService.getAllRoute(query.page, query.limit);
    throw new HttpException(res, HttpStatus.OK);
  }

  /* Swagger */
  @ApiBearerAuth()
  @ApiQuery({ name: 'id', example: 30, required: true })
  @ApiOkResponse({ description: 'Ok.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  /* Logic */
  @AuthGuard('USER')
  @Get('getOne')
  async getOne(@Query() query: { id: number }) {
    const res = await this.usersService.getOneRoute(query.id);
    if (!res) throw new HttpException(res, HttpStatus.NOT_FOUND);
    throw new HttpException(res, HttpStatus.OK);
  }
}
