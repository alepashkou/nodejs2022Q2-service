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
import { genHashPassword, comparePassword } from 'src/additional/hashPassword';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getUser(id: string) {
    const findedUser = await this.userRepository.findOneBy({ id });
    if (!findedUser) throw new NotFoundException('Not Found');

    return findedUser.toResponse();
  }

  async createUser(userDto: CreateUserDto) {
    userDto.password = await genHashPassword(userDto.password);
    const createdUser = this.userRepository.create(userDto);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async updateUser(id: string, userPasswordDto: UpdatePasswordDto) {
    const findedUser = await this.userRepository.findOneBy({ id });
    if (!findedUser) throw new NotFoundException('Not Found');
    const isValid = await comparePassword(
      userPasswordDto.oldPassword,
      findedUser.password,
    );
    if (!isValid) {
      throw new ForbiddenException('Password is not correct');
    }
    findedUser.password = userPasswordDto.newPassword;
    return (await this.userRepository.save(findedUser)).toResponse();
  }

  async deleteUser(id: string) {
    const findedUser = await this.userRepository.findOneBy({ id });
    if (!findedUser) throw new NotFoundException('Not Found');

    await this.userRepository.delete(id);
  }
}
