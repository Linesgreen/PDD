import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { UsersCheckCredentialsCommand } from 'src/features/user/application/commands/users-check-credentials-use-case';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly commandBus: CommandBus) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const email = request.body.email;
    const password = request.body.password;

    if (!email || !password) throw new BadRequestException();

    const user = await this.commandBus.execute(new UsersCheckCredentialsCommand(email, password));

    if (!user) throw new UnauthorizedException();

    return true;
  }
}
