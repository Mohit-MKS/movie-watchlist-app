/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";
import { IUser } from "./user.model";
type State = {
  user: IUser | null;
  watchlist: any[];
};

type UserContext = {
  state: State;
  dispatch: Dispatch<Action>;
};

type Action = { type: 'LOGIN'; payload: IUser | null }
  | { type: 'REGISTER'; payload: any }
  | { type: 'LOGOUT' }
  | { type: 'ADD_TO_WATCHLIST'; payload: any }
  | { type: 'REMOVE_FROM_WATCHLIST'; payload: string }
  | { type: 'LOAD_WATCHLIST'; payload: any[] };


export type { State, Action, UserContext, }