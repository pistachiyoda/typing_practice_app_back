import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto/auth.dto';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  // Promiseの型あとで修正
  signUp(@Body() dto: AuthDto): Promise<any> {
    return this.authService.signUp(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // Promiseの型あとで修正
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const jwt = await this.authService.login(dto);
    res.cookie('jwt_token', jwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return 'success';
  }
}
