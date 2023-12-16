type KeyValuePair<K, V> = {
  key: K;
  value: V;
};

type HashMapList<K, V> = { [index: number | string]: { key: K; value: V }[] };

type HashFunction<K> = (index: K) => number | string;

export class HashMap<K, V> {
  // private size: number;
  private hashMap: HashMapList<K, V>;
  public hash: HashFunction<K>;

  constructor(hash?: HashFunction<K>) {
    this.hashMap = {};
    // this.size = 0;
    this.hash = hash || this.defaultHash;
  }

  public defaultHash(index: K): number {
    if (typeof index === "string") {
      let hash = 0;
      for (let i = 0; i < index.length; i++) {
        hash = (hash << 5) + index.charCodeAt(i);
        hash = hash & hash;
        hash = Math.abs(hash);
      }
      return hash; //% this.size;
    } else if (typeof index === "number") {
      return Math.abs(index); //% this.size;
    } else {
      throw new Error("Index must be string or number");
    }
  }

  public put(key: K, value: V) {
    const index = this.hash(key);
    if (!this.hashMap[index]) {
      this.hashMap[index] = [{ key: key, value: value }];
    } else {
      for (const list of this.hashMap[index]) {
        if (list.key === key) {
          list.value = value;
          return;
        }
      }

      this.hashMap[index].push({ key: key, value: value });
    }
  }

  public remove(key: K) {
    const index = this.hash(key);
    if (this.hashMap[index]) {
      this.hashMap[index] = this.hashMap[index].filter(
        (pair) => pair.key !== key,
      );
    }
  }

  public getTable(key: K): KeyValuePair<K, V>[] {
    const index = this.hash(key);
    return this.hashMap[index];
  }

  public getValue(key: K): V | undefined {
    const index = this.hash(key);
    return (
      this.hashMap[index].find((pair) => pair.key === key)?.value || undefined
    );
  }

  public getIndex(index: number | string) {
    return this.hashMap[index];
  }

  public *[Symbol.iterator](): IterableIterator<K> {
    for (const index in this.hashMap) {
      yield index as K;
    }
  }
}
