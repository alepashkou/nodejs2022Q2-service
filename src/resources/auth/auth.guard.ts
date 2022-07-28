import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    try {
      const token = req.headers.authorization.split(' ')[1];

      this.jwtService.verify(token);

      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
