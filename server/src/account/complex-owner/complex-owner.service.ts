import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplexOwnerEntity } from './complex-owner.entity';
import { Repository } from 'typeorm';
import { AccountDataDto } from '../account-data.dto';

@Injectable()
export class ComplexOwnerService {
  constructor(
    @InjectRepository(ComplexOwnerEntity)
    private complexOwnerRepository: Repository<ComplexOwnerEntity>,
  ) {}

  async createComplexOwner(
    newComplexOwner: AccountDataDto,
  ): Promise<ComplexOwnerEntity> {
    return await this.complexOwnerRepository.save(newComplexOwner);
  }
}
