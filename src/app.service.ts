//library imports
import { Injectable } from '@nestjs/common';

//local imports

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
