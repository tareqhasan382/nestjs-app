import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { ROLES_KEY } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    //console.log('Roles guard runs....');

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    //console.log('requriedRoles:', JSON.stringify(requiredRoles));
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    //console.log('user:', JSON.stringify(user));
    if (!user) {
      return false;
    }

    //console.log('user:', JSON.stringify(user));
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
