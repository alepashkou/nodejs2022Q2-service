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
import { genHashPassword } from 'src/additional/genHashPassword';

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

  async createUser(userDto: CreateUserDto) {
    userDto.password = await genHashPassword(userDto.password);
    const createdUser = this.userRepository.create(userDto);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async updateUser(id: string, userPasswordDto: UpdatePasswordDto) {
    const findedUser = await this.userRepository.findOneBy({ id });
    if (!findedUser) throw new NotFoundException('Not Found');

    if (userPasswordDto.oldPassword !== findedUser.password)
      throw new ForbiddenException('Password is not correct');

    findedUser.password = userPasswordDto.newPassword;
    return (await this.userRepository.save(findedUser)).toResponse();
  }

  async deleteUser(id: string) {
    const findedUser = await this.userRepository.findOneBy({ id });
    if (!findedUser) throw new NotFoundException('Not Found');

    await this.userRepository.delete(id);
  }
}
