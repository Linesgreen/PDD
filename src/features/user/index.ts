import { UsersCreateUserUseCase } from './application/commands/user.createuser.usecase';
import { UsersService } from './application/users.service';
import { User } from './domain/user.entity';
import { UsersQueryRepository } from './infrastructure/users.query.repository';
import { UsersRepository } from './infrastructure/users.repository';

export const userProviders = [UsersService, UsersRepository, UsersQueryRepository];
export const userUseCases = [UsersCreateUserUseCase];
export const userEntities = [User];
