import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

import { AuthController } from './features/auth/api/auth.controller';
import { ticketEntities } from './features/ticket';
import { TicketController } from './features/ticket/api/ticket.controller';
import { userEntities, userProviders, userUseCases } from './features/user';
import { UsersController } from './features/user/api/users.controller';
import { BasicAuthGuard } from './infrastructure/guards/admin.guard';
import { UserAuthGuard } from './infrastructure/guards/user.auth.guard';
import { TestingController } from './features/testing/api/testing-controller';

config();

const postgres_url = process.env.POSTGRES_URL;
const guards = [BasicAuthGuard, UserAuthGuard];

@Module({
  imports: [
    // Для глобального доступа к env
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      url: postgres_url,
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),
    //Для схем бд
    TypeOrmModule.forFeature([...ticketEntities, ...userEntities]),
    CqrsModule,
  ],
  controllers: [TicketController, UsersController, AuthController, TestingController],
  providers: [...guards, ...userProviders, ...userUseCases],
})
export class AppModule {}
