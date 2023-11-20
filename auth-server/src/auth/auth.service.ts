// src/auth/auth.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashedPassword });
    return user.save();
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();

    if (user && (await bcrypt.compare(password, user.password))) {
      const result = user.toObject();
      delete result['password'];
      return result;
    }
    return null;
  }

  async signIn(user: User): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    this.logger.log(`User ${user.username} logged in`);
    return { accessToken };
  }

  async listUsers(): Promise<User[] | null> {
    const users = await this.userModel.find().exec();
    return users;
  }
}