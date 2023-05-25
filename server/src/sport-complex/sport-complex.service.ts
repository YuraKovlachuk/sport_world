import { ConflictException, Injectable, UseGuards } from '@nestjs/common';
import { SportComplexDto } from './sport-complex.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportComplexEntity } from './sport-complex.entity';

@Injectable()
export class SportComplexService {
  constructor(
    @InjectRepository(SportComplexEntity)
    private sportComplexEntityRepository: Repository<SportComplexEntity>,
  ) {}
  async createSportComplex(complex: SportComplexDto): Promise<SportComplexDto> {
    const checkComplex = await this.sportComplexEntityRepository.findOne({
      where: { name: complex.name },
    });

    if (checkComplex) {
      throw new ConflictException('Complex with this name already exists');
    }

    return await this.sportComplexEntityRepository.save(complex);
  }
}
