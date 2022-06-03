
import NodeCache = require('node-cache');

type DefaultCallback<T> = (...args: Array<any>) => Promise<T>;

type CacheItemConfig = {
  key: string;
  ttl: number;
};

const TTL = 300; // 5 mins

class LocalCache extends NodeCache {

  public async getOrDefault<T>(config: string | CacheItemConfig, getter: DefaultCallback<T>, ...callbackArgs: Array<any>): Promise<T> {
    const key = typeof config === 'string' ? config : config.key;
    let value = this.get(key);
    if (!value) {
      value = await getter?.(...callbackArgs);

      if (key && value) {
        this.set(key, value, typeof config === 'string' ? TTL : config.ttl);
      }
    }
    return value as T;
  }
}

const local = new LocalCache({
  stdTTL: TTL,
});

export default local;

