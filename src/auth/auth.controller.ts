/* =======================================================
 *
 * Created by anele on 21/04/2023.
 *
 * @anele_ace
 *
 * =======================================================
 */

import { AuthDto } from './dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
//@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiParam({
    name: 'email',
    required: true,
  })
  @ApiParam({
    required: true,
    name: 'password',
  })
  signup(@Body() dto: AuthDto) {
    return this.authService.SignUpUser(dto);
  }

  @ApiParam({
    name: 'email',
    required: true,
  })
  @ApiParam({
    required: true,
    name: 'password',
  })
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.SignInUser(dto);
  }
}
