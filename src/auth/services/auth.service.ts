import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Login } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const createdUser = this.userRepository.create(userDto);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  // async login(loginDto: Login) {
  //   const findUser = await this.userRepository.findOne({
  //     where: { login: loginDto.login },
  //   });
  //   if (!findUser) {
  //     throw new Error('User not found');
  //   }

  // }
}
