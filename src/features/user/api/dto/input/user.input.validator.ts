import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { UsersRepository } from '../../../infrastructure/users.repository';

@ValidatorConstraint({ name: 'customText', async: true })
@Injectable()
export class UserEmailValidation implements ValidatorConstraintInterface {
  errorMessage: string;
  constructor(private readonly usersRepository: UsersRepository) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (user) {
      this.errorMessage = 'E-mail already in use';

      return false;
    }

    return true;
  }

  defaultMessage(): string {
    return this.errorMessage;
  }
}
