import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto/auth.dto';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

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
  login(@Body() dto: AuthDto, @Req() req): Promise<any> {
    return this.authService.login(dto);
  }
}
