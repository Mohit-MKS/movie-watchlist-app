import localForage from "localforage";
import { IUser } from "../models/user.model";

export class StorageService {

  setItem(key: string, value: unknown) {
    return localForage.setItem(key, value)
  }

  getItem(key: string): Promise<{ [key: string]: IUser } | null> {
    return localForage.getItem(key)
  }

  removeItem(key: string) {
    return localForage.removeItem(key)
  }

}