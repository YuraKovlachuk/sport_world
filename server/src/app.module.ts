import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { ormconfig } from './config/ormconfig';
import { SportComplexModule } from './sport-complex/sport-complex.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AccountGuard } from './account/account.guard';
import { AuthGuard } from './account/auth/auth.guard';
import { ErrorHandlerMiddleware } from './shared-module/middleware/error-handler.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ormconfig.options,
    }),
    AccountModule,
    SportComplexModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorHandlerMiddleware,
    },
  ],
})
export class AppModule {}
