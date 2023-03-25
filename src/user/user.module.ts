/* =======================================================
 *
 * Created by anele on 21/04/2023.
 *
 * @anele_ace
 *
 * =======================================================
 */

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController]
})
export class UserModule {}
