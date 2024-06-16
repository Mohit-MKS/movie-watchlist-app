import localForage from "localforage";

export class StorageService {

  static setItem(key: string, value: unknown) {
    return localForage.setItem(key, value)
  }

  static getItem(key: string): Promise<{ [key: string]: unknown } | null> {
    return localForage.getItem(key)
  }

  static removeItem(key: string) {
    return localForage.removeItem(key)
  }

}