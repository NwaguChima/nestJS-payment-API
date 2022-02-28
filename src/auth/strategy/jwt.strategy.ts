import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import User from 'src/db/models/user';
import { Iuser } from '../auth.service';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const userData = await User.query().where({ id: payload.sub });

    const user = userData[0].toJSON() as Iuser;
    delete user.password;
    return user;
  }
}
