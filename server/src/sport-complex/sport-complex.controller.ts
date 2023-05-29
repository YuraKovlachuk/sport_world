import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../account/auth/auth.guard';
import { Roles } from '../shared-module/decorators/roles.decorator';
import { AccountType } from '../account/account.entity';
import { AccountGuard } from '../account/account.guard';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  SportComplexDto,
  SportComplexQueryDto,
  SportComplexResponseDto,
} from './sport-complex.dto';
import { SportComplexService } from './sport-complex.service';

@ApiTags('sport-complex')
@UseGuards(AuthGuard, AccountGuard)
@Controller('sport-complex')
export class SportComplexController {
  constructor(private sportComplexService: SportComplexService) {}

  @ApiOperation({ summary: 'Create sport complex' })
  @ApiOkResponse({
    description: 'Complex successfully created',
    type: SportComplexResponseDto,
  })
  @ApiConflictResponse({
    description: 'Complex with this name is already exist',
  })
  @HttpCode(HttpStatus.OK)
  @Roles(AccountType.owner)
  @Post()
  async createComplex(
    @Body() newComplex: SportComplexDto,
  ): Promise<SportComplexResponseDto> {
    return await this.sportComplexService.createSportComplex(newComplex);
  }

  @ApiOperation({ summary: 'Get sport complex by id' })
  @ApiOkResponse({
    description: 'Complex successfully created',
    type: SportComplexResponseDto,
  })
  @ApiConflictResponse({
    description: 'Sport complex with such id not found',
  })
  @HttpCode(HttpStatus.OK)
  @Roles(AccountType.owner)
  @Get()
  async getSportComplexById(
    @Query() query: SportComplexQueryDto,
  ): Promise<SportComplexResponseDto> {
    return await this.sportComplexService.getSportComplexById(query.complexId);
  }
}
