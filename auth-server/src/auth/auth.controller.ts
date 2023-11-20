// src/auth/auth.controller.ts

import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  async listUsers() {
    return this.authService.listUsers();
  }

  @Post('signup')
  async signUp(@Request() req) {
    const { username, password } = req.body;
    return this.authService.signUp(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }
}