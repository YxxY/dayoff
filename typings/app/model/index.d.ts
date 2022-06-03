// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDay from '../../../app/model/day';
import ExportIndex = require('../../../app/model/index');

declare module 'egg' {
  interface IModel {
    Day: ReturnType<typeof ExportDay>;
    Index: ReturnType<typeof ExportIndex>;
  }
}
