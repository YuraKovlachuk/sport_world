import { IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SportComplexDto {
  @ApiProperty({ default: 'Complex1' })
  @IsString()
  name: string;

  @ApiProperty({ default: 'The best complex ever!' })
  @IsString()
  description: string;

  @ApiProperty({ default: '+380973495432' })
  @IsPhoneNumber()
  @IsString()
  contacts: string;

  @ApiProperty({ default: 'Lviv' })
  @IsString()
  city: string;

  @ApiProperty({ default: 'New York St.2, 21' })
  @IsString()
  location: string;

  @ApiProperty({ default: 'fdfsdf' })
  @IsString()
  image: string;
}

export class SportComplexResponseDto extends SportComplexDto {
  @ApiProperty({ default: 'c05b27cf-c949-4418-8e1d-086b63c8c24a' })
  id: string;

  @ApiProperty({ default: 0 })
  rate: number;

  @ApiProperty({ default: '2023-05-29T22:17:44.956Z' })
  createdDate: Date;

  @ApiProperty({ default: '2023-05-29T22:17:44.956Z' })
  updatedDate: Date;
}

export class SportComplexQueryDto {
  @ApiProperty({ default: 'c05b27cf-c949-4418-8e1d-086b63c8c24a' })
  complexId: string;
}
