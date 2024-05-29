import React, { createContext, useReducer, useEffect, ReactNode, ReactElement, useContext } from "react";
import { AuthAction, AuthState } from "../models/auth-context.model";
import { StorageService } from "../services/storageService";
import { Constants } from "../services/Constants";
import { IUser } from "../models/user.model";

const storage = new StorageService


const initialAuthState: AuthState = {
  user: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload || null };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'REGISTER':
      return { ...state, user: action.payload || null };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }): ReactElement => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    async function getUser() {
      const storedUser = await storage.getItem(Constants.LOGIN_USER_KEY) as unknown;
      if (storedUser) {
        dispatch({ type: 'LOGIN', payload: storedUser as IUser });
      }
    }
    getUser();

  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
