import { IsEmail, Length } from 'class-validator';

export class UserPost {
  @Length(3, 10)
  name: string;

  @Length(3, 10)
  surname: string;

  @Length(6, 20)
  password: string;

  @IsEmail()
  email: string;
}
