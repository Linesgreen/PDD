import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello super {----} World!';
    // comment 1
    // comment 2
    // comment 3
    // comment 4
    // fasfa
  }
  getNeHello(): string {
    return 'testest';
    // comment 1
    // comment 2
    // comment 3
    //новый комент
  }
}
