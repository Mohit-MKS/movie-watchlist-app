import localForage from "localforage";

export class StorageService {

  setItem(key: string, value: unknown) {
    return localForage.setItem(key, value)
  }

  getItem(key: string): Promise<{ [key: string]: unknown } | null> {
    return localForage.getItem(key)
  }

  removeItem(key: string) {
    return localForage.removeItem(key)
  }

}