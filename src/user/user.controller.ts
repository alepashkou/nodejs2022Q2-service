import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', new ParseUUIDPipe()) id: string): User {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto): User {
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() track: UpdatePasswordDto,
  ): User {
    return this.userService.updateUser(id, track);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string): void {
    return this.userService.deleteUser(id);
  }
}
