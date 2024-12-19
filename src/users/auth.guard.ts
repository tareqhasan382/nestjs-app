import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //  console.log('AuthGuard runs ....');
    const request = context.switchToHttp().getRequest();
    // console.log('AuthGuard request:', request);
    const token = this.extractTokenFromHeader(request);
    // console.log('AuthGuard token received....', token);
    if (!token) {
      throw new UnauthorizedException();
    }
    const secret = this.configService.get<string>('jwt');
    const payload = await this.jwtService.verifyAsync(token, {
      secret: secret,
    });
    // console.log('AuthGuard payload...', JSON.stringify(payload));
    request['user'] = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // console.log('AuthGuard header:', request.headers);
    const token = request.headers.authorization; //?.split(' ') ?? [];
    // console.log('token:', token);
    return token; //type === 'Bearer' ? token : undefined;
  }
}
