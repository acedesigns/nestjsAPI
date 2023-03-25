/* =======================================================
 *
 * Created by anele on 21/04/2023.
 *
 * @anele_ace
 *
 * =======================================================
 */

import * as argon from 'argon2';
import { AuthDto } from './dto';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
//import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
//import {User, Bookmark} from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async SignInUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user)
      throw new ForbiddenException('Incorrect Credentials', {
        cause: new Error(),
        description: 'The email does not exists',
      });

    // compare password
    const pwMatches = await argon.verify(user.password, dto.password);
    //console.log({ mathes: pwMatches });

    if (!pwMatches)
      throw new ForbiddenException('Incorrect Credentials', {
        cause: new Error(),
        description: 'The password or email does not match our records',
      });

    return this.generateToken(user.id, user.email);
    /*return {
      msg: 'Signing IN User',
      user,
    };*/
  }

  async SignUpUser(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: { email: dto.email, password: hash },
      });
      return {
        msg: 'User was successfully signed up',
        user,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Server was unable to process request', {
            cause: new Error(),
            description: 'The email already exists',
          });
        }
      }
      throw error;
    }
  }

  async generateToken(userID: any, email: string): Promise<{access_token: string}> {
    const payload = { sub: userID, email: email };
    const myToken = await this.jwt.signAsync(payload, {
      expiresIn: '102m',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token: myToken,
    };
  }
}
