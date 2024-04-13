import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

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
    TypeOrmModule.forFeature(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
