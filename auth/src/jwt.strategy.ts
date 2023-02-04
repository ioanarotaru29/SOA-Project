import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { PassportStrategy } from '@nestjs/passport';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload) {
    return { id: payload.sub, user: payload.user };
  }
}
