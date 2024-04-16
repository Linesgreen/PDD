import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async testAllData(): Promise<void> {
    await this.usersRepository.delete({});
  }

  async save(user: User): Promise<string> {
    const userResult = await this.usersRepository.save(user);

    return userResult.id;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    return user;
  }
}
