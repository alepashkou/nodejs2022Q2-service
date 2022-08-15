import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { Token } from '../entity/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly jwtService: JwtService,
  ) {}

  async genereateToken(userId: string, login: string) {
    await this.tokenRepository.delete({ userId });
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
    try {
      const verify = await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      if (Date.now() >= verify.exp * 1000) {
        throw new ForbiddenException('Refresh token is expired');
      }

      const findedToken = await this.tokenRepository.findOne({
        where: { userId: verify.userId, refreshToken },
      });
      if (!findedToken) {
        throw new ForbiddenException('Refresh token is not found');
      }
      return this.genereateToken(verify.userId, verify.login);
    } catch (e) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
