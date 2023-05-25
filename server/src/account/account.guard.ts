import {
  BadRequestException,
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IPayload } from './interfaces/payload.interface';
import { AccountType } from './account.entity';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<AccountType[]>(
      'roles',
      context.getHandler(),
    );
    console.log(roles);
    if (!roles || !roles.length) {
      throw new BadRequestException('Type was not provided');
    }
    const request = context.switchToHttp().getRequest();
    const user = request.account as IPayload;

    if (!roles.includes(user.type)) {
      throw new ConflictException(
        "This user don't have permission to this operation",
      );
    }

    return true;
  }
}
