import { format } from 'date-fns';
import zhCN from 'date-fns/locale/zh-CN';
const DATE_FORMAT = 'yyyy-MM-dd';

export function formatDate(date: Date, formatStr = DATE_FORMAT): string {
  return format(date, formatStr, { locale: zhCN });
}
