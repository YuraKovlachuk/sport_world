import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { CustomerService } from './customer/customer.service';
import { CustomerEntity } from './customer/customer.entity';
import { ComplexOwnerService } from './complex-owner/complex-owner.service';
import { ComplexOwnerEntity } from './complex-owner/complex-owner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      CustomerEntity,
      ComplexOwnerEntity,
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_CODE,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [AccountService, CustomerService, ComplexOwnerService],
  controllers: [AccountController],
  exports: [AccountService, CustomerService, ComplexOwnerService],
})
export class AccountModule {}
