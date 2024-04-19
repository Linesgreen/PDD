import { IsEmail, Length, Validate } from 'class-validator';

import { UserEmailValidation } from './user.input.validator';

export class UserPost {
  @Length(3, 10)
  name: string;

  @Length(3, 10)
  surName: string;

  @Length(6, 20)
  password: string;

  @IsEmail()
  @Validate(UserEmailValidation)
  email: string;
}
