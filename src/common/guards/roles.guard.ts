import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;
    // Support either user.role (string) or user.roles (string[])
    const userRoles: string[] = [];
    if (Array.isArray(user.roles)) {
      userRoles.push(...user.roles);
    }
    if (typeof user.role === 'string') {
      userRoles.push(user.role);
    }

    return requiredRoles.some((role) => userRoles.includes(role));
  }
}