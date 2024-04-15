/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { INestApplication, ValidationPipe } from '@nestjs/common';

export const appSettings = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
};
