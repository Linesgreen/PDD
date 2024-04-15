import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { appSettings } from './settings/aplly-app-setting';

const port = process.env.PORT || 3000;
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  appSettings(app);
  await app.listen(port);
}
bootstrap();

//aa
