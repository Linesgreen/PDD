import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserPost } from '../../api/dto/input/user.input';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users.service';
import { UsersRepository } from '../../infrastructure/users.repository';
import { User } from '../../domain/user.entity';

export class UsersCreateUserCommand {
  constructor(public dto: UserPost) {}
}

@CommandHandler(UsersCreateUserCommand)
export class UsersCreateUserUseCase implements ICommandHandler<UsersCreateUserCommand> {
  constructor(
    protected usersRepository: UsersRepository,
    protected usersService: UsersService,
  ) {}

  async execute(command: UsersCreateUserCommand): Promise<string | null> {
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await this.usersService.generateHash(command.dto.password, passwordSalt);

    const newUser = User.createUser(command.dto.name, command.dto.surName, command.dto.email, passwordHash);

    const result = await this.usersRepository.save(newUser);

    //в result содержится id созданного пользователя
    return result;
  }
}
