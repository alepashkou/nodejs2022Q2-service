import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/resources/user/dto/create-user.dto';
import { Login } from './dto/login.dto';
import { RefreshToken } from './dto/refresh-token.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  createUser(@Body() user: CreateUserDto) {
    return this.authService.createUser(user);
  }

  @Post('login')
  login(@Body() user: Login) {
    return this.authService.login(user);
  }

  @Post('refresh')
  refresh(@Body() refreshToken: RefreshToken) {
    return this.authService.refresh(refreshToken);
  }
}
