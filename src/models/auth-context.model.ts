import { IUser } from "./user.model";


interface AuthState {
  user: IUser | null;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT' | 'REGISTER';
  payload?: IUser;
}

export type { AuthAction, AuthState }