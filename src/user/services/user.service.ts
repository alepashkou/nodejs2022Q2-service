import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(id: string): Promise<User> {
    const findedUser = await this.userRepository.findOneBy({ id });
    if (!findedUser) throw new NotFoundException('Not Found');
    return findedUser;
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const savedUser = await this.userRepository.save({
      ...userDto,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    });
    return {
      id: savedUser.id,
      login: savedUser.login,
      version: savedUser.version,
      createdAt: +savedUser.createdAt,
      updatedAt: +savedUser.updatedAt,
    };
  }

  async updateUser(
    id: string,
    userPasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const findedUser = await this.userRepository.findOneBy({ id });
    if (!findedUser) throw new NotFoundException('Not Found');

    if (userPasswordDto.oldPassword !== findedUser.password)
      throw new ForbiddenException('Password is not correct');

    const updatedUser = {
      ...findedUser,
      password: userPasswordDto.newPassword,
      version: findedUser.version + 1,
      updatedAt: +new Date(),
    };

    const savedUser = await this.userRepository.save(updatedUser);

    return {
      id: savedUser.id,
      login: savedUser.login,
      version: savedUser.version,
      createdAt: +savedUser.createdAt,
      updatedAt: +savedUser.updatedAt,
    };
  }

  async deleteUser(id: string) {
    const findedUser = await this.userRepository.findOneBy({ id });
    if (!findedUser) throw new NotFoundException('Not Found');
    await this.userRepository.delete(id);
  }
}
