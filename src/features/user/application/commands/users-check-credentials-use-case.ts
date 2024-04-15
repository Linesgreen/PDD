import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../infrastructure/users.repository';
import { User } from '../../domain/user.entity';
import { UsersService } from '../users.service';

export class UsersCheckCredentialsCommand {
  constructor(
    public email: string,
    public password: string,
  ) {}
}

@CommandHandler(UsersCheckCredentialsCommand)
export class UsersCheckCredentialsUseCase implements ICommandHandler<UsersCheckCredentialsCommand> {
  constructor(
    protected usersRepository: UsersRepository,
    protected usersService: UsersService,
  ) {}

  async execute(command: UsersCheckCredentialsCommand): Promise<User | null> {
    const user = await this.usersRepository.findUserByEmail(command.email);

    if (!user) return null;

    const passwordSalt = await this.usersService.getSalt(user.password);
    const passwordHash = await this.usersService.generateHash(command.password, passwordSalt);

    if (passwordHash !== user.password) {
      return null;
    }

    return user;
  }
}
