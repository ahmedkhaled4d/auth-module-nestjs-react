// src/auth/auth.controller.ts

import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { SignInUserDto } from './dtos/singin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  async listUsers() {
    return this.authService.listUsers();
  }

  @Post('signup')
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @Post('signin')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.validateUser(signInUserDto);
  }

  @UseGuards(LocalAuthGuard)
  async profile(@Request() req) {
    return this.authService.signIn(req.user);
  }
}
