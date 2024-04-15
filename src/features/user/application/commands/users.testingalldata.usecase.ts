import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../infrastructure/users.repository';

export class UsersTestAllDataCommand {}

@CommandHandler(UsersTestAllDataCommand)
export class UsersTestAllDataUseCase implements ICommandHandler<UsersTestAllDataCommand> {
  constructor(protected usersRepository: UsersRepository) {}

  async execute(): Promise<void> {
    return await this.usersRepository.testAllData();
  }
}
