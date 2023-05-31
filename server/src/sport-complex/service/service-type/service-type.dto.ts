import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ServiceTypeDto {
  @ApiProperty({ default: 'Basketball' })
  @IsString()
  name: string;
}
