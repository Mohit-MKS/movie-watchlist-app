/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";
type State = {
  user: any;
  watchlist: any[];
};

type UserContext = {
  state: State;
  dispatch: Dispatch<Action>;
};

type Action = { type: 'LOGIN'; payload: string }
  | { type: 'REGISTER'; payload: any }
  | { type: 'LOGOUT' }
  | { type: 'ADD_TO_WATCHLIST'; payload: any }
  | { type: 'REMOVE_FROM_WATCHLIST'; payload: string }
  | { type: 'LOAD_WATCHLIST'; payload: any[] };


export type { State, Action, UserContext, }