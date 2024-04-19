import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor() {}

  async generateHash(password: string, salt: string): Promise<string> {
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async getSalt(password: string): Promise<string> {
    const salt = password.match(/\$..\$..\$.{22}/g);

    if (salt) {
      return salt[0];
    }
    return '';
  }
}
