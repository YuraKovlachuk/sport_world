import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  SignUpRequestDto,
  AuthResponseDto,
  SignInRequestDto,
} from './account.dto';
import { AccountService } from './account.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @ApiOperation({ summary: 'SignUp account' })
  @ApiOkResponse({
    description: 'Account registered successful',
    type: AuthResponseDto,
  })
  @ApiConflictResponse({
    description: 'Email or phone number is already taken',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/sign-up')
  signUp(@Body() accountDto: SignUpRequestDto): Promise<AuthResponseDto> {
    return this.accountService.signUp(accountDto);
  }

  @ApiOperation({ summary: 'SignIn to account' })
  @ApiOkResponse({
    description: 'Account authenticated',
    type: AuthResponseDto,
  })
  @ApiConflictResponse({
    description: 'Email or password is wrong',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  signIn(@Body() accountDto: SignInRequestDto): Promise<AuthResponseDto> {
    return this.accountService.signIn(accountDto);
  }
}
