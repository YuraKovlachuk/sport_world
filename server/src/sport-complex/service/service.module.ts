import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ServiceTypeService } from './service-type/service-type.service';
import { ServiceTypeController } from './service-type/service-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceTypeEntity } from './service-type/service-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceTypeEntity])],
  providers: [ServiceService, ServiceTypeService],
  controllers: [ServiceController, ServiceTypeController],
})
export class ServiceModule {}
