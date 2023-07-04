import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'guards/local-auth.guard';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SignUpDto } from './dto/signUpDto';
import { SignInDto } from './dto/signInDto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /* Swagger */
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'The User has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  /* Logic */
  @Post('signUp')
  async signUp(@Body() dto: SignUpDto): Promise<void> {
    const res = await this.authService.signUp(dto);
    const accessToken = await this.authService.createAccessToken(res);
    throw new HttpException(accessToken, HttpStatus.CREATED);
  }

  /* Swagger */
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ description: 'Ok.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  /* Logic */
  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async signIn(@Request() req): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.createAccessToken(req.user);
    throw new HttpException(accessToken, HttpStatus.OK);
  }

  /* Swagger */
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Ok.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  /* Logic */
  @UseGuards(JwtAuthGuard)
  @Post('checkToken')
  async checkToken(@Request() req): Promise<void> {
    throw new HttpException(req.user, HttpStatus.OK);
  }
}
