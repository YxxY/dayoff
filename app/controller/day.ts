import { Controller } from 'egg';
import { parseISO, addDays, subDays } from 'date-fns';
export default class HomeController extends Controller {
  public async index() {
    const { ctx, app } = this;
    const params = ctx.params;
    const { error } = ctx.validate(app.validator.index.dateFormat, params, undefined, false);
    if (error) {
      return ctx.customRes.error(400);
    }
    let date = params.date;
    switch (date.toLowerCase()) {
      case 'today':
        date = new Date();
        break;
      case 'yesterday':
        date = subDays(new Date(), 1);
        break;
      case 'tomorrow':
        date = addDays(new Date(), 1);
        break;
      default:
        date = parseISO(params.date);
        if (date.toString() === 'Invalid Date') {
          return ctx.customRes.error(400);
        }
        break;
    }
    const key = app.utils.index.formatDate(date);
    const result = await app.utils.cache.getOrDefault(key, async () => {
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
