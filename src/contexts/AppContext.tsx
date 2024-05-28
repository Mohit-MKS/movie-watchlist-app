import React, { createContext, useReducer, useEffect } from "react";
import { Action, UserContext, State } from "../models/app-context.model";

const initialState: State = {
  user: null,
  watchlist: [],
};

// Reducer function
const reducer = (state: State, action: Action): State => {
  console.log(state, action);

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
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedWatchlist = localStorage.getItem("watchlist");
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
    }

    if (storedWatchlist) {
      dispatch({
        type: "LOAD_WATCHLIST",
        payload: JSON.parse(storedWatchlist),
      });
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }

    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
  }, [state.user, state.watchlist]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
