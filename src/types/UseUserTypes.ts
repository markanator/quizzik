import { ReactNode } from "react";
import { firebase } from "../firebase";

type IUser = firebase.User;

export interface IUserState {
  user: IUser | null;
  isLoading: boolean;
  error: firebase.auth.Error | null;
}

export interface IUserContext extends IUserState {
  isSignedIn: boolean;
  userId: string | undefined;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export interface IProviderProps {
  children: ReactNode;
}
