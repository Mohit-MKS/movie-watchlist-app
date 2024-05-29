import React, { createContext, useReducer, useEffect, useState } from "react";
import { Action, UserContext, State } from "../models/app-context.model";
import { StorageService } from "../services/storageService";
import { Constants } from "../services/Constants";
import { IUser } from "../models/user.model";

const initialState: State = {
  user: null,
  watchlist: [],
};

const storage = new StorageService

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "REGISTER":
      return {
        ...state,
        user: { email: action.payload.email, name: action.payload.name },
      };
    case "ADD_TO_WATCHLIST":
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.imdbID !== action.payload
        ),
      };
    case "LOAD_WATCHLIST":
      return { ...state, watchlist: action.payload };

    default:
      return state;
  }
};

// Create context
export const AppContext = createContext<UserContext | undefined>(undefined);

// AppProvider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }): React.ReactNode => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadIntialData() {
      const loginUser = await storage.getItem(Constants.LOGIN_USER_KEY) as unknown as IUser;
      const storedWatchlist = await storage.getItem(Constants.WATCHLIST_KEY);
      if (loginUser) {
        dispatch({ type: "LOGIN", payload: loginUser });
      }

      if (storedWatchlist && loginUser) {
        dispatch({
          type: "LOAD_WATCHLIST",
          payload: storedWatchlist[loginUser.email] as [],
        });
      }
      setLoading(false)
    }
    loadIntialData();

  }, []);

  useEffect(() => {
    async function updateUserData() {
      if (state.user) {
        await storage.setItem(Constants.LOGIN_USER_KEY, state.user);
      } else {
        await storage.removeItem(Constants.LOGIN_USER_KEY);
      }
      storage.setItem(Constants.WATCHLIST_KEY, state.watchlist);
    }
    updateUserData();

  }, [state.user, state.watchlist]);

  return (
    <AppContext.Provider value={{ state, dispatch, loading }}>
      {children}
    </AppContext.Provider>
  );
};
