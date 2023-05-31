import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AccountGuard } from '../../../account/account.guard';
import {
  SportComplexDto,
  SportComplexResponseDto,
} from '../../sport-complex.dto';
import { Roles } from '../../../shared-module/decorators/roles.decorator';
import { AccountType } from '../../../account/account.entity';
import { ServiceTypeService } from './service-type.service';
import { ServiceTypeDto } from './service-type.dto';

@ApiTags('service-type')
@Controller('service-type')
export class ServiceTypeController {
  constructor(private serviceTypeService: ServiceTypeService) {}
  @ApiOperation({ summary: 'Create new service type' })
  @ApiOkResponse({
    description: 'Service type successfully created',
    type: ServiceTypeDto,
  })
  @ApiConflictResponse({
    description: 'Service type already exist',
  })
  @HttpCode(HttpStatus.OK)
  @Roles(AccountType.owner)
  @Post()
  async createServiceType(
    @Body() serviceType: ServiceTypeDto,
  ): Promise<ServiceTypeDto> {
    return this.serviceTypeService.createServiceType(serviceType);
  }

  @ApiOperation({ summary: 'Get list of all service types' })
  @ApiOkResponse({
    description: 'List of services types',
    type: ServiceTypeDto,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Service types not found',
  })
  @HttpCode(HttpStatus.OK)
  @Roles(AccountType.owner)
  @Get()
  async getAllServiceTypes(): Promise<ServiceTypeDto[]> {
    return this.serviceTypeService.getAllServiceTypes();
  }
}
