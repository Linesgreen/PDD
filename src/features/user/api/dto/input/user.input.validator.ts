import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable, Scope } from '@nestjs/common';
import { UsersRepository } from '../../../infrastructure/users.repository';

@ValidatorConstraint({ name: 'customText', async: true })
@Injectable()
export class UserEmailValidation implements ValidatorConstraintInterface {
  constructor(private readonly usersRepository: UsersRepository) {}

  errorMessage: string;

  async validate(email: string) {
    const user = await this.usersRepository.findUserByEmail(email);

    if (user) {
      this.errorMessage = 'E-mail already in use';

      return false;
    }

    return true;
  }

  defaultMessage() {
    return this.errorMessage;
  }
}
