/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from 'src/app.module';

export const appSettings = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*', // Разрешить запросы с любого домена
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешить все стандартные методы
    allowedHeaders: 'Content-Type, Accept', // Разрешить заголовки
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};
