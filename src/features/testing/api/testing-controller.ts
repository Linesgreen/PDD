import { Controller, Delete, HttpCode } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UsersTestAllDataCommand } from 'src/features/user/application/commands/users.testingalldata.usecase';

@Controller('testing')
export class TestingController {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete('all-data')
  @HttpCode(204 /*HTTP_STATUSES.NO_CONTENT_204*/)
  async allData() {
    await this.commandBus.execute(new UsersTestAllDataCommand());
    return;
  }
}
