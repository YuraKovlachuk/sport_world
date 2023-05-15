import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';
import { AccountDataDto } from '../account-data.dto';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  async createCustomer(newCustomer: AccountDataDto): Promise<CustomerEntity> {
    return await this.customerRepository.save(newCustomer);
  }
}
