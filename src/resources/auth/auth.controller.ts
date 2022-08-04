import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/resources/user/dto/create-user.dto';
import { Login } from './dto/login.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  createUser(@Body() user: CreateUserDto) {
    return this.authService.createUser(user);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() user: Login) {
    return this.authService.login(user);
  }

  @Post('refresh')
  @HttpCode(200)
  refresh(@Request() req) {
    return this.authService.refresh(req.body);
  }
}
