import { UserEmailValidation } from './api/dto/input/user.input.validator';
import { UsersCreateUserUseCase } from './application/commands/user.createuser.usecase';
import { UsersCheckCredentialsUseCase } from './application/commands/users-check-credentials-use-case';
import { UsersTestAllDataUseCase } from './application/commands/users.testingalldata.usecase';
import { UsersService } from './application/users.service';
import { User } from './domain/user.entity';
import { UsersQueryRepository } from './infrastructure/users.query.repository';
import { UsersRepository } from './infrastructure/users.repository';

export const userProviders = [UsersService, UsersRepository, UsersQueryRepository, UserEmailValidation];
export const userUseCases = [UsersCreateUserUseCase, UsersCheckCredentialsUseCase, UsersTestAllDataUseCase];
export const userEntities = [User];
