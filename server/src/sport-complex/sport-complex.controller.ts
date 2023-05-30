import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../account/auth/auth.guard';
import { Roles } from '../shared-module/decorators/roles.decorator';
import { AccountType } from '../account/account.entity';
import { AccountGuard } from '../account/account.guard';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import {
  SportComplexDeleteResponse,
  SportComplexDto,
  SportComplexPutDto,
  SportComplexQueryDto,
  SportComplexResponseDto,
} from './sport-complex.dto';
import { SportComplexService } from './sport-complex.service';
import { IRequest } from '../account/interfaces/request.interface';

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
    @Req() request: IRequest,
  ): Promise<SportComplexResponseDto> {
    return this.sportComplexService.createSportComplex(
      newComplex,
      request.account.id,
    );
  }

  @ApiOperation({ summary: 'Get sport complex by id' })
  @ApiOkResponse({
    description: "Owner's sport complex successfully founded",
    type: SportComplexResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Sport complex with such id not found',
  })
  @HttpCode(HttpStatus.OK)
  @Roles(AccountType.owner)
  @Get()
  async getSportComplexById(
    @Query() query: SportComplexQueryDto,
    @Req() request: IRequest,
  ): Promise<SportComplexResponseDto> {
    return this.sportComplexService.getSportComplexById(
      query.complexId,
      request.account.id,
    );
  }

  @ApiOperation({ summary: "Get all owner's sport complexes" })
  @ApiOkResponse({
    description: "Founded list of owner's sport complexes",
    type: OmitType(SportComplexResponseDto, ['owner'] as const),
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Sport complex list is empty',
  })
  @HttpCode(HttpStatus.OK)
  @Roles(AccountType.owner)
  @Get('/all')
  async getSportComplexes(
    @Req() request: IRequest,
  ): Promise<SportComplexResponseDto[]> {
    return this.sportComplexService.getSportComplexes(request.account.id);
  }

  @ApiOperation({ summary: 'Update sport complex' })
  @ApiOkResponse({
    description: 'Complex successfully updated',
    type: SportComplexResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Sport complex with such id not found',
  })
  @ApiConflictResponse({
    description: 'Sport complex with this name already exist',
  })
  @HttpCode(HttpStatus.OK)
  @Roles(AccountType.owner)
  @Put()
  async updateSportComplex(
    @Body() updatedComplex: SportComplexPutDto,
    @Query() query: SportComplexQueryDto,
    @Req() request: IRequest,
  ): Promise<SportComplexResponseDto> {
    return this.sportComplexService.updateSportComplex(
      updatedComplex,
      query.complexId,
      request.account.id,
    );
  }

  @ApiOperation({ summary: 'Update sport complex' })
  @ApiOkResponse({
    description: 'Complex successfully deleted',
    type: SportComplexDeleteResponse,
  })
  @ApiNotFoundResponse({
    description: 'Sport complex with such id not found',
  })
  @HttpCode(HttpStatus.OK)
  @Roles(AccountType.owner)
  @Delete()
  async deleteSportComplex(
    @Query() query: SportComplexQueryDto,
    @Req() request: IRequest,
  ): Promise<SportComplexDeleteResponse> {
    return this.sportComplexService.deleteSportComplex(
      query.complexId,
      request.account.id,
    );
  }
}
