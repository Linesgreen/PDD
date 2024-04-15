import { Body, Controller, HttpException, NotFoundException, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserPost } from './dto/input';
import { UsersCreateUserCommand } from '../application/commands/user.createuser.usecase';
import { UsersQueryRepository } from '../infrastructure/users.query.repository';

@Controller('users')
// @UseGuards(BasicAuthGuard)
export class UsersController {
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly commandBus: CommandBus,
  ) {}

  //создание нового пользователя
  @Post()
  async createUser(@Body() dto: UserPost) {
    const result = await this.commandBus.execute(new UsersCreateUserCommand(dto));

    if (!result) throw new NotFoundException();

    const newUser = await this.usersQueryRepository.findUserByID(result);

    return newUser;
  }
}
