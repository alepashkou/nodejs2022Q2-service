import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { Token } from '../entity/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}
  async genereateToken(userId: string, login: string) {
    const accessToken = jwt.sign(
      { userId, login },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );
    const refreshToken = jwt.sign(
      { userId, login },
      process.env.JWT_SECRET_REFRESH_KEY,
      {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );
    const createdToken = this.tokenRepository.create({
      userId,
      accessToken,
      refreshToken,
    });
    await this.tokenRepository.save(createdToken);
    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH_KEY,
    );
    if (!decoded) {
      throw new Error('Refresh token is not valid');
    }
    // return this.genereateToken(decoded.userId, decoded.login);
  }
}
