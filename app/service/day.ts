import { Service } from 'egg';
import { isWeekend } from 'date-fns';
/**
 * Test Service
 */
export default class Test extends Service {

  public index() {
    return '<h3>welcome to dayOff api</h3><br/><p>eg: /api/2022-06-01</p><br/><p>return 0 (work day) or 1 (day off)</p>';
  }

  public async isDayOff(date: string): Promise<number|void> {
    const instance = await this.ctx.model.Day.findOne({
      where: {
        date,
      },
    });
    if (instance) {
      return instance.off;
    }
    return;
  }
  public isWeekend(date: Date): boolean {
    return isWeekend(date);
  }
}
