import { Module } from '@nestjs/common';
import { SportComplexService } from './sport-complex.service';
import { SportComplexController } from './sport-complex.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportComplexEntity } from './sport-complex.entity';
import { ComplexOwnerEntity } from '../account/complex-owner/complex-owner.entity';
import { AccountEntity } from '../account/account.entity';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SportComplexEntity,
      ComplexOwnerEntity,
      AccountEntity,
    ]),
    AccountModule,
  ],
  providers: [SportComplexService],
  controllers: [SportComplexController],
})
export class SportComplexModule {}
