import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

import { ticketEntities } from './features/ticket';

config();

const postgres_url = process.env.POSTGRES_URL;

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
  controllers: [],
  providers: [],
})
export class AppModule {}
