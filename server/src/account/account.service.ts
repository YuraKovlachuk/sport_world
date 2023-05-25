import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthResponseDto,
  SignInRequestDto,
  SignUpRequestDto,
} from './account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity, AccountType } from './account.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CustomerService } from './customer/customer.service';
import { CustomerEntity } from './customer/customer.entity';
import { ComplexOwnerService } from './complex-owner/complex-owner.service';
import { ComplexOwnerEntity } from './complex-owner/complex-owner.entity';
import { IPayload } from './interfaces/payload.interface';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    private customerService: CustomerService,
    private complexOwnerService: ComplexOwnerService,
    private jwtService: JwtService,
  ) {}
  async signUp(newAccount: SignUpRequestDto): Promise<AuthResponseDto> {
    const checkEmail = await this.accountRepository.findOne({
      where: {
        email: newAccount.email,
      },
    });

    const checkPhone = await this.accountRepository.findOne({
      where: {
        phone: newAccount.phone,
      },
    });

    if (checkEmail) {
      throw new ConflictException('Account with this email already exist');
    }

    if (checkPhone) {
      throw new ConflictException('Account with this phone already exist');
    }

    let customer: CustomerEntity;
    let complexOwner: ComplexOwnerEntity;

    if (newAccount.type === AccountType.customer) {
      customer = await this.customerService.createCustomer({
        firstName: newAccount.firstName,
        lastName: newAccount.lastName,
        address: newAccount.address,
        city: newAccount.city,
      });
    } else {
      complexOwner = await this.complexOwnerService.createComplexOwner({
        firstName: newAccount.firstName,
        lastName: newAccount.lastName,
        address: newAccount.address,
        city: newAccount.city,
      });
    }

    const hash = await bcrypt.hash(newAccount.password, 10);

    const savedAccount = await this.accountRepository.save({
      ...newAccount,
      customer,
      complexOwner,
      password: hash,
    });

    const payload: IPayload = {
      id: savedAccount.id,
      email: savedAccount.email,
      phone: savedAccount.phone,
      type: savedAccount.type,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { ...savedAccount, accessToken };
  }

  async signIn({
    email,
    password,
  }: SignInRequestDto): Promise<AuthResponseDto> {
    const checkAccount = await this.accountRepository.findOne({
      where: {
        email,
      },
      relations: ['customer', 'complexOwner'],
    });

    if (!checkAccount) {
      throw new ConflictException("User doesn't exist");
    }

    const checkPassword = await bcrypt.compare(password, checkAccount.password);

    if (!checkPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload: IPayload = {
      id: checkAccount.id,
      email: checkAccount.email,
      phone: checkAccount.phone,
      type: checkAccount.type,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const response: AuthResponseDto = { ...checkAccount, accessToken };

    checkAccount.type === AccountType.customer
      ? delete response.complexOwner
      : delete response.customer;

    return response;
  }
}
