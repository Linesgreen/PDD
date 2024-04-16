/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { INestApplication, ValidationPipe } from '@nestjs/common';

export const appSettings = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*', // Разрешить запросы с любого домена
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешить все стандартные методы
    allowedHeaders: 'Content-Type, Accept', // Разрешить заголовки
  });
};
