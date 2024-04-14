import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

import { ticketEntities } from './features/ticket';
import { TicketController } from './features/ticket/api/ticket.controller';
import { BasicAuthGuard } from './infrastructure/guards/admin.guard';

config();

const postgres_url = process.env.POSTGRES_URL;
const guards = [BasicAuthGuard];

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
    TypeOrmModule.forFeature([...ticketEntities]),
  ],
  controllers: [TicketController],
  providers: [...guards],
})
export class AppModule {}
