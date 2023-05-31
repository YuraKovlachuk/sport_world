import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceTypeEntity } from './service-type.entity';
import { ServiceTypeDto } from './service-type.dto';

@Injectable()
export class ServiceTypeService {
  constructor(
    @InjectRepository(ServiceTypeEntity)
    private sportComplexEntityRepository: Repository<ServiceTypeEntity>,
  ) {}

  async createServiceType(
    serviceType: ServiceTypeDto,
  ): Promise<ServiceTypeDto> {
    const checkType = this.sportComplexEntityRepository.findOne({
      where: {
        name: serviceType.name,
      },
    });

    if (checkType) {
      throw new ConflictException('Service type already exist');
    }

    return this.sportComplexEntityRepository.save(serviceType);
  }

  async getAllServiceTypes(): Promise<ServiceTypeDto[]> {
    return this.sportComplexEntityRepository.find();
  }
}
