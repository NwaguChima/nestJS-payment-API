import { ForbiddenException, Injectable } from '@nestjs/common';
import User from 'src/db/models/user';
import { AuthDto, AuthDtoLogin } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Iuser } from 'src/utils/userInterface';

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

      return this.signToken(newUser.id, newUser.email);
    } catch (error) {
      return { status: error.status, message: error.message };
    }
  }

  async login(dto: AuthDtoLogin) {
    try {
      const userData = await User.query().where({ email: dto.email });

      if (!userData || userData.length == 0) {
        throw new ForbiddenException('Credentials incorrect!');
      }

      const user = userData[0].toJSON() as Iuser;

      const pwMatches = await argon.verify(user.password, dto.password);

      if (!pwMatches) {
        throw new ForbiddenException('Credentials incorrect!');
      }

      return this.signToken(user.id, user.email);
    } catch (error) {
      return { status: error.status, message: error.message };
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    try {
      const payload = {
        sub: userId,
        email,
      };

      const token = await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: process.env.JWT_SECRET,
      });

      return {
        access_token: token,
      };
    } catch (error) {
      return error;
    }
  }
}
