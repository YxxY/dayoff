import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {
  public async sayHi() {
    return 'hi, egg';
  }
}
