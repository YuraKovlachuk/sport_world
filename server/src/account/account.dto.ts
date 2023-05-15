import { AccountType } from './account.entity';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { AccountDataDto } from './account-data.dto';

export class AccountDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;

  @ApiProperty({
    default: AccountType.customer,
    description: 'The type of role',
  })
  @IsNotEmpty()
  @IsEnum(AccountType)
  type: AccountType;

  @ApiProperty({
    default: 'example@gmail.com',
    description: 'Email of user. Should be unique',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    default: '12345678A.a',
    description: 'Password of account',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  password: string;

  @ApiProperty({
    default: '+380975471261',
    description: 'The phone number of account. Should be unique',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  customer?: AccountDataDto;

  @ApiProperty()
  complexOwner?: AccountDataDto;
}

export class SignUpRequestDto extends IntersectionType(
  OmitType(AccountDto, [
    'id',
    'createdDate',
    'updatedDate',
    'customer',
    'complexOwner',
  ] as const),
  AccountDataDto,
) {}

export class AuthResponseDto extends OmitType(AccountDto, [
  'password',
] as const) {
  @ApiProperty()
  accessToken: string;
}

export class SignInRequestDto {
  @ApiProperty({
    default: 'example@gmail.com',
    description: 'Email of user. Should be unique',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    default: '12345678A.a',
    description: 'Password of account',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
