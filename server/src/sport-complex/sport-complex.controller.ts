import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
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
  ApiTags,
} from '@nestjs/swagger';
import { SportComplexDto } from './sport-complex.dto';
import { SportComplexService } from './sport-complex.service';

@ApiBearerAuth()
@ApiTags('sport-complex')
@UseGuards(AuthGuard, AccountGuard)
@Controller('sport-complex')
export class SportComplexController {
  constructor(private sportComplexService: SportComplexService) {}

  @ApiOperation({ summary: 'Create sport complex' })
  @ApiOkResponse({
    description: 'Complex successfully created',
    type: SportComplexDto,
  })
  @ApiConflictResponse({
    description: 'Complex with this name is already exist',
  })
  @HttpCode(HttpStatus.OK)
  @Roles(AccountType.owner)
  @Post()
  async createComplex(
    @Body() newComplex: SportComplexDto,
  ): Promise<SportComplexDto> {
    return await this.sportComplexService.createSportComplex(newComplex);
  }
}
