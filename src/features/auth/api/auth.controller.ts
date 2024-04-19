import { Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { UserAuthGuard } from 'src/infrastructure/guards/user.auth.guard';

import { UserPostOutput } from './dto/output';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(UserAuthGuard)
  @Post('login')
  @HttpCode(200)
  async loginUser(@Req() req, @Res({ passthrough: true }) res: Response): Promise<UserPostOutput> {
    //const deviceName: string = req.header('User-Agent') ? req.header('User-Agent')! : 'unknown device';

    //const result = await this.commandBus.execute(new AuthCreateAuthSessionCommand(req.user.id, req.ip, deviceName));

    res.cookie('refreshToken', /*result.refreshToken*/ 'sdfadsfasdf.fadfasdfasdfasdf.adsfasdfasdfas', {
      httpOnly: true,
      secure: true,
    });

    return { ticketsCount: 3 };
  }
}
