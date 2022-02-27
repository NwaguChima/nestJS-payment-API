import { ForbiddenException, Injectable } from '@nestjs/common';
import User from 'src/db/models/user';
import { AuthDto, AuthDtoLogin } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
// import { Model } from 'objection';

export interface Iuser {
  id: number;
  password: string;
  full_name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);

      const user = await User.query().insert({
        full_name: dto.full_name,
        email: dto.email,
        password: hash,
      });

      const newUser = user.toJSON() as Iuser;

      delete newUser.password;

      return newUser;
    } catch (error) {
      return { status: error.status, message: error.message };
    }
  }

  async login(dto: AuthDtoLogin) {
    try {
      const userData = await User.query().where({ email: dto.email });

      if (!userData) {
        throw new ForbiddenException('Credentials incorrect!');
      }
      const user = userData[0].toJSON() as Iuser;

      const pwMatches = await argon.verify(user.password, dto.password);

      if (!pwMatches) {
        throw new ForbiddenException('Credentials incorrect!');
      }

      delete user.password;
      return this.signToken(user.id, user.email);
    } catch (error) {
      return { status: error.status, message: error.message };
    }
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });
  }
}
