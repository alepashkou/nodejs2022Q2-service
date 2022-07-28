import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  async genereateToken(userId: string, login: string) {
    const token = jwt.sign({ userId, login }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    const refresh = jwt.sign(
      { userId, login },
      process.env.JWT_SECRET_REFRESH_KEY,
      {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );
    return { accessToken: token, refreshTokenre: refresh };
  }
}
