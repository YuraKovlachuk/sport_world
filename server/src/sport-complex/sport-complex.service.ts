import {
  ConflictException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { SportComplexDto, SportComplexResponseDto } from './sport-complex.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportComplexEntity } from './sport-complex.entity';

@Injectable()
export class SportComplexService {
  constructor(
    @InjectRepository(SportComplexEntity)
    private sportComplexEntityRepository: Repository<SportComplexEntity>,
  ) {}
  async createSportComplex(
    complex: SportComplexDto,
  ): Promise<SportComplexResponseDto> {
    const checkComplex = await this.sportComplexEntityRepository.findOne({
      where: { name: complex.name },
    });

    if (checkComplex) {
      throw new ConflictException('Complex with this name already exists');
    }

    return await this.sportComplexEntityRepository.save(complex);
  }

  async getSportComplexById(
    complexId: string,
  ): Promise<SportComplexResponseDto> {
    const complex = await this.sportComplexEntityRepository.findOne({
      where: { id: complexId },
    });

    if (!complex) {
      throw new NotFoundException('Sport complex with such id not found');
    }

    return complex;
  }
}
