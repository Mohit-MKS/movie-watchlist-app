/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";
import { IUser } from "./user.model";
import { IMovie } from "./movies.model";
type State = {
  user: IUser | null;
  watchlist: IMovie[];
};

type UserContext = {
  state: State;
  dispatch: Dispatch<Action>;
  loading: boolean
};

type Action = { type: 'LOGIN'; payload: IUser | null }
  | { type: 'REGISTER'; payload: any }
  | { type: 'LOGOUT'; payload: null }
  | { type: 'ADD_TO_WATCHLIST'; payload: IMovie }
  | { type: 'REMOVE_FROM_WATCHLIST'; payload: string }
  | { type: 'LOAD_WATCHLIST'; payload: IMovie[] };


export type { State, Action, UserContext, }