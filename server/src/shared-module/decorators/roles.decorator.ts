import { SetMetadata } from '@nestjs/common';
import { AccountType } from '../../account/account.entity';

export const Roles = (...roles: AccountType[]) => SetMetadata('roles', roles);
