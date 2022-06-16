// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportCache from '../../../app/utils/cache';
import ExportIndex from '../../../app/utils/index';

declare module 'egg' {
  interface Application {
    utils: T_custom_utils;
  }

  interface T_custom_utils {
    cache: AutoInstanceType<typeof ExportCache>;
    index: AutoInstanceType<typeof ExportIndex>;
  }
}
