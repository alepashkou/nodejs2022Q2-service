import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  genHashPassword,
  comparePassword,
} from 'src/additional/genHashPassword';
import { CreateUserDto } from 'src/resources/user/dto/create-user.dto';
import { User } from 'src/resources/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Login } from '../dto/login.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      throw new Error('User not found');
    }
    const isValid = await comparePassword(loginDto.password, findUser.password);
    if (!isValid) {
      throw new Error('Password is not correct');
    }
    const jwtToken = jwt.sign(
      { userId: findUser.id, login: findUser.login },
      process.env.JWT_SECRET_KEY as string,
    );
    return {
      jwt: jwtToken,
    };
  }
}
