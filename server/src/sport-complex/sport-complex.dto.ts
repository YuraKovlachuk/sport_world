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
