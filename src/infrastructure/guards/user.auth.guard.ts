import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { CommandBus } from '@nestjs/cqrs';
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
