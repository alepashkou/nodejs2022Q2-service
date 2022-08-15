import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genHashPassword, comparePassword } from 'src/additional/hashPassword';
import { CreateUserDto } from 'src/resources/user/dto/create-user.dto';
import { User } from 'src/resources/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Login } from '../dto/login.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async createUser(userDto: CreateUserDto) {
    userDto.password = await genHashPassword(userDto.password);
    const createdUser = this.userRepository.create(userDto);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async login(loginDto: Login) {
    const findUser = await this.userRepository.findOne({
      where: { login: loginDto.login },
    });
    if (!findUser) {
      throw new ForbiddenException('User not found');
    }
    const isValid = await comparePassword(loginDto.password, findUser.password);
    if (!isValid) {
      throw new ForbiddenException('Password is not correct');
    }
    return this.tokenService.genereateToken(findUser.id, findUser.login);
  }

  async refresh(body: { refreshToken: string }) {
    const refreshToken = body.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }
    return this.tokenService.refreshToken(refreshToken);
  }
}
