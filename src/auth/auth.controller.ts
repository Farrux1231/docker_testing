import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshGuard } from 'src/guards/refresh.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { registerAuthDto } from './dto/register.dto';
import { loginAuthDto } from './dto/login.dto.';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerAuthDto: registerAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('verify')
  verify(@Body()data:VerifyAuthDto){
    return this.authService.verifyProfil(data)
  }

  @Post('login')
  login(@Body() loginAuthDto: loginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @UseGuards(RefreshGuard)
  @Post('refresh-token')
  refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req);
  }

}
