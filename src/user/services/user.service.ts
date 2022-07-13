import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User {
    const findedUser = this.users.find((user) => user.id === id);
    if (!findedUser) throw new NotFoundException('Not Found');
    return findedUser;
  }

  createUser(userDto: CreateUserDto): User {
    const user = {
      id: uuidv4(),
      ...userDto,
      version: 1,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    };
    this.users.push(user);
    const response = { ...user };
    delete response.password;
    return response;
  }

  updateUser(id: string, userPasswordDto: UpdatePasswordDto): User {
    const findedUser = this.users.find((user) => user.id === id);
    if (!findedUser) throw new NotFoundException('Not Found');
    if (userPasswordDto.oldPassword !== findedUser.password)
      throw new ForbiddenException('Password is not correct');
    const updatedUser = {
      ...findedUser,
      password: userPasswordDto.newPassword,
      version: findedUser.version + 1,
      updatedAt: +new Date(),
    };
    this.users = this.users.map((user) =>
      user.id === id ? updatedUser : user,
    );
    const response = { ...updatedUser };
    delete response.password;
    return response;
  }

  deleteUser(id: string): void {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedUser = this.users.find((user) => user.id === id);
    if (!findedUser) throw new NotFoundException('Not Found');
    this.users = this.users.filter((user) => user.id !== id);
  }
}
