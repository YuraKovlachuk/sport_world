import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccountDataDto {
  @ApiProperty({
    default: 'Yurii',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    default: 'Kovalchuk',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    default: 'New York street, 45',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    default: 'New York',
  })
  @IsNotEmpty()
  @IsString()
  city: string;
}
