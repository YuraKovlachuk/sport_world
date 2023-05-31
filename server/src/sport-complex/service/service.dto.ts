import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ServiceDto {
  @ApiProperty({ default: 'Football' })
  @IsString()
  name: string;

  @ApiProperty({ default: 'You can improve your football skill!' })
  @IsString()
  description: string;
}
