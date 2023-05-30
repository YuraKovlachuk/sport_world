import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  SportComplexDeleteResponse,
  SportComplexDto,
  SportComplexPutDto,
  SportComplexResponseDto,
} from './sport-complex.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportComplexEntity } from './sport-complex.entity';
import { AccountService } from '../account/account.service';

@Injectable()
export class SportComplexService {
  constructor(
    @InjectRepository(SportComplexEntity)
    private sportComplexEntityRepository: Repository<SportComplexEntity>,
    private accountService: AccountService,
  ) {}

  async createSportComplex(
    complex: SportComplexDto,
    accountId: string,
  ): Promise<SportComplexResponseDto> {
    const checkComplex = await this.sportComplexEntityRepository.findOne({
      where: { name: complex.name },
    });

    if (checkComplex) {
      throw new ConflictException('Complex with this name already exists');
    }

    const accountEntity = await this.accountService.getAccountById(accountId);

    return await this.sportComplexEntityRepository.save({
      ...complex,
      owner: accountEntity.complexOwner,
    });
  }

  async getSportComplexById(
    complexId: string,
    accountId: string,
  ): Promise<SportComplexResponseDto> {
    const accountEntity = await this.accountService.getAccountById(accountId);
    const complex = await this.sportComplexEntityRepository.findOne({
      where: { id: complexId, owner: accountEntity.complexOwner },
    });

    if (!complex) {
      throw new NotFoundException('Sport complex with such id not found');
    }

    return complex;
  }

  async getSportComplexes(
    accountId: string,
  ): Promise<SportComplexResponseDto[]> {
    const accountEntity = await this.accountService.getAccountById(accountId);
    const complex = await this.sportComplexEntityRepository.find({
      where: { owner: accountEntity.complexOwner },
    });

    if (!complex) {
      throw new NotFoundException('Sport complex list is empty');
    }

    return complex;
  }

  async updateSportComplex(
    updateComplex: SportComplexPutDto,
    complexId: string,
    accountId: string,
  ) {
    const accountEntity = await this.accountService.getAccountById(accountId);
    const complex = await this.sportComplexEntityRepository.findOne({
      where: {
        id: complexId,
        owner: accountEntity.complexOwner,
      },
    });

    if (!complex) {
      throw new NotFoundException('Sport complex with such id not found');
    }

    if (updateComplex.name === complex.name) {
      throw new ConflictException('Sport complex with this name already exist');
    }

    return this.sportComplexEntityRepository.save({
      ...complex,
      ...updateComplex,
    });
  }

  async deleteSportComplex(
    complexId: string,
    accountId: string,
  ): Promise<SportComplexDeleteResponse> {
    const accountEntity = await this.accountService.getAccountById(accountId);
    const complex = await this.sportComplexEntityRepository.findOne({
      where: { id: complexId, owner: accountEntity.complexOwner },
    });

    if (!complex) {
      throw new NotFoundException('Sport complex with such id not found');
    }

    await this.sportComplexEntityRepository.remove(complex);

    return { message: 'Sport complex was successfully deleted' };
  }
}
