import { Module } from '@nestjs/common';
import { SportComplexService } from './sport-complex.service';
import { SportComplexController } from './sport-complex.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportComplexEntity } from './sport-complex.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SportComplexEntity])],
  providers: [SportComplexService],
  controllers: [SportComplexController],
})
export class SportComplexModule {}
