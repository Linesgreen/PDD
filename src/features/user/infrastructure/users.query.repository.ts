import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import { UserOutput } from '../api/dto/output/output';

@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findUserByID(id: string): Promise<UserOutput | null> {
    let user;

    try {
      user = await this.usersRepository.findOne({
        where: { id: id },
      });
    } catch (err) {
      return null;
    }

    if (user) {
      return userMapper(user);
    }
    return null;
  }
}

const userMapper = (user: User): UserOutput => {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
  };
};
