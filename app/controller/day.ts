import { Controller } from 'egg';
import { parseISO } from 'date-fns';
import { formatDate } from '../utils';
import cache from '../utils/cache';

export default class HomeController extends Controller {
  public async index() {
    const { ctx, app } = this;
    const params = ctx.params;
    const { error } = ctx.validate(app.validator.index.dateFormat, params, undefined, false);
    if (error) {
      return ctx.customRes.error(400);
    }
    let date = params.date;
    if (date.toLowerCase() === 'today') {
      date = new Date();
    } else {
      date = parseISO(params.date);
      if (date.toString() === 'Invalid Date') {
        return ctx.customRes.error(400);
      }
    }
    const key = formatDate(date);
    const result = await cache.getOrDefault(key, async () => {
      const isDayOff = await this.ctx.service.day.isDayOff(key);
      if (typeof isDayOff === 'number') {
        return isDayOff;
      }
      const isWeekend = this.ctx.service.day.isWeekend(date);
      return isWeekend ? 1 : 0;
    });

    return ctx.customRes.success(result);
  }
}
