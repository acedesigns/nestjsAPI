/* =======================================================
 *
 * Created by anele on 21/04/2023.
 *
 * @anele_ace
 *
 * =======================================================
 */

import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from '../auth/decorator';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  //constructor() {}

  @Get('me')
  getUsers(@GetUser() user: User) {
    return user;
  }
}
