export class StateStore {
  private readonly _prefix: string;
  private readonly _store: Storage;

  constructor(args: { prefix: string; store: Storage } = { prefix: 'posc.', store: sessionStorage }) {
    this._prefix = args.prefix;
    this._store = args.store;
  }

  set(key: string, value: string) {
    key = this._prefix + key;
    this._store.setItem(key, value);
    return Promise.resolve();
  }

  get(key: string): Promise<string> {
    key = this._prefix + key;
    let item = this._store.getItem(key);
    return Promise.resolve(item);
  }

  remove(key: string) {
    key = this._prefix + key;
    let item = this._store.getItem(key);
    this._store.removeItem(key);
    return Promise.resolve(item);
  }

  getAllKeys() {
    const keys = [];
    for (let index = 0; index < this._store.length; index++) {
      let key = this._store.key(index);

      if (key.indexOf(this._prefix) === 0) {
        keys.push(key.substr(this._prefix.length));
      }
    }

    return Promise.resolve(keys);
  }
}
