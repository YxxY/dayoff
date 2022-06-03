// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDay from '../../../app/controller/day';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    day: ExportDay;
    home: ExportHome;
  }
}
