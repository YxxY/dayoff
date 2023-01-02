import { schema } from '../app/model/day';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { parse } from 'yaml';
import { formatDate } from '../app/utils';
import { readFileSync, readdirSync } from 'fs';
import { basename, extname, join } from 'path';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/db.sqlite',
  define: {
    freezeTableName: true,
  },
});

class Day extends Model {}

Day.init(schema(DataTypes), {
  sequelize,
  modelName: 'Day',
});

interface DateList {
  [key: string]: Array<number>
}

interface RawData {
  'off': DateList[]
  'work': DateList[]
}

main();

async function main() {
  await sequelize.sync({ force: true });
  const currFileName = basename(__filename);
  const files = readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== currFileName) && (['.yaml', '.yml'].includes(extname(file)));
    });
  for (const file of files) {
    const year = basename(file, extname(file));
    await handle(join(__dirname, file), year);
  }
}

async function handle(file, year) {
  const fh = readFileSync(file, 'utf8');
  const raw:RawData = parse(fh);

  const offDay = rawDataHandler(raw.off, year);
  const workDay = rawDataHandler(raw.work, year, 0);

  const data = [ ...workDay.flat(), ...offDay.flat() ];

  const days = await Day.bulkCreate(data);
  console.log(days.length);
}


function rawDataHandler(data:DateList[], year: number, off = 1) {
  return data.map(item => {
    const month: number = parseInt(Object.keys(item)[0]);
    return item[month].map(day => {
      const date = new Date(year, month - 1, day);
      return {
        date: formatDate(date),
        off,
      };
    });
  });
}

