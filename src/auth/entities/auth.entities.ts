/* =======================================================
 *
 * Created by anele on 21/04/2023.
 *
 * @anele_ace
 *
 * =======================================================
 */

import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true, nullable: false })
  email: string;

  @ApiProperty({ required: true, nullable: false })
  password: string | null;

  @ApiProperty({ required: false, nullable: true })
  username: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
